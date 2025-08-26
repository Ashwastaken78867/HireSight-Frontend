## 📌 ATS Tracker

An Applicant Tracking System (ATS) Tracker that helps recruiters and job seekers visually manage job applications using a Kanban board, gain insights through an analytics dashboard, and persist all data in MongoDB.

## 🚀 Project Overview
- Organizing applications into stages (Applied, Interview, Offer, Rejected, etc.) with a Kanban board.

- Providing analytics dashboards to track progress and success rates.

- Offering a clean, modern UI with React + Tailwind CSS.

- Using MongoDB as the database to store applications and analytics data.

## 🏗️ Architecture            
            
Frontend: React (Kanban board, analytics dashboard)

Backend: Node.js + Express.js (REST APIs)

Database: MongoDB (local or cloud - Atlas)

## 🗄️ Database Schema

```bash
{
  "_id": "ObjectId",
  "company": "Google",
  "position": "Frontend Engineer",
  "status": "Interview",    // Applied, Interview, Offer, Rejected
  "appliedDate": "2025-08-01",
  "notes": "Follow up with HR"
}
```
## users Collection (if auth implemented)
```bash
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "passwordHash": "hashed_password",
  "role": "recruiter"
}
```
## ⚙️ Setup Instructions

# 🔹 Local Setup
  1. Clone repository for frontend and backend
```bash
git clone https://github.com/Ashwastaken78867/HireSight-Frontend.git
cd frontend
git clone https://github.com/Ashwastaken78867/HireSight-Backend.git
cd backend
```
  2. Install dependencies
```bash
# Backend
npm install

# Frontend
npm install
```
  3. Setup environment variables

Create .env file in server/ with:

```bash
MONGODB_URI=mongodb://localhost:27017/ats-tracker
PORT=5000

```
  4. Run the app
```bash
# Start backend
npm run dev

# Start frontend
npm run dev

```
5. Open in browser: http://localhost:5173

#🔹 Cloud Deployment
Backend (Node.js + Express)
 - Deploy on Render 
  - Use MongoDB Atlas connection string in .env

Frontend (React)
  - Deploy on Render
  - Update API base URL to point to deployed backend

Example:
  - Frontend: https://hiresight-frontend.onrender.com
  - Backend: https://hiresight-backend-1.onrender.com
  - Database: MongoDB free Cluster

# 📦 Libraries Used

Frontend

 - React.js
 - Tailwind CSS
 - @hello-pangea/dnd (Drag & Drop Kanban)
 - Recharts (Analytics/Charts)

Backend

- Express.js
- Mongoose
- bcrypt 
- jsonwebtoken 
- dotenv

# Demo
[Video Link](https://drive.google.com/file/d/18WG0gSSXc9gCzxeugwXsbBS_Upb4Bvq7/view?usp=sharing)

# ✨ Features
-  Visual Kanban board for tracking applications
-  Analytics dashboard for insights
-  CRUD operations for applications
-  Authentication
  
# 👨‍💻 Author

- Ash Bagda
- GitHub: https://github.com/Ashwastaken78867
- LinkedIn: https://www.linkedin.com/in/bagdaash03/

