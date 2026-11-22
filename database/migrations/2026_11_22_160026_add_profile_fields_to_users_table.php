<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name', 60)->after('name');
            $table->string('last_name', 60)->after('first_name');
            $table->string('id_number', 30)->nullable()->after('last_name');
            $table->string('phone_number', 20)->nullable()->after('id_number');
            $table->string('job_title', 60)->nullable()->after('phone_number');
            $table->boolean('is_active')->default(true)->after('password');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->after('id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'first_name', 'last_name', 'id_number',
                'phone_number', 'job_title', 'is_active',
            ]);
        });
    }
};
