<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int id
 */
class Dungeon extends Model
{
	protected $fillable = ['name', 'average_coins', 'average_time'];

	protected $attributes = [
		'average_coins' => 0,
		'average_time' => 0,
	];

	/**
	 * Returns the products list
	 * @return HasMany
	 */
    public function dungeonProducts(): HasMany
    {
			return $this->hasMany('App\DungeonProduct');
    }

	/**
	 * Calculates the average earned coins and returns it
	 * @return int
	 */
    public function averageRewards(): int
		{
			$dungeonRuns = $this->hasMany('App\DungeonRun')->get();
			if ($dungeonRuns->count()) {
				return $dungeonRuns->pluck('earnedCoins')->average();
			}
			else {
				return 0;
			}
		}

	/**
	 * Calculates the average time and returns it
	 * @return int
	 */
    public function averageTime(): int
		{
			$dungeonRuns = $this->hasMany('App\DungeonRun')->get();
			if ($dungeonRuns->count()) {
				return $dungeonRuns->pluck('time')->average();
			}
			else {
				return 0;
			}
		}
}
