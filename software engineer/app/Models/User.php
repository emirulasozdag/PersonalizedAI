<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\DB;

final class User
{
    public int $id;
    public string $name;
    public string $email;
    public string $role; // student|teacher|admin
    public string $password_hash;
    public ?string $email_verified_at;
    public ?string $created_at = null;

    public static function findByEmail(string $email): ?self
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $row = $stmt->fetch();
        return $row ? self::fromRow($row) : null;
    }

    public static function findById(int $id): ?self
    {
        $stmt = DB::pdo()->prepare('SELECT * FROM users WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ? self::fromRow($row) : null;
    }

    public static function create(string $name, string $email, string $password, string $role): self
    {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = DB::pdo()->prepare('INSERT INTO users (name, email, role, password_hash, email_verified_at, created_at) VALUES (:name, :email, :role, :password_hash, NULL, NOW())');
        $stmt->execute([
            'name' => $name,
            'email' => $email,
            'role' => $role,
            'password_hash' => $hash,
        ]);

        $id = (int) DB::pdo()->lastInsertId();
        $user = self::findById($id);
        if (!$user) {
            throw new \RuntimeException('Failed to create user.');
        }
        return $user;
    }

    public function register(): void
    {
        // Registration flow is handled by AuthController in this scaffold.
    }

    public function login(): void
    {
        // Login flow is handled by AuthController in this scaffold.
    }

    public function logout(): void
    {
        // Logout flow is handled by AuthController in this scaffold.
    }

    public function verifyEmail(string $token): void
    {
        // Token consumption handled by AuthToken model.
    }

    public function resetPassword(string $newPassword): void
    {
        // Password reset handled by AuthController.
    }

    public function updateProfile(): void
    {
        // Profile update will be implemented in later steps.
    }

    public function markEmailVerified(): void
    {
        $stmt = DB::pdo()->prepare('UPDATE users SET email_verified_at = NOW() WHERE id = :id');
        $stmt->execute(['id' => $this->id]);
        $this->email_verified_at = date('Y-m-d H:i:s');
    }

    /** @param array<string, mixed> $row */
    private static function fromRow(array $row): self
    {
        $u = new self();
        $u->id = (int) $row['id'];
        $u->name = (string) $row['name'];
        $u->email = (string) $row['email'];
        $u->role = (string) $row['role'];
        $u->password_hash = (string) $row['password_hash'];
        $u->email_verified_at = $row['email_verified_at'] !== null ? (string) $row['email_verified_at'] : null;
        $u->created_at = $row['created_at'] !== null ? (string) $row['created_at'] : null;
        return $u;
    }
}
