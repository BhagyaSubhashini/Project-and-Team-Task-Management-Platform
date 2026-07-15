<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Project extends Model
{
    use HasFactory;


    protected $fillable=[
        'manager_id',
        'name',
        'description',
        'status',
        'priority',
        'start_date',
        'end_date'
    ];



    public function manager()
    {
        return $this->belongsTo(User::class,'manager_id');
    }



    public function members()
    {
        return $this->belongsToMany(
            User::class,
            'project_members'
        );
    }



    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}