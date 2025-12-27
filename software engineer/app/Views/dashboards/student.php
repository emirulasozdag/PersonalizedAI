<?php
  $base = (string) config('app.base_url', '');
  $resultsCount = (int)($resultsCount ?? 0);
  $hasPlan = (bool)($hasPlan ?? false);
  $contentCount = (int)($contentCount ?? 0);
  $assignmentsCount = (int)($assignmentsCount ?? 0);
?>

<div class="card">
  <h2>Student Dashboard</h2>
  <p class="muted">Quick start: complete placement → get plan/content → track progress.</p>

  <div class="row" style="margin-top:10px">
    <span class="badge">Results: <?= e((string)$resultsCount) ?></span>
    <span class="badge">Plan: <?= $hasPlan ? 'Yes' : 'No' ?></span>
    <span class="badge">Content: <?= e((string)$contentCount) ?></span>
    <span class="badge">Assignments: <?= e((string)$assignmentsCount) ?></span>
  </div>

  <?php if ($resultsCount === 0): ?>
    <div class="card" style="margin-top:12px">
      <h3 style="margin-top:0">Getting started</h3>
      <ol style="margin:0;padding-left:18px">
        <li>Open <strong>Placement test</strong> and complete all modules.</li>
        <li>Then check <strong>Lesson plan</strong> and <strong>Recommended content</strong>.</li>
        <li>Finally see <strong>Progress</strong>, export CSV/PDF.</li>
      </ol>
      <div class="row" style="margin-top:12px">
        <a class="btn" href="<?= e($base) ?>/student/placement">Start placement test</a>
      </div>
    </div>
  <?php endif; ?>

  <h3 style="margin-top:18px">Modules</h3>
  <div class="grid" style="margin-top:10px">
    <a class="btn" href="<?= e($base) ?>/student/placement">Placement test</a>
    <a class="btn secondary" href="<?= e($base) ?>/student/results">Results</a>
    <a class="btn secondary" href="<?= e($base) ?>/student/plan">Lesson plan</a>
    <a class="btn secondary" href="<?= e($base) ?>/student/content">Recommended content</a>
    <a class="btn secondary" href="<?= e($base) ?>/student/progress">Progress</a>
    <a class="btn secondary" href="<?= e($base) ?>/student/assignments">Assignments</a>
    <a class="btn secondary" href="<?= e($base) ?>/student/feedback">Feedback</a>
    <a class="btn secondary" href="<?= e($base) ?>/messages">Messages</a>
    <a class="btn secondary" href="<?= e($base) ?>/announcements">Announcements</a>
    <a class="btn secondary" href="<?= e($base) ?>/chatbot">Chatbot</a>
  </div>
</div>
