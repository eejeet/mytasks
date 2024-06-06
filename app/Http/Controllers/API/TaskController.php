<?php

namespace App\Http\Controllers\API;

use App\Events\StatusChanged;
use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Services\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    // tasks for using apiresource  route
    public function index()
    {

        $user = auth()->user();
        if ($user->role == 'admin') {
            $tasks = Task::with(['user', 'status', 'creator'])->latest()->get();
        } else {
            $tasks = Task::where('user_id', $user->id)->with(['user', 'status', 'creator'])->latest()->get();
        }
        // event(new StatusChanged($tasks[0]));
       return  ApiResponse::success( $tasks, 'Successfully Featch All Tasks' );
    }
    public function store(TaskRequest $request)
    {
        Gate::authorize('create', Task::class);

        $task = Task::create($request->all());
        return ApiResponse::success( $task,'Task Created Successfully');
    }

    public function update(TaskRequest $request, Task $task)
    {
        Gate::authorize('create', Task::class);


        $task->update($request->all());
        return ApiResponse::success( $task,'Task Updated Successfully');
    }
    public function destroy(Task $task)
    {

            if (auth()->user()->role == 'admin') {
                $task->delete();
                return ApiResponse::success(null, 'Task Deleted Successfully');
            } else {
                return ApiResponse::error('Unauthorized', 401);
            }

    }
    public function show(Task $task)
    {
        Gate::authorize('view', $task);
        return ApiResponse::success( $task,'Task Featched Successfully');
    }

}
