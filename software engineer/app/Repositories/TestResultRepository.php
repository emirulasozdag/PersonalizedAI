<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class TestResultRepository
{
    public function create(int $studentId, int $testId, int $score, string $level, array $analysis): int
    {
        $stmt = DB::pdo()->prepare('INSERT INTO test_results (student_id, test_id, score, level, analysis, created_at) VALUES (:student_id, :test_id, :score, :level, :analysis, NOW())');
        $stmt->execute([
            'student_id' => $studentId,
            'test_id' => $testId,
            'score' => $score,
            'level' => $level,
            'analysis' => json_encode($analysis, JSON_UNESCAPED_UNICODE),
        ]);
        return (int) DB::pdo()->lastInsertId();
    }

    /** @return list<array<string,mixed>> */
    public function listByStudent(int $studentId): array
    {
        $stmt = DB::pdo()->prepare('SELECT result_id, test_id, score, level, created_at FROM test_results WHERE student_id = :sid ORDER BY created_at DESC');
        $stmt->execute(['sid' => $studentId]);
        return $stmt->fetchAll();
    }

    /** @return array<string,mixed>|null */
    public function findByIdForStudent(int $resultId, int $studentId): ?array
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM test_results WHERE result_id = :rid AND student_id = :sid LIMIT 1');
        $stmt->execute(['rid' => $resultId, 'sid' => $studentId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }
}
