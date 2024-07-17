<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pregnancy extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'term_date',
        'babies',
    ];

    /**
     * Get the user that owns the pregnancy.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
