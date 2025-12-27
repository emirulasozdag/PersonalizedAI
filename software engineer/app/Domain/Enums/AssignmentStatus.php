<?php

declare(strict_types=1);

namespace App\Domain\Enums;

enum AssignmentStatus: string
{
    case PENDING = 'PENDING';
    case SUBMITTED = 'SUBMITTED';
    case GRADED = 'GRADED';
    case LATE = 'LATE';
}
