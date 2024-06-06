<?php

namespace App\Console\Commands;

use Artisan;
use Illuminate\Console\Command;

class ProjectSetup extends Command
{
    protected $signature = 'project:setup';
    protected $description = 'Project Setup - database, Task Status, and first User';

    public function handle()
    {
        Artisan::call('migrate:fresh');
        Artisan::call('db:seed');
        Artisan::call('project:fake-seed');

    }
}
