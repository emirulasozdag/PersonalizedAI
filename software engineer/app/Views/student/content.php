<?php
/** @var list<array<string,mixed>> $items */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Recommended Content</h2>
  <p>Each item includes a “why selected” explanation.</p>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student">Back to dashboard</a>
    <a class="btn" href="<?= e($base) ?>/student/plan">View plan</a>
  </div>

  <?php if (!$items): ?>
    <p style="margin-top:12px">No content assigned yet. Complete placement test first.</p>
    <a class="btn" href="<?= e($base) ?>/student/placement" style="margin-top:8px">Go to placement</a>
  <?php else: ?>
    <?php foreach ($items as $c): ?>
      <div class="card" style="margin-top:12px">
        <p><strong>Type:</strong> <?= e((string)($c['type'] ?? '')) ?> | <strong>Level:</strong> <?= e((string)($c['level'] ?? '')) ?></p>
        <p><strong>Assigned:</strong> <?= e((string)($c['created_at'] ?? '')) ?></p>
        <h3 style="margin-top:10px">Why selected</h3>
        <p><?= e((string)($c['why_selected'] ?? '')) ?></p>
        <h3 style="margin-top:10px">Content</h3>
        <pre style="white-space:pre-wrap;margin:0"><?= e((string)($c['body'] ?? '')) ?></pre>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
