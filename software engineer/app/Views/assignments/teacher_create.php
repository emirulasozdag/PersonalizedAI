<?php
/** @var list<array{id:int,name:string,email:string,role:string}> $students */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Create Assignment</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/teacher/assignments">Back</a>
  </div>

  <form method="post" action="<?= e($base) ?>/teacher/assignments/new" style="margin-top:12px">
    <?= csrf_field() ?>

    <label>Student</label>
    <select name="student_id">
      <option value="">-- select --</option>
      <?php foreach ($students as $s): ?>
        <option value="<?= e((string)$s['id']) ?>"><?= e($s['name']) ?> (<?= e($s['email']) ?>)</option>
      <?php endforeach; ?>
    </select>

    <label>Title</label>
    <input name="title" placeholder="Homework title">

    <label>Description</label>
    <textarea name="description" rows="5" style="width:100%;padding:10px;border-radius:8px;border:1px solid #cbd5e1"></textarea>

    <label>Due date (YYYY-MM-DD HH:MM:SS)</label>
    <input name="due_date" placeholder="2026-01-10 23:59:59">

    <label>Type</label>
    <input name="assignment_type" placeholder="HOMEWORK">

    <div style="margin-top:14px">
      <button class="btn" type="submit">Create & assign</button>
    </div>
  </form>
</div>
