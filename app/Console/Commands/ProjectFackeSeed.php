<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ProjectFackeSeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:fake-seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed the database with fake data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        \App\Models\Task::factory(10)->create();
        $this->info('Task 10 Fake data seeded');

    }
}
