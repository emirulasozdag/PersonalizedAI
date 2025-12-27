<?php

declare(strict_types=1);

namespace App\Domain\Entities;

abstract class Test
{
    public function __construct(
        public int $testId,
        public string $title,
        public string $description,
        public int $duration,
        public ?string $createdAt = null
    ) {}

    public function start(): void
    {
        // UI-driven.
    }

    /** @param array<int, mixed> $answers */
    abstract public function submit(array $answers): int;

    abstract public function calculateScore(): int;
}
