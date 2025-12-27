<?php
/** @var list<string> $modules */
/** @var array<string,mixed> $state */

$base = (string) config('app.base_url', '');
$completed = (array)($state['completed'] ?? []);
$scores = (array)($state['scores'] ?? []);
?>

<div class="card">
  <h2>Placement Test</h2>
  <p>Complete all modules to calculate your level and generate your plan.</p>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student">Back to dashboard</a>
    <a class="btn" href="<?= e($base) ?>/student/results">View results</a>
  </div>

  <h3 style="margin-top:18px">Modules</h3>
  <table style="width:100%;border-collapse:collapse">
    <thead>
      <tr>
        <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Module</th>
        <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Status</th>
        <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Score</th>
        <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Action</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($modules as $m):
        $isDone = !empty($completed[$m]);
        $score = $scores[$m] ?? '';
      ?>
        <tr>
          <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e(ucfirst($m)) ?></td>
          <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= $isDone ? 'Completed' : 'Not started' ?></td>
          <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)$score) ?></td>
          <td style="padding:8px;border-bottom:1px solid #f1f5f9">
            <a class="btn secondary" href="<?= e($base) ?>/student/placement/module?name=<?= e($m) ?>">Open</a>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>

  <p style="margin-top:14px;color:#475569">
    Note: Writing/Speaking modules are demo-scored to keep the flow working.
  </p>
</div>
