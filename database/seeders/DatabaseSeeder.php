<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
		/** Define Roles */
        $administratorRole = Role::create(['name' => RoleEnum::Administrator->value]);
        $maintainerRole = Role::create(['name' => RoleEnum::Maintainer->value]);
        $memberRole = Role::create(['name' => RoleEnum::Member->value]);

		/** Define Permissions */
		$manageFeaturesPermission = Permission::create(['name' => PermissionEnum::ManageFeatures->value]);
		$manageUsersPermission = Permission::create(['name' => PermissionEnum::ManageUsers->value]);
		$manageGalleryPermission = Permission::create(['name' => PermissionEnum::ManageGallery->value]);
		$manageQuestionTypesPermission = Permission::create(['name' => PermissionEnum::ManageQuestionTypes->value]);
		$manageQuestionsPermission = Permission::create(['name' => PermissionEnum::ManageQuestions->value]);
		$manageExamCategoriesPermission = Permission::create(['name' => PermissionEnum::ManageExamCategories->value]);
		$manageExamTypesPermission = Permission::create(['name' => PermissionEnum::ManageExamTypes->value]);
		$manageExamsPermission = Permission::create(['name' => PermissionEnum::ManageExams->value]);

		/** Assign Permissions to Roles */
		$administratorRole->syncPermissions([
			$manageFeaturesPermission,
			$manageUsersPermission,
			$manageGalleryPermission,
			$manageQuestionTypesPermission,
			$manageQuestionsPermission,
			$manageExamCategoriesPermission,
			$manageExamTypesPermission,
			$manageExamsPermission,
		]);
		$maintainerRole->syncPermissions([
			$manageGalleryPermission,
			$manageQuestionTypesPermission,
			$manageQuestionsPermission,
			$manageExamCategoriesPermission,
			$manageExamTypesPermission,
			$manageExamsPermission,
		]);
		$memberRole->syncPermissions([]);

		/** Create Eser with Role */
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'administrator@example.com',
        ])->assignRole(RoleEnum::Administrator);
		User::factory()->create([
            'name' => 'Maintainer',
            'email' => 'maintainer@example.com',
        ])->assignRole(RoleEnum::Maintainer);
		User::factory()->create([
            'name' => 'Member',
            'email' => 'member@example.com',
        ])->assignRole(RoleEnum::Member);
    }
}
