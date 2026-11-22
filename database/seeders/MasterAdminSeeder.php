<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MasterAdmin;
use Illuminate\Support\Facades;
use Illuminate\Support\Facades\Hash;

class MasterAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MasterAdmin::updateOrCreate(
            ['email' => env('MASTER_ADMIN_EMAIL')],
            [
                'first_name' => 'Thabang',
                'last_name' => 'Mokgonyana',
                'password' => Hash::make(env('MASTER_ADMIN_PASSWORD')),
            ]
        );
    }
}
