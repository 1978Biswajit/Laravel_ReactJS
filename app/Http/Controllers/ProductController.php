<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    // Display a listing of the resource with pagination (10 per page)
    public function index()
    {
        // Paginate the products
        return Product::paginate(10); 
    }

    // Store a newly created product in the database
    public function store(StoreProductRequest $request)
    {
        // Validate the request and create the product
        $product = Product::create($request->validated());

        // Return the created product as a JSON response with HTTP status 201 (created)
        return response()->json($product, 201);
    }

    // Display the specified product
    public function show(Product $product)
    {
        // Return the specific product
        return response()->json($product);
    }

    // Update the specified product in the database
    public function update(UpdateProductRequest $request, Product $product)
    {
        // Validate the request and update the product
        $product->update($request->validated());

        // Return the updated product as a JSON response
        return response()->json($product);
    }

    // Remove the specified product from the database
    public function destroy(Product $product)
    {
        // Delete the product
        $product->delete();

        // Return an empty response with HTTP status 204 (No Content)
        return response()->json(null, 204);
    }
}
