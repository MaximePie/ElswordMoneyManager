<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int current_price_id
 * @property int character_id
 * @property int id
 */
class Product extends Model
{
	protected $fillable = ['name', 'character_id'];

	/**
	 * Calculate the current price of the product based on his current_price_id
	 */
	public function currentPrice()
	{
		/** @var Productprice $price */
		if (!$this->current_price_id) {
			return 0;
		} else {
			return Productprice::find($this->current_price_id)->price;
		}
	}
}
