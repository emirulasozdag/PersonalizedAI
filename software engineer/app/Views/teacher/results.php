<?php
/** @var list<array<string,mixed>> $items */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Student Test Results</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/teacher">Back to dashboard</a>
  </div>

  <?php if (!$items): ?>
    <p style="margin-top:12px">No results yet.</p>
  <?php else: ?>
    <table style="width:100%;border-collapse:collapse;margin-top:12px">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Student</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Level</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Score</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Date</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Action</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($items as $r): ?>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['student_name'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['level'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['score'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($r['created_at'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9">
              <a class="btn secondary" href="<?= e($base) ?>/teacher/results/view?id=<?= e((string)($r['result_id'] ?? 0)) ?>">View</a>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
