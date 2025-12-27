<div class="card">
  <h1>Welcome</h1>
  <p>This is the XAMPP-ready PHP MVC scaffold for the Personalized Learning Content project.</p>
  <?php if (!$user): ?>
    <p>Please register and verify email (demo link will be shown) to log in.</p>
  <?php else: ?>
    <p>Go to your dashboard:</p>
    <div class="row">
      <?php if (($user['role'] ?? '') === 'student'): ?>
        <a class="btn" href="<?= e((string)config('app.base_url','')) ?>/student">Student Dashboard</a>
      <?php endif; ?>
      <?php if (($user['role'] ?? '') === 'teacher'): ?>
        <a class="btn" href="<?= e((string)config('app.base_url','')) ?>/teacher">Teacher Dashboard</a>
      <?php endif; ?>
      <?php if (($user['role'] ?? '') === 'admin'): ?>
        <a class="btn" href="<?= e((string)config('app.base_url','')) ?>/admin">Admin Dashboard</a>
      <?php endif; ?>
    </div>
  <?php endif; ?>
</div>
