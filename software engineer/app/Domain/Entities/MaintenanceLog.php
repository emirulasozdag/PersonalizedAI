<?php

declare(strict_types=1);

namespace App\Domain\Entities;

final class MaintenanceLog
{
    public function __construct(
        public int $logId,
        public string $startTime,
        public string $endTime,
        public string $reason,
        public bool $isActive
    ) {}

    public function startMaintenance(): void
    {
        $this->isActive = true;
        $this->startTime = date('Y-m-d H:i:s');
    }

    public function endMaintenance(): void
    {
        $this->isActive = false;
        $this->endTime = date('Y-m-d H:i:s');
    }
}
