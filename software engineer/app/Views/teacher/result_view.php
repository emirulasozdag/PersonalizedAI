<?php
/** @var array<string,mixed> $row */
/** @var array<string,mixed> $analysis */
$base = (string) config('app.base_url', '');
$modules = $analysis['modules'] ?? [];
$skillLevels = $analysis['skill_levels'] ?? [];
?>

<div class="card">
  <h2>Student Result Detail</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/teacher/results">Back</a>
  </div>

  <p style="margin-top:12px"><strong>Student:</strong> <?= e((string)($row['student_name'] ?? '')) ?></p>
  <p><strong>Overall level:</strong> <?= e((string)($row['level'] ?? '')) ?></p>
  <p><strong>Score:</strong> <?= e((string)($row['score'] ?? '')) ?></p>

  <?php if (is_array($skillLevels) && $skillLevels): ?>
    <h3 style="margin-top:16px">Strengths / Weaknesses (by skill)</h3>
    <ul style="margin:0;padding-left:18px">
      <?php foreach ($skillLevels as $skill => $lvl): ?>
        <li><?= e(ucfirst((string)$skill)) ?> level: <?= e((string)$lvl) ?></li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <?php if (is_array($modules) && $modules): ?>
    <h3 style="margin-top:16px">Module analysis</h3>
    <pre style="white-space:pre-wrap;margin:0"><?= e(json_encode($modules, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) ?></pre>
  <?php endif; ?>
</div>
