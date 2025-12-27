<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class SystemPerformance
{
    /** @param array<string, mixed> $statistics */
    public function __construct(
        public int $performanceId,
        public string $cpuUsage,
        public string $memoryUsage,
        public string $activeUsers,
        public array $statistics = [],
        public ?string $recordedAt = null
    ) {}

    /** @return array<string, mixed> */
    public function getStatistics(): array
    {
        return $this->statistics;
    }
}
