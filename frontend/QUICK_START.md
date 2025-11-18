# Quick Start Guide

## Prerequisites

1. **Backend API must be running** on `http://localhost:8000`
   - Make sure your FastAPI backend is running
   - The backend should have CORS enabled (already added in `main.py`)

2. **Node.js** (v16 or higher) and npm installed

## Installation Steps

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## First Time Setup

1. **Register a new account** or **Login** if you already have one
2. You'll be redirected to the **Feed** page showing all blogs
3. Click **Create Blog** to create your first blog post
4. Click on any blog to view details, like, and comment

## Features Available

- ✅ **Authentication**: Register and Login
- ✅ **Feed**: View all blogs in chronological order
- ✅ **Create Blog**: Create new blog posts (requires login)
- ✅ **Edit/Delete Blog**: Edit or delete your own blogs
- ✅ **View Blog Details**: Read full blog content
- ✅ **Like/Unlike**: Toggle likes on blogs (requires login)
- ✅ **Comments**: Add and view comments on blogs (requires login)

## Troubleshooting

### Backend not running
If you see API errors, make sure your FastAPI backend is running on port 8000:
```bash
cd backend
# Activate your virtual environment
uvicorn app.main:app --reload
```

### CORS Errors
If you see CORS errors, make sure:
1. CORS middleware is added to `backend/app/main.py` (already done)
2. Backend is running on `http://localhost:8000`
3. Frontend is running on `http://localhost:3000`

### Port Already in Use
If port 3000 is already in use, Vite will automatically use the next available port (3001, 3002, etc.)

## API Endpoints Used

The frontend uses these backend endpoints:

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/me` - Get current user info

### Blogs
- `GET /feed/` - Get all blogs
- `GET /blogs/{id}` - Get blog by ID
- `POST /blogs/` - Create blog
- `PUT /blogs/{id}` - Update blog
- `DELETE /blogs/{id}` - Delete blog
- `POST /blogs/{id}/share` - Share blog

### Comments
- `GET /comments/blogs/{blog_id}` - Get comments for a blog
- `POST /comments/blogs/{blog_id}` - Add comment

### Likes
- `POST /likes/blogs/{blog_id}` - Toggle like on blog

