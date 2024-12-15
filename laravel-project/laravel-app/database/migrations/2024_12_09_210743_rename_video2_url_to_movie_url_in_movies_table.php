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
        Schema::table('movies', function (Blueprint $table) {
            $table->string('movie_url', 191)->nullable(); // Add the new column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('movie_url'); // Rollback if needed
        });
    }
};
