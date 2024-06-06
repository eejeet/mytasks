<?php

namespace App\Mail;

use App\Models\Task;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StatusChangedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $task;
    public $user;

    /**
     * Create a new message instance.
     *
     * @param  \App\Models\Task  $task
     * @return void
     */
    public function __construct(Task $task, User $user)
    {
        $this->task = $task;
        $this->user = $user;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Task Status Changed, Task ID: '.$this->task->id)
                    ->markdown('emails.status_changed');
    }
}
