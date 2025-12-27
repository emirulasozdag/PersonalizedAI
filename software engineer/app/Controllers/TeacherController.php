<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;

final class TeacherController
{
    public function dashboard(): void
    {
        Auth::requireRole('teacher');
        \view('dashboards/teacher', ['user' => Auth::user()]);
    }
}
