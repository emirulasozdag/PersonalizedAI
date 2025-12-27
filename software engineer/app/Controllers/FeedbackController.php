<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Repositories\FeedbackRepository;
use App\Services\ProgressService;

final class FeedbackController
{
    public function form(): void
    {
        Auth::requireRole('student');
        $user = Auth::user();
        $items = (new FeedbackRepository())->listByStudent((int)$user['id']);
        \view('feedback/form', ['items' => $items]);
    }

    public function submit(): void
    {
        Auth::requireRole('student');
        \require_post_csrf();
        $user = Auth::user();

        $text = trim((string)($_POST['feedback_text'] ?? ''));
        if ($text === '') {
            \flash('error', 'Feedback cannot be empty.');
            \redirect('/student/feedback');
        }

        (new FeedbackRepository())->create((int)$user['id'], $text);
        (new ProgressService())->recordTaskCompletion((int)$user['id'], 'feedback_submitted');
        \flash('success', 'Thanks! Your feedback has been received.');
        \redirect('/student/feedback');
    }
}
