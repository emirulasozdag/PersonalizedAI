<?php
/** @var array<string,mixed> $row */
/** @var array<string,mixed> $analysis */

$base = (string) config('app.base_url', '');
$modules = (array)($analysis['modules'] ?? []);
?>

<div class="card">
  <h2>Result Details</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student/results">Back</a>
    <a class="btn" href="<?= e($base) ?>/student/plan">View plan</a>
    <a class="btn" href="<?= e($base) ?>/student/content">View content</a>
  </div>

  <div style="margin-top:12px">
    <p><strong>Date:</strong> <?= e((string)($row['created_at'] ?? '')) ?></p>
    <p><strong>Score:</strong> <?= e((string)($row['score'] ?? '')) ?></p>
    <p><strong>Level:</strong> <?= e((string)($row['level'] ?? '')) ?></p>

    <?php $skillLevels = $analysis['skill_levels'] ?? null; ?>
    <?php if (is_array($skillLevels) && $skillLevels): ?>
      <h3 style="margin-top:16px">Skill levels</h3>
      <ul style="margin:0;padding-left:18px">
        <?php foreach ($skillLevels as $k => $v): ?>
          <li><?= e(ucfirst((string)$k)) ?>: <?= e((string)$v) ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
  </div>

  <h3 style="margin-top:18px">Module Breakdown</h3>
  <?php if (!$modules): ?>
    <p>No analysis data.</p>
  <?php else: ?>
    <table style="width:100%;border-collapse:collapse;margin-top:10px">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Module</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Score</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Details</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($modules as $name => $detail):
          $detailArr = is_array($detail) ? $detail : [];
          $modScore = $detailArr['score'] ?? '';
          $max = $detailArr['max'] ?? '';
        ?>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e(ucfirst((string)$name)) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)$modScore) ?> / <?= e((string)$max) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9">
              <?= e((string)($detailArr['note'] ?? '')) ?>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
