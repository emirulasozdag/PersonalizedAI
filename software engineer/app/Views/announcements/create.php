<?php
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>New Announcement</h2>
  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/announcements">Back</a>
  </div>

  <form method="post" action="<?= e($base) ?>/announcements/new" style="margin-top:12px">
    <?= csrf_field() ?>

    <label>Title</label>
    <input name="title" placeholder="Announcement title">

    <label>Content</label>
    <textarea name="content" rows="6" style="width:100%;padding:10px;border-radius:8px;border:1px solid #cbd5e1"></textarea>

    <div style="margin-top:14px">
      <button class="btn" type="submit">Publish</button>
    </div>
  </form>
</div>
