<?php

declare(strict_types=1);

namespace App\Core;

use App\Core\Maintenance;
use App\Core\Auth;

final class Router
{
    /** @var array<string, array<string, string>> */
    private array $routes = [
        'GET' => [],
        'POST' => [],
    ];

    public function get(string $path, string $handler): void
    {
        $this->routes['GET'][$this->normalize($path)] = $handler;
    }

    public function post(string $path, string $handler): void
    {
        $this->routes['POST'][$this->normalize($path)] = $handler;
    }

    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = $_SERVER['REQUEST_URI'] ?? '/';

        $base = (string) \config('app.base_url', '');
        $uriPath = parse_url($uri, PHP_URL_PATH) ?: '/';

        // If app.base_url is configured (or auto-detected by helpers), use it as an explicit mount point.
        if ($base !== '' && str_starts_with($uriPath, $base)) {
            $uriPath = substr($uriPath, strlen($base));
            if ($uriPath === '') {
                $uriPath = '/';
            }
        }

        // Support direct access to /index.php by treating it as '/'.
        if ($uriPath === '/index.php') {
            $uriPath = '/';
        } elseif (str_starts_with($uriPath, '/index.php/')) {
            $uriPath = substr($uriPath, strlen('/index.php'));
        }

        // Otherwise auto-detect mount point from SCRIPT_NAME (works for XAMPP subfolders like /plc/public).
        if ($base === '') {
            $scriptName = (string)($_SERVER['SCRIPT_NAME'] ?? '');
            $scriptDir = rtrim(str_replace('\\', '/', dirname($scriptName)), '/');
            if ($scriptDir !== '' && $scriptDir !== '/' && str_starts_with($uriPath, $scriptDir)) {
                $uriPath = substr($uriPath, strlen($scriptDir));
                if ($uriPath === '') {
                    $uriPath = '/';
                }
            }

            // (index.php stripping handled above)
        }

        $path = $this->normalize($uriPath);

        // Maintenance mode: allow login/register/password reset pages, and allow admins through.
        if (Maintenance::isActive()) {
            $allow = [
                '/',
                '/auth/login', '/auth/register', '/auth/forgot', '/auth/reset', '/auth/verify',
            ];
            $user = Auth::user();
            $isAdmin = is_array($user) && (($user['role'] ?? '') === 'admin');
            if (!$isAdmin && !in_array($path, $allow, true)) {
                http_response_code(503);
                \view('errors/503');
                return;
            }
        }

        $handler = $this->routes[$method][$path] ?? null;

        if (!$handler) {
            http_response_code(404);
            \view('errors/404', ['path' => $path]);
            return;
        }

        [$controllerName, $action] = explode('@', $handler, 2);
        $fqcn = 'App\\Controllers\\' . $controllerName;

        if (!class_exists($fqcn)) {
            http_response_code(500);
            echo 'Controller not found.';
            return;
        }

        $controller = new $fqcn();

        if (!method_exists($controller, $action)) {
            http_response_code(500);
            echo 'Action not found.';
            return;
        }

        $controller->{$action}();
    }

    private function normalize(string $path): string
    {
        $path = '/' . ltrim($path, '/');
        return rtrim($path, '/') ?: '/';
    }
}
