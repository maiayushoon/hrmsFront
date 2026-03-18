HRMS Lite — Employee & Attendance Management System
📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System built to manage employees and track attendance efficiently. It provides a clean dashboard interface to view employee statistics, add/manage employees, and monitor attendance records with filtering capabilities.

The application is designed with a modern UI, responsive layout, and dark mode support, making it suitable for both desktop and mobile use.

🚀 Tech Stack
Frontend

React (with TypeScript)

Tailwind CSS

React Router DOM

Framer Motion (for animations)

Lucide React (icons)

Backend (Assumed)

REST API (FastAPI)

Other Tools

Axios (API handling)

LocalStorage (theme persistence)

⚙️ Features

📊 Dashboard with employee statistics

👥 Employee management (Add / Delete)

📅 Attendance tracking system

🔍 Attendance filtering by date

🌙 Dark mode support

📱 Fully responsive UI

⚡ Smooth page transitions

🛠️ Steps to Run Locally
1. Clone the Repository
git clone https://github.com/maiayushoon/hrmsFront.git
cd web
2. Install Dependencies
npm install
3. Configure API

Update your API base URL inside:

src/api/api.ts

Example:

baseURL: "http://localhost:8000"
4. Start Development Server
npm run dev
5. Open in Browser
http://localhost:5173
📁 Project Structure
src/
 ├── components/     # Layout, reusable UI
 ├── pages/          # Dashboard, Employees, Attendance
 ├── api/            # API configuration
 ├── types/          # TypeScript types
 └── App.tsx         # Main app with routing
⚠️ Assumptions & Limitations

Backend API is assumed to be running and accessible.

No authentication system is implemented (Admin is static).

Attendance summary depends on backend aggregation logic.

No pagination for large datasets.

Error handling is basic (alerts).

No real-time updates (manual refresh via API calls).

🔮 Future Improvements

🔐 Authentication & role-based access

📊 Analytics & charts

📁 Export reports (CSV/PDF)

🔄 Real-time updates (WebSockets)

📦 Pagination & search

🧪 Unit & integration tests

👨‍💻 Author

Developed as a modern HR dashboard project for learning and demonstration purposes.