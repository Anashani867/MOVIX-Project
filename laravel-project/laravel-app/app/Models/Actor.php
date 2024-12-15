<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relationships
    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'movie_actor');
    }

    public function shows()
    {
        return $this->belongsToMany(Show::class, 'show_actor');
    }
}
