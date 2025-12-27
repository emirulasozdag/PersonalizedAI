<?php

declare(strict_types=1);

namespace App\Domain\Entities;

use App\Domain\Enums\ContentType;
use App\Domain\Enums\LanguageLevel;

final class Content
{
    public function __construct(
        public int $contentId,
        public int $teacherId,
        public ContentType $type,
        public LanguageLevel $level,
        public string $body,
        public string $createdAt,
        public ?string $updatedAt = null,
        public string $whySelected = ''
    ) {}

    public function generateWhySelected(): string
    {
        return $this->whySelected !== '' ? $this->whySelected : 'Selected based on your current level and recent progress.';
    }

    public function publish(): void
    {
        // Persist and assign to student(s) in later steps.
    }
}
