<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class AssignmentRepository
{
    public function create(int $teacherId, string $title, string $description, string $dueDate, string $assignmentType): int
    {
        $stmt = DB::pdo()->prepare('INSERT INTO assignments (teacher_id, title, description, due_date, assignment_type, created_at) VALUES (:tid, :title, :desc, :due, :type, NOW())');
        $stmt->execute([
            'tid' => $teacherId,
            'title' => $title,
            'desc' => $description,
            'due' => $dueDate,
            'type' => $assignmentType,
        ]);
        return (int) DB::pdo()->lastInsertId();
    }

    /** @return list<array<string,mixed>> */
    public function listByTeacher(int $teacherId): array
    {
        $stmt = DB::pdo()->prepare('SELECT assignment_id, title, description, due_date, assignment_type, created_at FROM assignments WHERE teacher_id = :tid ORDER BY created_at DESC');
        $stmt->execute(['tid' => $teacherId]);
        return $stmt->fetchAll();
    }

    /** @return array<string,mixed>|null */
    public function findById(int $assignmentId): ?array
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM assignments WHERE assignment_id = :aid LIMIT 1');
        $stmt->execute(['aid' => $assignmentId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }
}
