<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    // Job 1: Show the "Create User" form
    public function create()
    {
        // We need a list of companies so the admin can pick one from a dropdown
        $companies = Company::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Admin/Users/Create', [
            'companies' => $companies,
        ]);
    }

    // Job 2: Save the new user
    public function store(Request $request)
    {
        // 1. Check the data
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'first_name' => 'required|string|max:60',
            'last_name' => 'required|string|max:60',
            'email' => 'required|email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:company_admin,employee',
            'job_title' => 'nullable|string|max:60',
            'phone_number' => 'nullable|string|max:20',
            'id_number' => 'nullable|string|max:30',
        ]);

        // 2. Create the user. Notice we hash the password!
        User::create([
            'company_id' => $validated['company_id'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'job_title' => $validated['job_title'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'id_number' => $validated['id_number'] ?? null,
            'is_active' => true,
        ]);

        // 3. Send back to the dashboard with a success message
        return redirect()->route('admin.dashboard')->with('success', 'User created successfully!');
    }
}
