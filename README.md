# 🎨 **Anthony Motongori - Creative Portfolio**

> **Full-Stack Developer | Creative Writer | Digital Artist**

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://your-portfolio-url.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20MongoDB-blue)](https://github.com/Motongorii/Portfolio-backend)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 🌟 **About This Project**

A **modern, interactive portfolio** showcasing my creative work, technical skills, and professional experience. Built with cutting-edge technologies and designed for maximum user engagement.

### ✨ **Key Features**
- 🎭 **Interactive Poetry Section** - Share and engage with spoken word performances
- ✍️ **Creative Writing Blog** - Explore my books, creativity, and computing insights
- 💼 **Professional Work Showcase** - Detailed project portfolio with live demos
- 📊 **Real-time Analytics** - Track visitor engagement and content performance
- 💬 **Community Features** - Like, comment, and interact with content
- 🔐 **Admin Dashboard** - Content management and analytics insights

---

## 🚀 **Live Demo**

**[View Live Portfolio →](https://your-portfolio-url.vercel.app)**

**[Admin Dashboard →](https://your-portfolio-url.vercel.app/#/admin)**
*Password: `admin123`*

---

## 🛠️ **Technology Stack**

### **Frontend**
![React](https://img.shields.io/badge/React-18.0.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.2-010101?logo=socket.io)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-18.0-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5.0-47A248?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-7.5.0-880000?logo=mongoose)

### **Deployment & Hosting**
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-00F9FF?logo=render)

---

## 📱 **Project Structure**

```
portfolio-anthony/
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/               # Reusable UI components
│   ├── 📁 pages/                    # Main application pages
│   │   ├── 🏠 Home.jsx             # Landing page
│   │   ├── 💼 Work.jsx             # Project showcase
│   │   ├── ✍️ Writing.jsx          # Creative writing blog
│   │   ├── 🎭 SpokenWord.jsx       # Poetry & performances
│   │   └── 🔐 AdminDashboard.jsx   # Admin panel
│   ├── 📁 shared/                   # Shared components
│   ├── 📁 hooks/                    # Custom React hooks
│   └── 📁 utils/                    # Utility functions
├── 📁 backend/                      # Backend server
│   ├── 📁 models/                   # Database schemas
│   ├── 📁 routes/                   # API endpoints
│   └── 📁 middleware/               # Server middleware
├── 📁 public/                       # Static assets
└── 📁 docs/                         # Documentation
```

---

## 🎯 **Core Features**

### **🎭 Spoken Word Section**
- **Interactive Poetry Display** - Beautifully styled poem presentations
- **Community Engagement** - Like and comment on performances
- **Audio Integration** - Support for audio performances
- **Real-time Updates** - Live interaction tracking

### **✍️ Creative Writing Blog**
- **Multi-category Posts** - Books, creativity, computing insights
- **Rich Content Support** - Text, images, and formatting
- **User Interaction** - Like, comment, and share posts
- **Content Management** - Easy post creation and editing

### **💼 Professional Work Showcase**
- **Detailed Project Portfolio** - 10+ creative projects
- **Live Demos** - First 3 projects with working links
- **Work-in-Progress** - Showcase of ongoing development
- **Responsive Design** - Optimized for all devices

### **📊 Analytics Dashboard**
- **Real-time Tracking** - Page views, interactions, engagement
- **User Behavior Insights** - Click patterns, scroll depth, time spent
- **Content Performance** - Most popular posts and pages
- **Visitor Demographics** - Geographic and device analytics

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### **Frontend Setup**
```bash
# Clone the repository
git clone https://github.com/Motongorii/portfolio-anthony.git
cd portfolio-anthony

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Update .env with your MongoDB URI
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password

# Start backend server
npm run dev
```

### **Environment Variables**
```env
# Frontend (.env)
REACT_APP_API_URL=http://localhost:3001/api

# Backend (.env)
PORT=3001
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
NODE_ENV=development
```

---

## 🌐 **Deployment**

### **Frontend (Vercel)**
1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables**
4. **Deploy automatically**

### **Backend (Render)**
1. **Push backend to GitHub**
2. **Create Render Web Service**
3. **Set environment variables**
4. **Deploy and get URL**

### **Environment Variables for Production**
```env
# Frontend (Vercel)
REACT_APP_API_URL=https://your-backend-url.onrender.com/api

# Backend (Render)
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

---

## 📊 **API Endpoints**

### **Analytics**
- `GET /api/analytics/dashboard` - Comprehensive analytics data
- `GET /api/analytics/page-views` - Page view statistics
- `GET /api/analytics/interactions` - User interaction data

### **Comments**
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments/post/:postId` - Add a new comment
- `GET /api/comments/all` - Get all comments (admin)

### **Likes**
- `POST /api/likes/toggle` - Toggle like on content
- `GET /api/likes/check/:postId` - Check if user liked
- `GET /api/likes/count/:postId` - Get like count

### **Tracking**
- `POST /api/tracking/page-view` - Track page visit
- `POST /api/tracking/interaction` - Track user interaction
- `POST /api/tracking/scroll` - Track scroll depth

---

## 🎨 **Customization**

### **Styling**
- **Tailwind CSS** for consistent design
- **Custom color schemes** and gradients
- **Responsive breakpoints** for all devices
- **Dark/Light mode** support (coming soon)

### **Content Management**
- **Easy post creation** through admin panel
- **Rich text editor** for blog posts
- **Image upload** and management
- **SEO optimization** for better visibility

---

## 🔧 **Development**

### **Available Scripts**
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
npm run dev          # Start development server
npm start            # Start production server
npm run test         # Run tests (coming soon)
```

### **Code Quality**
- **ESLint** configuration for code consistency
- **Prettier** for code formatting
- **TypeScript** support (coming soon)
- **Unit tests** (coming soon)

---

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure responsive design

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **React Team** for the amazing framework
- **Vercel** for seamless deployment
- **MongoDB** for reliable database hosting
- **Tailwind CSS** for beautiful styling
- **Open Source Community** for inspiration

---

## 📞 **Contact & Support**

- **Portfolio**: [Live Demo](https://your-portfolio-url.vercel.app)
- **GitHub**: [@Motongorii](https://github.com/Motongorii)
- **Backend Repo**: [Portfolio Backend](https://github.com/Motongorii/Portfolio-backend)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

---

## ⭐ **Show Your Support**

If you find this project helpful, please give it a ⭐️ on GitHub!

---

<div align="center">

**Made with ❤️ by Anthony Motongori**

*Building digital experiences that inspire and engage*

</div>
