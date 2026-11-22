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
        Schema::create('disruptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('disruption_type_id')->constrained()->restrictOnDelete();
            $table->foreignId('logged_by')->constrained('users')->restrictOnDelete();
            $table->string('source', 10)->default('observed');
            $table->string('scope', 10)->default('global');
            $table->string('title');
            $table->text('reason')->nullable();
            $table->dateTime('starts_at');
            $table->dateTime('ends_at')->nullable();
            $table->timestamps();
        });

        Schema::create('company_disruption', function (Blueprint $table) {
            $table->id();
            $table->foreignId('disruption_id')->constrained()->cascadeOnDelete();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->string('verification_status', 10)->default('pending');
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->dateTime('verified_at')->nullable();
            $table->string('rejection_reason')->nullable();
            $table->boolean('pauses_deadlines')->default(false);
            $table->unsignedSmallInteger('extension_days_granted')->default(0);
            $table->timestamps();
            $table->unique(['disruption_id', 'company_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_disruption');
        Schema::dropIfExists('disruptions');
    }
};
