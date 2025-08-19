// API utility functions for backend communication

// Use environment variable or fallback to localhost for development
// For production, set REACT_APP_API_URL to your hosted backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Comments API
export const commentsAPI = {
  // Get comments for a specific post
  async getComments(postId) {
    return apiRequest(`/comments/post/${postId}`);
  },

  // Add a new comment
  async addComment(postId, commentData) {
    return apiRequest(`/comments/post/${postId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },

  // Get all comments (admin only)
  async getAllComments() {
    return apiRequest('/comments/all', {
      headers: {
        'X-Admin-Password': process.env.REACT_APP_ADMIN_PASSWORD || 'admin123',
      },
    });
  },
};

// Likes API
export const likesAPI = {
  // Toggle like for a post
  async toggleLike(postId, contentType = 'blog_post') {
    return apiRequest('/likes/toggle', {
      method: 'POST',
      body: JSON.stringify({ postId, contentType }),
    });
  },

  // Check if user has liked a post
  async checkLike(postId, contentType = 'blog_post') {
    return apiRequest(`/likes/check/${postId}?contentType=${contentType}`);
  },

  // Get like count for a post
  async getLikeCount(postId, contentType = 'blog_post') {
    return apiRequest(`/likes/count/${postId}?contentType=${contentType}`);
  },
};

// Analytics API
export const analyticsAPI = {
  // Track page view
  async trackPageView(pageData) {
    return apiRequest('/tracking/page-view', {
      method: 'POST',
      body: JSON.stringify(pageData),
    });
  },

  // Track user interaction
  async trackInteraction(interactionData) {
    return apiRequest('/tracking/interaction', {
      method: 'POST',
      body: JSON.stringify(interactionData),
    });
  },
};

export default {
  comments: commentsAPI,
  likes: likesAPI,
  analytics: analyticsAPI,
};
