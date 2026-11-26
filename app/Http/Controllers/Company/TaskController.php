<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    // Show all tasks for the logged-in user's company
    public function index()
    {
        $user = Auth::user();

        // Get all tasks for this company, with their assignees loaded
        $tasks = Task::where('company_id', $user->company_id)
            ->with('assignees')
            ->latest()
            ->get();

        return Inertia::render('Company/Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    // Show the form to create a new task
    public function create()
    {
        $user = Auth::user();

        // Get all users in this company so we can assign tasks to them
        $users = User::where('company_id', $user->company_id)->get();

        return Inertia::render('Company/Tasks/Create', [
            'users' => $users,
        ]);
    }

    // Save the new task
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,done',
            'due_date' => 'nullable|date',
            'assignees' => 'required|array|min:1', // Must assign at least one user
            'assignees.*' => 'exists:users,id',
        ]);

        // 1. Create the task
        $task = Task::create([
            'company_id' => $user->company_id,
            'created_by' => $user->id,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'],
            'due_date' => $validated['due_date'] ?? null,
        ]);

        // 2. Attach the assigned users to the task (this populates the task_user table)
        $task->assignees()->attach($validated['assignees']);

        return redirect()->route('company.tasks.index')->with('success', 'Task created successfully!');
    }

    public function update(Request $request, Task $task)
    {
        // SECURITY CHECK: Never trust the client.
        // Ensure this task actually belongs to the logged-in user's company.
        if ($task->company_id !== auth()->user()->company_id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,done',
        ]);

        $task->update($validated);

        return redirect()->back()->with('success', 'Task status updated!');
    }
}
