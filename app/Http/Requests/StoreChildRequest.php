<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreChildRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $today = Carbon::today()->timestamp;

        return [
            'name' => 'required|string|min:3',
            'gender' => 'required|string|in:boy,girl',
            'dateOfBirth' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($today) {
                    $dateOfBirth = Carbon::parse($value)->timestamp;
                    if ($dateOfBirth > $today) {
                        return $fail('The date of birth cannot be grater than today.');
                    }
                }
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name is required.',
            'name.string' => 'The name  must be a string.',
            'name.min' => 'The name must be at least 3 chars',
            'gender.required' => 'The gender field is required.',
            'gender.string' => 'The gender  must be a string.',
            'gender.in' => 'The gender must be one of the following: boy or girl',
            'dateOfBirth.required' => 'The date of birth is required.',
            'dateOfBirth.string' => 'The date of birth must be a string.',            
        ];
    }
}
