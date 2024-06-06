<?php

namespace App\Console\Commands;

use Artisan;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class ProjectSetup extends Command
{
    protected $signature = 'project:setup';
    protected $description = 'Project Setup - database, Task Status, and first User';
    protected $confirmed = false;

    public function handle()
    {
        $this->reloadEnvironmentVariables();

        $this->line('Welcome to the setup wizard!');
        $setupOptions = [
            'all' => 'Perform all setup steps (credentials, migrations, seeding)',
            'credentials' => 'Set up database credentials',
            'migrations' => 'Run database migrations',
            'seeding' => 'Seed data into the database',
            'exit' => 'Exit setup process',
        ];

            if (!env('DB_DATABASE')) {
                $this->info('Setup is required for the first time. Auto-selecting all steps.');
                $choice = 'all';
                $envError = $this->copyEnvFile();
                if ($envError) {
                    $this->error($envError);
                    return;
                }
            } else {
                $choice = $this->choice('Select a setup step or exit:', array_keys($setupOptions));
            }





        switch ($choice) {
            case 'all':
                $this->promptDatabaseCredentials();
                if ($this->checkTemporaryDatabaseConnection()) {
                    $this->storeCredentialsInEnvironment();
                    $this->runMigrations();
                    $this->runSeeding();
                    $this->info('Database setup completed successfully!');
                }
                break;
            case 'credentials':
                $this->promptDatabaseCredentials();
                if ($this->checkTemporaryDatabaseConnection()) {
                    $this->storeCredentialsInEnvironment();
                    $this->info('Database credentials set up!');
                }
                break;
            case 'migrations':
                $this->confirmMigrations();
                if ($this->confirmed) {
                    $this->runMigrations();
                    $this->info('Database migrations successful!');
                }
                break;
            case 'seeding':
                $this->confirmSeeding();
                if ($this->confirmed) {
                    $this->runSeeding();
                    $this->info('Database seeding successful!');
                }
                break;
            case 'exit':
                $this->info('Exiting setup wizard.');
                break;
        }
    }

    protected $credentials = [];

    protected function promptDatabaseCredentials()
    {

        if (env('APP_ENV') == 'production') {
            $this->error('Database credential prompting is not recommended in production environments.');
            return;
        }

        // tested with mysql only
        // $this->credentials['DB_CONNECTION'] = $this->choice('Select Database Driver we tested with Mysql Only:', array_keys(config('database.connections')), 1);
        $this->line('Database Must be mysql');

        $this->credentials['DB_CONNECTION'] = 'mysql';
        $this->credentials['DB_HOST'] = $this->ask('Database Host', 'localhost');
        $this->credentials['DB_PORT'] = $this->ask('Database Port', '3306');
        $this->credentials['DB_DATABASE'] = $this->ask('Database Name');
        $this->credentials['DB_USERNAME'] = $this->ask('Database Username');
        $this->credentials['DB_PASSWORD'] = $this->secret('Database Password');
    }

    protected function checkTemporaryDatabaseConnection()
    {
        Config::set('database.connections.'.$this->credentials['DB_CONNECTION'], [
            'driver' => $this->credentials['DB_CONNECTION'],
            'host' => $this->credentials['DB_HOST'],
            'port' => $this->credentials['DB_PORT'],
            'database' => $this->credentials['DB_DATABASE'],
            'username' => $this->credentials['DB_USERNAME'],
            'password' => $this->credentials['DB_PASSWORD'],
        ]);

        try {
            DB::connection($this->credentials['DB_CONNECTION'])->getPdo();
            $this->info('Database connection established successfully.');
            return true;
        } catch (\Exception $e) {
            $this->error('Database connection failed: ' . $e->getMessage());
            Log::error('Database connection failed: ' . $e->getMessage());
            return false;
        }
    }

    protected function confirmMigrations()
    {
        $this->confirmed = $this->confirm('Do you want to run database migrations?');
    }

    protected function confirmSeeding()
    {
        $this->confirmed = $this->confirm('Do you want to seed data into the database?');
    }

    protected function copyEnvFile()
    {
        try {
            if (!File::exists(base_path('.env'))) {
                if (!File::exists(base_path('.env.example'))) {
                    return '.env.example file is missing.';
                }
                copy(base_path('.env.example'), base_path('.env'));
                $this->info('.env file created successfully.');
                \Artisan::call('key:generate');
            } else {
                $this->info('.env file already exists.');
            }
            return null;
        } catch (\Exception $e) {
            Log::error('Failed to copy .env file: ' . $e->getMessage());
            return '.env file creation failed - ' . $e->getMessage();
        }
    }

    protected function storeCredentialsInEnvironment()
    {
        foreach ($this->credentials as $key => $value) {
            $this->updateEnvFile($key, $value);
        }
        $this->reloadEnvironmentVariables();
    }

    protected function updateEnvFile($key, $value)
    {
        $path = base_path('.env');

        if (File::exists($path)) {
            $contents = File::get($path);
            $pattern = "/^" . preg_quote($key, '/') . "=.*/m";

            if (preg_match($pattern, $contents)) {
                $contents = preg_replace($pattern, $key . '=' . $value, $contents);
            } else {
                $contents .= "\n" . $key . '=' . $value;
            }

            File::put($path, $contents);
        }
    }

    protected function checkDatabaseConnection()
    {
        try {
            DB::connection()->getPdo();
            $this->info('Database connection established successfully.');
            return true;
        } catch (\Exception $e) {
            Log::error('Database connection failed: ' . $e->getMessage());
            $this->error('Database connection failed: ' . $e->getMessage());
            return false;
        }
    }

    protected function runMigrations()
    {
        try {
            $this->reloadEnvironmentVariables();
            $this->call('migrate');

        } catch (\Exception $e) {
            Log::error('Migration failed: ' . $e->getMessage());
            $this->error('Migration failed: ' . $e->getMessage());
        }
    }

    protected function runSeeding()
    {
        try {
            $this->call('db:seed', ['--force' => true]);

            if (env('APP_ENV') !== 'production') { // Seed fake data for development
                $this->info('Seeding fake data for development...');
                //
            $this->call('project:fake-seed');
            }
        } catch (\Exception $e) {
            Log::error('Seeding failed: ' . $e->getMessage());
            $this->error('Seeding failed: ' . $e->getMessage());
        }
    }

    protected function reloadEnvironmentVariables()
    {
        $this->call('config:clear');
        $this->call('config:cache');
        // $this->info('Environment variables reloaded.');
    }
}
