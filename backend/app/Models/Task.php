<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Task extends Model
{


protected $fillable=[
    'project_id',
    'assigned_to',
    'created_by',
    'title',
    'description',
    'status',
    'priority',
    'due_date',
    'estimated_hours',
    'actual_hours'
];



public function project()
{
    return $this->belongsTo(Project::class);
}



public function assignedUser()
{
    return $this->belongsTo(
        User::class,
        'assigned_to'
    );
}



public function creator()
{
    return $this->belongsTo(
        User::class,
        'created_by'
    );
}



public function comments()
{
    return $this->hasMany(Comment::class);
}

}