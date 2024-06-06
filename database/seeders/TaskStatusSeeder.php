<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'Pendding', 'is_default' => 1],
            ['name' => 'Assingned', 'is_default' => 0],
            ['name' => 'Compleated', 'is_default' => 0],
        ];

        foreach ($statuses as $status) {
            TaskStatus::firstOrCreate($status);
        }
    }
}
