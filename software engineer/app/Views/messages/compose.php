<?php
/** @var list<array{id:int,name:string,email:string,role:string}> $users */
/** @var string $toRole */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Compose Message</h2>
  <p>Send a message to a <?= e($toRole) ?> (demo selection list).</p>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/messages">Back</a>
  </div>

  <form method="post" action="<?= e($base) ?>/messages/send" style="margin-top:12px">
    <?= csrf_field() ?>
    <label>Recipient</label>
    <select name="recipient_id">
      <option value="">-- select --</option>
      <?php foreach ($users as $u): ?>
        <option value="<?= e((string)$u['id']) ?>"><?= e($u['name']) ?> (<?= e($u['email']) ?>)</option>
      <?php endforeach; ?>
    </select>

    <label>Message</label>
    <textarea name="content" rows="5" style="width:100%;padding:10px;border-radius:8px;border:1px solid #cbd5e1"></textarea>

    <div style="margin-top:14px">
      <button class="btn" type="submit">Send</button>
    </div>
  </form>
</div>
