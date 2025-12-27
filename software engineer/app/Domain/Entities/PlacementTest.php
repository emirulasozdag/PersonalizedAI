<?php

declare(strict_types=1);

namespace App\Domain\Entities;

use App\Domain\Enums\LanguageLevel;

final class PlacementTest
{
    public function __construct(
        public int $testId,
        public string $title,
        public string $description,
        public int $duration,
        public TestModule $readingModule,
        public TestModule $writingModule,
        public TestModule $listeningModule,
        public TestModule $speakingModule,
        public ?string $createdAt = null
    ) {}

    public function evaluateLevel(array $moduleScores): LanguageLevel
    {
        // Simple placeholder mapping.
        $sum = array_sum(array_map('intval', $moduleScores));
        if ($sum < 20) return LanguageLevel::A1;
        if ($sum < 40) return LanguageLevel::A2;
        if ($sum < 60) return LanguageLevel::B1;
        if ($sum < 80) return LanguageLevel::B2;
        if ($sum < 100) return LanguageLevel::C1;
        return LanguageLevel::C2;
    }

    public function calculateFinalLevel(array $moduleScores): LanguageLevel
    {
        return $this->evaluateLevel($moduleScores);
    }
}
