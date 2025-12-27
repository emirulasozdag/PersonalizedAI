<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class Announcement
{
    public function __construct(
        public int $announcementId,
        public int $teacherId,
        public string $title,
        public string $content,
        public string $createdAt
    ) {}

    public function publish(): void
    {
        // Persist + notify in later steps.
    }

    /** @return array<string, mixed> */
    public function getRecipients(): array
    {
        return [];
    }
}
