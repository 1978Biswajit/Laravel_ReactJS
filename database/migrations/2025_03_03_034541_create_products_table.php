<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            // Primary key for the product table
            $table->id();

            // Product name (string type, can store up to 255 characters)
            $table->string('name');

            // Product description (text type, can store large text)
            $table->text('description');

            // Product price (decimal type with 10 digits and 2 decimal places)
            $table->decimal('price', 10, 2);

            // Timestamps for created_at and updated_at columns
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
        // Drop the products table if we rollback the migration
        Schema::dropIfExists('products');
    }
}
