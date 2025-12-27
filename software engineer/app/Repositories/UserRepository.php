<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\DB;

final class UserRepository
{
    /** @return list<array<string,mixed>> */
    public function listAll(): array
    {
        $stmt = DB::pdo()->query('SELECT id, name, email, role, email_verified_at, created_at FROM users ORDER BY created_at DESC');
        /** @var list<array<string,mixed>> */
        return $stmt->fetchAll();
    }

    public function updateRole(int $userId, string $role): void
    {
        if (!in_array($role, ['student', 'teacher', 'admin'], true)) {
            throw new \InvalidArgumentException('Invalid role');
        }

        $stmt = DB::pdo()->prepare('UPDATE users SET role = :r WHERE id = :id');
        $stmt->execute(['r' => $role, 'id' => $userId]);
    }

    /** @return list<array{id:int,name:string,email:string,role:string}> */
    public function listByRole(string $role): array
    {
        $stmt = DB::pdo()->prepare('SELECT id, name, email, role FROM users WHERE role = :r ORDER BY name ASC');
        $stmt->execute(['r' => $role]);
        /** @var list<array{id:int,name:string,email:string,role:string}> */
        return $stmt->fetchAll();
    }

    /** @return list<array{id:int,name:string,email:string,role:string}> */
    public function listStudents(): array
    {
        return $this->listByRole('student');
    }

    /** @return list<array{id:int,name:string,email:string,role:string}> */
    public function listTeachers(): array
    {
        return $this->listByRole('teacher');
    }
}
