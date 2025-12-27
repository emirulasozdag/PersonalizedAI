<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class ListeningTest extends Test
{
    public function __construct(
        int $testId,
        string $title,
        string $description,
        int $duration,
        public string $audioFiles,
        public string $questions,
        ?string $createdAt = null
    ) {
        parent::__construct($testId, $title, $description, $duration, $createdAt);
    }

    public function playAudio(string $audioId): void
    {
        // Audio streaming/playing is handled by UI layer.
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
