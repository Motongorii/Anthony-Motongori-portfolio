import { io } from 'socket.io-client';

// Configuration
const BACKEND_URL = 'http://localhost:3001';

// Generate session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('portfolio_session_id', sessionId);
  }
  return sessionId;
};

// Get device info
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let device = 'desktop';
  if (/Android|iPhone|iPad/i.test(userAgent)) device = 'mobile';
  
  return {
    device,
    browser: userAgent.includes('Chrome') ? 'Chrome' : 'Other',
    os: userAgent.includes('Windows') ? 'Windows' : 'Other'
  };
};

// Track page view
export const trackPageView = async (pageName) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tracking/page-view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pageName,
        url: window.location.href,
        sessionId: getSessionId(),
        userAgent: navigator.userAgent,
        ...getDeviceInfo()
      })
    });
    
    if (response.ok) console.log(`📊 Page view tracked: ${pageName}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track user interaction
export const trackInteraction = async (type, element) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tracking/interaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: getSessionId(),
        page: getCurrentPage(),
        type,
        element: {
          id: element.id || null,
          className: element.className || null,
          tagName: element.tagName || null
        },
        coordinates: { x: event?.clientX, y: event?.clientY },
        userAgent: navigator.userAgent
      })
    });
    
    if (response.ok) console.log(`📊 Interaction tracked: ${type}`);
  } catch (error) {
    console.error('Error tracking interaction:', error);
  }
};

// Get current page
const getCurrentPage = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '') return 'home';
  if (path === '/work') return 'work';
  if (path === '/writing') return 'writing';
  if (path === '/spoken-word') return 'spoken-word';
  if (path === '/admin') return 'admin';
  return 'unknown';
};

// Initialize tracking
export const initAnalytics = () => {
  console.log('🚀 Initializing portfolio analytics...');
  
  // Track initial page view
  trackPageView(getCurrentPage());
  
  // Track clicks
  document.addEventListener('click', (event) => {
    trackInteraction('click', event.target);
  });
  
  // Track scroll
  let lastScrollDepth = 0;
  window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (Math.abs(scrollDepth - lastScrollDepth) >= 25) {
      lastScrollDepth = scrollDepth;
      trackScrollDepth(scrollDepth);
    }
  });
  
  console.log('✅ Analytics initialized!');
};

// Track scroll depth
const trackScrollDepth = async (scrollDepth) => {
  try {
    await fetch(`${BACKEND_URL}/api/tracking/scroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: getSessionId(),
        page: getCurrentPage(),
        scrollDepth,
        userAgent: navigator.userAgent
      })
    });
  } catch (error) {
    console.error('Error tracking scroll:', error);
  }
};

// Socket.IO connection
export const connectToAnalytics = (adminPassword = null) => {
  const socket = io(BACKEND_URL);
  
  socket.on('connect', () => {
    console.log('🔌 Connected to analytics backend');
    if (adminPassword) {
      socket.emit('join-admin', { password: adminPassword });
    }
  });
  
  socket.on('analytics-update', (data) => {
    window.dispatchEvent(new CustomEvent('analytics-update', { detail: data }));
  });
  
  return socket;
};
