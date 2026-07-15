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


        User::updateOrCreate([
                'email' => 'admin@example.com'
            ],
            [
                'role_id' => $adminRole->id,
                'name' => 'System Administrator',
                'phone' => '0770000000',
                'profile_image' => null,
                'password' => Hash::make('password'),
            ]);
    }
}