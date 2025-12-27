<?php

declare(strict_types=1);

namespace App\Models;

use App\Core\DB;

final class AuthToken
{
    public static function createEmailVerifyToken(int $userId): string
    {
        $token = bin2hex(random_bytes(32));
        $hash = hash('sha256', $token);

        $stmt = DB::pdo()->prepare('INSERT INTO auth_tokens (user_id, type, token_hash, expires_at, created_at) VALUES (:user_id, :type, :token_hash, DATE_ADD(NOW(), INTERVAL :minutes MINUTE), NOW())');
        $stmt->execute([
            'user_id' => $userId,
            'type' => 'email_verify',
            'token_hash' => $hash,
            'minutes' => (int) \config('security.email_verify_token_minutes', 1440),
        ]);

        return $token;
    }

    public static function createPasswordResetToken(int $userId): string
    {
        $token = bin2hex(random_bytes(32));
        $hash = hash('sha256', $token);

        $stmt = DB::pdo()->prepare('INSERT INTO auth_tokens (user_id, type, token_hash, expires_at, created_at) VALUES (:user_id, :type, :token_hash, DATE_ADD(NOW(), INTERVAL :minutes MINUTE), NOW())');
        $stmt->execute([
            'user_id' => $userId,
            'type' => 'password_reset',
            'token_hash' => $hash,
            'minutes' => (int) \config('security.password_reset_token_minutes', 30),
        ]);

        return $token;
    }

    public static function consume(int $userId, string $type, string $token): bool
    {
        $hash = hash('sha256', $token);

        $pdo = DB::pdo();
        $pdo->beginTransaction();
        try {
            $stmt = $pdo->prepare('SELECT id FROM auth_tokens WHERE user_id = :user_id AND type = :type AND token_hash = :token_hash AND expires_at > NOW() LIMIT 1');
            $stmt->execute([
                'user_id' => $userId,
                'type' => $type,
                'token_hash' => $hash,
            ]);
            $row = $stmt->fetch();
            if (!$row) {
                $pdo->rollBack();
                return false;
            }

            $del = $pdo->prepare('DELETE FROM auth_tokens WHERE id = :id');
            $del->execute(['id' => (int) $row['id']]);

            $pdo->commit();
            return true;
        } catch (\Throwable $e) {
            $pdo->rollBack();
            throw $e;
        }
    }
}
