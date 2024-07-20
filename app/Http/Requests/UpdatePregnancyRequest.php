<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class UpdatePregnancyRequest extends FormRequest
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
        $maxDate = Carbon::today()->addDays(240)->timestamp;

        return [
            'dateOfTerm' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($today, $maxDate) {
                    $dateOfTerm = Carbon::parse($value)->timestamp;
                    if ($dateOfTerm <= $today) {
                        return $fail('The date of term cannot be earlier than tomorrow.');
                    }
                    if ($dateOfTerm > $maxDate) {
                        return $fail('The date of term cannot be more than 240 days from today.');
                    }
                }
            ],
            'babies' => 'required|array|min:1|max:6',
            'babies.*.gender' => 'required|string|in:boy,girl,unknown',
            'after:' . $today,
            'before_or_equal:' . $maxDate,
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
            'dateOfTerm.required' => 'The date of term is required.',
            'dateOfTerm.string' => 'The date of term must be a string.',
            'babies.required' => 'The babies field is required.',
            'babies.array' => 'The babies field must be an array.',
            'babies.min' => 'There should be at least one baby.',
            'babies.max' => 'The babies could not be more than 6.',
            'babies.*.gender.required' => 'The gender of each baby is required.',
            'babies.*.gender.string' => 'The gender of each baby must be a string.',
            'babies.*.gender.in' => 'The gender of each baby must be one of the following: boy, girl, or unknown.',
        ];
    }
}
