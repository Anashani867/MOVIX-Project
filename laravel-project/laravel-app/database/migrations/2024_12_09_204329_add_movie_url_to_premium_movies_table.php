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
        Schema::table('premium_movies', function (Blueprint $table) {
            $table->string('movie_url')->nullable()->after('video_url'); // Add the movie_url column
        });
    }

    public function down()
    {
        Schema::table('premium_movies', function (Blueprint $table) {
            $table->dropColumn('movie_url'); // Drop the movie_url column on rollback
        });
    }
};
