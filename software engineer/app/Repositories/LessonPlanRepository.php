<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class LessonPlanRepository
{
    public function upsert(int $studentId, string $level): int
    {
        $stmt = DB::pdo()->prepare('SELECT plan_id FROM lesson_plans WHERE student_id = :sid LIMIT 1');
        $stmt->execute(['sid' => $studentId]);
        $row = $stmt->fetch();

        if ($row) {
            $planId = (int) $row['plan_id'];
            $upd = DB::pdo()->prepare('UPDATE lesson_plans SET level = :lvl, updated_at = NOW() WHERE plan_id = :pid');
            $upd->execute(['lvl' => $level, 'pid' => $planId]);
            return $planId;
        }

        $ins = DB::pdo()->prepare('INSERT INTO lesson_plans (student_id, level, created_at) VALUES (:sid, :lvl, NOW())');
        $ins->execute(['sid' => $studentId, 'lvl' => $level]);
        return (int) DB::pdo()->lastInsertId();
    }

    public function replaceTopics(int $planId, array $topicIds): void
    {
        $del = DB::pdo()->prepare('DELETE FROM lesson_plan_topics WHERE plan_id = :pid');
        $del->execute(['pid' => $planId]);

        if (!$topicIds) {
            return;
        }

        $ins = DB::pdo()->prepare('INSERT INTO lesson_plan_topics (plan_id, topic_id) VALUES (:pid, :tid)');
        foreach ($topicIds as $tid) {
            $ins->execute(['pid' => $planId, 'tid' => (int) $tid]);
        }
    }

    /** @return array<string,mixed>|null */
    public function getForStudent(int $studentId): ?array
    {
        $stmt = DB::pdo()->prepare('SELECT plan_id, student_id, level, created_at, updated_at FROM lesson_plans WHERE student_id = :sid LIMIT 1');
        $stmt->execute(['sid' => $studentId]);
        $plan = $stmt->fetch();
        if (!$plan) {
            return null;
        }

        $topics = DB::pdo()->prepare('SELECT t.topic_id, t.name, t.category, t.difficulty FROM lesson_plan_topics lpt JOIN topics t ON t.topic_id = lpt.topic_id WHERE lpt.plan_id = :pid ORDER BY t.topic_id ASC');
        $topics->execute(['pid' => (int) $plan['plan_id']]);
        $plan['topics'] = $topics->fetchAll();
        return $plan;
    }
}
