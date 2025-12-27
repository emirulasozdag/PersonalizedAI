<?php $appName = (string) config('app.name', 'App'); $user = \App\Core\Auth::user(); ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($appName) ?></title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0;background:#f6f7fb;color:#111}
    .container{max-width:980px;margin:0 auto;padding:16px}
    .nav{display:flex;gap:12px;align-items:center;justify-content:space-between;padding:12px 16px;background:#fff;border-bottom:1px solid #e5e7eb}
    .nav a:not(.btn){color:#111;text-decoration:none;margin-right:10px}
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:16px}
    .row{display:flex;gap:12px;flex-wrap:wrap}
    h1,h2,h3{margin:0 0 10px}
    p{margin:0 0 10px;line-height:1.45}
    .muted{color:#475569}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}
    .badge{display:inline-block;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#fff;color:#111}

    .btn{display:inline-block;padding:10px 12px;border-radius:8px;border:1px solid #111;background:#111;color:#fff;text-decoration:none}
    .btn.secondary{background:#fff;color:#111}
    .nav a.btn{color:#fff}
    .nav a.btn.secondary{color:#111}
    .btn:hover{opacity:.92}
    .btn.secondary:hover{background:#f8fafc}
    input,select{padding:10px;border-radius:8px;border:1px solid #cbd5e1;min-width:260px}
    label{display:block;margin:10px 0 6px}
    .flash{padding:10px 12px;border-radius:8px;margin:12px 0}
    .flash.error{background:#fee2e2;border:1px solid #fecaca}
    .flash.success{background:#dcfce7;border:1px solid #bbf7d0}
    table{width:100%;border-collapse:collapse}
    th,td{padding:10px;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:top}
    pre{white-space:pre-wrap;margin:0;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:12px}
  </style>
</head>
<body>
  <div class="nav">
    <div>
      <strong><?= e($appName) ?></strong>
      <a href="<?= e((string)config('app.base_url','')) ?>/">Home</a>
    </div>
    <div>
      <?php if ($user): ?>
        <span><?= e($user['name'] ?? '') ?> (<?= e($user['role'] ?? '') ?>)</span>
        <?php
          $unread = 0;
          try {
            $unread = (new \App\Repositories\NotificationRepository())->unreadCount((int)($user['id'] ?? 0));
          } catch (\Throwable) {
            $unread = 0;
          }
        ?>
        <a class="btn secondary" href="<?= e((string)config('app.base_url','')) ?>/notifications">Notifications<?= $unread > 0 ? ' (' . (int)$unread . ')' : '' ?></a>
        <form method="post" action="<?= e((string)config('app.base_url','')) ?>/auth/logout" style="display:inline">
          <?= csrf_field() ?>
          <button class="btn secondary" type="submit">Logout</button>
        </form>
      <?php else: ?>
        <a class="btn secondary" href="<?= e((string)config('app.base_url','')) ?>/auth/login">Login</a>
        <a class="btn" href="<?= e((string)config('app.base_url','')) ?>/auth/register">Register</a>
      <?php endif; ?>
    </div>
  </div>
  <div class="container">
    <?php if ($msg = flash('error')): ?><div class="flash error"><?= e($msg) ?></div><?php endif; ?>
    <?php if ($msg = flash('success')): ?><div class="flash success"><?= e($msg) ?></div><?php endif; ?>
