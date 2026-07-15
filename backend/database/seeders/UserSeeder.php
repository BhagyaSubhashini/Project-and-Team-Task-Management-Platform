<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Get Administrator role

        $adminRole = Role::where('name','Administrator')->first();


        User::create([

            'name' => 'System Administrator',

            'email' => 'admin@example.com',

            'phone' => '0770000000',

            'password' => Hash::make('password'),

            'role_id' => $adminRole->id

        ]);
    }
}