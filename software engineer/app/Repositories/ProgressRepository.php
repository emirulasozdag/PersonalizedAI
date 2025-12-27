<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class ProgressRepository
{
    /** @return array<string,mixed> */
    public function getOrCreate(int $studentId): array
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM progress WHERE student_id = :sid LIMIT 1');
        $stmt->execute(['sid' => $studentId]);
        $row = $stmt->fetch();
        if ($row) {
            return $row;
        }

        $ins = DB::pdo()->prepare('INSERT INTO progress (student_id, completion_status, correctness_rate, consistency_rate, last_updated) VALUES (:sid, :status, 0, 0, NOW())');
        $ins->execute([
            'sid' => $studentId,
            'status' => json_encode(['placement_test_completed' => false, 'daily_streak' => 0], JSON_UNESCAPED_UNICODE),
        ]);

        return $this->getOrCreate($studentId);
    }

    public function updateStatus(int $studentId, array $status, float $correctnessRate): void
    {
        $upd = DB::pdo()->prepare('UPDATE progress SET completion_status = :status, correctness_rate = :cr, last_updated = NOW() WHERE student_id = :sid');
        $upd->execute([
            'sid' => $studentId,
            'status' => json_encode($status, JSON_UNESCAPED_UNICODE),
            'cr' => $correctnessRate,
        ]);
    }
}
