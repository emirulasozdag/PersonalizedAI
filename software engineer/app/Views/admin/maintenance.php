<?php
/** @var array<string,mixed>|null $current */
$base = (string) config('app.base_url', '');
$isActive = is_array($current);
?>

<div class="card">
  <h2>Maintenance Mode</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/admin">Back to dashboard</a>
  </div>

  <p style="margin-top:12px"><strong>Status:</strong> <?= $isActive ? 'ACTIVE' : 'OFF' ?></p>
  <?php if ($isActive): ?>
    <p><strong>Reason:</strong> <?= e((string)($current['reason'] ?? '')) ?></p>
    <p><strong>Started:</strong> <?= e((string)($current['start_time'] ?? '')) ?></p>
    <form method="post" action="<?= e($base) ?>/admin/maintenance/stop" style="margin-top:12px">
      <?= csrf_field() ?>
      <button class="btn" type="submit">Stop maintenance</button>
    </form>
  <?php else: ?>
    <form method="post" action="<?= e($base) ?>/admin/maintenance/start" style="margin-top:12px">
      <?= csrf_field() ?>
      <label>Reason</label>
      <input name="reason" placeholder="Scheduled maintenance" required>
      <div style="margin-top:12px">
        <button class="btn" type="submit">Start maintenance</button>
      </div>
    </form>
  <?php endif; ?>
</div>
