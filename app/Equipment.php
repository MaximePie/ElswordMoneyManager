<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property bool isBought
 */
class Equipment extends Model
{
    protected $fillable = ['name', 'price', 'isBought'];

    protected $attributes = ['isBought' => 0];
}
