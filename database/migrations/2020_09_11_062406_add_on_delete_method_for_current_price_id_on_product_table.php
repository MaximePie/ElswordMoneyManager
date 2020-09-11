<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOnDeleteMethodForCurrentPriceIdOnProductTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('products', function (Blueprint $table) {

			$table->dropForeign(['current_price_id']);
			$table->foreign('current_price_id')
				->references('id')
				->on('productprices')
				->onDelete('set null');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('products', function (Blueprint $table) {
			$table->dropForeign(['current_price_id']);
			$table->foreign('current_price_id')
				->references('id')
				->on('productprices');
		});
	}
}
