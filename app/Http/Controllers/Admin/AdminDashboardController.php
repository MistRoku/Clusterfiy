<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
     // Job 1: Show the dashboard and the list of companies
    public function index()
    {
        // Get all companies from the database, newest first
        $companies = Company::latest()->get();

        // Send the companies to the React page
        return Inertia::render('Admin/Dashboard', [
            'companies' => $companies,
        ]);
    }

    // Job 2: Save a new company when the form is submitted
    public function store(Request $request)
    {
        // 1. Check the data. If it's bad, stop and send errors back.
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'industry' => 'nullable|string|max:100',
            'package_tier' => 'required|string|in:basic,pro,enterprise',
        ]);

        // 2. Create the company in the database
        Company::create([
            'name' => $validated['name'],
            'industry' => $validated['industry'] ?? null,
            'package_tier' => $validated['package_tier'],
            'status' => 'trial', // New companies always start as a trial
            'is_active' => true, // And they are active by default
        ]);

        // 3. Send the user back to the dashboard with a success message
        return redirect()->route('admin.dashboard')->with('success', 'Company created successfully!');
    }
}
