# MyTasks

This is a project for managing tasks and to-do lists. It features a user-friendly interface, a robust backend API.

## Project Description

MyTasks is a web application built with React for the frontend and Laravel for the backend. It allows users to create, manage, and organize their tasks efficiently. The application offers features such as send notification to manager and user about the task status and Upcoming Deadline, Overdue Task Notification. Logged in user can see Notification History on his panel:

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

    - Open the `.env` file and set your SMTP credentials and settings, and other environment variables ( due to time limit, SMTP configration not added in project:setup commnad).

<!-- 6. **Run Frontend :**

    ```bash
        php artisan frontend
    ``` -->

6.  **Start the frontend development server:**

    -   goto frontend folder and run the commands

        ```bash
        npm i
        ```

        ```bash
        npm run dev
        ```

        -   it will take time when you run fist time becuse its installing some node.js liberry like react js and other that used in frontend devlopment.

### Running

1. **Start the queue worker:**

    ```bash
    php artisan queue:work
    ```

    - **Note:** You might need to manually run this command to process queued tasks until you implement a scheduler.

2. **Access the frontend and api:**

    - Your api should be accessible at `projectDomain/api`
    - You will see the Devlopment Server url after you have runned npm run dev command

    - (if i got the time for the work i will update more deatils and instruction about the project)

## Usage

1. **Create Tasks:** Add new tasks with title descriptions, deadlines, .
2. **Manage Tasks:** Drag and drop and Manage Status.

## Additional Features can Be Possible

Although the project is not fully complete, there are some additional features that can be added in the future:

1. **Deadline Notifications:** Implement a feature that sends notifications to users when a task's deadline is approaching or when it becomes overdue. This can help users stay on top of their tasks and ensure timely completion.

2. **Task Status Updates:** Allow users to update the status of their tasks, such as marking them as in progress, completed, or on hold. This can provide better visibility into the progress of tasks and help users prioritize their work.

3. **Task Reminders:** Add the ability for users to set reminders for specific tasks. This can be done through email notifications or in-app reminders, ensuring that users don't forget important deadlines or tasks.

4. **Task Prioritization:** Introduce a feature that allows users to prioritize their tasks based on urgency or importance. This can be done through a drag-and-drop interface or by assigning priority levels to tasks.

5. **Task Categories or Labels:** Implement a feature that allows users to categorize or label their tasks. This can help with organizing and filtering tasks based on different criteria, such as project, client, or priority.

# Task Notification System

As of now, we have successfully integrated the system to send notifications any time a task is updated. This marks a significant step in improving our task management processes and ensuring timely communication within our team.

Current Implementation:
User Role - Admin and User - Admin can creae and assign task to user. user and admin can change status of task as his authorize access.
Event: Task Update
Recipient: User (Task Assignee)
Notification: "The task 'Task Name' has been updated."

This implementation ensures that users are promptly informed of any changes to their tasks, facilitating better tracking and accountability.

Potential Enhancements:
To further enhance our Task Notification System, we can implement additional notification events for various critical moments in a task's lifecycle. Below is a list of suggested events categorized by recipient (managers and users).

For Managers:

-   Task Assignment Notification: When a new task is assigned to a user.
-   Task Acceptance Notification: When a user accepts a task.
-   Task Start Notification: When a user starts working on a task.
-   Progress Update Notification: When there is significant progress on a task.
-   Upcoming Deadline Notification: A few days before a task’s deadline.
-   Overdue Task Notification: When a task has missed its deadline.
-   Task Completion Notification: When a task is marked as completed.
-   Task Verification Notification: When a task is verified and approved.
-   Task Reassignment Notification: When a task is reassigned to another user.
-   Task Escalation Notification: When a task is escalated due to issues.
-   Task Cancellation Notification: When a task is canceled.
-   Comment and Feedback Notification: When comments or feedback are added to a task.

For Users (Task Assignees):

-   Task Assignment Notification: When a task is assigned to them.
-   Task Acceptance Reminder: Prompting the user to accept the assigned task.
-   Task Start Notification: When they need to start working on a task.
-   Progress Update Request: Requesting periodic updates on task progress.
-   Upcoming Deadline Notification: A few days before a task’s deadline.
-   Overdue Task Notification: When the task is overdue.
-   Task Completion Confirmation: When they mark a task as completed.
-   Task Reassignment Notification: When a task assigned to them is reassigned to another user.
-   Task Escalation Notification: When they escalate a task due to issues.
-   Comment and Feedback Notification: When comments or feedback are added to their task.
-   Daily Summary Notifications: Daily summary of their tasks.

These enhancements will provide a more comprehensive and efficient task management experience for both managers and users.
