<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Repositories\ContentDirectiveRepository;
use App\Repositories\NotificationRepository;
use App\Repositories\UserRepository;

final class DirectiveController
{
    public function teacherList(): void
    {
        Auth::requireRole('teacher');
        $teacherId = (int)(Auth::user()['id'] ?? 0);
        $items = (new ContentDirectiveRepository())->listByTeacher($teacherId);
        $students = (new UserRepository())->listStudents();
        \view('teacher/directives', ['items' => $items, 'students' => $students]);
    }

    public function teacherCreate(): void
    {
        Auth::requireRole('teacher');
        \require_post_csrf();

        $teacherId = (int)(Auth::user()['id'] ?? 0);
        $studentIdRaw = (string)($_POST['student_id'] ?? '');
        $studentId = $studentIdRaw === '' ? null : (int)$studentIdRaw;
        $title = trim((string)($_POST['title'] ?? ''));
        $text = trim((string)($_POST['directive_text'] ?? ''));

        if ($title === '' || $text === '') {
            \flash('error', 'Title and directive text are required.');
            \redirect('/teacher/directives');
        }

        (new ContentDirectiveRepository())->create($teacherId, ($studentId && $studentId > 0) ? $studentId : null, $title, $text);

        // Notify student (in-app) if selected.
        if ($studentId && $studentId > 0) {
            (new NotificationRepository())->create(
                $studentId,
                'directive',
                'Teacher directive',
                'A teacher created a learning directive for you: ' . $title,
                '/student/plan'
            );
        }

        \flash('success', 'Directive saved.');
        \redirect('/teacher/directives');
    }
}
