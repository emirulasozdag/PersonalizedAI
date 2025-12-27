<?php
/** @var list<array<string,mixed>> $items */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Feedback</h2>
  <p>Send feedback about content/system (FR23).</p>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student">Back to dashboard</a>
  </div>

  <form method="post" action="<?= e($base) ?>/student/feedback" style="margin-top:12px">
    <?= csrf_field() ?>
    <label>Your feedback</label>
    <textarea name="feedback_text" rows="5" style="width:100%;padding:10px;border-radius:8px;border:1px solid #cbd5e1"></textarea>
    <div style="margin-top:14px">
      <button class="btn" type="submit">Submit</button>
    </div>
  </form>

  <h3 style="margin-top:18px">Your previous feedback</h3>
  <?php if (!$items): ?>
    <p>No feedback submitted yet.</p>
  <?php else: ?>
    <?php foreach ($items as $f): ?>
      <div class="card" style="margin-top:10px">
        <p style="color:#475569"><strong>Date:</strong> <?= e((string)($f['submitted_at'] ?? '')) ?></p>
        <pre style="white-space:pre-wrap;margin:0"><?= e((string)($f['feedback_text'] ?? '')) ?></pre>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
