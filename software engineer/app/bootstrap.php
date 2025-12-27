<?php

declare(strict_types=1);

session_start();

require __DIR__ . '/../config/app.php';
require __DIR__ . '/Core/helpers.php';

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/';

    if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
        return;
    }

    $relative = substr($class, strlen($prefix));
    $file = $baseDir . str_replace('\\', '/', $relative) . '.php';

    if (is_file($file)) {
        require $file;
    }
});

// Force UTF-8
header('Content-Type: text/html; charset=utf-8');
