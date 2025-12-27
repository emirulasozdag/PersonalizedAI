<?php
/** @var list<array<string,mixed>> $rows */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>System Performance (Last 10)</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/admin">Back to dashboard</a>
  </div>

  <?php if (!$rows): ?>
    <p style="margin-top:12px">No performance records.</p>
  <?php else: ?>
    <table style="width:100%;border-collapse:collapse;margin-top:12px">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Recorded</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">CPU</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Memory</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Active users</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($rows as $r): ?>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['recorded_at'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['cpu_usage'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['memory_usage'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['active_users'] ?? '')) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
