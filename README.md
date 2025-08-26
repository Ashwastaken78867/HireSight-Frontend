## 📌 ATS Tracker

An Applicant Tracking System (ATS) Tracker that helps recruiters and job seekers visually manage job applications using a Kanban board, gain insights through an analytics dashboard, and persist all data in MongoDB.

## 🚀 Project Overview
Organizing applications into stages (Applied, Interview, Offer, Rejected, etc.) with a Kanban board.

Providing analytics dashboards to track progress and success rates.

Offering a clean, modern UI with React + Tailwind CSS.

Using MongoDB as the database to store applications and analytics data.

## 🏗️ Architecture

┌───────────────────────────┐
│         Frontend          │
│  React + Tailwind + DnD   │
│  (Kanban board + Charts)  │
└─────────────┬─────────────┘
              │ REST API
┌─────────────▼─────────────┐
│         Backend           │
│ Node.js + Express.js      │
│ Routes + Controllers      │
└─────────────┬─────────────┘
              │
┌─────────────▼─────────────┐
│        Database           │
│       MongoDB Atlas       │
│ Applications + Users +    │
│ Analytics Collections     │
└───────────────────────────┘

Frontend: React (Kanban board, analytics dashboard)

Backend: Node.js + Express.js (REST APIs)

Database: MongoDB (local or cloud - Atlas)

State Management: Redux Toolkit (optional if you used it)
