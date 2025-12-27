<?php

declare(strict_types=1);

namespace App\Core;

use App\Models\User;

final class Auth
{
    public static function user(): ?array
    {
        return $_SESSION['user'] ?? null;
    }

    public static function check(): bool
    {
        return isset($_SESSION['user']);
    }

    public static function login(User $user): void
    {
        $_SESSION['user'] = [
            'id' => $user->id,
            'email' => $user->email,
            'role' => $user->role,
            'name' => $user->name,
            'email_verified_at' => $user->email_verified_at,
        ];
    }

    public static function logout(): void
    {
        unset($_SESSION['user']);
    }

    public static function requireRole(string $role): void
    {
        if (!self::check()) {
            \redirect('/auth/login');
        }
        $u = self::user();
        if (($u['role'] ?? null) !== $role) {
            http_response_code(403);
            \view('errors/403');
            exit;
        }
    }
}
