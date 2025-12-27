<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\SimplePdf;
use App\Repositories\ContentRepository;
use App\Repositories\LessonPlanRepository;
use App\Repositories\ProgressRepository;
use App\Repositories\StudentAssignmentRepository;
use App\Repositories\TestRepository;
use App\Repositories\TestResultRepository;
use App\Services\ContentService;
use App\Services\LessonPlanService;
use App\Services\PlacementTestService;
use App\Services\ProgressService;

final class StudentController
{
    public function dashboard(): void
    {
        Auth::requireRole('student');
        $studentId = (int)(Auth::user()['id'] ?? 0);

        $resultsCount = 0;
        $contentCount = 0;
        $assignmentsCount = 0;
        $hasPlan = false;

        try {
            $resultsCount = count((new TestResultRepository())->listByStudent($studentId));
        } catch (\Throwable) {
            $resultsCount = 0;
        }

        try {
            $hasPlan = (new LessonPlanRepository())->getForStudent($studentId) !== null;
        } catch (\Throwable) {
            $hasPlan = false;
        }

        try {
            $contentCount = count((new ContentRepository())->listForStudent($studentId));
        } catch (\Throwable) {
            $contentCount = 0;
        }

        try {
            $assignmentsCount = count((new StudentAssignmentRepository())->listForStudent($studentId));
        } catch (\Throwable) {
            $assignmentsCount = 0;
        }

        \view('dashboards/student', [
            'user' => Auth::user(),
            'resultsCount' => $resultsCount,
            'hasPlan' => $hasPlan,
            'contentCount' => $contentCount,
            'assignmentsCount' => $assignmentsCount,
        ]);
    }

    public function placement(): void
    {
        Auth::requireRole('student');
        $service = new PlacementTestService();
        $modules = $service->modules();

        $state = $_SESSION['placement'] ?? [
            'completed' => [],
            'scores' => [],
            'analysis' => [],
        ];

        \view('student/placement', [
            'modules' => $modules,
            'state' => $state,
        ]);
    }

    public function placementModule(): void
    {
        Auth::requireRole('student');
        $module = (string)($_GET['name'] ?? 'reading');

        $service = new PlacementTestService();
        $modules = $service->modules();
        if (!in_array($module, $modules, true)) {
            \flash('error', 'Invalid module.');
            \redirect('/student/placement');
        }

        $questions = $service->questions($module);
        \view('student/placement_module', [
            'module' => $module,
            'questions' => $questions,
        ]);
    }

    public function submitPlacementModule(): void
    {
        Auth::requireRole('student');
        \require_post_csrf();

        $module = (string)($_POST['module'] ?? '');
        $answers = $_POST['answers'] ?? [];
        if (!is_array($answers)) {
            $answers = [];
        }

        $service = new PlacementTestService();
        $modules = $service->modules();
        if (!in_array($module, $modules, true)) {
            \flash('error', 'Invalid module.');
            \redirect('/student/placement');
        }

        $graded = $service->gradeModule($module, $answers);

        // Speaking (FR6/FR10) - accept microphone recording as base64 audio (demo) and compute an accuracy score.
        if ($module === 'speaking') {
            $audio = (string)($_POST['speaking_audio'] ?? '');
            if ($audio !== '' && str_contains($audio, 'base64,')) {
                $parts = explode('base64,', $audio, 2);
                $b64 = $parts[1] ?? '';
                $bin = base64_decode($b64, true);
                if ($bin !== false) {
                    $dir = __DIR__ . '/../../storage/uploads';
                    if (!is_dir($dir)) {
                        @mkdir($dir, 0777, true);
                    }
                    $name = 'speaking_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.webm';
                    $path = $dir . '/' . $name;
                    file_put_contents($path, $bin);

                    $size = strlen($bin);
                    $accuracy = 60 + ($size % 41); // 60..100 demo
                    $graded['pronunciation_accuracy'] = $accuracy;
                    $graded['audio_file'] = $name;
                }
            }
        }

        $state = $_SESSION['placement'] ?? [
            'completed' => [],
            'scores' => [],
            'analysis' => [],
        ];

        $state['completed'][$module] = true;
        $state['scores'][$module] = (int) $graded['score'];
        $state['analysis'][$module] = $graded;
        $_SESSION['placement'] = $state;

        // If all modules complete, finalize result
        $allComplete = true;
        foreach ($modules as $m) {
            if (empty($state['completed'][$m])) {
                $allComplete = false;
                break;
            }
        }

        if (!$allComplete) {
            \flash('success', 'Module saved: ' . $module);
            \redirect('/student/placement/interim?module=' . urlencode($module));
        }

        $studentId = (int) (Auth::user()['id'] ?? 0);
        $tests = new TestRepository();
        $testId = $tests->ensurePlacementTestExists();

        $total = array_sum(array_map('intval', $state['scores']));
        // Overall level (normalized to 0..100 using total max).
        $totalMax = 0;
        foreach ($modules as $m) {
            $totalMax += (int)($state['analysis'][$m]['max'] ?? 0);
        }
        $overallPercent = $totalMax > 0 ? (int) round(($total / $totalMax) * 100) : (int)$total;
        $level = $service->levelFromScore($overallPercent);

        $skillLevels = [];
        foreach ($modules as $m) {
            $mScore = (int)($state['analysis'][$m]['score'] ?? 0);
            $mMax = (int)($state['analysis'][$m]['max'] ?? 0);
            $skillLevels[$m] = $service->levelFromModule($mScore, $mMax);
        }

        $analysis = [
            'modules' => $state['analysis'],
            'total' => $total,
            'level' => $level,
            'skill_levels' => $skillLevels,
        ];

        $results = new TestResultRepository();
        $resultId = $results->create($studentId, $testId, (int) $total, $level, $analysis);

        // Progress + plan + content
        $correctnessRate = min(1.0, max(0.0, $total / 40.0));
        (new ProgressService())->recordPlacementCompletion($studentId, (float) $correctnessRate);
        (new LessonPlanService())->generateForStudent($studentId, $level, $analysis);
        (new ContentService())->generateInitialContent($studentId, $level);

        unset($_SESSION['placement']);
        \flash('success', 'Placement test completed.');
        \redirect('/student/results/view?id=' . $resultId);
    }

