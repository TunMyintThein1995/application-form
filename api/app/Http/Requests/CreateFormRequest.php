<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', 'unique:users' , 'email', Rule::unique('users')],
            'application_form' => ['required', 'mimes:pdf', 'max:10000'],
            'id_card' => ['required', 'image', 'mimes:jpeg,png,jpg'],
            'photo' => ['required', 'image', 'mimes:jpeg,png,jpg'],
        ];
    }
}
