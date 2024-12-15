<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('watchlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('movie_id')->nullable()->constrained('movies')->nullOnDelete();
            $table->foreignId('show_id')->nullable()->constrained('shows')->nullOnDelete();
            $table->foreignId('premium_movie_id')->nullable()->constrained('premium_movies')->nullOnDelete();  // Add foreign key for premium movies

            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watchlists');
    }
};
