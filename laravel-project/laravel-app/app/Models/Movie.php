<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_url',
        'release_date',
        'rating',
        'is_popular',
        'video_url',
    ];

    // Relationships
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'movie_genre');
    }

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'movie_actor');
    }
}
