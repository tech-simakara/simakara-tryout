<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
	use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
		$roles = Role::all()->pluck('name')->toArray();

		User::factory()->count(100)->create()->each(function ($user) use ($roles) {
			$user->assignRole($roles[array_rand($roles)]);
			$user->update([
				'email_verified_at' => rand(0, 1) ? now() : null
			]);
		});
    }
}
