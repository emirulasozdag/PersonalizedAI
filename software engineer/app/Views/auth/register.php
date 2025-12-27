<div class="card">
  <h2>Register</h2>
  <form method="post" action="<?= e((string)config('app.base_url','')) ?>/auth/register">
    <?= csrf_field() ?>
    <label>Name</label>
    <input name="name" required>

    <label>Email</label>
    <input name="email" type="email" required>

    <label>Password</label>
    <input name="password" type="password" required>

    <label>Role</label>
    <select name="role" required>
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
      <option value="admin">Admin</option>
    </select>

    <div style="margin-top:12px">
      <button class="btn" type="submit">Create Account</button>
    </div>
  </form>
</div>
