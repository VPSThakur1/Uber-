<h1 align="center">🎯 Uber Clone Frontend</h1>

<p align="center">
  A modern React-based frontend for a real-time cab booking application
</p>

<p align="center">
  <a href="https://uber-frontend-site.onrender.com/"><b>🌐 Live Demo</b></a> •
  <a href="https://github.com/your-username/your-repo-name"><b>📂 Repository</b></a>
</p>

---

## 🌟 Overview

This is the **frontend** of the Uber Clone project built using **React.js and Tailwind CSS**.  
It provides a smooth and responsive UI for users and captains to interact with the ride booking system.

The frontend handles:
- User & Captain interfaces
- Ride booking flow
- Real-time updates
- Location-based interaction

---

## ⚡ Features

- 👤 **User Interface**
  - Signup / Login
  - Book rides with pickup & destination

- 🚖 **Captain Interface**
  - Accept / manage rides
  - Ride status handling

- 📍 **Ride Booking Flow**
  - Location input panel
  - Vehicle selection
  - Fare estimation UI

- 🔄 **Real-Time Updates**
  - Socket.io integration
  - Live ride status updates

- 🗺️ **Live Tracking UI**
  - Real-time ride tracking interface

- 📱 **Responsive Design**
  - Mobile-first UI
  - Built with Tailwind CSS

- 🔐 **Protected Routes**
  - Role-based navigation control

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,tailwind" />
  <br/>
  <b>+ Socket.io Client • Google Maps Integration</b>
</p>

---

## 📂 Folder Structure

```bash
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── CaptainDetails.jsx
│   │   ├── ConfirmRide.jsx
│   │   ├── ConfirmRidePopUp.jsx
│   │   ├── FinishRide.jsx
│   │   ├── LiveTracking.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   ├── LookingForDriver.jsx
│   │   ├── RidePopUp.jsx
│   │   ├── VehiclePanel.jsx
│   │   └── WaitingForDriver.jsx
│   │
│   ├── context/
│   │   ├── CaptainContext.jsx
│   │   ├── SocketContext.jsx
│   │   └── UserContext.jsx
│   │
│   ├── pages/
│   │   ├── CaptainHome.jsx
│   │   ├── Captainlogin.jsx
│   │   ├── CaptainProtectedWrapper.jsx
│   │   ├── CaptainRiding.jsx
│   │   ├── CaptainSignup.jsx
│   │   ├── Home.jsx
│   │   ├── Riding.jsx
│   │   └── Start.jsx
│
└── (config files)
