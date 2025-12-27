<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class ContentRepository
{
    public function createForStudent(int $studentId, string $type, string $level, string $body, string $whySelected): int
    {
        $stmt = DB::pdo()->prepare('INSERT INTO content (teacher_id, type, level, body, created_at, why_selected) VALUES (NULL, :type, :level, :body, NOW(), :why)');
        $stmt->execute([
            'type' => $type,
            'level' => $level,
            'body' => $body,
            'why' => $whySelected,
        ]);
        $contentId = (int) DB::pdo()->lastInsertId();

        $link = DB::pdo()->prepare('INSERT INTO student_content (student_id, content_id, assigned_at) VALUES (:sid, :cid, NOW())');
        $link->execute(['sid' => $studentId, 'cid' => $contentId]);

        return $contentId;
    }

    /** @return list<array<string,mixed>> */
    public function listForStudent(int $studentId): array
    {
        $stmt = DB::pdo()->prepare('SELECT c.content_id, c.type, c.level, c.body, c.why_selected, c.created_at FROM student_content sc JOIN content c ON c.content_id = sc.content_id WHERE sc.student_id = :sid ORDER BY c.created_at DESC');
        $stmt->execute(['sid' => $studentId]);
        return $stmt->fetchAll();
    }
}
