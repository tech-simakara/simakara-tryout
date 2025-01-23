<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
	return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
	Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::get('/users', function () {
		return \Inertia\Inertia::render('dashboard/Users');
	});
});

require __DIR__.'/auth.php';
