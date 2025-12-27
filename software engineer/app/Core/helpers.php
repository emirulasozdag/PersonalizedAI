<?php

declare(strict_types=1);

function config(string $key, mixed $default = null): mixed
{
    static $cfg;
    if ($cfg === null) {
        $cfg = require __DIR__ . '/../../config/app.php';
    }

    $parts = explode('.', $key);
    $value = $cfg;
    foreach ($parts as $part) {
        if (!is_array($value) || !array_key_exists($part, $value)) {
            return $default;
        }
        $value = $value[$part];
    }

    // Auto-detect base_url when empty, so the app works from subfolders like /plc/public.
    if ($key === 'app.base_url' && is_string($value) && $value === '') {
        $scriptName = (string)($_SERVER['SCRIPT_NAME'] ?? '');
        $dir = str_replace('\\', '/', dirname($scriptName));
        $dir = rtrim($dir, '/');
        if ($dir === '' || $dir === '.' || $dir === '/') {
            return '';
        }
        return $dir;
    }
    return $value;
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function redirect(string $path): never
{
    $base = (string) config('app.base_url', '');
    header('Location: ' . $base . $path);
    exit;
}

function view(string $name, array $data = []): void
{
    extract($data);
    $base = __DIR__ . '/../Views/';
    require $base . 'layout/header.php';
    require $base . $name . '.php';
    require $base . 'layout/footer.php';
}

function flash(string $key, ?string $value = null): ?string
{
    if ($value !== null) {
        $_SESSION['_flash'][$key] = $value;
        return null;
    }

    $val = $_SESSION['_flash'][$key] ?? null;
    unset($_SESSION['_flash'][$key]);
    return $val;
}

function csrf_token(): string
{
    if (!isset($_SESSION['_csrf'])) {
        $_SESSION['_csrf'] = bin2hex(random_bytes(32));
    }
    return (string) $_SESSION['_csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="_csrf" value="' . e(csrf_token()) . '">';
}

function require_post_csrf(): void
{
    $token = (string)($_POST['_csrf'] ?? '');
    if ($token === '' || !hash_equals(csrf_token(), $token)) {
        http_response_code(400);
        \flash('error', 'Invalid request. Please try again.');
        \redirect('/');
    }
}
