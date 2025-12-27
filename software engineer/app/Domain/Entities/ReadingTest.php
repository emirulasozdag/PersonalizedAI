<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class ReadingTest extends Test
{
    public function __construct(
        int $testId,
        string $title,
        string $description,
        int $duration,
        public string $passages,
        public string $questions,
        ?string $createdAt = null
    ) {
        parent::__construct($testId, $title, $description, $duration, $createdAt);
    }

    public function displayPassage(): void
    {
        // UI responsibility.
    }

    public function submit(array $answers): int
    {
        return $this->calculateScore();
    }

    public function calculateScore(): int
    {
        return 0;
    }
}
