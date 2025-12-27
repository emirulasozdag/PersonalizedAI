<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class AnnouncementRepository
{
    public function create(int $teacherId, string $title, string $content): int
    {
        $stmt = DB::pdo()->prepare('INSERT INTO announcements (teacher_id, title, content, created_at) VALUES (:tid, :title, :content, NOW())');
        $stmt->execute(['tid' => $teacherId, 'title' => $title, 'content' => $content]);
        return (int) DB::pdo()->lastInsertId();
    }

    /** @return list<array<string,mixed>> */
    public function listAll(): array
    {
        $stmt = DB::pdo()->query('SELECT a.announcement_id, a.teacher_id, u.name AS teacher_name, a.title, a.content, a.created_at FROM announcements a JOIN users u ON u.id = a.teacher_id ORDER BY a.created_at DESC');
        return $stmt->fetchAll();
    }

    /** @return list<array<string,mixed>> */
    public function listByTeacher(int $teacherId): array
    {
        $stmt = DB::pdo()->prepare('SELECT announcement_id, teacher_id, title, content, created_at FROM announcements WHERE teacher_id = :tid ORDER BY created_at DESC');
        $stmt->execute(['tid' => $teacherId]);
        return $stmt->fetchAll();
    }
}
