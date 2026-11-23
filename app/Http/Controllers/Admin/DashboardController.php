<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $companies = Company::orderBy('name')->get(['id', 'name', 'status', 'is_active', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'companies' => $companies,
        ]);
    }
}
