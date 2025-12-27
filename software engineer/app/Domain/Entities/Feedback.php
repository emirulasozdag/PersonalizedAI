<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class Feedback
{
    public function __construct(
        public int $feedbackId,
        public int $studentId,
        public string $feedbackText,
        public string $submittedAt
    ) {}

    public function saveFeedback(): void
    {
        // Persist via repository in later steps.
    }

    /** @return array<string, mixed> */
    public function getFeedbackList(): array
    {
        return [];
    }

    public function displayFeedback(): array
    {
        return [
            'feedbackId' => $this->feedbackId,
            'studentId' => $this->studentId,
            'feedbackText' => $this->feedbackText,
            'submittedAt' => $this->submittedAt,
        ];
    }
}
