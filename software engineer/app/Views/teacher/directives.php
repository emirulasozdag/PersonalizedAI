<?php
/** @var list<array<string,mixed>> $items */
/** @var list<array{id:int,name:string,email:string,role:string}> $students */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Teacher → AI Directives (FR35 demo)</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/teacher">Back to dashboard</a>
  </div>

  <div class="card" style="margin-top:12px">
    <h3>Create directive</h3>
    <form method="post" action="<?= e($base) ?>/teacher/directives/new">
      <?= csrf_field() ?>
      <label>Student (optional)</label>
      <select name="student_id">
        <option value="">-- general directive --</option>
        <?php foreach ($students as $s): ?>
          <option value="<?= e((string)$s['id']) ?>"><?= e($s['name']) ?> (<?= e($s['email']) ?>)</option>
        <?php endforeach; ?>
      </select>

      <label>Title</label>
      <input name="title" placeholder="e.g., Focus on B1 grammar" required>

      <label>Directive text</label>
      <input name="directive_text" placeholder="Describe what content should be generated..." required>

      <div style="margin-top:12px">
        <button class="btn" type="submit">Save</button>
      </div>
    </form>
  </div>

  <h3 style="margin-top:16px">Previous directives</h3>
  <?php if (!$items): ?>
    <p>No directives yet.</p>
  <?php else: ?>
    <table style="width:100%;border-collapse:collapse;margin-top:12px">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Title</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Student</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Created</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($items as $d): ?>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($d['title'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($d['student_name'] ?? 'General')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($d['created_at'] ?? '')) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
