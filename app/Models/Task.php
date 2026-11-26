<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'company_id',
        'created_by',
        'title',
        'description',
        'status',
        'due_date',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date',
        ];
    }

    // A task belongs to the company
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // A task was created by one user
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // A task can be assigned to MANY users
    public function assignees()
    {
        return $this->belongsToMany(User::class);
    }
}
