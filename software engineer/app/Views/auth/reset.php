<div class="card">
  <h2>Reset Password</h2>
  <form method="post" action="<?= e((string)config('app.base_url','')) ?>/auth/reset">
    <?= csrf_field() ?>
    <input type="hidden" name="user_id" value="<?= e((string)($userId ?? 0)) ?>">
    <input type="hidden" name="token" value="<?= e((string)($token ?? '')) ?>">

    <label>New Password</label>
    <input name="password" type="password" required>

    <div style="margin-top:12px">
      <button class="btn" type="submit">Update Password</button>
    </div>
  </form>
</div>
