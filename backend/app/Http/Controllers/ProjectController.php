<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;


class ProjectController extends Controller
{

    public function index()
    {
        return response()->json(
            Project::with('manager')->get()
        );
    }



    public function store(Request $request)
    {

        $validated = $request->validate([

            'name'=>'required|string',

            'description'=>'nullable|string',

            'status'=>'required|string',

            'priority'=>'required|string',

            'start_date'=>'nullable|date',

            'end_date'=>'nullable|date',

        ]);



        $project = Project::create([

            ...$validated,

            'manager_id'=>$request->user()->id

        ]);



        return response()->json([

            'message'=>'Project created successfully',

            'project'=>$project

        ],201);

    }



    public function show(Project $project)
    {

        return response()->json(

            $project->load([
                'manager',
                'tasks'
            ])

        );

    }



    public function update(Request $request, Project $project)
    {


        $project->update(

            $request->validate([

                'name'=>'sometimes|string',

                'description'=>'nullable|string',

                'status'=>'sometimes|string',

                'priority'=>'sometimes|string',

                'start_date'=>'nullable|date',

                'end_date'=>'nullable|date',

            ])

        );


        return response()->json([

            'message'=>'Project updated',

            'project'=>$project

        ]);

    }



    public function destroy(Project $project)
    {

        $project->delete();


        return response()->json([

            'message'=>'Project deleted'

        ]);

    }

}