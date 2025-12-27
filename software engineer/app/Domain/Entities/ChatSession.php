<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class ChatSession
{
    /** @param list<ChatMessage> $messages */
    public function __construct(
        public int $sessionId,
        public int $studentId,
        public string $startedAt,
        public array $messages = []
    ) {}

    public function addMessage(ChatMessage $message): void
    {
        $this->messages[] = $message;
    }

    /** @return list<ChatMessage> */
    public function getMessages(): array
    {
        return $this->messages;
    }
}
