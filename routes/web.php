<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PregnancyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    /*
    | Dashboard Routes
    */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    /*
    | Pregnancy Routes
    */
    Route::get('/pregnancy', [PregnancyController::class, 'index'])->name('pregnancy.index');
    Route::get('/pregnancy/create', [PregnancyController::class, 'create'])->name('pregnancy.create');
    Route::post('/pregnancy/store', [PregnancyController::class, 'store'])->name('pregnancy.store');
    Route::get('/pregnancy/edit/{id}', [PregnancyController::class, 'edit'])->name('pregnancy.edit');
    Route::put('/pregnancy/update/{id}', [PregnancyController::class, 'update'])->name('pregnancy.update');
    Route::delete('/pregnancy/delete/{id}', [PregnancyController::class, 'destroy'])->name('pregnancy.destroy');
    /*
    | Children Routes
    */
    Route::get('/children', function () {
        return Inertia::render('Children/index');
    })->name('children.index');
});

require __DIR__.'/auth.php';
