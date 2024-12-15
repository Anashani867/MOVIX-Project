<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relationships
    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'category_movie');
    }

    public function shows()
    {
        return $this->belongsToMany(Show::class, 'category_show');
    }
}
