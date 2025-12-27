<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\DB;
use App\Core\Maintenance;
use App\Repositories\UserRepository;

final class AdminController
{
    public function dashboard(): void
    {
        Auth::requireRole('admin');
        \view('dashboards/admin', ['user' => Auth::user()]);
    }

    public function users(): void
    {
        Auth::requireRole('admin');
        $items = (new UserRepository())->listAll();
        \view('admin/users', ['items' => $items]);
    }

    public function updateUserRole(): void
    {
        Auth::requireRole('admin');
        \require_post_csrf();

        $userId = (int)($_POST['user_id'] ?? 0);
        $role = (string)($_POST['role'] ?? '');
        if ($userId <= 0) {
            \flash('error', 'Invalid user.');
            \redirect('/admin/users');
        }

        try {
            (new UserRepository())->updateRole($userId, $role);
            \flash('success', 'User role updated.');
        } catch (\Throwable $e) {
            \flash('error', 'Role update failed.');
        }

        \redirect('/admin/users');
    }

    public function maintenance(): void
    {
        Auth::requireRole('admin');
        $current = Maintenance::current();
        \view('admin/maintenance', ['current' => $current]);
    }

    public function startMaintenance(): void
    {
        Auth::requireRole('admin');
        \require_post_csrf();
        $reason = trim((string)($_POST['reason'] ?? 'Scheduled maintenance'));
        Maintenance::start($reason);
        \flash('success', 'Maintenance mode enabled.');
        \redirect('/admin/maintenance');
    }

    public function stopMaintenance(): void
    {
        Auth::requireRole('admin');
        \require_post_csrf();
        Maintenance::stop();
        \flash('success', 'Maintenance mode disabled.');
        \redirect('/admin/maintenance');
    }

    public function performance(): void
    {
        Auth::requireRole('admin');

        // Minimal performance snapshot (FR30): store basic server-side metrics.
        $cpu = 'n/a';
        $mem = (string)round(memory_get_usage(true) / 1024 / 1024, 2) . ' MB';
        $activeUsers = 'n/a';
        $stats = [
            'php_version' => PHP_VERSION,
            'time' => date('c'),
        ];

        $stmt = DB::pdo()->prepare('INSERT INTO system_performance (cpu_usage, memory_usage, active_users, statistics, recorded_at) VALUES (:cpu, :mem, :au, :st, NOW())');
        $stmt->execute([
            'cpu' => $cpu,
            'mem' => $mem,
            'au' => $activeUsers,
            'st' => json_encode($stats, JSON_UNESCAPED_UNICODE),
        ]);

        $rows = DB::pdo()->query('SELECT * FROM system_performance ORDER BY performance_id DESC LIMIT 10')->fetchAll();
        \view('admin/performance', ['rows' => $rows]);
    }
}
