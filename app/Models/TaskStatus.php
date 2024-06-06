<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatus extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'is_default',
    ];

    // boot
    public static function boot()
    {
        parent::boot();

        static::addGlobalScope('userRole', function (Builder $builder) {
            if (auth()->check()) {
                $user = auth()->user();
                if ($user->role === 'user') {
                    $builder->whereNot('id', 1);
                }
            }
        });
    }


}
