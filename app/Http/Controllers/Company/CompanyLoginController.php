<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CompanyLoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Company/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'company_code' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        // 1. Find the company
        $company = Company::where('company_code', $credentials['company_code'])->first();

        if (! $company || ! $company->is_active) {
            throw ValidationException::withMessages([
                'company_code' => 'Invalid company code or company is suspended.',
            ]);
        }

        // 2. Find the user within that specific company
        $user = User::where('company_id', $company->id)
                    ->where('email', $credentials['email'])
                    ->first();

        // 3. Check if user exists, is active, and password matches
        if (! $user || ! $user->is_active || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => 'These credentials do not match our records.',
            ]);
        }

        // 4. Log the user in
        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('company.dashboard');
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('company.dashboard');
    }
}
