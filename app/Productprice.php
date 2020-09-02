<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property  int next_product_price_id
 * @property  int last_product_price_id
 * @property bool success
 * @property bool failed
 * @property float rate
 * @property int id
 * @property int price
 */
class Productprice extends Model
{
    protected $fillable = ['product_id', 'price', 'next_product_price_id', 'last_product_price_id', 'success', 'failed', 'rate'];

    protected $attributes = [
        'success' => 0,
        'failed' => 0,
        'rate' => 0,
        'last_product_price_id' => null,
        'next_product_price_id' => null,
    ];
}
