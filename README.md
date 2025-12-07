# InsightStream: Navigate the News Landscape

A modern, responsive news aggregator application built with React, Tailwind CSS, and JSON-Server. InsightStream helps you stay informed by curating the latest headlines across multiple categories with a premium user experience.

## Features
- **Browse News**: View latest headlines by category (Technology, Sports, Entertainment, General).
- **Search**: Filter articles by keywords.
- **Favorites**: Save articles for later reading (persisted to backend and local storage).
- **Profile Management**: Update your user profile and resume details.
- **Premium UI**: Dark mode suppport, gradients, and responsive design.

## Prerequisites
- Node.js (v14 or higher)
- npm

## Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Application**
    This command runs both the React frontend and the JSON-Server backend concurrently.
    ```bash
    npm start
    ```
    - Frontend: `http://localhost:5173`
    - Backend: `http://localhost:3001`

## Project Structure
- `src/components`: Reusable UI components (Navbar, NewsCard).
- `src/pages`: Route components (Home, Category, Search, Profile).
- `src/context`: Global state management.
- `src/services`: API handling (Axios).
- `db.json`: Mock database for articles and user data.

## Offline Capability
The application syncs saved articles to `localStorage`, allowing you to view your favorites even if the backend is unreachable (simulated offline mode).
