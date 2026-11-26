<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Load the company relationship so we can pass it to the frontend
        $user->load('company');

        return Inertia::render('Company/Dashboard', [
            'user' => $user,
            'company' => $user->company,
        ]);
    }
}
