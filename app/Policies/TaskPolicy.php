<?php


namespace App\Policies;
use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
     /**
     * Determine if the given user can create a task.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function create(User $user)
    {
        return $user->role === 'admin' || $user->role === 'user';
    }

    /**
     * Determine if the given user can view the task.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Task  $task
     * @return bool
     */
    public function view(User $user, Task $task)
    {
        return $user->role === 'admin' || $user->id === $task->user_id;
    }

    /**
     * Determine if the given user can update the task's status.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Task  $task
     * @return bool
     */
    public function updateStatus(User $user, Task $task)
    {
        return $user->role === 'admin' || $user->id === $task->user_id;
    }
    /**
 * Determine if the given user can delete the task.
 *
 * @param  \App\Models\User  $user
 * @param  \App\Models\Task  $task
 * @return bool
 */
public function delete(User $user, Task $task)
{
    return $user->role === 'admin' || $user->id === $task->user_id;
}
}
