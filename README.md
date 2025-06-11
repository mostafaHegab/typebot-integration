# Twerlo-Typebot

## Overview

Twerlo-Typebot is a Node.js web application that integrates with the Typebot API to provide bot listing, interaction, and analytics features. It uses Express for the backend, EJS for server-side rendering, and SQLite for lightweight data storage.

## Architecture

### 1. Entry Point & Server Setup

-   **`src/app.js`**: Initializes the Express server, configures middleware (cookie-parser, CORS, body parsers), and sets EJS as the view engine. Registers main routes for authentication and bots.

### 2. Authentication

-   **Routes**: Defined in `src/components/auth/auth.routes.js`.
-   **Controller**: `auth.controller.js` handles login page rendering and login logic.
-   **Service**: `auth.service.js` authenticates users and generates JWT tokens.
-   **Middleware**: `src/middlewares/auth.middleware.js` protects routes by verifying JWT tokens in cookies.

### 3. Bots Feature

-   **Routes**: Defined in `src/components/bots/bots.routes.js` for listing bots, viewing a bot, and analytics.
-   **Controller**: `bots.controller.js` fetches data from the Typebot API and interacts with the database.
-   **Service**: `bots.service.js` handles API requests to Typebot for bots and analytics data.

### 4. Database

-   **`src/db/index.js`**: Sets up a SQLite database (`typebot.db`) and manages a `sessions` table to track bot usage by users.

### 5. Views

-   **EJS Templates**: Located in `src/views/` for rendering the login page, bots list, individual bot, and analytics.

### 6. Configuration

-   Uses environment variables for sensitive data (API keys, secrets, etc.).
-   Includes a health check endpoint at `/health`.

## Tech Stack

-   **Node.js**: JavaScript runtime for server-side development
-   **Express**: Web framework for building RESTful APIs and web applications
-   **EJS**: Embedded JavaScript templating for server-side rendering
-   **SQLite**: Lightweight SQL database for session and analytics storage
-   **Axios**: HTTP client for making requests to the Typebot API
-   **jsonwebtoken**: For JWT-based authentication
-   **cookie-parser**: Middleware for parsing cookies
-   **dotenv**: Loads environment variables from `.env` files
-   **cors**: Middleware for enabling Cross-Origin Resource Sharing
-   **nodemon** (dev): Utility for auto-restarting the server during development

## Project Structure

```
package.json
src/
  app.js
  components/
    auth/
      auth.controller.js
      auth.routes.js
      auth.service.js
    bots/
      bots.controller.js
      bots.routes.js
      bots.service.js
  db/
    index.js
    typebot.db
  middlewares/
    auth.middleware.js
  views/
    analytics.ejs
    bot.ejs
    bots.ejs
    login.ejs
```

## How It Works

-   Users log in with credentials (checked against environment variables).
-   Authenticated users can view available bots, interact with them, and see analytics.
-   Bot usage is tracked in the SQLite database.
-   All bot and analytics data is fetched from the external Typebot API.

## Setup Instructions

1. **Clone the repository:**
    ```powershell
    git clone <your-repo-url>
    cd Twerlo-Typebot
    ```
2. **Install dependencies:**
    ```powershell
    npm install
    ```
3. **Configure environment variables:**
    - Create a `.env` file in the root directory using the `.env.example` file.
4. **Start the application:**
    ```powershell
    npm start
    ```
5. **Access the app:**
    - Open your browser and go to `http://localhost:3000` (or the port you set in `.env`).

---

**Note:** This project is for demonstration and should not be used in production without further security and scalability considerations.
