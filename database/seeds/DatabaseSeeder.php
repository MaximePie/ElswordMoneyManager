<?php

use App\Character;
use App\Product;
use App\Productprice;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	/** @var Character $character */
    	$character = Character::Create(['name' => 'Laby']);
    	$product = Product::Create(['name' => 'Fragment d\'Eldrit', 'character_id' => $character->id]);

    	/** @var Productprice $productPrice */
    	$productPrice = Productprice::Create(['price' => 499, 'product_id' => $product->id]);

    	/** @var Productprice $secondProductPrice */
    	$secondProductPrice = Productprice::Create(['price' => 799, 'last_product_price_id' => $productPrice->id, 'product_id' => $product->id]);
    	$productPrice->next_product_price_id = $secondProductPrice->id;
    	$productPrice->save();
    }
}
