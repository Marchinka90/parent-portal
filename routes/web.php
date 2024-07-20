<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PregnancyController;
use App\Http\Controllers\ChildrenController;
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
    Route::get('/children', [ChildrenController::class, 'index'])->name('children.index');
    Route::get('/children/create', [ChildrenController::class, 'create'])->name('children.create');
    Route::post('/children/store', [ChildrenController::class, 'store'])->name('children.store');
    Route::get('/children/edit/{id}', [ChildrenController::class, 'edit'])->name('children.edit');
    Route::put('/children/update/{id}', [ChildrenController::class, 'update'])->name('children.update');
    Route::delete('/children/delete/{id}', [ChildrenController::class, 'destroy'])->name('children.destroy');
    
});

require __DIR__.'/auth.php';
