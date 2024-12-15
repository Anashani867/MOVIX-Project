<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Show extends Model
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
        return $this->belongsToMany(Genre::class, 'show_genre');
    }

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'show_actor');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_show');
    }
}
