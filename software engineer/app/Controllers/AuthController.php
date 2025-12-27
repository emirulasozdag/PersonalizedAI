<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\DB;
use App\Models\AuthToken;
use App\Models\User;
use App\Services\ProgressService;

final class AuthController
{
    public function showLogin(): void
    {
        \view('auth/login');
    }

    public function login(): void
    {
        \require_post_csrf();
        $email = trim((string)($_POST['email'] ?? ''));
        $password = (string)($_POST['password'] ?? '');

        $user = User::findByEmail($email);
        if (!$user || !password_verify($password, $user->password_hash)) {
            \flash('error', 'Invalid credentials.');
            \redirect('/auth/login');
        }

        Auth::login($user);

        // Daily streak tracking (minimal): record login day for students.
        if ($user->role === 'student') {
            (new ProgressService())->recordDailyLogin($user->id);
        }
        $this->redirectToRoleHome($user->role);
    }

    public function logout(): void
    {
        \require_post_csrf();
        Auth::logout();
        \redirect('/');
    }

    public function showRegister(): void
    {
        \view('auth/register');
    }

    public function register(): void
    {
        \require_post_csrf();
        $name = trim((string)($_POST['name'] ?? ''));
        $email = trim((string)($_POST['email'] ?? ''));
        $password = (string)($_POST['password'] ?? '');
        $role = (string)($_POST['role'] ?? 'student');

        if ($name === '' || $email === '' || $password === '') {
            \flash('error', 'All fields are required.');
            \redirect('/auth/register');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            \flash('error', 'Invalid email.');
            \redirect('/auth/register');
        }

        if (!in_array($role, ['student', 'teacher', 'admin'], true)) {
            \flash('error', 'Invalid role.');
            \redirect('/auth/register');
        }

        if (User::findByEmail($email)) {
            \flash('error', 'Email already registered.');
            \redirect('/auth/register');
        }

        $user = User::create($name, $email, $password, $role);
        // For this assignment, keep auth flow simple: auto-verify and log in.
        $user->markEmailVerified();
        Auth::login($user);
        \flash('success', 'Account created. You are now logged in.');
        $this->redirectToRoleHome($user->role);
    }

    public function verifyEmail(): void
    {
        $userId = (int)($_GET['user'] ?? 0);
        $token = (string)($_GET['token'] ?? '');

        $user = $userId > 0 ? User::findById($userId) : null;
        if (!$user) {
            \flash('error', 'Invalid verification request.');
            \redirect('/auth/login');
        }

        if ($user->email_verified_at !== null) {
            \flash('success', 'Email already verified. You can log in.');
            \redirect('/auth/login');
        }

        if (!AuthToken::consume($user->id, 'email_verify', $token)) {
            \flash('error', 'Verification link is invalid or expired.');
            \redirect('/auth/login');
        }

        $user->markEmailVerified();
        \flash('success', 'Email verified. You can log in now.');
        \redirect('/auth/login');
    }

    public function showForgot(): void
    {
        \view('auth/forgot');
    }

    public function sendReset(): void
    {
        \require_post_csrf();
        $email = trim((string)($_POST['email'] ?? ''));
        $user = User::findByEmail($email);

        // Always show generic message (avoid leaking emails).
        if ($user) {
            $token = AuthToken::createPasswordResetToken($user->id);
            $resetLink = \config('app.base_url', '') . '/auth/reset?user=' . $user->id . '&token=' . $token;
            \flash('success', 'Password reset link (demo): ' . $resetLink);
        } else {
            \flash('success', 'If your email exists, a reset link has been sent.');
        }

        \redirect('/auth/forgot');
    }

    public function showReset(): void
    {
        $userId = (int)($_GET['user'] ?? 0);
        $token = (string)($_GET['token'] ?? '');
        \view('auth/reset', ['userId' => $userId, 'token' => $token]);
    }

    public function resetPassword(): void
    {
        \require_post_csrf();
        $userId = (int)($_POST['user_id'] ?? 0);
        $token = (string)($_POST['token'] ?? '');
        $password = (string)($_POST['password'] ?? '');

        if ($password === '') {
            \flash('error', 'Password is required.');
            \redirect('/auth/forgot');
        }

        $user = $userId > 0 ? User::findById($userId) : null;
        if (!$user) {
            \flash('error', 'Invalid reset request.');
            \redirect('/auth/forgot');
        }

        if (!AuthToken::consume($user->id, 'password_reset', $token)) {
            \flash('error', 'Reset link is invalid or expired.');
            \redirect('/auth/forgot');
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = DB::pdo()->prepare('UPDATE users SET password_hash = :hash WHERE id = :id');
        $stmt->execute(['hash' => $hash, 'id' => $user->id]);

        \flash('success', 'Password updated. You can log in.');
        \redirect('/auth/login');
    }

    private function redirectToRoleHome(string $role): void
    {
        if ($role === 'student') {
            \redirect('/student');
        }
        if ($role === 'teacher') {
            \redirect('/teacher');
        }
        if ($role === 'admin') {
            \redirect('/admin');
        }
        \redirect('/');
    }
}
