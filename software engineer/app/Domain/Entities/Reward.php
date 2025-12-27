<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class Reward
{
    public function __construct(
        public int $rewardId,
        public string $name,
        public string $description,
        public int $points,
        public string $badgeIcon,
        public ?string $earnedOn = null
    ) {}

    public function awardToStudent(int $studentId): void
    {
        // Persist via repository in later steps.
    }

    public function viewDetails(int $rewardId): array
    {
        return [
            'rewardId' => $this->rewardId,
            'name' => $this->name,
            'description' => $this->description,
            'points' => $this->points,
            'badgeIcon' => $this->badgeIcon,
            'earnedOn' => $this->earnedOn,
        ];
    }
}
