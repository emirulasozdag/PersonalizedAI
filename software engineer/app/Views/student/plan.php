<?php
/** @var array<string,mixed>|null $plan */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Personalized Lesson Plan</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student">Back to dashboard</a>
    <a class="btn" href="<?= e($base) ?>/student/content">View recommended content</a>
  </div>

  <?php if (!$plan): ?>
    <p style="margin-top:12px">No plan yet. Complete the placement test first.</p>
    <a class="btn" href="<?= e($base) ?>/student/placement" style="margin-top:8px">Go to placement</a>
  <?php else: ?>
    <p style="margin-top:12px"><strong>Level:</strong> <?= e((string)($plan['level'] ?? '')) ?></p>
    <p><strong>Updated:</strong> <?= e((string)($plan['updated_at'] ?? $plan['created_at'] ?? '')) ?></p>

    <h3 style="margin-top:18px">Topics</h3>
    <?php $topics = $plan['topics'] ?? []; ?>
    <?php if (!$topics): ?>
      <p>No topics selected yet (topics table may be empty).</p>
    <?php else: ?>
      <table style="width:100%;border-collapse:collapse;margin-top:10px">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Topic</th>
            <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Category</th>
            <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($topics as $t): ?>
            <tr>
              <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($t['name'] ?? '')) ?></td>
              <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($t['category'] ?? '')) ?></td>
              <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($t['difficulty'] ?? '')) ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  <?php endif; ?>
</div>
