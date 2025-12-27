<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class TestRepository
{
    public function ensurePlacementTestExists(): int
    {
        $stmt = DB::pdo()->prepare("SELECT test_id FROM tests WHERE type = 'placement' LIMIT 1");
        $stmt->execute();
        $row = $stmt->fetch();
        if ($row) {
            return (int) $row['test_id'];
        }

        $ins = DB::pdo()->prepare('INSERT INTO tests (type, title, description, duration, created_at) VALUES (:type, :title, :description, :duration, NOW())');
        $ins->execute([
            'type' => 'placement',
            'title' => 'Placement Test',
            'description' => 'Reading/Writing/Listening/Speaking placement test',
            'duration' => 30,
        ]);
        return (int) DB::pdo()->lastInsertId();
    }

    /** @return list<string> */
    public function placementModuleNames(): array
    {
        return ['reading', 'writing', 'listening', 'speaking'];
    }

    /** @return list<array{question_id:int,text:string,options:array<int,string>,correct_answer:string,points:int}> */
    public function getPlacementQuestions(string $moduleName): array
    {
        // Minimal seedless approach: questions are hard-coded for now.
        // This keeps the demo functional even before seeding.
        if ($moduleName === 'reading') {
            return [
                ['question_id' => 1, 'text' => 'Choose the correct form: "She ____ to school every day."', 'options' => ['go', 'goes', 'going', 'gone'], 'correct_answer' => 'goes', 'points' => 10],
                ['question_id' => 2, 'text' => 'Select the synonym of "quick":', 'options' => ['slow', 'fast', 'late', 'weak'], 'correct_answer' => 'fast', 'points' => 10],
            ];
        }
        if ($moduleName === 'listening') {
            return [
                ['question_id' => 3, 'text' => 'Listening (demo): What is the main topic of the audio?', 'options' => ['Travel', 'Food', 'Sports', 'Music'], 'correct_answer' => 'Travel', 'points' => 10],
            ];
        }
        if ($moduleName === 'writing') {
            return [
                ['question_id' => 4, 'text' => 'Write 2-3 sentences about your daily routine (demo).', 'options' => [], 'correct_answer' => '', 'points' => 10],
            ];
        }
        if ($moduleName === 'speaking') {
            return [
                ['question_id' => 5, 'text' => 'Speaking (demo): Read the sentence aloud: "I would like a cup of tea."', 'options' => [], 'correct_answer' => '', 'points' => 10],
            ];
        }
        return [];
    }
}
