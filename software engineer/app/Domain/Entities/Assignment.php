<?php

declare(strict_types=1);

namespace App\Domain\Entities;

use App\Domain\Enums\AssignmentStatus;

final class Assignment
{
    public function __construct(
        public int $assignmentId,
        public int $teacherId,
        public string $title,
        public string $description,
        public string $dueDate,
        public string $assignmentType,
        public ?string $createdAt = null
    ) {}

    public function updateDueDate(string $newDueDate): void
    {
        $this->dueDate = $newDueDate;
    }

    public function updateDescription(string $newDescription): void
    {
        $this->description = $newDescription;
    }
}
