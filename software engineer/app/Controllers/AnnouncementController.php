<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Repositories\AnnouncementRepository;
use App\Services\ProgressService;

final class AnnouncementController
{
    public function list(): void
    {
        $user = Auth::user();
        if (!$user) {
            \redirect('/auth/login');
        }

        $repo = new AnnouncementRepository();
        if ($user['role'] === 'teacher') {
            $items = $repo->listByTeacher((int)$user['id']);
        } else {
            $items = $repo->listAll();
        }

        \view('announcements/list', ['items' => $items]);
    }

    public function createForm(): void
    {
        Auth::requireRole('teacher');
        \view('announcements/create');
    }

    public function create(): void
    {
        Auth::requireRole('teacher');
        \require_post_csrf();
        $user = Auth::user();

        $title = trim((string)($_POST['title'] ?? ''));
        $content = trim((string)($_POST['content'] ?? ''));
        if ($title === '' || $content === '') {
            \flash('error', 'Title and content are required.');
            \redirect('/announcements/new');
        }

        (new AnnouncementRepository())->create((int)$user['id'], $title, $content);
        \flash('success', 'Announcement published.');
        \redirect('/announcements');
    }
}
