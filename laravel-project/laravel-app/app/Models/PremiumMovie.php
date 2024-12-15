<?php
// app/Models/PremiumMovie.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PremiumMovie extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'image_url', 'video_url','movie_url'];
}
