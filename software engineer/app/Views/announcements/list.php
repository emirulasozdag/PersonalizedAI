<?php
/** @var list<array<string,mixed>> $items */
$base = (string) config('app.base_url', '');
$user = \App\Core\Auth::user();
?>

<div class="card">
  <h2>Announcements</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/messages">Messages</a>
    <?php if ($user && ($user['role'] ?? '') === 'teacher'): ?>
      <a class="btn" href="<?= e($base) ?>/announcements/new">New announcement</a>
    <?php endif; ?>
  </div>

  <?php if (!$items): ?>
    <p style="margin-top:12px">No announcements yet.</p>
  <?php else: ?>
    <?php foreach ($items as $a): ?>
      <div class="card" style="margin-top:12px">
        <p><strong>Title:</strong> <?= e((string)($a['title'] ?? '')) ?></p>
        <p style="color:#475569"><strong>Date:</strong> <?= e((string)($a['created_at'] ?? '')) ?><?php if (isset($a['teacher_name'])): ?> | <strong>By:</strong> <?= e((string)$a['teacher_name']) ?><?php endif; ?></p>
        <pre style="white-space:pre-wrap;margin:0"><?= e((string)($a['content'] ?? '')) ?></pre>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
