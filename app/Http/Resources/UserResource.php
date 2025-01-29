<?php

namespace App\Http\Resources;

use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
	public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
			'id' => $this->id,
			'name' => $this->name,
			'email' => $this->email,
			'permissions' => $this->getAllPermissions()
				->map(function ($permission) {
					return $permission->name;
				}),
			'roles' => $this->getRoleNames()->map(function ($role) {
				return [
					'name' => $role,
					'label' => RoleEnum::labels()[$role] ?? $role
				];
			}),
			'email_verified_at' => $this->email_verified_at,
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
    }
}
