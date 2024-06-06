<?php

namespace App\Models;

use App\Events\StatusChanged;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'deadline_date',
        'created_by',
        'user_id',
        'status_id',
        'role'
    ];
    protected $casts = [
        'deadline_date' => 'date',
    ];
    public static function boot()
    {
        parent::boot();

        static::creating(function ($task) {
            if(!$task->created_by){
                $task->created_by = auth()->id();
            }
        });

        static::updated(function ($task) {
            // send notification to the user when the task is updated. used for like  database notification,  Email, SMS, Slack, etc.
            if ($task->isDirty('status_id')) {
                event(new StatusChanged($task));
            }
        });



        // static::addGlobalScope('userRole', function (Builder $builder) {
        //     if (auth()->check()) {
        //         $user = auth()->user();
        //         if ($user->role === 'user') {
        //             // Include all tasks
        //         } else {
        //             $builder->where('user_id', $user->id);
        //         }
        //     }
        // });
    }

    //scope userRole




    /**
     * Get the status that owns the Task
     */
    public function status()
    {
        return $this->belongsTo(TaskStatus::class);
    }

    /**
     * Get the user that owns the Task
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
