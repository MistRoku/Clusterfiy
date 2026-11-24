<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    // This is the whitelist. Only these columns can be filled from a form.
    protected $fillable = [
        'name',
        'industry',
        'region',
        'country',
        'package_tier',
        'features',
        'status',
        'is_active',
    ];

    // This tells Laravel to automatically turn the JSON column into an array
    // and the boolean column into true/false.
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
