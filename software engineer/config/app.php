<?php

declare(strict_types=1);

// XAMPP default DB values are typically: host=127.0.0.1, user=root, pass=""
return [
    'app' => [
        'name' => 'Personalized Learning Content',
        'base_url' => '', // e.g. '/myapp' if you deploy under http://localhost/myapp
        'env' => 'local',
        'debug' => true,
    ],
    'db' => [
        'host' => '127.0.0.1',
        'port' => 3306,
        'database' => 'plc',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8mb4',
    ],
    'security' => [
        'password_reset_token_minutes' => 30,
        'email_verify_token_minutes' => 60 * 24,
    ],
];
