<?php
// Subscription Model
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    // Add 'canceled_at' to the fillable array
    protected $fillable = [
        'user_id',
        'plan_name',
        'price',
        'started_at',
        'expires_at',
        'canceled_at', // Add canceled_at here
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
