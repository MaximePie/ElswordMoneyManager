<?php

namespace App\Http\Controllers;

use App\Product;
use App\Productprice;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductpriceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
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
     * @return void
     */
    public function store(Request $request)
    {
        /** @var Productprice $lastProductPrice */
        $lastProductPrice = Productprice::query()
            ->where('product_id', $request->productId)
            ->where('price', '<', $request->price)
            ->orderBy('price', 'DESC')
            ->first();

        /** @var Productprice $nextProductPrice */
        $nextProductPrice = Productprice::query()
            ->where('product_id', $request->productId)
            ->where('price', '>', $request->price)
            ->orderBy('price', 'ASC')
            ->first();

        $newProductPrice = Productprice::create([
            'product_id' => $request->productId,
            'price' => $request->price,
            'next_product_price_id' => $nextProductPrice->id ?? null,
            'last_product_price_id' => $lastProductPrice->id ?? null,
        ]);

        if ($lastProductPrice) {
            $lastProductPrice->next_product_price_id = $newProductPrice->id;
            $lastProductPrice->save();
        }

        if ($nextProductPrice) {
            $nextProductPrice->last_product_price_id = $newProductPrice->id;
            $nextProductPrice->save();
        }

        dd($newProductPrice, $lastProductPrice, $nextProductPrice);
    }

    /**
     * Display the specified resource.
     *
     * @param Productprice $productprice
     * @return void
     */
    public function show(Productprice $productprice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Productprice $productprice
     * @return void
     */
    public function edit(Productprice $productprice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return void
     * @throws Exception
     */
    public function update(Request $request)
    {
        /** @var ProductPrice $productPrice */
        $productPrice = Productprice::find($request->productPriceId);
        /** @var Product $product */
        if ($productPrice) {
            $product = Product::where('current_price_id', $productPrice->id)->first();
            if ($request->success) {
                $productPrice->success ++;
                $productPrice->rate = $productPrice->failed != 0
                    ?  $productPrice->success / ($productPrice->failed + $productPrice->success) * 100
                    : 100;
                /** @var Product $product */
                $product->current_price_id = $productPrice->next_product_price_id ?? $productPrice->id;
            }
            else {
                $productPrice->failed ++;
                $productPrice->rate = $productPrice->success != 0
                    ? $productPrice->success / ($productPrice->failed + $productPrice->success) * 100
                    : 0;
                $product->current_price_id = $productPrice->last_product_price_id ?? $productPrice->id;
            }
            $productPrice->save();
        }
        else {
            /** @var Product $product */
            $product = Product::find($request->productId);

            if ($product) {
                $productPrice = Productprice::query()
                    ->where('product_id' , $product->id)
                    ->orderBy('price', 'asc')
                    ->first();
                if ($productPrice) {
                    $product->current_price_id = $productPrice->id;
                }
                else {
                    throw new Exception('Pas de productPrice trouvé. Il faut en ajouter un.');
                }
            }
            else {
                throw new Exception('Pas de produit trouvé avec l\'identifiant ' . $request->productId . ' ... il y a une erreur');
            }
        }
        $product->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Productprice $productprice
     * @return Response
     */
    public function destroy(Productprice $productprice)
    {
        //
    }
}
