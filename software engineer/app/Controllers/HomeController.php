<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;

final class HomeController
{
    public function index(): void
    {
        $user = Auth::user();
        \view('home', ['user' => $user]);
    }
}
