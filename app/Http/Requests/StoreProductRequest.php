<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // User must be authenticated to create a product.
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',      // Name is required, must be a string, and max 255 characters.
            'description' => 'required|string|max:1000',  // Description is required, must be a string, and max 1000 characters.
            'price' => 'required|numeric|min:0',      // Price is required, must be numeric, and can't be less than 0.
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'Product name is required.',
            'name.string' => 'Product name must be a string.',
            'name.max' => 'Product name should not exceed 255 characters.',
            'description.required' => 'Product description is required.',
            'description.string' => 'Product description must be a string.',
            'description.max' => 'Product description should not exceed 1000 characters.',
            'price.required' => 'Product price is required.',
            'price.numeric' => 'Product price must be a number.',
            'price.min' => 'Product price must be at least 0.',
        ];
    }
}
