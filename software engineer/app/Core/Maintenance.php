<?php

declare(strict_types=1);

namespace App\Core;

final class Maintenance
{
    public static function isActive(): bool
    {
        try {
            $stmt = DB::pdo()->query('SELECT is_active FROM maintenance_logs WHERE is_active = 1 ORDER BY start_time DESC LIMIT 1');
            $row = $stmt ? $stmt->fetch() : null;
            return (bool)($row['is_active'] ?? false);
        } catch (\Throwable) {
            // If DB is not reachable, do not block the whole app.
            return false;
        }
    }

    public static function start(string $reason): void
    {
        $stmt = DB::pdo()->prepare('INSERT INTO maintenance_logs (start_time, end_time, reason, is_active) VALUES (NOW(), NULL, :reason, 1)');
        $stmt->execute(['reason' => $reason]);
    }

    public static function stop(): void
    {
        $stmt = DB::pdo()->prepare('UPDATE maintenance_logs SET end_time = NOW(), is_active = 0 WHERE is_active = 1');
        $stmt->execute();
    }

    /** @return array<string,mixed>|null */
    public static function current(): ?array
    {
        try {
            $stmt = DB::pdo()->query('SELECT * FROM maintenance_logs WHERE is_active = 1 ORDER BY start_time DESC LIMIT 1');
            $row = $stmt ? $stmt->fetch() : null;
            return $row ?: null;
        } catch (\Throwable) {
            return null;
        }
    }
}
