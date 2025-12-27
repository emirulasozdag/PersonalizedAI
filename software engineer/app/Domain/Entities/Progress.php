<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class Progress
{
    /** @param array<string, mixed> $completionStatus */
    public function __construct(
        public int $progressId,
        public int $studentId,
        public array $completionStatus = [],
        public float $correctnessRate = 0.0,
        public float $consistencyRate = 0.0,
        public ?string $lastUpdated = null
    ) {}

    public function updateProgress(array $newStatus): void
    {
        $this->completionStatus = $newStatus;
        $this->lastUpdated = date('Y-m-d H:i:s');
    }

    /** @return array<string, mixed> */
    public function getCompletionData(): array
    {
        return $this->completionStatus;
    }

    /** @return array<string, mixed> */
    public function getWeeklyProgress(): array
    {
        return [];
    }
}
