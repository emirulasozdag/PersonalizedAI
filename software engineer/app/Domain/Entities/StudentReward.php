<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class StudentReward
{
    public function __construct(
        public int $studentRewardId,
        public int $studentId,
        public int $rewardId,
        public ?string $earnedAt = null
    ) {}

    public function display(): array
    {
        return [
            'studentRewardId' => $this->studentRewardId,
            'studentId' => $this->studentId,
            'rewardId' => $this->rewardId,
            'earnedAt' => $this->earnedAt,
        ];
    }
}
