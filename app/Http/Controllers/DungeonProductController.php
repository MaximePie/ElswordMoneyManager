<?php

namespace App\Http\Controllers;

use App\Dungeon;
use App\DungeonProduct;
use App\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DungeonProductController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @param Dungeon $dungeon
	 * @return JsonResponse
	 */
	public function index(Dungeon $dungeon)
	{
		$dungeonProducts = $dungeon->dungeonProducts()->get();
		$dungeonProducts->each(function (DungeonProduct $dungeonProduct) {
			/** @var Product $product */
			$product = Product::find($dungeonProduct->product_id);
			$dungeonProduct['product'] = $product;

			if ($product) {
				$dungeonProduct['product']['current_price'] = $product->currentPrice();
			}
		});

		return response()->json([
			'dungeonProducts' => $dungeonProducts
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param Product $product
	 * @param Dungeon $dungeon
	 * @return DungeonProduct
	 */
	public function storeProduct(Product $product, Dungeon $dungeon)
	{
		if (!$dungeon->dungeonProducts()->where('product_id', $product->id)->count()) {
			return DungeonProduct::create(['product_id' => $product->id, 'dungeon_id' => $dungeon->id]);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param DungeonProduct $dungeonProduct
	 * @return Response
	 */
	public function show(DungeonProduct $dungeonProduct)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param DungeonProduct $dungeonProduct
	 * @return Response
	 */
	public function edit(DungeonProduct $dungeonProduct)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param Request $request
	 * @param DungeonProduct $dungeonProduct
	 * @return Response
	 */
	public function update(Request $request, DungeonProduct $dungeonProduct)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param DungeonProduct $dungeonProduct
	 * @return Response
	 */
	public function destroy(DungeonProduct $dungeonProduct)
	{
		//
	}
}
