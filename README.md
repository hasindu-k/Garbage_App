# Garbage App

Full-stack smart waste management system with role-based workflows for residents, collectors, admins, and waste recording/recycling operations.

## Tech Stack

- **Frontend:** React (Create React App), React Router, Axios, Tailwind CSS, Material UI, Ant Design, Recharts/Chart.js
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Testing:** Jest + Supertest (backend)

## Main Features

- User registration/login with roles (`admin`, `collector`, `resident`, `recorder`)
- Resident pickup scheduling and garbage detail submission
- Collector assigned/approved pickup handling and profile/password management
- Waste recording module for collected waste entries and updates
- Recycling handover records with update/delete flows
- Admin dashboard with request, collector, and vehicle management views
- Data analytics and summary views (garbage/collection dashboards)

## Repository Structure

```text
Garbage_App/
├── frontend/   # React client application
└── backend/    # Express + MongoDB API
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB connection string

## Setup

### 1) Clone and install dependencies

```bash
# frontend dependencies
cd /home/runner/work/Garbage_App/Garbage_App/frontend
npm install

# backend dependencies
cd /home/runner/work/Garbage_App/Garbage_App/backend
npm install
```

### 2) Configure backend environment

Create `/home/runner/work/Garbage_App/Garbage_App/backend/.env` with:

```env
MONGODB_URL=<your-mongodb-connection-string>
PORT=8070
```

## Run the Application

Start backend:

```bash
cd /home/runner/work/Garbage_App/Garbage_App/backend
npm run dev
```

Start frontend (new terminal):

```bash
cd /home/runner/work/Garbage_App/Garbage_App/frontend
npm start
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:8070`.

> Note: The frontend currently calls backend APIs using `http://localhost:8070/...` paths in source files.

## Tests

Backend tests:

```bash
cd /home/runner/work/Garbage_App/Garbage_App/backend
npm test
```

## Key API Base Routes

- `/user`
- `/schedulePickup`
- `/approvedpickup`
- `/garbage`
- `/totalgarbage`
- `/collectedwaste`
- `/recycleWaste`
- `/api/vehicles`
- `/pickup`

## Authors

- Hasindu Koshitha
- IT22362476
