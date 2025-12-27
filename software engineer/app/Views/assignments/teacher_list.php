<?php
/** @var list<array<string,mixed>> $assignments */
/** @var list<array<string,mixed>> $submissions */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Teacher Assignments</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn" href="<?= e($base) ?>/teacher/assignments/new">Create assignment</a>
    <a class="btn secondary" href="<?= e($base) ?>/teacher">Back to dashboard</a>
  </div>

  <h3 style="margin-top:18px">My assignments</h3>
  <?php if (!$assignments): ?>
    <p>No assignments created yet.</p>
  <?php else: ?>
    <?php foreach ($assignments as $a): ?>
      <div class="card" style="margin-top:10px">
        <p><strong><?= e((string)($a['title'] ?? '')) ?></strong> (<?= e((string)($a['assignment_type'] ?? '')) ?>)</p>
        <p style="color:#475569"><strong>Due:</strong> <?= e((string)($a['due_date'] ?? '')) ?></p>
        <pre style="white-space:pre-wrap;margin:0"><?= e((string)($a['description'] ?? '')) ?></pre>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>

  <h3 style="margin-top:18px">Student submissions</h3>
  <?php if (!$submissions): ?>
    <p>No submissions yet.</p>
  <?php else: ?>
    <?php foreach ($submissions as $s): ?>
      <div class="card" style="margin-top:10px">
        <p><strong>Student:</strong> <?= e((string)($s['student_name'] ?? '')) ?> | <strong>Assignment:</strong> <?= e((string)($s['title'] ?? '')) ?></p>
        <p style="color:#475569"><strong>Status:</strong> <?= e((string)($s['status'] ?? '')) ?> | <strong>Score:</strong> <?= e((string)($s['score'] ?? '0')) ?></p>
        <form method="post" action="<?= e($base) ?>/teacher/assignments/grade" style="margin-top:10px">
          <?= csrf_field() ?>
          <input type="hidden" name="student_assignment_id" value="<?= e((string)($s['student_assignment_id'] ?? '0')) ?>">
          <label>Grade score</label>
          <input name="score" type="number" min="0" max="100" value="<?= e((string)($s['score'] ?? '0')) ?>">
          <button class="btn" type="submit">Grade</button>
        </form>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
