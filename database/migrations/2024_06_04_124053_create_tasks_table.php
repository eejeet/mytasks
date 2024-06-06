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
            // id, title, description, status, deadline
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'assingned', 'started', 'compleated'])->default('pending');
            $table->unsignedBigInteger('created_by')->comment('User who created the task');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->date('deadline_date')->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            //if created_by user is deleted then delete the task
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
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
