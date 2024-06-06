<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'deadline_date' => $this->faker->dateTime,
            'created_by' => \App\Models\User::all()->random()->id,
            'user_id' => \App\Models\User::all()->random()->id,
            'status_id' => \App\Models\TaskStatus::all()->random()->id,
        ];
    }
}
