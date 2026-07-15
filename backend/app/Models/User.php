<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = [
        'name',
        'email',
        'phone',
        'profile_image',
        'password',
        'role_id'
    ];


    protected $hidden = [
        'password',
        'remember_token'
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at'=>'datetime',
            'password'=>'hashed',
        ];
    }



    // User Role

    public function role()
    {
        return $this->belongsTo(Role::class);
    }



    // Projects managed by user

    public function managedProjects()
    {
        return $this->hasMany(Project::class,'manager_id');
    }



    // Projects assigned to user

    public function projects()
    {
        return $this->belongsToMany(
            Project::class,
            'project_members'
        );
    }



    // Assigned tasks

    public function tasks()
    {
        return $this->hasMany(Task::class,'assigned_to');
    }



    // Created tasks

    public function createdTasks()
    {
        return $this->hasMany(Task::class,'created_by');
    }



    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}