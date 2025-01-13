# Overview

A web application for admin/user authentication, user management, and KYC (Know Your Customer) submissions. Built with **React.js**, **Vite**, **TanStack React Query**, **Axios**, **Formik**, **Yup**, and **Material UI**.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v18 or higher) – JavaScript runtime environment.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/fakhergh/akw-app.git
    cd akw-app
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root of your project. The file should include:

    ### Environment Variables

    #### API URL:

    ```env
    VITE_API_URL=http://localhost:9000
    ```

    - **`VITE_API_URL`**: The URL of your backend API for fetching user data and submitting KYC forms.

4. Run the application in development mode:

    ```bash
    npm run dev
    ```

## Available Commands

Here are the available npm commands to manage the frontend project:

### Development

- **Run the app in development mode**:
    ```bash
    npm run dev
    ```
    This will start the Vite development server and watch for file changes.

### Build and Production

- **Run the app in production**:

    ```bash
    npm start
    ```

- **Build the app for production**:

    ```bash
    npm run build
    ```

- **Preview the production build**:
    ```bash
    npm run preview
    ```

### Code Quality

- **Check code quality with ESLint and Prettier**:

    ```bash
    npm run static:check
    ```

- **Automatically fix linting and formatting issues**:
    ```bash
    npm run static:fix
    ```

### Testing

- **Run unit tests**:

    ```bash
    npm run test
    ```

- **Run tests in watch mode**:
    ```bash
    npm run test:watch
    ```

## Credentials and Testing

For testing administrative functionality, you can use the following **admin credentials** to log into the system and access admin-related features:

- **Admin Login**:
    - **Email**: `admin@gmail.com`
    - **Password**: `0000`
    - **Admin Dashboard URL**: [https://akw-app-52341f1beac6.herokuapp.com/admin/auth/login](https://akw-app-52341f1beac6.herokuapp.com/admin/auth/login)

For a regular user, you can visit the following link to login or redirect to register page to create a new account: [https://akw-app-52341f1beac6.herokuapp.com/auth/login](https://akw-app-52341f1beac6.herokuapp.com/auth/login)

## Project File Structure

```
├── src/                               # Main source code directory
│   ├── assets/                        # Static assets like images, fonts, icons, etc.
│   ├── config/                        # Global configuration files (e.g., environment settings, routes)
│   ├── components/                    # Reusable UI components (e.g., buttons, inputs, modals)
│   ├── containers/                    # Components that combine UI and business logic
│   ├── hocs/                          # Higher-Order Components for reusable logic
│   ├── hooks/                         # Custom hooks for encapsulating logic (e.g., API fetching, form handling)
│   ├── icons/                         # Icon components, either custom or from a library (e.g., FontAwesome, Material Icons)
│   ├── interfaces/                    # TypeScript interfaces, types, and enums for type safety
│   ├── routes/                        # Page components corresponding to different routes (e.g., Dashboard, Login)
│   ├── services/                      # Functions and classes for interacting with backend APIs (e.g., Axios calls)
│   ├── styles/                        # Global styles, theme settings, and component-specific styles (e.g., CSS, SCSS, or Styled Components)
│   ├── utils/                         # Utility functions and helpers (e.g., date formatting, data transformations)
│   ├── main.tsx                       # Main entry point for the app
│   ├── routeTree.gen.tsx              # Generated route tree file (optional, if using dynamic routing libraries)
│   ├── vite-env.d.ts                  # Vite environment types (e.g., for accessing `import.meta.env` variables)
├── .env                               # Environment variables (e.g., API URLs, authentication keys)
├── .gitignore                         # Specifies files and directories to ignore in version control
├── .prettierrc                        # Prettier configuration for consistent code formatting
├── eslint.config.mjs                  # ESLint configuration for enforcing coding standards
├── jest.config.js                     # Jest configuration for unit and integration testing
├── package.json                       # Project dependencies, scripts, and metadata
├── README.md                          # Project documentation and instructions
├── tsconfig.json                      # TypeScript configuration
└── vite.config.ts                     # Vite configuration for building, bundling, and dev server setup
```

## Architecture

This project follows a **Container-based Architecture** where components are categorized into **containers** that combine both **UI rendering** and **business logic**. This approach ensures the application remains maintainable while keeping logic and rendering tightly coupled in the same components. Here's an overview of the architecture:

- Containers are components that manage both **UI rendering** and **business logic** (e.g., data fetching, state management, handling side effects).
- They handle communication with external services, such as API calls, and manage state or side effects like form submissions or authentication.
- Containers are often the **"smart" components** that encapsulate complex logic and state management, and then pass down data or actions to **presentational components** via props.
- They are typically **stateful** and are responsible for the **data flow** in the application.

**Example of a Container Component**:

```tsx
import { useState, useEffect } from 'react';
import { fetchUserData } from '../services/api';
import UserProfile from '../components/UserProfile';

const UserContainer = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchUserData();
            setUserData(data);
        };

        loadData();
    }, []);

    return <UserProfile user={userData} />;
};

export default UserContainer;
```

## Deployment

This project is **auto-deployed** to Heroku. Any changes pushed to the main branch are automatically deployed to the live environment.

You can access the live application here: [https://akw-app-52341f1beac6.herokuapp.com/auth/login](https://akw-app-52341f1beac6.herokuapp.com/auth/login)
