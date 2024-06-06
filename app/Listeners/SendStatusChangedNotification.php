<?php

namespace App\Listeners;

use App\Events\StatusChanged;
use App\Mail\StatusChangedMail;
use App\Notifications\StatusChangedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendStatusChangedNotification implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\StatusChanged  $event
     * @return void
     */
    public function handle(StatusChanged $event)
    {
        if (!$event->task->user_id) {
            // we can use in future for sending to created_by user
            return;
        }

        $event->task->user->notify(new StatusChangedNotification($event->task));

    }
}
