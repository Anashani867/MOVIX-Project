<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'movie_id', 'show_id','premium_movie_id'];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    public function show()
    {
        return $this->belongsTo(Show::class);
    }
    public function premium_movie()
    {
        return $this->belongsTo(PremiumMovie::class, 'premium_movie_id');
    }
}
