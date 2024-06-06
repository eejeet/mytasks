How to Install and Setup the Project to Run on a Server (If Not Mentioned, All Steps are Mandatory)

1. Install PHP 8.1, Composer, and Node.js on the server and use MySQL or MariaDB as the database.
2. Run the following commands in the terminal, making sure you are in the root folder of the project:

    1. ```
       composer install
       ```

        This will install the required libraries.

    2. ```
       php artisan project:setup
       ```

        1. Run and follow the wizard for API setup.

3. Open the .env file and configure the SMTP credentials for receiving emails.

Finally, the API server is ready to use. Now we need to set up our frontend script to run the application.

### Follow these steps to set up the frontend script (Now Frontend code not added to the )

1. Go to the frontend folder located in the root folder of the script.
2. Navigate to the \src\services\api.jsx file and change the value of the baseURL object to the API base URL.
3. Open the frontend folder in the terminal.
4. Run the following commands:

    1. ```
       npm i
       ```

        1. This will install the React.js dependencies.

    2. ```
       npm run dev
       ```

        1. This will open the frontend website/web app in development mode.
            1. If the development mode runs successfully, you can proceed to the next step to generate a build and use it on a production server (you can also follow these steps on a production server to generate a build).
        2. Run the following command:

```
npm run build
```
