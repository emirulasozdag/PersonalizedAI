<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\TestRepository;

final class PlacementTestService
{
    public function __construct(private TestRepository $tests = new TestRepository())
    {
    }

    /** @return list<string> */
    public function modules(): array
    {
        return $this->tests->placementModuleNames();
    }

    /** @return list<array{question_id:int,text:string,options:array<int,string>,correct_answer:string,points:int}> */
    public function questions(string $module): array
    {
        return $this->tests->getPlacementQuestions($module);
    }

    /** @param array<int,string> $answers */
    public function gradeModule(string $module, array $answers): array
    {
        $questions = $this->questions($module);
        $score = 0;
        $max = 0;
        $wrong = [];

        foreach ($questions as $q) {
            $max += (int) $q['points'];
            $qid = (int) $q['question_id'];
            $given = trim((string)($answers[$qid] ?? ''));
            $correct = (string) $q['correct_answer'];

            // Writing/speaking/listening demo: no strict grading.
            if ($module === 'writing' || $module === 'speaking' || $module === 'listening') {
                $score += (int) $q['points'];
                continue;
            }

            if ($given !== '' && $given === $correct) {
                $score += (int) $q['points'];
            } else {
                $wrong[] = ['question_id' => $qid, 'given' => $given, 'correct' => $correct];
            }
        }

        return [
            'module' => $module,
            'score' => $score,
            'max' => $max,
            'wrong' => $wrong,
        ];
    }

    public function levelFromScore(int $score): string
    {
        if ($score < 20) return 'A1';
        if ($score < 40) return 'A2';
        if ($score < 60) return 'B1';
        if ($score < 80) return 'B2';
        if ($score < 100) return 'C1';
        return 'C2';
    }

    public function levelFromModule(int $score, int $max): string
    {
        if ($max <= 0) {
            return 'A1';
        }

        // Normalize module score to a 0..100 scale and map to CEFR.
        $percent = (int) round(($score / $max) * 100);
        return $this->levelFromScore($percent);
    }
}
