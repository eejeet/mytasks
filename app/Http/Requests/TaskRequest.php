<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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

        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'deadline_date' => 'required|date',
            'status_id' => 'required|exists:task_statuses,id'
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'description.required' => 'Description is required',
            'deadline_date.required' => 'Deadline date is required',
            'status_id.required' => 'Status is required',
            'status_id.exists' => 'Status is invalid'
        ];
    }
}
