<?php
/** @var int $sessionId */
/** @var list<array<string,mixed>> $messages */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Chatbot</h2>
  <p>Ask a question about lessons or exercises.</p>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student">Back to dashboard</a>
  </div>

  <div class="card" style="margin-top:12px;max-height:380px;overflow:auto">
    <?php if (!$messages): ?>
      <p>No messages yet. Say hi!</p>
    <?php else: ?>
      <?php foreach ($messages as $m): ?>
        <p style="margin:8px 0">
          <strong><?= e((string)($m['sender'] ?? '')) ?>:</strong>
          <?= e((string)($m['content'] ?? '')) ?>
        </p>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>

  <form method="post" action="<?= e($base) ?>/chatbot/send" style="margin-top:12px">
    <?= csrf_field() ?>
    <input type="hidden" name="session_id" value="<?= e((string)$sessionId) ?>">
    <label>Your message</label>
    <input name="message" placeholder="Type your question..." required>
    <div style="margin-top:12px">
      <button class="btn" type="submit">Send</button>
    </div>
  </form>
</div>
