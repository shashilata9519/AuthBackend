# Authentication System


- User Registration & Login
- Password Reset via OTP
- JWT Access & Refresh Tokens
- Role-Based Access Control (RBAC)
- Email service for OTP (using **nodemailer**)
- Simple frontend screens for authentication flows
- Postman API collection for testing

---

## Features

- **User Registration:** Create a new account with name, email, and password.
- **Login:** Authenticate using email and password.
- **OTP Password Reset:** Request a one-time password sent via email for password reset (expires in 10 minutes).
- **JWT Tokens:** Issue Access and Refresh tokens for secure authentication.
- **RBAC:** Admin and User roles with protected endpoints.
- **Frontend Screens:** Simple pages for registration, login, OTP submission, and password reset.

---


## Setup Instructions

### 1. Clone the repository

```
cd nestjs-auth-system
npm install
Create a .env file in the root
npm run start:dev



```
## Postman Guide

**Import the provided postman_collection.json.**

Set environment variables:
baseUrl = http://localhost:3000
Test APIs in this order:
Register
Login
Request OTP
Reset Password
Access Protected Routes
Use returned JWT tokens in Authorization header for protected routes.