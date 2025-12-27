<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class SpeakingResult
{
    /** @param array<string, mixed> $pronunciationFeedback */
    public function __construct(
        public int $sessionId,
        public int $studentId,
        public string $audioData,
        public float $accuracyScore,
        public array $pronunciationFeedback = [],
        public ?string $createdAt = null
    ) {}

    /** @return array<string, mixed> */
    public function getFeedback(): array
    {
        return $this->pronunciationFeedback;
    }
}
