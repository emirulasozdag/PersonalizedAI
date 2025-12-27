<?php

declare(strict_types=1);

namespace App\Domain\Entities;

use App\Domain\Enums\LanguageLevel;

final class Topic
{
    public function __construct(
        public int $topicId,
        public string $name,
        public string $category,
        public LanguageLevel $difficulty
    ) {}

    /** @return list<Exercise> */
    public function listExercises(): array
    {
        // Exercises are fetched from repositories in this project scaffold.
        return [];
    }
}
