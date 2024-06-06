<x-mail::message>
    # Status Changed for Task: {{ $task->name }}

    The status of task has been changed to {{ $task->status->name }} by {{ $user->name }}.
    The deadline date is {{ $task->deadline_date->format('d-m-Y') }}.

    Thanks,<br>
    {{ config('app.name') }}
    <x-mail::button :url="''">
        Action Button (Static);
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
