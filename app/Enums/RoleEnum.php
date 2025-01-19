<?php

namespace App\Enums;

enum RoleEnum: string
{
    case Administrator = 'administrator';
	case Maintainer = 'maintainer';
	case Member = 'member';

	public static function labels(): array
	{
		return [
			self::Administrator->value => 'Administrator',
			self::Maintainer->value => 'Maintainer',
			self::Member->value => 'Member',
		];
	}

	public function label(): string
	{
		return match ($this) {
			self::Administrator => 'Administrator',
			self::Maintainer => 'Maintainer',
			self::Member => 'Member',
		};
	}
}
