<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class ChatRepository
{
    public function startSession(int $studentId): int
    {
        $stmt = DB::pdo()->prepare('INSERT INTO chat_sessions (student_id, started_at) VALUES (:sid, NOW())');
        $stmt->execute(['sid' => $studentId]);
        return (int)DB::pdo()->lastInsertId();
    }

    /** @return array<string,mixed>|null */
    public function findLatestSession(int $studentId): ?array
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM chat_sessions WHERE student_id = :sid ORDER BY session_id DESC LIMIT 1');
        $stmt->execute(['sid' => $studentId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /** @return list<array<string,mixed>> */
    public function listMessages(int $sessionId): array
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM chat_messages WHERE session_id = :sid ORDER BY message_id ASC');
        $stmt->execute(['sid' => $sessionId]);
        /** @var list<array<string,mixed>> */
        return $stmt->fetchAll();
    }

    public function addMessage(int $sessionId, string $sender, string $content): void
    {
        $sender = $sender === 'bot' ? 'bot' : 'student';
        $stmt = DB::pdo()->prepare('INSERT INTO chat_messages (session_id, sender, content, timestamp) VALUES (:sid, :sender, :content, NOW())');
        $stmt->execute(['sid' => $sessionId, 'sender' => $sender, 'content' => $content]);
    }
}
