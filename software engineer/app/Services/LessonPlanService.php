<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\LessonPlanRepository;
use App\Repositories\TopicRepository;

final class LessonPlanService
{
    public function __construct(
        private LessonPlanRepository $plans = new LessonPlanRepository(),
        private TopicRepository $topics = new TopicRepository()
    ) {
    }

    /**
     * @param array<string,mixed> $analysis
     */
    public function generateForStudent(int $studentId, string $level, array $analysis): int
    {
        $planId = $this->plans->upsert($studentId, $level);

        // Minimal approach: select topics for given level (or all if empty).
        $topicRows = $this->topics->listAll();
        if ($topicRows) {
            // pick first 3 topics as a simple plan
            $selected = array_slice(array_column($topicRows, 'topic_id'), 0, 3);
            $this->plans->replaceTopics($planId, $selected);
        }

        return $planId;
    }
}
