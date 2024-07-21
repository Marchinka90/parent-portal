# ParentPortal: Laravel + React

A comprehensive solution for parents to to track pregnancy terms, children's names and ages and view statistics.

## Features
1. **Registration & Login**
2. **Track Pregnancy Terms**
3. **Manage Children's Names and Ages**
4. **View Statistics**
5. **Responsive Design**
6. **Secure Authentication and Authorization**

## Installation
1. Clone the project repository:
   ```bash
   git clone https://github.com/Marchinka90/parent-portal-negbg.git
2. Navigate to the project's root directory:
   ```bash
    cd parent-portal
3. Create the .env file by copying the example file:
   ```bash
    cp .env.example .env
4. Install the PHP dependencies using Composer:
   ```bash
    composer install
5. Install the JavaScript dependencies using npm:
   ```bash
    npm install
6. Generate the application key:
   ```bash
    php artisan key:generate --ansi
7. Run the database migrations and seed the database:
   ```bash
    php artisan migrate --seed
8. Start the Vite development server for the frontend:
   ```bash
    npm run dev
9. Start the Artisan server for the backend:
   ```bash
    php artisan serve

## Usage

1. Open your browser and navigate to http://localhost:8000.
2. Register a new account or log in with an existing account.
3. Access the dashboard to:
 - Track pregnancy terms.
 - Manage children's names and ages.
4. View various statistics related to pregnancies and children.