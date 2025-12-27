<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class Question
{
    public function __construct(
        public int $questionId,
        public string $text,
        public string $options,
        public string $correctAnswer,
        public int $points
    ) {}

    public function validateAnswer(string $answer): bool
    {
        return trim(mb_strtolower($answer)) === trim(mb_strtolower($this->correctAnswer));
    }
}
