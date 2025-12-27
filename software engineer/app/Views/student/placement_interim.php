<?php
/** @var string $module */
/** @var array<string,mixed> $analysis */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Interim Results: <?= e(ucfirst($module)) ?></h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student/placement">Back to modules</a>
  </div>

  <div style="margin-top:12px">
    <p><strong>Score:</strong> <?= e((string)($analysis['score'] ?? '0')) ?> / <?= e((string)($analysis['max'] ?? '0')) ?></p>

    <?php if ($module === 'speaking' && isset($analysis['pronunciation_accuracy'])): ?>
      <p><strong>Pronunciation accuracy (demo):</strong> <?= e((string)($analysis['pronunciation_accuracy'] ?? '')) ?>%</p>
      <?php if (!empty($analysis['audio_file'])): ?>
        <p style="color:#475569">Audio saved (server): <?= e((string)$analysis['audio_file']) ?></p>
      <?php endif; ?>
    <?php endif; ?>

    <?php $wrong = $analysis['wrong'] ?? []; ?>
    <?php if (is_array($wrong) && $wrong): ?>
      <h3 style="margin-top:16px">Incorrect answers</h3>
      <pre style="white-space:pre-wrap;margin:0"><?= e(json_encode($wrong, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) ?></pre>
    <?php else: ?>
      <p style="margin-top:16px">No incorrect answers recorded for this module.</p>
    <?php endif; ?>
  </div>
</div>
