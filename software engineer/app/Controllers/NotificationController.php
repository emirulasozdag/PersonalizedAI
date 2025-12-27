<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Repositories\NotificationRepository;

final class NotificationController
{
    public function list(): void
    {
        if (!Auth::check()) {
            \redirect('/auth/login');
        }
        $userId = (int)(Auth::user()['id'] ?? 0);
        $repo = new NotificationRepository();
        $items = $repo->listForUser($userId);
        \view('notifications/list', ['items' => $items]);
    }

    public function markRead(): void
    {
        if (!Auth::check()) {
            \redirect('/auth/login');
        }
        \require_post_csrf();
        $userId = (int)(Auth::user()['id'] ?? 0);
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            (new NotificationRepository())->markRead($id, $userId);
        }
        \redirect('/notifications');
    }
}
