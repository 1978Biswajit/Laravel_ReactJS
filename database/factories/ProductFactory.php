<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,               // Random word for product name
            'description' => $this->faker->sentence,     // Random sentence for product description
            'price' => $this->faker->randomFloat(2, 1, 1000), // Random price between 1 and 1000
        ];
    }
}
