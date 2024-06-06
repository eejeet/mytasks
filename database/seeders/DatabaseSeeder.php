<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\TaskStatus;
use App\Models\TastkStatus;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Do not use here for fake data seed we have created a project:seed command
        $this->call([
            UserSeeder::class,
            TaskStatusSeeder::class,
        ]);



    }
}
