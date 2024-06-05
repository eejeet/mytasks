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
            "email"=> "eejeet@gmail.com",
        ],
        [
            "name"=> "Ranjeet",
            "password"=> bcrypt("123456@ranjeet"),
        ]);
    }
}
