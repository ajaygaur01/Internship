# 📝 Internship Blog Platform

Live Demo: [https://internship-1-azmw.onrender.com](https://internship-1-azmw.onrender.com)

This is a **rapid prototype blog platform** built as a **takeaway assignment**. It allows writers to log in, create and preview articles, upload cover images, and publish content with a clean, responsive UI.

---

## 🚀 Tech Stack

### 🔹 Frontend:
- **React.js** (with Vite)
- JavaScript
- Tailwind CSS (for styling)
- Axios (for API calls)

### 🔹 Backend:
- **Node.js + Express.js**
- **MongoDB** (for storing articles and users)
- **Redis (Upstash)** – used for caching
- **Sharp** – image compression and optimization

### 🔹 Deployment:
- Frontend and backend both deployed on **Render**
- Redis is hosted on **Upstash**

---

## ✨ Features

### ✅ Writer Login System
- Basic username/password login
- Authenticated routes for creating articles

### 🖼️ Image Upload
- Supports uploading cover images
- Images are compressed using **Sharp**

### 🖋️ Create Article Form
- **Title**
- **Slug** (auto or manual)
- **Cover Image** (via upload or URL)
- **Tags**
- **Content** (textarea or rich text editor)

### 🔍 Search Functionality
- Easily search through published articles

### 📄 Preview & Publish Workflow
- Writers can preview their article before publishing
- On clicking "Publish", article gets saved to MongoDB
- Published articles are displayed on a clean frontend

### 📱 Responsive Design
- Mobile-friendly and minimal UI using Tailwind CSS

---

## 🧪 Running Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev

3️⃣ Backend Setup(Make sure to create a .env file with the necessary MongoDB, Redis, and port config.)

bash
Copy code
cd backend
npm install
npx nodemon index.js

Make sure to create a .env file with the necessary MongoDB, Redis, and port config.

⚠️ Note
This project is a rapid prototype developed as part of an internship assignment. While it demonstrates core full-stack functionality, the code quality is not production-grade and may lack tests, security hardening, or advanced error handling.

