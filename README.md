## 📌 ATS Tracker

An Applicant Tracking System (ATS) Tracker that helps recruiters and job seekers visually manage job applications using a Kanban board, gain insights through an analytics dashboard, and persist all data in MongoDB.

## 🚀 Project Overview
Organizing applications into stages (Applied, Interview, Offer, Rejected, etc.) with a Kanban board.

Providing analytics dashboards to track progress and success rates.

Offering a clean, modern UI with React + Tailwind CSS.

Using MongoDB as the database to store applications and analytics data.

## 🏗️ Architecture            
            
Frontend: React (Kanban board, analytics dashboard)

Backend: Node.js + Express.js (REST APIs)

Database: MongoDB (local or cloud - Atlas)

State Management: Redux Toolkit (optional if you used it)

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
  1. Clone repository
```bash
git clone https://github.com/<your-username>/ats-tracker.git
cd ats-tracker
```
  2. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
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
cd server
npm run dev

# Start frontend
cd ../client
npm run dev

```
5. Open in browser: http://localhost:5173

#🔹 Cloud Deployment
Backend (Node.js + Express)
  Deploy on Render / Railway / Heroku
  Use MongoDB Atlas connection string in .env

Frontend (React)
  Deploy on Vercel / Netlify
  Update API base URL to point to deployed backend

Example:
  Frontend: https://ats-tracker.vercel.app
  Backend: https://ats-tracker-api.onrender.com
  Database: MongoDB Atlas

# 📦 Libraries Used

Frontend

 React.js
 Tailwind CSS
 @hello-pangea/dnd (Drag & Drop Kanban)
 Recharts (Analytics/Charts)
 Redux Toolkit (State Management)

Backend
. Express.js
. Mongoose
. bcrypt (if authentication)
. jsonwebtoken (if authentication)
. dotenv

# Demo
[Video](https://drive.google.com/file/d/18WG0gSSXc9gCzxeugwXsbBS_Upb4Bvq7/view?usp=sharing)




# ✨ Features
✅ Visual Kanban board for tracking applications
✅ Analytics dashboard for insights
✅ CRUD operations for applications
✅ Authentication & JWT (if implemented)
✅ Rate limiting (optional)

# 👨‍💻 Author

. Ash Bagda
. GitHub: https://github.com/Ashwastaken78867
. LinkedIn: https://www.linkedin.com/in/bagdaash03/

