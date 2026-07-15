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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            // Project
            $table->foreignId('project_id')
                ->constrained('projects')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            // User assigned to complete the task
            $table->foreignId('assigned_to')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            // User who created the task (usually Project Manager)
            $table->foreignId('created_by')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            // Task Information
            $table->string('title');
            $table->text('description')->nullable();

            // Status
            $table->enum('status', [
                'Pending',
                'In Progress',
                'Completed'
            ])->default('Pending');

            // Priority
            $table->enum('priority', [
                'Low',
                'Medium',
                'High'
            ])->default('Medium');

            // Dates
            $table->date('due_date')->nullable();

            // Time Tracking (Optional but useful)
            $table->integer('estimated_hours')->nullable();
            $table->integer('actual_hours')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};