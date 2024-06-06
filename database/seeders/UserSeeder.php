<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // if user not exits then create new
        User::firstOrCreate([
            "email"=> "admin@example.com",
        ],
        [
            "name"=> "Ranjeet",
            "password"=> bcrypt("123456@admin"),
            'role' => 'admin'
        ]);
        User::firstOrCreate([
            "email"=> "user@example.com",
        ],
        [
            "name"=> "Ankit",
            "password"=> bcrypt("123456@user"),
            'role' => 'user'
        ]);
    }
}
