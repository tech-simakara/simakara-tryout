<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
	return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('users', function () {
	return Inertia::render('dashboard/Users');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
