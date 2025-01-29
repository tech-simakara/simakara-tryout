<?php

namespace App\Models;

use App\Enums\RoleEnum;
use App\Notifications\ResetPasswordNotification;
use App\Notifications\VerifiedNotification;
use App\Notifications\VerifyEmailNotification;
use App\Traits\HasRoleLabels;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, HasRoleLabels, HasUlids, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
			'created_at' => 'datetime',
			'updated_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

	/**
	 * Send an email verification notification to the user.
	 */
	public function sendEmailVerificationNotification(): void
	{
		$this->notify(new VerifyEmailNotification());
	}

	/**
	 * Send a password reset notification to the user.
	 *
	 * @param  string  $token
	 */
	public function sendPasswordResetNotification($token): void
	{
		$url = route('password.reset', ['token' => $token]).'?email='.urlencode($this->email);

		$this->notify(new ResetPasswordNotification($url));
	}

	public function markEmailAsVerified(): bool
	{
		if ($this->hasVerifiedEmail()) {
			return false;
		}

		$this->forceFill([
			'email_verified_at' => now(),
		])->save();

		$this->fireModelEvent('verified', false);

		$adminsAndMaintainers = $this->role(RoleEnum::Administrator->value)->get();

		Notification::send($adminsAndMaintainers, new VerifiedNotification($this));

		return true;
	}
}
