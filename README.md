# Backend API for Blogging Platform

This is a backend API for a blogging platform using Node.js, Express, MongoDB, Cloudinary for image storage, and JWT for authentication.

## Prerequisites

- Node.js
- MongoDB
- Cloudinary account

## Installation

1. **Clone the repository:**

   ```bash
         --->git clone https://github.com/TharunGanji764/ZUAI-backend.git
         ---->cd ZUAI-backend

   Install dependencies:  
           ----->npm install
   Running the Application
      Start the server:
         --->npm start
API Endpoints
User Endpoints
Register User:

POST /register
Request body: { "username": "string", "email": "string", "password": "string" }
Response: { "message": "User Registered successfully" }
Login User:

POST /login
Request body: { "username": "string", "password": "string" }
Response: { "jwt": "string" }
Get All Users:

GET /users
Response: List of users with their posts.
Post Endpoints
Create Post:

POST /posts
Request body: { "title": "string", "author": "string", "topic": "string", "content": "string" }
Form-data: image (optional)
Response: { "message": "Post saved successfully" }
Get All Posts:

GET /posts
Response: List of all posts.
Get Specific Post:

GET /posts/:id
Response: Details of the post with the specified ID.
Update Post:

PUT /posts/:id
Request body: { "title": "string", "author": "string", "topic": "string", "content": "string" }
Response: { "message": "Post updated successfully" }
Delete Post:

DELETE /posts/:id
Response: { "message": "Post deleted successfully" }
