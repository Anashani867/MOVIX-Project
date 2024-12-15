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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title', 191);
            $table->text('description');
            $table->string('image_url', 191);
            $table->string('release_date', 191);
            $table->unsignedInteger('rating')->nullable();
            $table->boolean('is_popular')->default(0);
            $table->string('video_url', 191)->nullable();
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
