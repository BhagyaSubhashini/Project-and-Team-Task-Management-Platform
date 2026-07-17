<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\DashboardController; 


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


Route::middleware('auth:sanctum')->group(function () {

    Route::get(
    '/dashboard',
    [DashboardController::class,'index']
    );

    Route::get('/me', [AuthController::class,'me']);


    Route::post('/logout',[AuthController::class,'logout']);




    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */


    Route::apiResource(
        'projects',
        ProjectController::class
    )
    ->except([
        'store',
        'update',
        'destroy'
    ]);



    Route::post(
        '/projects',
        [ProjectController::class,'store']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );



    Route::put(
        '/projects/{project}',
        [ProjectController::class,'update']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );



    Route::delete(
        '/projects/{project}',
        [ProjectController::class,'destroy']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );


    /*
    |--------------------------------------------------------------------------
    | Project Members
    |--------------------------------------------------------------------------
    */


    Route::post(
        '/projects/{project}/members',
        [ProjectMemberController::class,'addMember']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );

    Route::get(
    '/projects/{project}/members',
    [ProjectMemberController::class,'index']
    );



    Route::delete(
        '/projects/{project}/members/{user}',
        [ProjectMemberController::class,'removeMember']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );




    /*
    |--------------------------------------------------------------------------
    | Tasks
    |--------------------------------------------------------------------------
    */


    Route::apiResource(
        'tasks',
        TaskController::class
    )
    ->except([
        'store',
        'update',
        'destroy'
    ]);



    Route::post(
        '/tasks',
        [TaskController::class,'store']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );



    Route::put(
        '/tasks/{task}',
        [TaskController::class,'update']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );



    Route::delete(
        '/tasks/{task}',
        [TaskController::class,'destroy']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );









    /*
    |--------------------------------------------------------------------------
    | Users
    |--------------------------------------------------------------------------
    */


    Route::get(
    '/users',
    [UserController::class,'index']
    )
    ->middleware(
        'role:Administrator,Project Manager'
    );



    Route::apiResource(
        'users',
        UserController::class
    )
    ->except([
        'index'
    ])
    ->middleware(
        'role:Administrator'
    );









    /*
    |--------------------------------------------------------------------------
    | Comments
    |--------------------------------------------------------------------------
    */


    Route::apiResource(
        'comments',
        CommentController::class
    );


});