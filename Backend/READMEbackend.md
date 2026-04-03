<h1 align="center">⚙️ Uber Clone Backend</h1>

<p align="center">
  Backend API for a real-time cab booking application built with Node.js, Express.js, MongoDB, Socket.io, and Google Maps API
</p>

<p align="center">
  <a href="https://github.com/your-username/your-repo-name"><b>📂 Repository</b></a> •
  <a href="https://uber-frontend-site.onrender.com/"><b>🌐 Frontend Live Demo</b></a>
</p>

---

## 🌟 Overview

This is the **backend server** for the **Uber Clone** project.  
It handles **authentication, ride management, captain-user workflows, location-based services, and real-time communication**.

The backend is designed using a **modular architecture** with proper separation of concerns using:

- **Controllers** → Handle request/response logic  
- **Services** → Business logic  
- **Models** → MongoDB schemas  
- **Routes** → API endpoints  
- **Middleware** → Authentication & route protection  

---

## ⚡ Core Functionalities

- 👤 **User Authentication**
  - User signup/login
  - Secure token-based authentication

- 🚖 **Captain Authentication**
  - Captain signup/login
  - Ride acceptance and availability management

- 📍 **Maps & Location Services**
  - Address/location suggestions
  - Distance & time calculations
  - Fare estimation support

- 🛺 **Ride Management**
  - Create ride request
  - Confirm ride
  - Start / End ride
  - Ride status flow

- 🔄 **Real-Time Communication**
  - Socket-based event communication
  - User ↔ Captain ride updates

- 🛡️ **Protected Routes**
  - Middleware-based authorization
  - Role-based access protection

- 🚫 **Blacklist Token Support**
  - Secure logout implementation
  - Invalidates old tokens

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />
  <br/>
  <b>+ Socket.io • Google Maps API • JWT</b>
</p>

---

## 📂 Folder Structure

```bash
Backend/
│
├── controllers/
│   ├── captain.controller.js
│   ├── map.controller.js
│   ├── ride.controller.js
│   └── user.controller.js
│
├── database/
│   └── database.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── models/
│   ├── blacklistToken.model.js
│   ├── captain.model.js
│   ├── ride.model.js
│   └── user.model.js
│
├── routes/
│   └── (API route files)
│
├── services/
│   ├── captain.service.js
│   ├── maps.service.js
│   ├── ride.service.js
│   └── user.service.js
│
├── utils/
│
├── .env
├── .gitignore
└── app.js
