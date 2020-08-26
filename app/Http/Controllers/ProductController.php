<?php

namespace App\Http\Controllers;

use App\Character;
use App\Product;
use App\Productprice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $products = Product::all();

        $products->each(function (Product $product) {
            /** @var Productprice $currentProductPrice */
            $currentProductPrice = Productprice::find($product->current_price_id);

            if ($currentProductPrice) {
                $product['current_price'] = $currentProductPrice->price;
            }
            else {
                $product['current_price'] = 0;
            }

            if ($product->character_id) {
                /** @var Character $character */
                $character = Character::findOrFail($product->character_id);
                $product['character'] = $character;
            }
        });

        return response()->json(['products' => $products]);
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
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        if ($request->name) {

            $product = Product::create(['name' => $request->name]);

            if ($request->selectedCharacter) {
                $character = Character::findOrFail($request->selectedCharacter);
                $product->character_id = $character->id;
                $product->save();
            }

            return response()->json($product);
        } else {
            return response()->json(["Error"]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return JsonResponse
     */
    public function show(Product $product)
    {
        $productPrices = Productprice::where('product_id', $product->id)->get();

        return response()->json(['productPrices' => $productPrices]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Product $product
     * @return Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Product $product
     * @return Response
     */
    public function update(Request $request, Product $product)
    {
        $character = Character::findOrFail($request->characterId);

        $product->character_id = $character->id;
        $product->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return void
     */
    public function destroy(Product $product)
    {
        $product->forceDelete();
    }
}
