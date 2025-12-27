<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\DB;

final class TestResultController
{
    public function teacherList(): void
    {
        Auth::requireRole('teacher');

        $stmt = DB::pdo()->query('SELECT tr.result_id, tr.student_id, u.name AS student_name, tr.test_id, tr.score, tr.level, tr.created_at FROM test_results tr JOIN users u ON u.id = tr.student_id ORDER BY tr.created_at DESC');
        $items = $stmt->fetchAll();
        \view('teacher/results', ['items' => $items]);
    }

    public function teacherView(): void
    {
        Auth::requireRole('teacher');
        $id = (int)($_GET['id'] ?? 0);
        if ($id <= 0) {
            \flash('error', 'Invalid result.');
            \redirect('/teacher/results');
        }

        $stmt = DB::pdo()->prepare('SELECT tr.*, u.name AS student_name FROM test_results tr JOIN users u ON u.id = tr.student_id WHERE tr.result_id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            \flash('error', 'Result not found.');
            \redirect('/teacher/results');
        }

        $analysis = json_decode((string)($row['analysis'] ?? '{}'), true);
        \view('teacher/result_view', [
            'row' => $row,
            'analysis' => is_array($analysis) ? $analysis : [],
        ]);
    }
}
