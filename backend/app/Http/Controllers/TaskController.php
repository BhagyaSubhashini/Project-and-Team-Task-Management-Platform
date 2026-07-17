<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | Display Tasks (RBAC)
    |--------------------------------------------------------------------------
    */
    public function index(Request $request)
    {
        $user = $request->user();

        $role = $user->role->name;

        /*
        |--------------------------------------------------------------------------
        | Administrator
        |--------------------------------------------------------------------------
        */

        if ($role === "Administrator") {

            return response()->json(

                Task::with([
                    'project',
                    'assignedUser',
                    'creator'
                ])
                ->latest()
                ->get()

            );

        }

        /*
        |--------------------------------------------------------------------------
        | Project Manager
        |--------------------------------------------------------------------------
        */

        if ($role === "Project Manager") {

            $projectIds = Project::where(
                'manager_id',
                $user->id
            )->pluck('id');

            return response()->json(

                Task::with([
                    'project',
                    'assignedUser',
                    'creator'
                ])
                ->whereIn(
                    'project_id',
                    $projectIds
                )
                ->latest()
                ->get()

            );

        }

        /*
        |--------------------------------------------------------------------------
        | Team Member
        |--------------------------------------------------------------------------
        */

        if ($role === "Team Member") {

            return response()->json(

                Task::with([
                    'project',
                    'assignedUser',
                    'creator'
                ])
                ->where(
                    'assigned_to',
                    $user->id
                )
                ->latest()
                ->get()

            );

        }

        return response()->json([],403);
    }






    /*
    |--------------------------------------------------------------------------
    | Create Task
    |--------------------------------------------------------------------------
    */

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



        $project = Project::findOrFail(
            $validated['project_id']
        );



        /*
        |--------------------------------------------------------------------------
        | Project Manager can only create tasks
        | inside projects they manage
        |--------------------------------------------------------------------------
        */

        if(
            $request->user()->role->name === "Project Manager"
            &&
            $project->manager_id !== $request->user()->id
        ){

            return response()->json([

                'message'=>'You cannot create tasks for this project.'

            ],403);

        }




        /*
        |--------------------------------------------------------------------------
        | Assigned user must belong to project
        |--------------------------------------------------------------------------
        */

        $isMember = $project
            ->members()
            ->where(
                'users.id',
                $validated['assigned_to']
            )
            ->exists();




        if(!$isMember){

            return response()->json([

                'message'=>'User is not a member of this project.'

            ],422);

        }





        $task = Task::create([

            ...$validated,

            'created_by'=>$request->user()->id

        ]);





        return response()->json([

            'message'=>'Task created successfully',

            'task'=>$task->load([

                'project',

                'assignedUser',

                'creator'

            ])

        ],201);

    }







    /*
    |--------------------------------------------------------------------------
    | Show Task
    |--------------------------------------------------------------------------
    */

    public function show(Request $request, Task $task)
    {

        $user = $request->user();

        $role = $user->role->name;



        if($role==="Administrator"){

            return response()->json(

                $task->load([
                    'project',
                    'assignedUser',
                    'creator',
                    'comments.user'
                ])

            );

        }



        if(
            $role==="Project Manager"
            &&
            $task->project->manager_id!=$user->id
        ){

            return response()->json([

                'message'=>'Unauthorized.'

            ],403);

        }



        if(
            $role==="Team Member"
            &&
            $task->assigned_to!=$user->id
        ){

            return response()->json([

                'message'=>'Unauthorized.'

            ],403);

        }



        return response()->json(

            $task->load([
                'project',
                'assignedUser',
                'creator',
                'comments.user'
            ])

        );

    }







    /*
    |--------------------------------------------------------------------------
    | Update Task
    |--------------------------------------------------------------------------
    */

    public function update(Request $request, Task $task)
    {

        if(
            $request->user()->role->name==="Project Manager"
            &&
            $task->project->manager_id!=$request->user()->id
        ){

            return response()->json([

                'message'=>'You cannot update this task.'

            ],403);

        }





        $validated = $request->validate([

            'title'=>'sometimes|string',

            'description'=>'nullable|string',

            'status'=>'sometimes|in:Pending,In Progress,Completed',

            'priority'=>'sometimes|in:Low,Medium,High',

            'due_date'=>'nullable|date',

            'assigned_to'=>'sometimes|exists:users,id',

        ]);





        if(isset($validated['assigned_to'])){

            $project = $task->project;

            $isMember = $project
                ->members()
                ->where(
                    'users.id',
                    $validated['assigned_to']
                )
                ->exists();

            if(!$isMember){

                return response()->json([

                    'message'=>'Assigned user must be a project member.'

                ],422);

            }

        }





        $task->update($validated);





        return response()->json([

            'message'=>'Task updated',

            'task'=>$task->load([

                'project',

                'assignedUser',

                'creator'

            ])

        ]);

    }








    /*
    |--------------------------------------------------------------------------
    | Delete Task
    |--------------------------------------------------------------------------
    */

    public function destroy(Request $request, Task $task)
    {

        if(
            $request->user()->role->name==="Project Manager"
            &&
            $task->project->manager_id!=$request->user()->id
        ){

            return response()->json([

                'message'=>'You cannot delete this task.'

            ],403);

        }



        $task->delete();



        return response()->json([

            'message'=>'Task deleted'

        ]);

    }

}