<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\ApiResponse;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return ApiResponse::error('Email or password is not correct', null, 401);

        }
        $user = auth()->user();

        $token = $user->createToken('token')->plainTextToken;
        $data = [
            'user' => $user,
            'token' => $token
        ];
        return ApiResponse::success( $data, 'login success');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('token')->plainTextToken;

        $data = [
            'user' => $user,
            'token' => $token
        ];
        return ApiResponse::success( $data, 'sussessfuly register',);
    }
}
