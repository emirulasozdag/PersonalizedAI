<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class NotificationRepository
{
    /** @return list<array<string,mixed>> */
    public function listForUser(int $userId): array
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM notifications WHERE user_id = :uid ORDER BY notification_id DESC');
        $stmt->execute(['uid' => $userId]);
        /** @var list<array<string,mixed>> */
        return $stmt->fetchAll();
    }

    public function create(int $userId, string $type, string $title, string $body, ?string $link = null): void
    {
        $stmt = DB::pdo()->prepare('INSERT INTO notifications (user_id, type, title, body, link, is_read, created_at) VALUES (:uid, :type, :title, :body, :link, 0, NOW())');
        $stmt->execute([
            'uid' => $userId,
            'type' => $type,
            'title' => $title,
            'body' => $body,
            'link' => $link,
        ]);
    }

    public function markRead(int $notificationId, int $userId): void
    {
        $stmt = DB::pdo()->prepare('UPDATE notifications SET is_read = 1 WHERE notification_id = :nid AND user_id = :uid');
        $stmt->execute(['nid' => $notificationId, 'uid' => $userId]);
    }

    public function unreadCount(int $userId): int
    {
        $stmt = DB::pdo()->prepare('SELECT COUNT(*) AS c FROM notifications WHERE user_id = :uid AND is_read = 0');
        $stmt->execute(['uid' => $userId]);
        $row = $stmt->fetch();
        return (int)($row['c'] ?? 0);
    }
}
