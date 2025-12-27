<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;
use App\Domain\Enums\LanguageLevel;

final class TopicRepository
{
    public function seedDefaultsIfEmpty(): void
    {
        $row = DB::pdo()->query('SELECT COUNT(*) AS c FROM topics')->fetch();
        $count = (int)($row['c'] ?? 0);
        if ($count > 0) {
            return;
        }

        $defaults = [
            ['Present Simple', 'Grammar', 'A1'],
            ['Basic Vocabulary: Daily Life', 'Vocabulary', 'A1'],
            ['Simple Questions & Answers', 'Speaking', 'A1'],

            ['Past Simple', 'Grammar', 'A2'],
            ['Common Phrasal Verbs', 'Vocabulary', 'A2'],
            ['Short Dialog Practice', 'Listening', 'A2'],

            ['B1 Reading Comprehension', 'Reading', 'B1'],
            ['Writing: Emails', 'Writing', 'B1'],
            ['Pronunciation Practice', 'Speaking', 'B1'],

            ['B2 Discussions & Opinions', 'Speaking', 'B2'],
            ['B2 Listening: News', 'Listening', 'B2'],
            ['Advanced Grammar Review', 'Grammar', 'B2'],
        ];

        $ins = DB::pdo()->prepare('INSERT INTO topics (name, category, difficulty) VALUES (:name, :cat, :diff)');
        foreach ($defaults as [$name, $cat, $diff]) {
            $ins->execute(['name' => $name, 'cat' => $cat, 'diff' => $diff]);
        }
    }

    /** @return list<array{topic_id:int,name:string,category:string,difficulty:string}> */
    public function listByLevel(LanguageLevel $level): array
    {
        $this->seedDefaultsIfEmpty();
        $stmt = DB::pdo()->prepare('SELECT topic_id, name, category, difficulty FROM topics WHERE difficulty = :lvl ORDER BY topic_id ASC');
        $stmt->execute(['lvl' => $level->value]);
        /** @var list<array{topic_id:int,name:string,category:string,difficulty:string}> */
        return $stmt->fetchAll();
    }

    /** @return list<array{topic_id:int,name:string,category:string,difficulty:string}> */
    public function listAll(): array
    {
        $this->seedDefaultsIfEmpty();
        $stmt = DB::pdo()->query('SELECT topic_id, name, category, difficulty FROM topics ORDER BY topic_id ASC');
        /** @var list<array{topic_id:int,name:string,category:string,difficulty:string}> */
        return $stmt->fetchAll();
    }
}
