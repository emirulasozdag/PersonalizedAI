<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class RewardRepository
{
    /** @return array<string,mixed>|null */
    public function findByName(string $name): ?array
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM rewards WHERE name = :n LIMIT 1');
        $stmt->execute(['n' => $name]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function hasStudentReward(int $studentId, int $rewardId): bool
    {
        $stmt = DB::pdo()->prepare('SELECT 1 FROM student_rewards WHERE student_id = :sid AND reward_id = :rid LIMIT 1');
        $stmt->execute(['sid' => $studentId, 'rid' => $rewardId]);
        return (bool)$stmt->fetch();
    }

    public function award(int $studentId, int $rewardId): void
    {
        $stmt = DB::pdo()->prepare('INSERT INTO student_rewards (student_id, reward_id, earned_at) VALUES (:sid, :rid, NOW())');
        $stmt->execute(['sid' => $studentId, 'rid' => $rewardId]);
    }

    /** @return list<array<string,mixed>> */
    public function listEarnedByStudent(int $studentId): array
    {
        $stmt = DB::pdo()->prepare('SELECT sr.student_reward_id, sr.earned_at, r.name, r.description, r.points, r.badge_icon FROM student_rewards sr JOIN rewards r ON r.reward_id = sr.reward_id WHERE sr.student_id = :sid ORDER BY sr.earned_at DESC');
        $stmt->execute(['sid' => $studentId]);
        /** @var list<array<string,mixed>> */
        return $stmt->fetchAll();
    }
}
