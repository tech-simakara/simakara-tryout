<?php

namespace App\Traits;

use App\Enums\RoleEnum;

trait HasRoleLabels
{
	public function getRoleLabels(): array
	{
		return collect($this->getRoleNames())
			->map(fn($roleName) => RoleEnum::labels()[$roleName] ?? $roleName)
			->all();
	}
}
