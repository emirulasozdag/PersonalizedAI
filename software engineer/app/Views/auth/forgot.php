<div class="card">
  <h2>Forgot Password</h2>
  <form method="post" action="<?= e((string)config('app.base_url','')) ?>/auth/forgot">
    <?= csrf_field() ?>
    <label>Email</label>
    <input name="email" type="email" required>

    <div style="margin-top:12px">
      <button class="btn" type="submit">Send Reset Link</button>
    </div>
  </form>
  <p style="margin-top:12px">Demo mode shows reset link as a flash message.</p>
</div>
