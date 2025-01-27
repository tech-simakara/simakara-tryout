<?php

namespace App\Http\Requests\Dashboard\Users;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;

class DeleteUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasRole(RoleEnum::Administrator->value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
		return [
			'ids' => 'sometimes|array',
			'ids.*' => 'string|size:26|exists:users,id',
		];
    }

	/**
	 * Get custom attributes for validator errors.
	 *
	 * @return array<string, string>
	 */
	public function attributes(): array
	{
		return [
			'ids' => 'ID pengguna',
			'ids.*' => 'ID pengguna',
		];
	}
}
