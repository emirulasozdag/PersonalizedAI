<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Repositories\AssignmentRepository;
use App\Repositories\StudentAssignmentRepository;
use App\Repositories\UserRepository;
use App\Services\ProgressService;

final class AssignmentController
{
    public function studentList(): void
    {
        Auth::requireRole('student');
        $user = Auth::user();
        $items = (new StudentAssignmentRepository())->listForStudent((int)$user['id']);
        \view('assignments/student_list', ['items' => $items]);
    }

    public function studentSubmit(): void
    {
        Auth::requireRole('student');
        \require_post_csrf();
        $user = Auth::user();

        $id = (int)($_POST['student_assignment_id'] ?? 0);
        if ($id > 0) {
            (new StudentAssignmentRepository())->submit($id, (int)$user['id']);
            (new ProgressService())->recordTaskCompletion((int)$user['id'], 'assignment_submitted');
            \flash('success', 'Assignment submitted (demo).');
        }
        \redirect('/student/assignments');
    }

    public function teacherList(): void
    {
        Auth::requireRole('teacher');
        $user = Auth::user();

        $assignments = (new AssignmentRepository())->listByTeacher((int)$user['id']);
        $submissions = (new StudentAssignmentRepository())->listForTeacher((int)$user['id']);
        \view('assignments/teacher_list', ['assignments' => $assignments, 'submissions' => $submissions]);
    }

    public function teacherCreateForm(): void
    {
        Auth::requireRole('teacher');
        $students = (new UserRepository())->listStudents();
        \view('assignments/teacher_create', ['students' => $students]);
    }

    public function teacherCreate(): void
    {
        Auth::requireRole('teacher');
        \require_post_csrf();
        $user = Auth::user();

        $title = trim((string)($_POST['title'] ?? ''));
        $description = trim((string)($_POST['description'] ?? ''));
        $dueDate = trim((string)($_POST['due_date'] ?? ''));
        $type = trim((string)($_POST['assignment_type'] ?? 'HOMEWORK'));
        $studentId = (int)($_POST['student_id'] ?? 0);

        if ($title === '' || $description === '' || $dueDate === '' || $studentId <= 0) {
            \flash('error', 'All fields are required.');
            \redirect('/teacher/assignments/new');
        }

        $aid = (new AssignmentRepository())->create((int)$user['id'], $title, $description, $dueDate, $type);
        (new StudentAssignmentRepository())->assignToStudent($studentId, $aid);

        \flash('success', 'Assignment created and assigned.');
        \redirect('/teacher/assignments');
    }

    public function teacherGrade(): void
    {
        Auth::requireRole('teacher');
        \require_post_csrf();
        $user = Auth::user();

        $saId = (int)($_POST['student_assignment_id'] ?? 0);
        $score = (int)($_POST['score'] ?? 0);
        if ($saId > 0) {
            (new StudentAssignmentRepository())->grade($saId, (int)$user['id'], $score);
            \flash('success', 'Submission graded.');
        }
        \redirect('/teacher/assignments');
    }
}
