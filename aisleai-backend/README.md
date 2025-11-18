# AisleAI Backend

## Overview
AisleAI is a simple backend application built with Express.js that provides authentication routes for user sign-up and sign-in. It uses MongoDB as the database and JSON Web Tokens (JWT) for secure authentication.

## Features
- User registration (sign-up)
- User authentication (sign-in)
- JWT-based authentication
- MongoDB for data storage

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- dotenv for environment variable management

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd aisleai-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the required environment variables:
   ```
   cp .env.example .env
   ```

### Running the Application
1. Start the application:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000` by default.

### API Endpoints
- **POST /api/auth/signup**: Register a new user
- **POST /api/auth/signin**: Authenticate a user and receive a JWT

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Inspired by various authentication tutorials and best practices in Node.js and Express.js.