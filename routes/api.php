<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TaskController;
use App\Services\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// always use modern syntax for routes

// api root url response, this is the API
Route::get("/", function () {
    return ApiResponse::success(null, 'Welcome to API');
});

// guest sanctum routes for login and register
Route::group([], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Authenticated Route Group
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('tasks', TaskController::class);
    // get users with role 'user'
    Route::get('/users', function () {
        return ApiResponse::success(\App\Models\User::where('role', 'user')->get(), 'Users with Role "user"');
    });

    // get TaskStatus List
    Route::get('/task-statuses', function () {
        return ApiResponse::success(\App\Models\TaskStatus::all(), 'Task Status List');
    });
});

/**
 * API Resource Routes for tasks.
 *
 * These routes allow you to perform CRUD operations on tasks.
 * The routes are prefixed with '/api' and use the 'TaskController' class.
 */
