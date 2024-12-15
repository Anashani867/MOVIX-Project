<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration form.
     */
    public function create()
    {
        return view('auth.register'); // Returns the registration view
    }

    /**
     * Handle the registration of a new user.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create the new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create an API token for the user (using Sanctum or Passport)
        $token = $user->createToken('YourAppName')->plainTextToken;

        // Return the user data and token as a response
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }
}
