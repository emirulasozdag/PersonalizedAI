<?php

declare(strict_types=1);

namespace App\Domain\Entities;

use App\Domain\Enums\AssignmentStatus;

final class StudentAssignment
{
    public function __construct(
        public int $studentAssignmentId,
        public int $studentId,
        public int $assignmentId,
        public AssignmentStatus $status,
        public string $submittedAt,
        public ?string $gradedAt = null,
        public int $score = 0
    ) {}

    public function submit(): void
    {
        $this->status = AssignmentStatus::SUBMITTED;
        $this->submittedAt = date('Y-m-d H:i:s');
    }

    public function grade(int $score): void
    {
        $this->status = AssignmentStatus::GRADED;
        $this->score = $score;
        $this->gradedAt = date('Y-m-d H:i:s');
    }

    public function display(): array
    {
        return [
            'studentAssignmentId' => $this->studentAssignmentId,
            'studentId' => $this->studentId,
            'assignmentId' => $this->assignmentId,
            'status' => $this->status->value,
            'submittedAt' => $this->submittedAt,
            'gradedAt' => $this->gradedAt,
            'score' => $this->score,
        ];
    }

    public function gradeScore(): int
    {
        return $this->score;
    }
}
