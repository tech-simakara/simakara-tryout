<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
	return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
	Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::resource('users', UserController::class);
});

use App\Http\Resources\UserCollection;
use App\Models\User;

Route::get('/get-users', function () {
	return new UserCollection(User::paginate());
});

require __DIR__.'/auth.php';
