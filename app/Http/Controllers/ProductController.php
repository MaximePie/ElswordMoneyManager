<?php

namespace App\Http\Controllers;

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
            return response()->json(Product::create(['name' => $request->name]));
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
        //
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
