<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class ContentDirectiveRepository
{
    /** @return list<array<string,mixed>> */
    public function listByTeacher(int $teacherId): array
    {
        $stmt = DB::pdo()->prepare('SELECT cd.*, u.name AS student_name FROM content_directives cd LEFT JOIN users u ON u.id = cd.student_id WHERE cd.teacher_id = :tid ORDER BY cd.directive_id DESC');
        $stmt->execute(['tid' => $teacherId]);
        /** @var list<array<string,mixed>> */
        return $stmt->fetchAll();
    }

    public function create(int $teacherId, ?int $studentId, string $title, string $text): void
    {
        $stmt = DB::pdo()->prepare('INSERT INTO content_directives (teacher_id, student_id, title, directive_text, created_at) VALUES (:tid, :sid, :title, :txt, NOW())');
        $stmt->execute([
            'tid' => $teacherId,
            'sid' => $studentId,
            'title' => $title,
            'txt' => $text,
        ]);
    }
}
