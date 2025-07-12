# Courier & Parcel Management System

A full-stack web application built with Next.js 15 + Tailwind CSS on the frontend, and Express.js + MongoDB on the backend, featuring real-time updates via Socket.IO and role-based access for Customers, Agents, and Admins.

---

## Table of Contents

1. [Tech Stack](#tech-stack)  
2. [Prerequisites](#prerequisites)  
3. [Installation](#installation)  
   1. [Clone the Repo](#clone-the-repo)  
   2. [Backend Setup](#backend-setup)  
   3. [Frontend Setup](#frontend-setup)  
4. [Environment Variables](#environment-variables)  
5. [Running the Application](#running-the-application)  
   1. [Backend](#backend)  
   2. [Frontend](#frontend)  
6. [Project Structure](#project-structure)  
7. [Features](#features)  
   - [Authentication & Roles](#authentication--roles)  
   - [Customer](#customer)  
   - [Agent](#agent)  
   - [Admin](#admin)  
   - [Real-Time Updates](#real-time-updates)  
   - [Reports & Analytics](#reports--analytics)  
8. [API Endpoints](#api-endpoints)  
9. [Socket.IO Events](#socketio-events)  
10. [Contributing](#contributing)  
11. [License](#license)

---

## Tech Stack

- **Frontend:** Next.js 15 · React · Tailwind CSS  
- **Backend:** Node.js · Express.js · MongoDB (Mongoose)  
- **Real-Time:** Socket.IO  
- **Reporting:** CSV (built-in), ExcelJS, PDFKit  
- **Auth:** JWT (jsonwebtoken) + bcryptjs  

---

## Prerequisites

- Node.js v18+ and npm  
- MongoDB instance (local or cloud)  

---

## Installation

### Clone the Repo

```bash
git clone https://github.com/your-username/courier-parcel-management.git
cd courier-parcel-management
