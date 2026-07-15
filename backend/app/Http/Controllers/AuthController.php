<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:8',
        ]);


        $memberRole = Role::where('name','Team Member')->first();


        $user = User::create([

            'role_id'=>$memberRole->id,
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),

        ]);


        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([

            'message'=>'User registered successfully',

            'token'=>$token,

            'user'=>$user

        ]);

    }



    public function login(Request $request)
    {

        $request->validate([

            'email'=>'required|email',

            'password'=>'required'

        ]);


        $user = User::where('email',$request->email)->first();


        if(!$user || !Hash::check($request->password,$user->password))
        {

            return response()->json([

                'message'=>'Invalid credentials'

            ],401);

        }


        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([

            'message'=>'Login successful',

            'token'=>$token,

            'user'=>$user->load('role')

        ]);

    }



    public function me(Request $request)
    {

        return response()->json(

            $request->user()->load('role')

        );

    }



    public function logout(Request $request)
    {

        $request->user()->currentAccessToken()->delete();


        return response()->json([

            'message'=>'Logged out successfully'

        ]);

    }


}