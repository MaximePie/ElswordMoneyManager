<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dungeon extends Model
{
    protected $fillable = ['name', 'average_coins', 'average_time'];
}
