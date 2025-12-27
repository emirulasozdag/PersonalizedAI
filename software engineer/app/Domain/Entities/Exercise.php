<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class Exercise
{
    /** @param list<Question> $questions */
    public function __construct(
        public int $exerciseId,
        public string $type,
        public string $instructions,
        public array $questions = []
    ) {}

    public function start(): void
    {
        // No-op for now (UI-driven).
    }

    /** @param array<int, string> $answers questionId => answer */
    public function submit(array $answers): int
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

    public function getScore(): int
    {
        // Score is computed on submit; return 0 by default.
        return 0;
    }
}
