<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\NotificationRepository;
use App\Repositories\RewardRepository;

final class RewardService
{
    public function __construct(
        private RewardRepository $rewards = new RewardRepository(),
        private NotificationRepository $notifications = new NotificationRepository(),
    ) {
    }

    public function awardByName(int $studentId, string $rewardName): void
    {
        $reward = $this->rewards->findByName($rewardName);
        if (!$reward) {
            return;
        }

        $rewardId = (int)($reward['reward_id'] ?? 0);
        if ($rewardId <= 0) {
            return;
        }

        if ($this->rewards->hasStudentReward($studentId, $rewardId)) {
            return;
        }

        $this->rewards->award($studentId, $rewardId);
        $this->notifications->create(
            $studentId,
            'reward',
            'New reward earned',
            (string)$reward['name'] . ' (+ ' . (string)$reward['points'] . ' points)',
            '/student/progress'
        );
    }
}
