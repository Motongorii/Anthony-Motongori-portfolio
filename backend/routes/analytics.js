const express = require('express');
const router = express.Router();
const PageView = require('../models/PageView');
const UserInteraction = require('../models/UserInteraction');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

// Middleware to check admin authentication
const requireAdmin = (req, res, next) => {
  const { password } = req.headers;
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Get overall analytics dashboard data
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const [
      pageViews,
      interactions,
      comments,
      likes,
      realTimeStats
    ] = await Promise.all([
      PageView.getAnalytics(parseInt(days)),
      UserInteraction.getInteractionAnalytics(parseInt(days)),
      Comment.getCommentAnalytics(parseInt(days)),
      Like.getLikeAnalytics(parseInt(days)),
      PageView.getRealTimeStats()
    ]);

    res.json({
      success: true,
      data: {
        pageViews,
        interactions,
        comments,
        likes,
        realTimeStats,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch analytics data' 
    });
  }
});

// Get page view analytics
router.get('/page-views', requireAdmin, async (req, res) => {
  try {
    const { days = 30, page } = req.query;
    let query = {};
    
    if (page) {
      query.page = page;
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    query.timestamp = { $gte: startDate };

    const pageViews = await PageView.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            page: '$page',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }
          },
          count: { $sum: 1 },
          uniqueSessions: { $addToSet: '$sessionId' }
        }
      },
      {
        $group: {
          _id: '$_id.page',
          dailyStats: {
            $push: {
              date: '$_id.date',
              count: '$count',
              uniqueSessions: { $size: '$uniqueSessions' }
            }
          },
          totalViews: { $sum: '$count' },
          totalUniqueSessions: { $sum: { $size: '$uniqueSessions' } }
        }
      },
      { $sort: { totalViews: -1 } }
    ]);

    res.json({
      success: true,
      data: pageViews
    });
  } catch (error) {
    console.error('Error fetching page view analytics:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch page view analytics' 
    });
  }
});

// Get user interaction analytics
router.get('/interactions', requireAdmin, async (req, res) => {
  try {
    const { days = 30, page, type } = req.query;
    let query = {};
    
    if (page) query.page = page;
    if (type) query.type = type;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    query.timestamp = { $gte: startDate };

    const interactions = await UserInteraction.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            page: '$page',
            type: '$type'
          },
          count: { $sum: 1 },
          uniqueSessions: { $addToSet: '$sessionId' }
        }
      },
      {
        $group: {
          _id: '$_id.page',
          interactions: {
            $push: {
              type: '$_id.type',
              count: '$count',
              uniqueSessions: { $size: '$uniqueSessions' }
            }
          },
          totalInteractions: { $sum: '$count' }
        }
      },
      { $sort: { totalInteractions: -1 } }
    ]);

    res.json({
      success: true,
      data: interactions
    });
  } catch (error) {
    console.error('Error fetching interaction analytics:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch interaction analytics' 
    });
  }
});

// Get heatmap data for a specific page
router.get('/heatmap/:page', requireAdmin, async (req, res) => {
  try {
    const { page } = req.params;
    const { days = 7 } = req.query;
    
    const heatmapData = await UserInteraction.getHeatmapData(page, parseInt(days));
    
    res.json({
      success: true,
      data: {
        page,
        heatmapData,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch heatmap data' 
    });
  }
});

// Get real-time statistics
router.get('/real-time', requireAdmin, async (req, res) => {
  try {
    const [pageViews, interactions, comments, likes] = await Promise.all([
      PageView.getRealTimeStats(),
      UserInteraction.countDocuments({ timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
      Comment.countDocuments({ timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
      Like.getRealTimeLikeStats()
    ]);

    res.json({
      success: true,
      data: {
        pageViews,
        interactions,
        comments,
        likes,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching real-time stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch real-time stats' 
    });
  }
});

// Get top performing content
router.get('/top-content', requireAdmin, async (req, res) => {
  try {
    const { contentType = 'blog_post', limit = 10 } = req.query;
    
    const topLiked = await Like.getTopLikedPosts(contentType, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        contentType,
        topLiked,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching top content:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch top content' 
    });
  }
});

// Get visitor demographics
router.get('/demographics', requireAdmin, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const demographics = await PageView.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            device: '$device',
            browser: '$browser',
            os: '$os',
            country: '$country'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          devices: {
            $push: {
              device: '$_id.device',
              count: '$count'
            }
          },
          browsers: {
            $push: {
              browser: '$_id.browser',
              count: '$count'
            }
          },
          operatingSystems: {
            $push: {
              os: '$_id.os',
              count: '$count'
            }
          },
          countries: {
            $push: {
              country: '$_id.country',
              count: '$count'
            }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: demographics[0] || {
        devices: [],
        browsers: [],
        operatingSystems: [],
        countries: []
      }
    });
  } catch (error) {
    console.error('Error fetching demographics:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch demographics' 
    });
  }
});

module.exports = router;
