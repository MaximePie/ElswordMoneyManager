<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DungeonRun extends Model
{
    protected $fillable = ['earnedCoins', 'time', 'dungeon_id', 'character_id'];
}
