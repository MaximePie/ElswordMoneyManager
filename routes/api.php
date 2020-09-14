<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('characters', 'CharacterController@index');
Route::get('dungeons', 'DungeonController@index');
Route::get('equipments', 'EquipmentController@index');
Route::get('nextTarget', 'EquipmentController@nextTarget');
Route::get('equipment/delete/{equipment}', 'EquipmentController@nextTarget');
Route::get('dungeonProducts/{dungeon}', 'DungeonProductController@index');
Route::get('products/{filteredCharacter?}', 'ProductController@index');
Route::get('products/delete/{product}', 'ProductController@destroy');
Route::get('product/{product}', 'ProductController@show');
Route::get('addDungeonProduct/{product}/{dungeon}', 'DungeonProductController@storeProduct');

Route::post('dungeonRun/{dungeon}', 'DungeonRunController@store');
Route::post('addDungeon', 'DungeonController@store');
Route::post('product', 'ProductController@store');
Route::post('equipment', 'EquipmentController@store');
Route::post('character', 'CharacterController@store');
Route::post('productPrice', 'ProductpriceController@store');
Route::post('updateProductPrice', 'ProductpriceController@update');
Route::post('updateSelectedCharacter/{product}', 'ProductController@update');
