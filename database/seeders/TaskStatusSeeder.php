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
            'Pendding',
            'Assingned',
            'Compleated',
        ];
        foreach ($statuses as $status) {
            TaskStatus::firstOrCreate(['name' => $status]);
        }
    }
}
