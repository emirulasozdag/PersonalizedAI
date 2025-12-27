<?php

declare(strict_types=1);

namespace App\Domain\Entities;

use App\Domain\Enums\LanguageLevel;

final class TestResult
{
    /** @param array<string, mixed> $analysis */
    public function __construct(
        public int $resultId,
        public int $studentId,
        public int $testId,
        public int $score,
        public LanguageLevel $level,
        public array $analysis = [],
        public ?string $createdAt = null
    ) {}

    /** @return array<string, mixed> */
    public function getScoreBreakdown(): array
    {
        return $this->analysis;
    }

    public function generateReport(): string
    {
        return json_encode([
            'resultId' => $this->resultId,
            'studentId' => $this->studentId,
            'testId' => $this->testId,
            'score' => $this->score,
            'level' => $this->level->value,
            'analysis' => $this->analysis,
            'createdAt' => $this->createdAt,
        ], JSON_PRETTY_PRINT) ?: '';
    }
}
