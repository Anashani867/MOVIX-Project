<?php
// database/migrations/xxxx_xx_xx_create_premium_movies_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePremiumMoviesTable extends Migration
{
    public function up()
    {
        Schema::create('premium_movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->string('image_url', 512); // Increase the length to 512 characters
            $table->string('video_url', 512);
            $table->string('release_date', 191);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('premium_movies');
    }
}
