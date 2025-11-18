# Blog Frontend - React Application

A modern React frontend application for the Blog API built with FastAPI.

## Features

- ✅ User Authentication (Login/Register)
- ✅ Blog Feed
- ✅ Create, Read, Update, Delete Blogs
- ✅ Like/Unlike Blogs
- ✅ Add Comments to Blogs
- ✅ Responsive UI with Tailwind CSS
- ✅ Protected Routes

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── BlogCard.jsx
│   │   ├── Comment.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/         # React contexts
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── BlogDetail.jsx
│   │   ├── CreateBlog.jsx
│   │   ├── EditBlog.jsx
│   │   ├── Feed.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/         # API services
│   │   └── api.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## API Integration

The frontend is integrated with all backend APIs:

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/me` - Get current user

### Blogs
- `GET /feed/` - Get all blogs (feed)
- `GET /blogs/{id}` - Get blog by ID
- `POST /blogs/` - Create blog (requires auth)
- `PUT /blogs/{id}` - Update blog (requires auth, owner only)
- `DELETE /blogs/{id}` - Delete blog (requires auth, owner only)
- `POST /blogs/{id}/share` - Share blog (requires auth)

### Comments
- `POST /comments/blogs/{blog_id}` - Add comment (requires auth)

### Likes
- `POST /likes/blogs/{blog_id}` - Toggle like (requires auth)

## Configuration

The API base URL is configured in `src/services/api.js`. By default, it's set to `http://localhost:8000`. You can change this if your backend runs on a different port.

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:
```bash
npm run preview
```

