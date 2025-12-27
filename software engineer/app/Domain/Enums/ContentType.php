<?php

declare(strict_types=1);

namespace App\Domain\Enums;

enum ContentType: string
{
    case LESSON = 'LESSON';
    case EXERCISE = 'EXERCISE';
    case ROLEPLAY = 'ROLEPLAY';
    case VOCABULARY = 'VOCABULARY';
    case GRAMMAR = 'GRAMMAR';
}
