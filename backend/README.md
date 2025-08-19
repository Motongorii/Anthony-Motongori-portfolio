# Portfolio Analytics Backend

Real-time analytics backend for tracking website visitors, interactions, comments, and likes.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
MONGODB_URI=mongodb+srv://portfolio-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
ADMIN_PASSWORD=admin123
```

### 3. Start Server
```bash
npm run dev
```

## 📊 API Endpoints

### Analytics (Admin Only)
- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/page-views` - Page view stats
- `GET /api/analytics/real-time` - Live statistics

### Tracking (Public)
- `POST /api/tracking/page-view` - Track page visits
- `POST /api/tracking/interaction` - Track user actions
- `POST /api/tracking/scroll` - Track scroll depth

### Comments (Public + Admin)
- `GET /api/comments/post/:postId` - Get post comments
- `POST /api/comments/post/:postId` - Add comment
- `GET /api/comments/all` - All comments (admin)

### Likes (Public + Admin)
- `POST /api/likes/toggle` - Toggle like
- `GET /api/likes/count/:postId` - Get like count
- `GET /api/likes/all` - All likes (admin)

## 🔐 Authentication

Admin endpoints require header: `password: admin123`

## 📡 Real-time Features

Socket.IO integration for live updates:
- Live visitor count
- Real-time interactions
- Admin dashboard updates

## 🗄️ Database Collections

- **PageView**: Website visits and analytics
- **UserInteraction**: Clicks, scrolls, engagement
- **Comment**: Blog comments with approval
- **Like**: Post likes and engagement

## 🚀 Frontend Integration

```javascript
// Track page view
fetch('/api/tracking/page-view', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    page: 'home',
    sessionId: 'unique-id',
    userAgent: navigator.userAgent
  })
});

// Socket.IO connection
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');
```

## 📈 Features

- Real-time visitor tracking
- User behavior analytics
- Comment moderation system
- Like management
- Admin dashboard
- Performance optimized
- Rate limiting
- Spam protection
