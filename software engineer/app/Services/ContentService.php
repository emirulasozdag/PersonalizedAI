<?php

declare(strict_types=1);

namespace App\Services;

use App\Repositories\ContentRepository;

final class ContentService
{
    public function __construct(private ContentRepository $content = new ContentRepository())
    {
    }

    public function generateInitialContent(int $studentId, string $level): void
    {
        $body = "Lesson (demo) for level {$level}:\n- Grammar focus\n- Vocabulary focus\n- Short reading\n";
        $why = "Selected because your placement level is {$level} and the system targets balanced skill improvement.";

        $this->content->createForStudent($studentId, 'LESSON', $level, $body, $why);
    }
}
