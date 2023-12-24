<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\LevelController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//User Api List
Route::post('applyForm', [UserController::class, 'applyForm']);
Route::get('exam-user-list', [UserController::class, 'list']);
Route::get('user-detail/{id}', [UserController::class, 'detail']);
Route::post('approve-user/{id}', [UserController::class, 'changeStatus']);

//Admin Api List
Route::get('admin-list', [AdminController::class, 'list']);
Route::post('create-admin', [AdminController::class, 'store']);
Route::get('admin-detail/{id}', [AdminController::class, 'view']);
Route::post('update-admin/{id}', [AdminController::class, 'update']);
Route::delete('delete-admin/{id}', [AdminController::class, 'destory']);
Route::post('show-mail', [AdminController:: class, 'show_mail']);
Route::post('send-mail', [AdminController:: class, 'send_mail']);

//Level Api List
Route::get('level-list', [LevelController:: class, 'list']);
Route::post('create-level', [LevelController::class, 'store']);
Route::get('level-detail/{id}', [LevelController::class, 'view']);
Route::post('update-level/{id}', [LevelController::class, 'update']);
Route::delete('delete-level/{id}', [LevelController::class, 'destory']);
