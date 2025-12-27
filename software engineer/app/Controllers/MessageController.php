<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Repositories\MessageRepository;
use App\Repositories\UserRepository;
use App\Services\ProgressService;

final class MessageController
{
    public function inbox(): void
    {
        $user = Auth::user();
        if (!$user) {
            \redirect('/auth/login');
        }

        $repo = new MessageRepository();
        \view('messages/inbox', [
            'inbox' => $repo->inbox((int)$user['id']),
            'outbox' => $repo->outbox((int)$user['id']),
        ]);
    }

    public function compose(): void
    {
        $user = Auth::user();
        if (!$user) {
            \redirect('/auth/login');
        }

        $toRole = (string)($_GET['toRole'] ?? ($user['role'] === 'teacher' ? 'student' : 'teacher'));
        if (!in_array($toRole, ['student', 'teacher'], true)) {
            $toRole = 'teacher';
        }

        $users = $toRole === 'student' ? (new UserRepository())->listStudents() : (new UserRepository())->listTeachers();
        \view('messages/compose', ['users' => $users, 'toRole' => $toRole]);
    }

    public function send(): void
    {
        $user = Auth::user();
        if (!$user) {
            \redirect('/auth/login');
        }
        \require_post_csrf();

        $recipientId = (int)($_POST['recipient_id'] ?? 0);
        $content = trim((string)($_POST['content'] ?? ''));
        if ($recipientId <= 0 || $content === '') {
            \flash('error', 'Recipient and message are required.');
            \redirect('/messages/compose');
        }

        (new MessageRepository())->send((int)$user['id'], $recipientId, $content);
        // Sending a message counts as a daily task.
        if ($user['role'] === 'student') {
            (new ProgressService())->recordTaskCompletion((int)$user['id'], 'message_sent');
        }

        \flash('success', 'Message sent.');
        \redirect('/messages');
    }

    public function markRead(): void
    {
        $user = Auth::user();
        if (!$user) {
            \redirect('/auth/login');
        }
        \require_post_csrf();

        $id = (int)($_POST['message_id'] ?? 0);
        if ($id > 0) {
            (new MessageRepository())->markRead($id, (int)$user['id']);
        }
        \redirect('/messages');
    }
}
