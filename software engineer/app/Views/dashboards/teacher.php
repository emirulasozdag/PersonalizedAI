<div class="card">
  <h2>Teacher Dashboard</h2>
  <p>Core teacher features:</p>

  <?php $base = (string) config('app.base_url', ''); ?>
  <div class="row">
    <a class="btn" href="<?= e($base) ?>/teacher/results">Student results</a>
    <a class="btn secondary" href="<?= e($base) ?>/teacher/assignments">Assignments</a>
    <a class="btn secondary" href="<?= e($base) ?>/teacher/directives">AI directives</a>
    <a class="btn secondary" href="<?= e($base) ?>/announcements">Announcements</a>
    <a class="btn secondary" href="<?= e($base) ?>/messages">Messages</a>
  </div>
</div>
