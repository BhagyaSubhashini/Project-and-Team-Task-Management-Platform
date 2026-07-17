<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{


    /*
    |--------------------------------------------------------------------------
    | Get Users For Project Assignment
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

                User::with('role')->get()

            );

        }





        /*
        |--------------------------------------------------------------------------
        | Project Manager
        | Only Team Members can be assigned
        |--------------------------------------------------------------------------
        */


        if($role === "Project Manager")
        {

            return response()->json(

                User::with('role')
                ->whereHas(
                    'role',
                    function($query){

                        $query->where(
                            'name',
                            'Team Member'
                        );

                    }
                )
                ->get()

            );

        }




        return response()->json([],403);

    }









    /*
    |--------------------------------------------------------------------------
    | Create User
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {


        $validated = $request->validate([

            'role_id'=>'required|exists:roles,id',

            'name'=>'required|string|max:255',

            'email'=>'required|email|unique:users,email',

            'phone'=>'nullable|string|max:20',

            'password'=>'required|min:6',

        ]);




        $validated['password'] =
        Hash::make(
            $validated['password']
        );




        $user = User::create($validated);



        return response()->json([

            'message'=>'User created successfully',

            'user'=>$user->load('role')

        ],201);


    }










    /*
    |--------------------------------------------------------------------------
    | Show User
    |--------------------------------------------------------------------------
    */

    public function show(User $user)
    {

        return response()->json(

            $user->load('role')

        );

    }









    /*
    |--------------------------------------------------------------------------
    | Update User
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        User $user
    )
    {


        $validated=$request->validate([


            'role_id'=>'sometimes|exists:roles,id',

            'name'=>'sometimes|string|max:255',

            'email'=>'sometimes|email|unique:users,email,' . $user->id,

            'phone'=>'nullable|string|max:20',

            'password'=>'nullable|min:6',


        ]);





        if(isset($validated['password']))
        {

            $validated['password'] =
            Hash::make(
                $validated['password']
            );

        }
        else
        {

            unset($validated['password']);

        }





        $user->update($validated);



        return response()->json([

            'message'=>'User updated successfully',

            'user'=>$user->load('role')

        ]);


    }










    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    */

    public function destroy(User $user)
    {

        $user->delete();


        return response()->json([

            'message'=>'User deleted successfully'

        ]);

    }


}