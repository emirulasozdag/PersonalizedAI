<?php

declare(strict_types=1);

namespace App\Core;

use PDO;
use PDOException;

final class DB
{
    private static ?PDO $pdo = null;

    public static function pdo(): PDO
    {
        if (self::$pdo) {
            return self::$pdo;
        }

        $host = (string) \config('db.host');
        $port = (int) \config('db.port');
        $db = (string) \config('db.database');
        $charset = (string) \config('db.charset', 'utf8mb4');

        $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";

        try {
            self::$pdo = new PDO($dsn, (string) \config('db.username'), (string) \config('db.password'), [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            if ((bool) \config('app.debug', false)) {
                throw $e;
            }
            throw new \RuntimeException('Database connection failed.');
        }

        return self::$pdo;
    }
}
