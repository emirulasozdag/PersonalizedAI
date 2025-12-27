<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class TestModule
{
    /** @param list<Question> $questions */
    public function __construct(
        public int $moduleId,
        public string $name,
        public array $questions = []
    ) {}

    public function loadQuestions(): void
    {
        // Questions are provided by repositories in this project scaffold.
    }

    /** @param array<int, string> $answers questionId => answer */
    public function submitModule(array $answers): int
    {
        $score = 0;
        foreach ($this->questions as $q) {
            $answer = (string)($answers[$q->questionId] ?? '');
            if ($q->validateAnswer($answer)) {
                $score += $q->points;
            }
        }
        return $score;
    }
}
