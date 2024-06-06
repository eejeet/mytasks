<?php

namespace App\Notifications;

use App\Mail\StatusChangedMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\DatabaseMessage;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class StatusChangedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $task;
    public $user;

    /**
     * Create a new notification instance.
     *
     * @param  \App\Models\Task  $task
     * @return void
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
        $this->user = $task->user;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Task - '. $this->task->name .' ('. $this->task->id .') status changed to - '. $this->task->status->name)
                    ->markdown('emails.status_changed', ['task' => $this->task, 'user' => $this->user]);
                    // this mail template using from StatusChangedMail, ---- Mail::to($notifiable->email)->queue(new StatusChangedMail($this->task, $notifiable));

    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'title' => 'Task - '. $this->task->name .' ('. $this->task->id .') status changed to - '. $this->task->status->name,
            'data' => $this->task->toArray(),
        ];
    }
}
