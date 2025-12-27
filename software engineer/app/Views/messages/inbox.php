<?php
/** @var list<array<string,mixed>> $inbox */
/** @var list<array<string,mixed>> $outbox */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Messages</h2>
  <div class="row" style="margin-top:12px">
    <a class="btn" href="<?= e($base) ?>/messages/compose">Compose</a>
    <a class="btn secondary" href="<?= e($base) ?>/announcements">Announcements</a>
  </div>

  <h3 style="margin-top:18px">Inbox</h3>
  <?php if (!$inbox): ?>
    <p>No messages.</p>
  <?php else: ?>
    <?php foreach ($inbox as $m): ?>
      <div class="card" style="margin-top:10px">
        <p><strong>From:</strong> <?= e((string)($m['sender_name'] ?? '')) ?> | <strong>Date:</strong> <?= e((string)($m['timestamp'] ?? '')) ?></p>
        <pre style="white-space:pre-wrap;margin:0"><?= e((string)($m['content'] ?? '')) ?></pre>
        <?php if (empty($m['is_read'])): ?>
          <form method="post" action="<?= e($base) ?>/messages/read" style="margin-top:10px">
            <?= csrf_field() ?>
            <input type="hidden" name="message_id" value="<?= e((string)($m['message_id'] ?? '0')) ?>">
            <button class="btn secondary" type="submit">Mark as read</button>
          </form>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>

  <h3 style="margin-top:18px">Outbox</h3>
  <?php if (!$outbox): ?>
    <p>No sent messages.</p>
  <?php else: ?>
    <?php foreach ($outbox as $m): ?>
      <div class="card" style="margin-top:10px">
        <p><strong>To:</strong> <?= e((string)($m['recipient_name'] ?? '')) ?> | <strong>Date:</strong> <?= e((string)($m['timestamp'] ?? '')) ?></p>
        <pre style="white-space:pre-wrap;margin:0"><?= e((string)($m['content'] ?? '')) ?></pre>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
