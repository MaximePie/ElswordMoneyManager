<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int product_id
 */
class DungeonProduct extends Model
{
    protected $fillable = ['dungeon_id', 'product_id'];
}
