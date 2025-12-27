<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class SpeakingTest extends Test
{
    public function __construct(
        int $testId,
        string $title,
        string $description,
        int $duration,
        public string $sampleSentence,
        public string $audioFile,
        public string $pronunciationCriteria,
        ?string $createdAt = null
    ) {
        parent::__construct($testId, $title, $description, $duration, $createdAt);
    }

    public function recordAudio(): void
    {
        // Handled in browser via Web Audio API.
    }

    public function analyzeAccuracy(): float
    {
        return 0.0;
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
