<?php
/** @var array<string,mixed> $row */
/** @var array<string,mixed> $status */

$base = (string) config('app.base_url', '');
$studentId = (int)(\App\Core\Auth::user()['id'] ?? 0);
$dailyStreak = (int)($status['daily_streak'] ?? 0);
$rewards = [];
try {
  $rewards = (new \App\Repositories\RewardRepository())->listEarnedByStudent($studentId);
} catch (\Throwable) {
  $rewards = [];
}
?>

<div class="card">
  <h2>Progress</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student">Back to dashboard</a>
    <a class="btn" href="<?= e($base) ?>/student/export/csv">Export CSV</a>
    <a class="btn" href="<?= e($base) ?>/student/export/pdf">Export PDF</a>
  </div>

  <div style="margin-top:12px">
    <p><strong>Correctness rate:</strong> <?= e((string)($row['correctness_rate'] ?? '0')) ?></p>
    <p><strong>Consistency rate:</strong> <?= e((string)($row['consistency_rate'] ?? '0')) ?></p>
    <p><strong>Daily streak:</strong> <?= e((string)$dailyStreak) ?></p>
    <p><strong>Last updated:</strong> <?= e((string)($row['last_updated'] ?? '')) ?></p>
  </div>

  <h3 style="margin-top:18px">Progress graphs (basic)</h3>
  <?php
    $cr = (float)($row['correctness_rate'] ?? 0);
    $cs = (float)($row['consistency_rate'] ?? 0);
    $crPct = (int)max(0, min(100, round($cr * 100)));
    $csPct = (int)max(0, min(100, round($cs * 100)));
  ?>
  <div class="card" style="margin-top:12px">
    <p style="margin:0"><strong>Correctness</strong> (<?= e((string)$crPct) ?>%)</p>
    <div style="height:10px;background:#e5e7eb;border-radius:999px;overflow:hidden;margin-top:8px">
      <div style="height:10px;width:<?= e((string)$crPct) ?>%;background:#111"></div>
    </div>

    <p style="margin:14px 0 0"><strong>Consistency</strong> (<?= e((string)$csPct) ?>%)</p>
    <div style="height:10px;background:#e5e7eb;border-radius:999px;overflow:hidden;margin-top:8px">
      <div style="height:10px;width:<?= e((string)$csPct) ?>%;background:#111"></div>
    </div>
  </div>

  <h3 style="margin-top:18px">Rewards / Badges</h3>
  <?php if (!$rewards): ?>
    <p>No rewards earned yet.</p>
  <?php else: ?>
    <ul style="margin:0;padding-left:18px">
      <?php foreach ($rewards as $r): ?>
        <li>
          <strong><?= e((string)($r['name'] ?? '')) ?></strong>
          (<?= e((string)($r['points'] ?? '0')) ?> pts)
          - <?= e((string)($r['earned_at'] ?? '')) ?>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <h3 style="margin-top:18px">Completion status</h3>
  <?php if (!$status): ?>
    <p>No status data.</p>
  <?php else: ?>
    <pre style="white-space:pre-wrap;margin:0"><?= e(json_encode($status, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) ?></pre>
  <?php endif; ?>
</div>
