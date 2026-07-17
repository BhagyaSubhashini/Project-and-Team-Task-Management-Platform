<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;


class ProjectMemberController extends Controller
{


    /*
    |--------------------------------------------------------------------------
    | Add Member To Project
    |--------------------------------------------------------------------------
    */

    public function addMember(
        Request $request,
        Project $project
    )
    {


        $request->validate([

            'user_id'=>'required|exists:users,id'

        ]);




        /*
        |--------------------------------------------------------------------------
        | Only Team Members can be added
        |--------------------------------------------------------------------------
        */


        $user = User::findOrFail(
            $request->user_id
        );



        if(
            $user->role->name !== "Team Member"
        )
        {

            return response()->json([

                'message'=>'Only Team Members can be assigned to projects.'

            ],422);

        }







        /*
        |--------------------------------------------------------------------------
        | Prevent duplicate members
        |--------------------------------------------------------------------------
        */


        $project->members()->syncWithoutDetaching([

            $user->id

        ]);







        return response()->json([

            'message'=>'Member added successfully'

        ]);

    }









    /*
    |--------------------------------------------------------------------------
    | Get Project Members
    |--------------------------------------------------------------------------
    */

    public function index(Project $project)
    {

        return response()->json(

            $project
            ->members()
            ->with('role')
            ->get()

        );

    }









    /*
    |--------------------------------------------------------------------------
    | Remove Member From Project
    |--------------------------------------------------------------------------
    */

    public function removeMember(
        Project $project,
        User $user
    )
    {



        /*
        |--------------------------------------------------------------------------
        | Remove user from pivot table
        |--------------------------------------------------------------------------
        */


        $project->members()->detach(

            $user->id

        );




        return response()->json([

            'message'=>'Member removed successfully'

        ]);

    }


}