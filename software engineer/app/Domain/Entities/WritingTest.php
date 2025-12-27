<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class WritingTest extends Test
{
    public function __construct(
        int $testId,
        string $title,
        string $description,
        int $duration,
        public string $topic,
        public string $minWords,
        public string $maxWords,
        ?string $createdAt = null
    ) {
        parent::__construct($testId, $title, $description, $duration, $createdAt);
    }

    public function submit(array $answers): int
    {
        // In a real system, this would be evaluated by AI/teacher. Here it's stubbed.
        return $this->calculateScore();
    }

    public function evaluateWriting(string $text): int
    {
        $words = preg_split('/\s+/', trim($text));
        $count = $words && $words[0] !== '' ? count($words) : 0;
        return $count;
    }

    public function calculateScore(): int
    {
        return 0;
    }
}
