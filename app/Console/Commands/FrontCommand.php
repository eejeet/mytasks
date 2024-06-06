<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FrontCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'frontend';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentDirectory = getcwd();
        $this->info('Installing packages...');
        exec("cd $currentDirectory/frontend && npm i", $output);



        $choice = $this->choice('Frontend Script - Do you want to make a build to run the production server?', ['Yes', 'No'], 1);
        if ($choice === 'Yes') {
            $this->info('Building for production...');
            exec("cd $currentDirectory/frontend && npm run build", $output);
            foreach ($output as $line) {
            $this->line($line);
            }
        } else {
            $this->info('Frontend running in development mode.');
            exec("cd $currentDirectory/frontend && npm run build", $output);
            foreach ($output as $line) {
            $this->line($line);
        }
    }
    }
}
