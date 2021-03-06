<?php

namespace App\Providers;

use App\Observers\ProductPriceObserver;
use App\Productprice;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Productprice::observe(ProductPriceObserver::class);
        Schema::defaultStringLength(191);
    }
}
