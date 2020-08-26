<?php

namespace App\Observers;

use App\Productprice;

class ProductPriceObserver
{
    /**
     * Handle the productprice "created" event.
     *
     * @param  \App\Productprice  $productprice
     * @return void
     */
    public function created(Productprice $productprice)
    {

    }

    /**
     * Handle the productprice "updated" event.
     *
     * @param  \App\Productprice  $productprice
     * @return void
     */
    public function updated(Productprice $productprice)
    {
        //
    }

    /**
     * Handle the productprice "deleted" event.
     *
     * @param  \App\Productprice  $productprice
     * @return void
     */
    public function deleted(Productprice $productprice)
    {
        //
    }

    /**
     * Handle the productprice "restored" event.
     *
     * @param  \App\Productprice  $productprice
     * @return void
     */
    public function restored(Productprice $productprice)
    {
        //
    }

    /**
     * Handle the productprice "force deleted" event.
     *
     * @param  \App\Productprice  $productprice
     * @return void
     */
    public function forceDeleted(Productprice $productprice)
    {
        //
    }
}
