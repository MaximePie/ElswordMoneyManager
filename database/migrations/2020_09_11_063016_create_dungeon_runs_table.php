<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDungeonRunsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dungeon_runs', function (Blueprint $table) {
            $table->id();
            $table->integer('earnedCoins');
            $table->integer('time');

            $table->foreignId('dungeon_id');
            $table->foreign('dungeon_id')
							->references('id')
							->on('dungeons')
							->onDelete('cascade');
            $table->foreignId('character_id')->nullable();
						$table->foreign('character_id')
							->references('id')
							->on('characters')
							->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dungeon_runs');
    }
}
