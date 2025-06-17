#  Bulk CSV Upload with Real-Time Progress

This full-stack application allows users to upload CSV files and see real-time upload progress. Built with React (Frontend) and Node.js + Express (Backend), it supports CSV parsing, validations, and progress updates.

---

##  Features

- CSV file upload (Frontend UI)
- Real-time progress bar during upload
- Backend validation for file type and data
- Success/error response handling
- Neat UI using Tailwind CSS (or your styling)
- API integration between frontend and backend

---


---

## Tech Stack

- **Frontend:** React.js, Axios, TailwindCSS
- **Backend:** Node.js, Express.js, Multer
- **CSV Parsing:** `csv-parser` or `fast-csv`
- **Real-time Updates:** WebSocket 

---

## ⚙ Setup Instructions

###  Prerequisites

- Node.js (v16+)
- npm 
- MongoDB 
---

###  Backend Setup

```bash
cd backend
npm install
# Add .env file if needed
# Example: PORT=5000

npm start


