# Project: NoCode Test Automation Platform

This document outlines the architecture, technology stack, and development plan for the NoCode Test Automation Platform. The goal is to create a web-based application that allows users to build, manage, and execute automated functional tests without writing code.

**Last Updated:** July 12, 2025

## 1. Product Goal

To empower users, including manual testers and business analysts, to automate functional test cases through an intuitive user interface. The platform will leverage a shared repository of test steps, promoting reusability and removing code duplication.

## 2. Core Features

-   **User Authentication:** Secure login and registration for individual users via Clerk.
-   **Gherkin Test Editor:** A web-based UI where users can write Cucumber test cases in the standard `Given`, `When`, `Then` format.
-   **Reusable Step Library:** Users can select from a pre-defined library of common test steps.
-   **Custom Step Creation:** If a required step doesn't exist, users can define new steps and their underlying implementation logic.
-   **One-Click Execution:** A simple button to trigger the execution of defined test scenarios.
-   **Results Dashboard:** A view to see the history and results of test executions.

### Backend APIs

-   **Swagger UI (`/swagger-ui.html`)**: Provides interactive API documentation.
-   **Test Cases API (`/api/v1/testcases`)**:
    -   `POST /`: Creates a new test case.
    -   `GET /`: Retrieves all test cases.
    -   `GET /{id}`: Retrieves a single test case by its ID.
    -   `DELETE /{id}`: Deletes a test case.
-   **Health Check API (`/api/v1/health`)**:
    -   `GET /`: Retrieves the health status of the application and its internal services.

## 3. Recommended Technology Stack

| Category                  | Technology                                     | Purpose & Notes                                                                          |
| ------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Frontend** | **React.js** (with Vite or Create React App)   | For building a fast, modern, and dynamic Single Page Application (SPA).                  |
| **Backend** | **Java 17+** with **Spring Boot 3** | To build a robust REST API. Leverages your existing comfort with the Java ecosystem.       |
| **Test Execution Engine** | **Your Existing Cucumber Framework** | Core engine for running tests. (Java, Cucumber, Gradle, TestNG).                       |
| **Database** | **PostgreSQL** | A powerful, open-source relational database to store user data, test cases, and results. |
| **Authentication** | **Clerk** | Handles user authentication and management securely. Free for up to 10k monthly active users. |
| **Deployment & DevOps** | **Docker**, **GitHub Actions**, **Heroku/AWS** | Containerize the app with Docker, automate CI/CD with GitHub Actions, and host on Heroku/AWS. |
| **CDN & Security** | **Cloudflare** | Provides a free CDN, DNS, SSL, and DDoS protection to enhance performance and security.    |

## 4. System Architecture

The project will be built as a **Monolithic Application** housed in a **Monorepo**. This simplifies development and deployment in the initial stages.

### Architectural Flow:

1.  **User Interaction:** The user accesses the **React Frontend** in their browser.
2.  **Authentication:** **Clerk**'s frontend components handle user sign-up and login, providing a JWT to the client.
3.  **API Communication:** The React app sends authenticated requests (with the JWT) to the **Java Spring Boot Backend** REST API for all operations (e.g., saving a test case).
4.  **Data Persistence:** The backend services interact with the **PostgreSQL Database** to create, read, update, and delete user data, test cases, and step definitions.
5.  **Test Execution Trigger:** When a user clicks "Start Execution," the frontend sends a request to a specific backend endpoint (e.g., `/api/v1/execute-tests`).
6.  **Test Engine Invocation:** The backend receives the request and programmatically invokes the **Cucumber Test Runner** class from your existing framework, passing the necessary test details (e.g., which feature file to run).
7.  **Reporting:** The Cucumber framework runs the tests, generates a results file (e.g., JSON), which the backend then parses and saves to the database. The frontend can then poll for and display these results.

### Proposed Project Structure (Monorepo):
```
/nocode-test-automation-platform/
|
|-- 📂 backend/
|   |-- src/main/java/com/yourcompany/nocode/
|   |   |-- controller/          \# REST API endpoints (e.g., TestCaseController)
|   |   |-- service/             \# Business logic (e.g., ExecutionService)
|   |   |-- repository/          \# Database interaction (Spring Data JPA)
|   |   |-- model/               \# Data entities (e.g., User, TestCase)
|   |   ` -- cucumber/            # Your existing Cucumber framework code 
|   |       |-- features/ 
|   |        `-- stepdefinitions/
|   ` -- build.gradle             # Backend dependencies and build scripts 
| |-- 📂 frontend/ 
|   |-- src/ 
|   |   |-- components/          # Reusable React components (Button, Editor) 
|   |   |-- pages/               # Top-level pages (Login, Dashboard) 
|   |    `-- services/            \# API client for backend communication
|   ` -- package.json             # Frontend dependencies and scripts 
| |-- 📂 .github/workflows/ 
|    `-- ci-cd-pipeline.yml       \# GitHub Actions workflow for automated deployment
|
\`-- 📄 Gemeni.md                  \# This file
```

## 5. Getting Started (Local Development)

### Prerequisites:

-   Git
-   Java JDK 17+
-   Node.js 18+ & npm
-   Docker & Docker Compose
-   Clerk Account (for API keys)

### Backend Setup:

1.  Navigate to the `backend` directory: `cd backend`
2.  Create an `application.properties` file in `src/main/resources`.
3.  Add database connection details, Clerk API keys, and other configurations.
4.  Run the application: `./gradlew bootRun`
5.  The backend server will start, typically on `http://localhost:8080`.

### Frontend Setup:

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file.
4.  Add your Clerk Frontend API key and the backend API URL (`VITE_API_BASE_URL=http://localhost:8080`).
5.  Start the development server: `npm run dev` (or `npm start`)
6.  The frontend will be accessible at `http://localhost:3000`.

## 6. Future Plans

-   **Custom Storage Integration:** Allow users to connect their own cloud storage (e.g., Google Drive, AWS S3) to save and manage their test artifacts.
-   **Advanced Reporting:** Integrate more detailed and visual test reports.
-   **CI/CD Integration:** Provide webhooks to allow users to trigger test runs from their own CI/CD pipelines (e.g., Jenkins, GitLab CI).
