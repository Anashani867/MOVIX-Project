<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Show user details
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    // Update User Profile
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        // العثور على المستخدم
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // تحديث البيانات
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->save();

        return response()->json($user);
    
    }
    

    // Update Profile Picture
    public function updateProfilePicture(Request $request, $id)
    {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // التحقق من وجود ملف الصورة
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
    
            // إنشاء اسم فريد للملف
            $filename = time() . '_' . $file->getClientOriginalName();
    
            // تحديد مسار الحفظ
            $filePath = public_path('images/avatars');
    
            // تخزين الصورة في المجلد المحدد
            $file->move($filePath, $filename);
    
            // تحديث مسار الصورة في قاعدة البيانات
            $user->avatar = '/images/avatars/' . $filename;
            $user->save();
    
            return response()->json(['message' => 'Profile picture updated successfully!', 'avatar' => $user->avatar], 200);
        }
    
        return response()->json(['message' => 'No image uploaded'], 400);
    }


    public function changePassword(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // التحقق من صحة البيانات المدخلة
        $validatedData = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        // التحقق من كلمة المرور الحالية
        if (!Hash::check($validatedData['current_password'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        // تحديث كلمة المرور الجديدة
        $user->password = Hash::make($validatedData['new_password']);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }
    
}
