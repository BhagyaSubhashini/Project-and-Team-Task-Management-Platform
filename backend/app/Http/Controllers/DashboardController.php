<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;



class DashboardController extends Controller
{


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


            return response()->json([


                "role"=>"Administrator",


                "total_users"=>User::count(),

                "total_projects"=>Project::count(),

                "total_tasks"=>Task::count(),



                "pending_tasks" =>
                    Task::where(
                        "status",
                        "Pending"
                    )->count(),



                "in_progress_tasks" =>
                    Task::where(
                        "status",
                        "In Progress"
                    )->count(),



                "completed_tasks" =>
                    Task::where(
                        "status",
                        "Completed"
                    )->count(),



                "recent_projects" =>
                    Project::latest()
                    ->take(5)
                    ->get()


            ]);

        }









        /*
        |--------------------------------------------------------------------------
        | Project Manager
        |--------------------------------------------------------------------------
        */


        if($role === "Project Manager")
        {


            $projects = Project::where(
                "manager_id",
                $user->id
            )->get();



            $tasks = Task::whereIn(
                "project_id",
                $projects->pluck('id')
            );



            return response()->json([


                "role"=>"Project Manager",


                "total_projects"=>$projects->count(),


                "total_tasks"=>$tasks->count(),



                "pending_tasks" =>
                    (clone $tasks)
                    ->where(
                        "status",
                        "Pending"
                    )
                    ->count(),



                "in_progress_tasks" =>
                    (clone $tasks)
                    ->where(
                        "status",
                        "In Progress"
                    )
                    ->count(),



                "completed_tasks" =>
                    (clone $tasks)
                    ->where(
                        "status",
                        "Completed"
                    )
                    ->count(),



                "recent_projects"=>$projects->take(5)



            ]);

        }











        /*
        |--------------------------------------------------------------------------
        | Team Member
        |--------------------------------------------------------------------------
        */


        if($role === "Team Member")
        {


            $tasks = Task::where(
                "assigned_to",
                $user->id
            );



            return response()->json([


                "role"=>"Team Member",


                "total_projects"=>0,


                "total_tasks"=>$tasks->count(),



                "pending_tasks" =>
                    (clone $tasks)
                    ->where(
                        "status",
                        "Pending"
                    )
                    ->count(),



                "in_progress_tasks" =>
                    (clone $tasks)
                    ->where(
                        "status",
                        "In Progress"
                    )
                    ->count(),



                "completed_tasks" =>
                    (clone $tasks)
                    ->where(
                        "status",
                        "Completed"
                    )
                    ->count(),



                "my_tasks"=>$tasks->get()



            ]);

        }





        return response()->json([
            "message"=>"Invalid role"
        ],403);



    }

}