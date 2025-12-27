<?php
/** @var list<array<string,mixed>> $items */
$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>User Accounts</h2>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/admin">Back to dashboard</a>
  </div>

  <?php if (!$items): ?>
    <p style="margin-top:12px">No users found.</p>
  <?php else: ?>
    <table style="width:100%;border-collapse:collapse;margin-top:12px">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Name</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Email</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Role</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Verified</th>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb">Action</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($items as $u): ?>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($u['name'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($u['email'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= e((string)($u['role'] ?? '')) ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9"><?= !empty($u['email_verified_at']) ? 'Yes' : 'No' ?></td>
            <td style="padding:8px;border-bottom:1px solid #f1f5f9">
              <form method="post" action="<?= e($base) ?>/admin/users/role" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <?= csrf_field() ?>
                <input type="hidden" name="user_id" value="<?= e((string)($u['id'] ?? 0)) ?>">
                <select name="role">
                  <?php foreach (['student','teacher','admin'] as $role): ?>
                    <option value="<?= e($role) ?>" <?= ((string)($u['role'] ?? '') === $role) ? 'selected' : '' ?>><?= e($role) ?></option>
                  <?php endforeach; ?>
                </select>
                <button class="btn" type="submit">Update</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>
</div>
