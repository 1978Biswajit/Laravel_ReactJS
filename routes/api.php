<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Models\Product;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "api" middleware group. Now create something great!
|
*/

// Public routes for login and registration
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Authenticated routes, protected with Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Product routes
    Route::apiResource('products', ProductController::class);

    // Example protected route for authenticated users
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });
});
