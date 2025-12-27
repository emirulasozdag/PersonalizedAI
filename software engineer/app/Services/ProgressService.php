<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\ProgressRepository;
use App\Repositories\NotificationRepository;
use App\Services\RewardService;

final class ProgressService
{
    public function __construct(private ProgressRepository $progress = new ProgressRepository())
    {
    }

    public function recordDailyLogin(int $studentId): void
    {
        $row = $this->progress->getOrCreate($studentId);
        $status = json_decode((string)($row['completion_status'] ?? '{}'), true);
        if (!is_array($status)) {
            $status = [];
        }

        $today = date('Y-m-d');
        $status['last_login_date'] = $today;

        if (!isset($status['daily_streak'])) {
            $status['daily_streak'] = 0;
        }

        $this->progress->updateStatus($studentId, $status, (float)($row['correctness_rate'] ?? 0));

        // FR34 inactivity reminder (minimal, in-app).
        $this->maybeCreateInactivityReminder($studentId, $status);
    }

    public function recordTaskCompletion(int $studentId, string $taskKey = 'generic_task'): void
    {
        $row = $this->progress->getOrCreate($studentId);
        $status = json_decode((string)($row['completion_status'] ?? '{}'), true);
        if (!is_array($status)) {
            $status = [];
        }

        $today = date('Y-m-d');
        $yesterday = date('Y-m-d', strtotime('-1 day'));

        $lastTaskDate = (string)($status['last_task_date'] ?? '');
        $dailyStreak = (int)($status['daily_streak'] ?? 0);

        // Only count once per day.
        if ($lastTaskDate !== $today) {
            if ($lastTaskDate === $yesterday) {
                $dailyStreak += 1;
            } else {
                $dailyStreak = 1;
            }
            $status['daily_streak'] = $dailyStreak;
            $status['last_task_date'] = $today;
        }

        $status['last_task_key'] = $taskKey;
        $this->progress->updateStatus($studentId, $status, (float)($row['correctness_rate'] ?? 0));

        // FR24 rewards for streak milestones
        $rewardService = new RewardService();
        if ($dailyStreak >= 3) {
            $rewardService->awardByName($studentId, 'Streak 3');
        }
        if ($dailyStreak >= 7) {
            $rewardService->awardByName($studentId, 'Streak 7');
        }
    }

    public function recordPlacementCompletion(int $studentId, float $correctnessRate): void
    {
        $row = $this->progress->getOrCreate($studentId);
        $status = json_decode((string)($row['completion_status'] ?? '{}'), true);
        if (!is_array($status)) {
            $status = [];
        }

        $status['placement_test_completed'] = true;

        // Placement completion counts as a task for daily streak.
        $today = date('Y-m-d');
        $status['last_task_date'] = $today;
        $status['last_task_key'] = 'placement_test_completed';
        if (!isset($status['daily_streak'])) {
            $status['daily_streak'] = 1;
        }

        $this->progress->updateStatus($studentId, $status, $correctnessRate);

        // FR24 reward for placement completion
        (new RewardService())->awardByName($studentId, 'Placement Completed');
    }

    private function maybeCreateInactivityReminder(int $studentId, array $status): void
    {
        $today = date('Y-m-d');
        $lastTaskDate = (string)($status['last_task_date'] ?? '');
        $remindedOn = (string)($status['last_reminder_date'] ?? '');

        // If already reminded today, skip.
        if ($remindedOn === $today) {
            return;
        }

        // If last task is older than 3 days, create an in-app reminder.
        if ($lastTaskDate !== '') {
            $days = (int)floor((time() - strtotime($lastTaskDate)) / 86400);
            if ($days >= 3) {
                (new NotificationRepository())->create(
                    $studentId,
                    'reminder',
                    'Reminder',
                    'You have not completed any learning task for a while. Continue your plan to keep your streak!',
                    '/student/plan'
                );
                $status['last_reminder_date'] = $today;
                $this->progress->updateStatus($studentId, $status, (float)($this->progress->getOrCreate($studentId)['correctness_rate'] ?? 0));
            }
        }
    }
}
