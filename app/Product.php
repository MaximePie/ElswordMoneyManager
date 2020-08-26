<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int current_price_id
 * @property int character_id
 */
class Product extends Model
{
    protected $fillable = ['name', 'character_id'];
}
