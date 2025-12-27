<?php

declare(strict_types=1);

namespace App\Domain\Entities;

use App\Domain\Enums\LanguageLevel;

final class LessonPlan
{
    /** @param list<Topic> $topics */
    public function __construct(
        public int $planId,
        public int $studentId,
        public LanguageLevel $level,
        public array $topics = [],
        public ?string $createdAt = null,
        public ?string $updatedAt = null
    ) {}

    public function updatePlan(array $newTopics): void
    {
        $this->topics = $newTopics;
        $this->updatedAt = date('Y-m-d H:i:s');
    }

    public function getRationale(): string
    {
        return 'Plan generated based on placement results and progress.';
    }

    /** @return list<Topic> */
    public function listTopics(): array
    {
        return $this->topics;
    }

    public function addTopic(Topic $topic): void
    {
        $this->topics[] = $topic;
    }
}
