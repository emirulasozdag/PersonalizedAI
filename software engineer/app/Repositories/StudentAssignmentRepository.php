<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class StudentAssignmentRepository
{
    public function assignToStudent(int $studentId, int $assignmentId): int
    {
        $stmt = DB::pdo()->prepare("INSERT INTO student_assignments (student_id, assignment_id, status, submitted_at, graded_at, score) VALUES (:sid, :aid, 'PENDING', NOW(), NULL, 0)");
        $stmt->execute(['sid' => $studentId, 'aid' => $assignmentId]);
        return (int) DB::pdo()->lastInsertId();
    }

    /** @return list<array<string,mixed>> */
    public function listForStudent(int $studentId): array
    {
        $stmt = DB::pdo()->prepare('SELECT sa.student_assignment_id, sa.assignment_id, sa.status, sa.submitted_at, sa.graded_at, sa.score, a.title, a.description, a.due_date, a.assignment_type FROM student_assignments sa JOIN assignments a ON a.assignment_id = sa.assignment_id WHERE sa.student_id = :sid ORDER BY a.due_date ASC');
        $stmt->execute(['sid' => $studentId]);
        return $stmt->fetchAll();
    }

    /** @return list<array<string,mixed>> */
    public function listForTeacher(int $teacherId): array
    {
        $stmt = DB::pdo()->prepare("SELECT sa.student_assignment_id, sa.student_id, u.name AS student_name, sa.assignment_id, sa.status, sa.submitted_at, sa.graded_at, sa.score, a.title, a.due_date FROM student_assignments sa JOIN assignments a ON a.assignment_id = sa.assignment_id JOIN users u ON u.id = sa.student_id WHERE a.teacher_id = :tid ORDER BY sa.submitted_at DESC");
        $stmt->execute(['tid' => $teacherId]);
        return $stmt->fetchAll();
    }

    public function submit(int $studentAssignmentId, int $studentId): void
    {
        $stmt = DB::pdo()->prepare("UPDATE student_assignments SET status = 'SUBMITTED', submitted_at = NOW() WHERE student_assignment_id = :said AND student_id = :sid");
        $stmt->execute(['said' => $studentAssignmentId, 'sid' => $studentId]);
    }

    public function grade(int $studentAssignmentId, int $teacherId, int $score): void
    {
        $stmt = DB::pdo()->prepare("UPDATE student_assignments sa JOIN assignments a ON a.assignment_id = sa.assignment_id SET sa.status = 'GRADED', sa.score = :score, sa.graded_at = NOW() WHERE sa.student_assignment_id = :said AND a.teacher_id = :tid");
        $stmt->execute(['score' => $score, 'said' => $studentAssignmentId, 'tid' => $teacherId]);
    }
}
