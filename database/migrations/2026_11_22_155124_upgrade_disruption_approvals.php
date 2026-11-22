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
        Schema::table('company_disruption', function (Blueprint $table) {
            $table->string('verification_status', 20)->default('pending_company')->change();
        });

        Schema::table('company_disruption', function (Blueprint $table) {
            $table->dropConstrainedForeignId('verified_by');
            $table->dropColumn(['verified_at', 'rejection_reason']);
        });

        Schema::create('disruption_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_disruption_id')
                  ->constrained('company_disruption')
                  ->cascadeOnDelete();
            $table->foreignId('acted_by')->constrained('users')->restrictOnDelete();
            $table->string('stage', 10);
            $table->string('action', 10);
            $table->string('reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disruption_approvals');

        Schema::table('company_disruption', function (Blueprint $table) {
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('verified_at')->nullable();
            $table->string('rejection_reason')->nullable();
        });

        Schema::table('company_disruption', function (Blueprint $table) {
            $table->string('verification_status', 10)->default('pending')->change();
        });
    }
};
