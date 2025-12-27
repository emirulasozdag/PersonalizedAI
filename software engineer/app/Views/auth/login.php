<div class="card">
  <h2>Login</h2>
  <form method="post" action="<?= e((string)config('app.base_url','')) ?>/auth/login">
    <?= csrf_field() ?>
    <label>Email</label>
    <input name="email" type="email" required>

    <label>Password</label>
    <input name="password" type="password" required>

    <div style="margin-top:12px">
      <button class="btn" type="submit">Login</button>
      <a class="btn secondary" href="<?= e((string)config('app.base_url','')) ?>/auth/forgot">Forgot password</a>
      <a class="btn secondary" href="<?= e((string)config('app.base_url','')) ?>/auth/register">Create account</a>
    </div>
  </form>
</div>
