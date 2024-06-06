# MyTasks

This is a project for managing tasks and to-do lists. It features a user-friendly interface, a robust backend API, and a responsive design.

## Project Description

MyTasks is a web application built with React for the frontend and Laravel for the backend. It allows users to create, manage, and organize their tasks efficiently. The application offers features such as:

-   **Task Creation & Editing:** Create tasks with detailed descriptions, deadlines, and priorities.
-   **Task Completion & Progress Tracking:** Mark tasks as completed and track overall progress.
-   **User Authentication & Authorization:** Securely manage user accounts and permissions.
-   **Email and Database Notifications:** Receive reminders and notifications about upcoming tasks.

## Getting Started

### Prerequisites

-   **PHP 8.1:** [https://www.php.net/downloads.php](https://www.php.net/downloads.php)
-   **MySQL or MariaDB:** [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
-   **Composer:** [https://getcomposer.org/](https://getcomposer.org/)
-   **Node.js:** [https://nodejs.org/](https://nodejs.org/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/eejeet/mytasks
    ```

2. **Navigate to the project directory:**

    ```bash
    cd mytasks
    ```

3. **Install backend dependencies:**

    ```bash
    composer install
    ```

4. **Run the setup wizard:**

    ```bash
    php artisan project:setup
    ```

    - Follow the prompts to configure your API, database, and other settings.

5. **Configure environment variables:**

    - Open the `.env` file and set your database credentials, SMTP settings, and other environment variables.

6. **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    ```

7. **Start the frontend development server:**

    ```bash
    npm run dev
    ```

### Running the project

1. **Start the queue worker:**

    ```bash
    php artisan queue:work
    ```

    - **Note:** You might need to manually run this command to process queued tasks until you implement a scheduler.

2. **Access the frontend:**

    - Your api should be accessible at `projectDomain/api`

## Usage

1. **Create Tasks:** Add new tasks with descriptions, deadlines, and categories.
2. **Manage Tasks:** Edit, complete, and prioritize your tasks.
