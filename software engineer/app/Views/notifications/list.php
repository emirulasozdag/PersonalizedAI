<?php
/** @var list<array<string,mixed>> $items */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Notifications</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/">Home</a>
  </div>

  <?php if (!$items): ?>
    <p style="margin-top:12px">No notifications.</p>
  <?php else: ?>
    <table style="width:100%;border-collapse:collapse;margin-top:12px">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Status</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Title</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Message</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Action</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($items as $n): ?>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= ((int)($n['is_read'] ?? 0) === 1) ? 'Read' : 'Unread' ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($n['title'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($n['body'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9">
              <?php if (!empty($n['link'])): ?>
                <a class="btn secondary" href="<?= e($base) ?><?= e((string)$n['link']) ?>">Open</a>
              <?php endif; ?>
              <?php if (((int)($n['is_read'] ?? 0)) === 0): ?>
                <form method="post" action="<?= e($base) ?>/notifications/read" style="display:inline">
                  <?= csrf_field() ?>
                  <input type="hidden" name="id" value="<?= e((string)($n['notification_id'] ?? 0)) ?>">
                  <button class="btn" type="submit">Mark read</button>
                </form>
              <?php endif; ?>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
