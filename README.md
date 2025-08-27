# Campus Event Management System (CEMS)

A full-stack **MERN application** for managing campus events and competitions.  
The system supports both **student users** and an **admin**, providing role-based features for event registration and event management.

---

## Features

### Student
- Register and login securely
- View upcoming and past events
- Search events by name
- Register for events (with participant details: name, email, reg. no, department, year)
- Events marked as:
  - **Closed** if registration deadline has passed
  - **Full** if maximum participants are reached

### Admin
- Secure login with admin role
- Create new events (with date, time, and deadline validation)
- View participants for each event
- Filter events (upcoming/past)
- Search events by name
- Manage applications with a simple dashboard

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, Zustand, Axios  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ODM)  
- **Authentication**: JWT-based auth with role-based access  
- **Hosting**: Vercel (Frontend), Render/Other (Backend)  

---
Setup backend:

cd backend
npm install


Create a .env file in the backend folder with:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run backend:
npm run dev 

Setup frontend:
cd frontend
npm install

Create a .env file in the frontend folder with:
VITE_BACKEND_URL=http://localhost:5000


Run frontend:
npm run dev

Deployment
Frontend: Deploy React app on Vercel
Backend: Deploy Node/Express API on Render
 or similar

Set environment variables in deployment platforms:
MONGO_URI, JWT_SECRET for backend
VITE_BACKEND_URL (backend API URL) for frontend

Project Structure:
CEMS-FULL-APP/
│
├── backend/            # Express.js + MongoDB API
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── middleware/     # Auth and role-based checks
│   └── server.js       # Entry point
│
├── frontend/           # React + Tailwind app
│   ├── src/components/ # Reusable UI components
│   ├── src/pages/      # EventsPage, AdminEventsPage
│   ├── src/store/      # Zustand store
│   └── src/App.jsx     # Main app
│
└── README.md

Key Learnings:
Building a role-based authentication system (admin vs user)
Implementing pagination, search, and filters in MongoDB + React
Enforcing event deadlines and participant limits in backend logic
Deploying a full-stack MERN project with environment variable setup

Future Improvements:
Add email notifications for event registration
Improve UI with loading/error states

Implement global error handling middleware

Enhance security with input sanitization and rate limiting
