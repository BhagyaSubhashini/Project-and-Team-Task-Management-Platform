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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            // Project Manager
            $table->foreignId('manager_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            // Project Details
            $table->string('name');
            $table->text('description')->nullable();

            // Project Status
            $table->enum('status', [
                'Pending',
                'In Progress',
                'Completed',
                'On Hold'
            ])->default('Pending');

            // Project Priority
            $table->enum('priority', [
                'Low',
                'Medium',
                'High'
            ])->default('Medium');

            // Dates
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};