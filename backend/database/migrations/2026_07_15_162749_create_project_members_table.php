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
        Schema::create('project_members', function (Blueprint $table) {
            $table->id();

            // Project
            $table->foreignId('project_id')
                ->constrained('projects')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            // Team Member
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            // Member's role in this project (optional but useful)
            $table->string('member_role')->nullable();

            // Date the member joined the project
            $table->date('joined_at')->nullable();

            $table->timestamps();

            // Prevent duplicate assignments
            $table->unique(['project_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_members');
    }
};