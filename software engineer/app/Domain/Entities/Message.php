<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class Message
{
    public function __construct(
        public int $messageId,
        public int $senderId,
        public int $recipientId,
        public string $content,
        public string $timestamp,
        public bool $isRead = false
    ) {}

    public function send(): void
    {
        // Persist via repository.
    }

    public function markAsRead(): void
    {
        $this->isRead = true;
    }
}
