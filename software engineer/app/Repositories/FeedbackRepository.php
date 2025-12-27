<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class FeedbackRepository
{
    public function create(int $studentId, string $text): int
    {
        $stmt = DB::pdo()->prepare('INSERT INTO feedback (student_id, feedback_text, submitted_at) VALUES (:sid, :txt, NOW())');
        $stmt->execute(['sid' => $studentId, 'txt' => $text]);
        return (int) DB::pdo()->lastInsertId();
    }

    /** @return list<array<string,mixed>> */
    public function listByStudent(int $studentId): array
    {
        $stmt = DB::pdo()->prepare('SELECT feedback_id, feedback_text, submitted_at FROM feedback WHERE student_id = :sid ORDER BY submitted_at DESC');
        $stmt->execute(['sid' => $studentId]);
        return $stmt->fetchAll();
    }

    /** @return list<array<string,mixed>> */
    public function listAll(): array
    {
        $stmt = DB::pdo()->query('SELECT f.feedback_id, f.student_id, u.name AS student_name, f.feedback_text, f.submitted_at FROM feedback f JOIN users u ON u.id = f.student_id ORDER BY f.submitted_at DESC');
        return $stmt->fetchAll();
    }
}
