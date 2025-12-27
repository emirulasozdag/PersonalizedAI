<div class="card">
  <h2>Admin Dashboard</h2>
  <p>Admin management features:</p>

  <?php $base = (string) config('app.base_url', ''); ?>
  <div class="row" style="margin-top:12px">
    <a class="btn" href="<?= e($base) ?>/admin/users">User accounts</a>
    <a class="btn secondary" href="<?= e($base) ?>/admin/performance">System performance</a>
    <a class="btn secondary" href="<?= e($base) ?>/admin/maintenance">Maintenance mode</a>
  </div>
</div>
