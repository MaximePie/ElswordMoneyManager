<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeEarnedCoinsColumnToMakeItBigInteger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dungeon_runs', function (Blueprint $table) {
            $table->bigInteger('earnedCoins')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dungeon_runs', function (Blueprint $table) {
					$table->integer('earnedCoins')->change();
				});
    }
}
