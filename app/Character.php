<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 */
class Character extends Model
{
    protected $fillable = ['name'];
}
