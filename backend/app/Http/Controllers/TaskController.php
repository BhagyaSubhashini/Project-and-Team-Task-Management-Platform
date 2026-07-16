<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;


class TaskController extends Controller
{

    public function index()
    {
        return response()->json(
            Task::with([
                'project',
                'assignedUser',
                'creator'
            ])->get()
        );
    }



    public function store(Request $request)
    {

        $validated = $request->validate([

            'project_id'=>'required|exists:projects,id',

            'assigned_to'=>'required|exists:users,id',

            'title'=>'required|string',

            'description'=>'nullable|string',

            'status'=>'required|string',

            'priority'=>'required|string',

            'due_date'=>'nullable|date',

        ]);



        $task = Task::create([

            ...$validated,

            'created_by'=>$request->user()->id

        ]);



        return response()->json([

            'message'=>'Task created successfully',

            'task'=>$task

        ],201);

    }



    public function show(Task $task)
    {

        return response()->json(

            $task->load([
                'project',
                'assignedUser',
                'comments'
            ])

        );

    }




    public function update(Request $request, Task $task)
    {

        $task->update(

            $request->validate([

                'title'=>'sometimes|string',

                'description'=>'nullable|string',

                'status'=>'sometimes|string',

                'priority'=>'sometimes|string',

                'due_date'=>'nullable|date',

                'assigned_to'=>'sometimes|exists:users,id',

            ])

        );


        return response()->json([

            'message'=>'Task updated',

            'task'=>$task

        ]);

    }




    public function destroy(Task $task)
    {

        $task->delete();


        return response()->json([

            'message'=>'Task deleted'

        ]);

    }

}