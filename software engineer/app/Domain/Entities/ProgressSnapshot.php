<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class ProgressSnapshot
{
    /** @param array<string, mixed> $progressData */
    public function __construct(
        public int $snapshotId,
        public int $progressId,
        public string $timestamp,
        public array $progressData = []
    ) {}

    /** @return array<string, mixed> */
    public function getSnapshot(): array
    {
        return $this->progressData;
    }
}
