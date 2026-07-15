<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::updateOrCreate(
            [
                'name' => 'Administrator'
            ],
            [
                'description' => 'Full system access'
            ]
        );


        Role::updateOrCreate(
            [
                'name' => 'Project Manager'
            ],
            [
                'description' => 'Can create and manage projects and tasks'
            ]
        );


        Role::updateOrCreate(
            [
                'name' => 'Team Member'
            ],
            [
                'description' => 'Can view assigned projects and update tasks'
            ]
        );
    }
}