<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/


// Public Authentication Routes
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);


// Protected Routes (Require Sanctum Token)
Route::middleware('auth:sanctum')->group(function () {

    // Get logged-in user details
    Route::get('/me', [AuthController::class, 'me']);

    // Logout current user
    Route::post('/logout', [AuthController::class, 'logout']);

    // Project CRUD
    Route::apiResource('projects', ProjectController::class);

    // Task CRUD
    Route::apiResource('tasks', TaskController::class);

    // User CRUD
    Route::apiResource('users', UserController::class);

    // Comment CRUD
    Route::apiResource('comments', CommentController::class);

});