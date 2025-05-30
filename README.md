# Exchange Campus - University Materials Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Overview

Exchange Campus is a modern, full-featured marketplace designed for university students to easily buy, sell, and exchange academic materials such as textbooks, notes, and other study resources. The platform aims to create a trusted student-to-student community, helping users save money and connect with peers.

## ✨ Key Features

### Core Marketplace
-   Browse and search for materials by category, price, tags, etc.
-   Detailed material listings with images, descriptions, seller information, and pricing (USD).
-   Discount display for sales.
-   User-friendly material cards.
-   Interactive features: Wishlist, Add to Cart (conceptual).
-   Material previews and detailed views.
-   Featured materials section on the homepage.
-   Static content pages: "Features", "How It Works", "About Us".

### User & Authentication
-   Secure user registration and login using NextAuth.js (Credentials provider).
-   User profiles with statistics, activity feeds, and listed materials.
-   Ability to edit user profiles.
-   Protected routes for authenticated users.

### Admin Panel
-   Accessible at `/admin` for authorized administrators.
-   Dashboard with an overview of platform statistics.
-   **Recent Activity Log:** Tracks various platform events.
-   **Material Management:** Admins can view, upload, edit, and delete materials.
-   **User Management (Conceptual):** Admins can view and manage users.

## 🛠️ Tech Stack

-   **Framework:** Next.js (React)
-   **UI Library:** Chakra UI
-   **Authentication:** NextAuth.js
-   **Styling:** Tailwind CSS, CSS Modules (via Chakra UI)
-   **State Management:** React Context API / Local State (as per Next.js patterns)
-   **Linting/Formatting:** (Will be updated based on `package.json`)
-   **Deployment:** Vercel (or similar PaaS), GitHub Actions for CI/CD

## 📁 Project Structure

```
ExchangeCampus/
├── .github/                # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml      # Deployment script
├── components/             # Reusable React components for UI elements
├── lib/                    # Utility functions, helper modules (e.g., users.js)
├── pages/                  # Next.js page routes
│   ├── api/                # API routes (Next.js backend functions)
│   │   ├── auth/           # Authentication API endpoints ([...nextauth].js)
│   │   └── user/           # User-related API endpoints
│   ├── auth/               # Authentication pages (signin, signup, error)
│   └── profile/            # User profile related pages
├── public/                 # Static assets (images, fonts, favicon.ico)
├── styles/                 # Global styles (globals.css)
├── .env.local.example      # Example environment variables file (you should create .env.local)
├── .gitignore              # Specifies intentionally untracked files that Git should ignore
├── next.config.js          # Next.js configuration file
├── package.json            # Project metadata, dependencies, and scripts
├── postcss.config.js       # PostCSS configuration (used by Tailwind CSS)
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🏁 Getting Started

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm (comes with Node.js) or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/BlessedDayss/Exchange_Campus.git
    cd ExchangeCampus
    ```
    (Replace `https://github.com/BlessedDayss/Exchange_Campus.git` with the actual URL of your repository)

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    (Or `yarn install` if you prefer yarn)

### Running the Application

-   **Development Mode:**
    To start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

-   **Production Build:**
    To build the application for production:
    ```bash
    npm run build
    ```

-   **Start Production Server:**
    To start the production server (after running `npm run build`):
    ```bash
    npm run start
    ```

## �� Available Scripts

The following scripts are defined in `package.json`:

-   `npm run dev`: Starts the development server (usually on `http://localhost:3000`).
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server (after a build).
-   `npm run lint`: Runs the linter (ESLint) to check for code quality and style issues.

## 🔐 Authentication

-   Authentication is managed by **NextAuth.js**.
-   Currently configured with a **Credentials Provider** (email/password).
-   **Test Admin Credentials:**
    -   Email: `admin@example.com`
    -   Password: `password123`
-   **Key Authentication Routes:**
    -   `/auth/signin`: User sign-in page.
    -   `/auth/signup`: User sign-up page (if implemented, link or create this).
    -   `/api/auth/*`: Core NextAuth.js API endpoints.

## 🖥️ Admin Panel

The admin panel provides administrators with tools to manage the platform. It is accessible via the `/admin` route for authorized users.

-   **Dashboard Overview:** Displays key metrics and platform statistics.
-   **Recent Activity:** Logs important actions performed on the platform.
-   **My Materials / Material Management:** Allows admins to create, read, update, and delete (CRUD) material listings.
-   **Upload Materials:** A dedicated interface for adding new materials to the marketplace.

## 🛍️ Marketplace Features

The core of Exchange Campus, offering a rich user experience for trading academic materials.

-   **Homepage (`/`):** Introduces the platform with sections like Hero, Problem, Solution, Features, Featured Materials, How It Works, and Call To Action.
-   **Marketplace Page (`/marketplace`):**
    -   Displays a wide range of materials.
    -   Advanced search functionality.
    -   Filtering options (e.g., by category, price range, condition).
    -   Sorting options (e.g., newest, price, rating, downloads).
-   **Material Details:** Each material has a dedicated page with comprehensive information.
-   **User Profiles (`/profile`):** Users can view their listed items, purchase history (conceptual), and manage their account.

## 🚀 Deployment

-   This project is set up for easy deployment on platforms like **Vercel**.
-   A **GitHub Actions workflow** (`.github/workflows/deploy.yml`) is included for Continuous Integration and Continuous Deployment (CI/CD). This workflow typically builds and deploys the application upon pushes/merges to the main branch.

## 🗂️ Project Management & Issue Tracking

-   Project tasks, bug reports, and feature requests are tracked using **GitHub Issues** for this repository.
-   Please check the [Issues Tab](<your-repository-url>/issues) to see current tasks or report new ones.

## 🤝 Contributing

Contributions are welcome and highly appreciated! To contribute:

1.  **Fork the Repository:** Create your own copy of the project.
2.  **Create a Feature Branch:** `git checkout -b feature/YourAmazingFeature`
3.  **Commit Your Changes:** `git commit -m 'Add some AmazingFeature'`
4.  **Push to the Branch:** `git push origin feature/YourAmazingFeature`
5.  **Open a Pull Request:** Submit your changes for review.

Please ensure your code adheres to the project's linting rules and coding standards.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file (you might need to create this file if it doesn't exist and add the MIT license text to it). 