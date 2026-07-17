<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;


class ProjectController extends Controller
{


    /*
    |--------------------------------------------------------------------------
    | Display Projects (RBAC)
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

        if($role === "Administrator")
        {

            return response()->json(

                Project::with('manager')
                ->with('members.role')
                ->latest()
                ->get()

            );

        }





        /*
        |--------------------------------------------------------------------------
        | Project Manager
        |--------------------------------------------------------------------------
        */

        if($role === "Project Manager")
        {

            return response()->json(

                Project::with('manager')
                ->with('members.role')
                ->where(
                    'manager_id',
                    $user->id
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

        if($role === "Team Member")
        {

            return response()->json(

                $user->projects()
                ->with('manager')
                ->with('members.role')
                ->latest()
                ->get()

            );

        }





        return response()->json([]);

    }









    /*
    |--------------------------------------------------------------------------
    | Create Project
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {


        $validated = $request->validate([


            'name'=>'required|string|max:255',

            'description'=>'nullable|string',

            'status'=>'required|string',

            'priority'=>'required|string',

            'start_date'=>'nullable|date',

            'end_date'=>'nullable|date',

            'manager_id'=>'nullable|exists:users,id'


        ]);








        /*
        |--------------------------------------------------------------------------
        | Assign Manager
        |--------------------------------------------------------------------------
        |
        | Administrator can select manager.
        | Project Manager becomes manager automatically.
        |
        */


        if(
            $request->user()->role->name === "Administrator"
            &&
            isset($validated['manager_id'])
        )
        {

            $managerId =
            $validated['manager_id'];

        }
        else
        {

            $managerId =
            $request->user()->id;

        }







        $project = Project::create([


            'name'=>$validated['name'],


            'description'=>$validated['description'] ?? null,


            'status'=>$validated['status'],


            'priority'=>$validated['priority'],


            'start_date'=>$validated['start_date'] ?? null,


            'end_date'=>$validated['end_date'] ?? null,


            'manager_id'=>$managerId


        ]);








        return response()->json([

            'message'=>'Project created successfully',

            'project'=>$project->load('manager')

        ],201);



    }









    /*
    |--------------------------------------------------------------------------
    | Show Project
    |--------------------------------------------------------------------------
    */

    public function show(
        Request $request,
        Project $project
    )
    {


        $user = $request->user();

        $role = $user->role->name;





        /*
        |--------------------------------------------------------------------------
        | Project Manager ownership check
        |--------------------------------------------------------------------------
        */


        if(
            $role === "Project Manager"
            &&
            $project->manager_id !== $user->id
        ){

            return response()->json([

                "message"=>"Unauthorized."

            ],403);

        }






        /*
        |--------------------------------------------------------------------------
        | Team Member access check
        |--------------------------------------------------------------------------
        */


        if(
            $role === "Team Member"
            &&
            !$project->members()
            ->where(
                'users.id',
                $user->id
            )
            ->exists()

        ){

            return response()->json([

                "message"=>"Unauthorized."

            ],403);

        }








        return response()->json(


            $project->load([

                'manager',

                'tasks',

                'members.role'

            ])

        );


    }









    /*
    |--------------------------------------------------------------------------
    | Update Project
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        Project $project
    )
    {


        $user = $request->user();






        /*
        |--------------------------------------------------------------------------
        | Project Manager can update only own projects
        |--------------------------------------------------------------------------
        */


        if(
            $user->role->name === "Project Manager"
            &&
            $project->manager_id !== $user->id
        ){

            return response()->json([

                "message"=>"You cannot update this project."

            ],403);

        }







        $validated = $request->validate([


            'name'=>'sometimes|string',


            'description'=>'nullable|string',


            'status'=>'sometimes|string',


            'priority'=>'sometimes|string',


            'start_date'=>'nullable|date',


            'end_date'=>'nullable|date',


            'manager_id'=>'nullable|exists:users,id'


        ]);








        $project->update(
            $validated
        );








        return response()->json([

            'message'=>'Project updated',

            'project'=>$project->load('manager')

        ]);

    }









    /*
    |--------------------------------------------------------------------------
    | Delete Project
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Request $request,
        Project $project
    )
    {


        $user = $request->user();







        /*
        |--------------------------------------------------------------------------
        | Project Manager ownership check
        |--------------------------------------------------------------------------
        */


        if(
            $user->role->name === "Project Manager"
            &&
            $project->manager_id !== $user->id
        ){

            return response()->json([

                "message"=>"You cannot delete this project."

            ],403);

        }







        $project->delete();







        return response()->json([

            'message'=>'Project deleted'

        ]);

    }



}