    public function placementInterim(): void
    {
        Auth::requireRole('student');
        $module = (string)($_GET['module'] ?? '');
        $state = $_SESSION['placement'] ?? null;
        if (!is_array($state) || !isset($state['analysis']) || !is_array($state['analysis'])) {
            \flash('error', 'No interim results available.');
            \redirect('/student/placement');
        }

        $analysis = $state['analysis'][$module] ?? null;
        if (!is_array($analysis)) {
            \flash('error', 'Module result not found.');
            \redirect('/student/placement');
        }

        \view('student/placement_interim', [
            'module' => $module,
            'analysis' => $analysis,
        ]);
    }

    public function results(): void
    {
        Auth::requireRole('student');
        $studentId = (int) (Auth::user()['id'] ?? 0);
        $repo = new TestResultRepository();
        $items = $repo->listByStudent($studentId);
        \view('student/results', ['items' => $items]);
    }

    public function viewResult(): void
    {
        Auth::requireRole('student');
        $studentId = (int) (Auth::user()['id'] ?? 0);
        $id = (int)($_GET['id'] ?? 0);
        $repo = new TestResultRepository();
        $row = $id > 0 ? $repo->findByIdForStudent($id, $studentId) : null;
        if (!$row) {
            \flash('error', 'Result not found.');
            \redirect('/student/results');
        }
        $analysis = json_decode((string)($row['analysis'] ?? '{}'), true);
        \view('student/result_view', ['row' => $row, 'analysis' => is_array($analysis) ? $analysis : []]);
    }

    public function plan(): void
    {
        Auth::requireRole('student');
        $studentId = (int) (Auth::user()['id'] ?? 0);
        $repo = new LessonPlanRepository();
        $plan = $repo->getForStudent($studentId);
        \view('student/plan', ['plan' => $plan]);
    }

    public function content(): void
    {
        Auth::requireRole('student');
        $studentId = (int) (Auth::user()['id'] ?? 0);
        $repo = new ContentRepository();
        $items = $repo->listForStudent($studentId);
        \view('student/content', ['items' => $items]);
    }

    public function progress(): void
    {
        Auth::requireRole('student');
        $studentId = (int) (Auth::user()['id'] ?? 0);
        $repo = new ProgressRepository();
        $row = $repo->getOrCreate($studentId);
        $status = json_decode((string)($row['completion_status'] ?? '{}'), true);
        \view('student/progress', [
            'row' => $row,
            'status' => is_array($status) ? $status : [],
        ]);
    }

    public function exportProgressCsv(): void
    {
        Auth::requireRole('student');
        $studentId = (int) (Auth::user()['id'] ?? 0);
        $repo = new ProgressRepository();
        $row = $repo->getOrCreate($studentId);
        $status = json_decode((string)($row['completion_status'] ?? '{}'), true);
        if (!is_array($status)) {
            $status = [];
        }

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="progress.csv"');

        $out = fopen('php://output', 'w');
        fputcsv($out, ['student_id', 'correctness_rate', 'consistency_rate', 'last_updated', 'status_json']);
        fputcsv($out, [
            $studentId,
            (string)($row['correctness_rate'] ?? ''),
            (string)($row['consistency_rate'] ?? ''),
            (string)($row['last_updated'] ?? ''),
            json_encode($status, JSON_UNESCAPED_UNICODE),
        ]);
        fclose($out);
        exit;
    }

    public function exportProgressPdf(): void
    {
        Auth::requireRole('student');
        $studentId = (int) (Auth::user()['id'] ?? 0);

        $repo = new ProgressRepository();
        $row = $repo->getOrCreate($studentId);
        $status = json_decode((string)($row['completion_status'] ?? '{}'), true);
        if (!is_array($status)) {
            $status = [];
        }

        $lines = [
            'Student Progress Report',
            'Student ID: ' . $studentId,
            'Correctness rate: ' . (string)($row['correctness_rate'] ?? ''),
            'Consistency rate: ' . (string)($row['consistency_rate'] ?? ''),
            'Daily streak: ' . (string)($status['daily_streak'] ?? 0),
            'Last updated: ' . (string)($row['last_updated'] ?? ''),
            '---',
            'Status JSON:',
            json_encode($status, JSON_UNESCAPED_UNICODE),
        ];

        $pdf = SimplePdf::fromTextLines($lines);
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="progress.pdf"');
        echo $pdf;
        exit;
    }
}
