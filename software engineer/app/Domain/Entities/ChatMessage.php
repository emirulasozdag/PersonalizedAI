<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class ChatMessage
{
    public function __construct(
        public int $messageId,
        public int $sessionId,
        public string $sender,
        public string $content,
        public string $timestamp
    ) {}
}
