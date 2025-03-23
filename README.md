# TextingNow

## Live Demo

- [Live App](https://texting-now.vercel.app)
- [GitHub Repository](https://github.com/arnav-aggarwal/texting-now)

**TextingNow** is a lightweight real-time chat application built with a modern web stack. It supports live messaging and user presence in a minimal, responsive interface. The project was built to demonstrate full-stack engineering proficiency, with an emphasis on clean design, performance, and functionality.

## Features

- Real-time text messaging using WebSockets (Socket.IO)
- Live user presence display
- Editable usernames with persistent identity and color
- Responsive, mobile-friendly UI
- Deployed frontend (React + Vite + Tailwind) and backend (Express + Socket.IO)

## Tech Stack

- **Frontend:** React, Vite, Zustand, Tailwind CSS, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO
- **Deployment:** Vercel (frontend), Render (backend)

## Running Locally

### Backend
1. Navigate to `backend/`
2. Install dependencies: ```npm install```
3. Start the server: ```npm start```
(Runs on port `4000` by default)

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: ```npm install```
3. Set your environment variable in a `.env` file: ```VITE_SERVER_URL=http://localhost:4000```
4. Start the development server: ```npm run dev```

## Purpose

This application was created as a demonstration of:

- Full-stack development using modern technologies
- Real-time communication using WebSockets
- Clean, accessible user interface design
- Deployment and environment configuration for production

The codebase is intentionally minimal, with a focus on core functionality and clarity.
