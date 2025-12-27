<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class MessageRepository
{
    public function send(int $senderId, int $recipientId, string $content): int
    {
        $stmt = DB::pdo()->prepare('INSERT INTO messages (sender_id, recipient_id, content, timestamp, is_read) VALUES (:sid, :rid, :content, NOW(), 0)');
        $stmt->execute(['sid' => $senderId, 'rid' => $recipientId, 'content' => $content]);
        return (int) DB::pdo()->lastInsertId();
    }

    /** @return list<array<string,mixed>> */
    public function inbox(int $userId): array
    {
        $stmt = DB::pdo()->prepare('SELECT m.message_id, m.sender_id, u.name AS sender_name, m.content, m.timestamp, m.is_read FROM messages m JOIN users u ON u.id = m.sender_id WHERE m.recipient_id = :uid ORDER BY m.timestamp DESC');
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll();
    }

    /** @return list<array<string,mixed>> */
    public function outbox(int $userId): array
    {
        $stmt = DB::pdo()->prepare('SELECT m.message_id, m.recipient_id, u.name AS recipient_name, m.content, m.timestamp, m.is_read FROM messages m JOIN users u ON u.id = m.recipient_id WHERE m.sender_id = :uid ORDER BY m.timestamp DESC');
        $stmt->execute(['uid' => $userId]);
        return $stmt->fetchAll();
    }

    public function markRead(int $messageId, int $recipientId): void
    {
        $stmt = DB::pdo()->prepare('UPDATE messages SET is_read = 1 WHERE message_id = :mid AND recipient_id = :rid');
        $stmt->execute(['mid' => $messageId, 'rid' => $recipientId]);
    }
}
