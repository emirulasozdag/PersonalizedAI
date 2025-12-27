<?php
/** @var list<array<string,mixed>> $items */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>My Assignments</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student">Back to dashboard</a>
  </div>

  <?php if (!$items): ?>
    <p style="margin-top:12px">No assignments yet.</p>
  <?php else: ?>
    <?php foreach ($items as $a): ?>
      <div class="card" style="margin-top:12px">
        <p><strong><?= e((string)($a['title'] ?? '')) ?></strong> (<?= e((string)($a['assignment_type'] ?? '')) ?>)</p>
        <p style="color:#475569"><strong>Due:</strong> <?= e((string)($a['due_date'] ?? '')) ?> | <strong>Status:</strong> <?= e((string)($a['status'] ?? '')) ?></p>
        <pre style="white-space:pre-wrap;margin:0"><?= e((string)($a['description'] ?? '')) ?></pre>

        <?php if (($a['status'] ?? '') === 'PENDING'): ?>
          <form method="post" action="<?= e($base) ?>/student/assignments/submit" style="margin-top:10px">
            <?= csrf_field() ?>
            <input type="hidden" name="student_assignment_id" value="<?= e((string)($a['student_assignment_id'] ?? '0')) ?>">
            <button class="btn" type="submit">Submit (demo)</button>
          </form>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
