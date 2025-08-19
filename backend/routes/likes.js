const express = require('express');
const router = express.Router();
const Like = require('../models/Like');

// Middleware to check admin authentication
const requireAdmin = (req, res, next) => {
  const { password } = req.headers;
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Toggle like on a post (public)
router.post('/toggle', async (req, res) => {
  try {
    const {
      postId,
      contentType = 'blog_post',
      userId,
      sessionId,
      ipAddress,
      userAgent,
      metadata
    } = req.body;

    // Validate required fields
    if (!postId || !userId || !sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: postId, userId, sessionId'
      });
    }

    // Check if user has already liked this post
    const existingLike = await Like.findOne({ postId, userId, contentType });
    
    if (existingLike) {
      // Unlike - remove the like
      await Like.deleteOne({ _id: existingLike._id });
      const newCount = await Like.getLikeCount(postId, contentType);
      
      return res.json({
        success: true,
        message: 'Post unliked successfully',
        data: {
          liked: false,
          count: newCount
        }
      });
    } else {
      // Like - create new like
      const newLike = new Like({
        postId,
        userId,
        contentType,
        sessionId,
        ipAddress,
        userAgent,
        metadata
      });
      
      await newLike.save();
      const newCount = await Like.getLikeCount(postId, contentType);
      
      return res.json({
        success: true,
        message: 'Post liked successfully',
        data: {
          liked: true,
          count: newCount
        }
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle like'
    });
  }
});

// Check if user has liked a post (public)
router.get('/check/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, contentType = 'blog_post' } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: userId'
      });
    }

    const hasLiked = await Like.hasUserLiked(postId, userId, contentType);
    const likeCount = await Like.getLikeCount(postId, contentType);

    res.json({
      success: true,
      data: {
        hasLiked,
        likeCount
      }
    });
  } catch (error) {
    console.error('Error checking like status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check like status'
    });
  }
});

// Get like count for a post (public)
router.get('/count/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { contentType = 'blog_post' } = req.query;

    const likeCount = await Like.getLikeCount(postId, contentType);

    res.json({
      success: true,
      data: {
        postId,
        contentType,
        likeCount
      }
    });
  } catch (error) {
    console.error('Error getting like count:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get like count'
    });
  }
});

// Get likes for multiple posts (public)
router.post('/counts', async (req, res) => {
  try {
    const { posts } = req.body;

    if (!posts || !Array.isArray(posts)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: posts array'
      });
    }

    const likeCounts = await Promise.all(
      posts.map(async (post) => {
        const count = await Like.getLikeCount(post.id, post.contentType || 'blog_post');
        return {
          postId: post.id,
          contentType: post.contentType || 'blog_post',
          likeCount: count
        };
      })
    );

    res.json({
      success: true,
      data: likeCounts
    });
  } catch (error) {
    console.error('Error getting like counts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get like counts'
    });
  }
});

// Get all likes (admin only)
router.get('/all', requireAdmin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      contentType,
      postId 
    } = req.query;

    let query = {};
    
    if (contentType) query.contentType = contentType;
    if (postId) query.postId = postId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [likes, total] = await Promise.all([
      Like.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Like.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        likes,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching all likes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch likes'
    });
  }
});

// Get like analytics (admin only)
router.get('/analytics', requireAdmin, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const analytics = await Like.getLikeAnalytics(parseInt(days));

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching like analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch like analytics'
    });
  }
});

// Get top liked posts (admin only)
router.get('/top-posts', requireAdmin, async (req, res) => {
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
    console.error('Error fetching top liked posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch top liked posts'
    });
  }
});

// Get real-time like stats (admin only)
router.get('/real-time', requireAdmin, async (req, res) => {
  try {
    const realTimeStats = await Like.getRealTimeLikeStats();

    res.json({
      success: true,
      data: realTimeStats
    });
  } catch (error) {
    console.error('Error fetching real-time like stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch real-time like stats'
    });
  }
});

// Remove like (admin only)
router.delete('/:likeId', requireAdmin, async (req, res) => {
  try {
    const { likeId } = req.params;
    
    const like = await Like.findByIdAndDelete(likeId);

    if (!like) {
      return res.status(404).json({
        success: false,
        error: 'Like not found'
      });
    }

    res.json({
      success: true,
      message: 'Like removed successfully'
    });
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove like'
    });
  }
});

// Bulk remove likes (admin only)
router.post('/bulk-remove', requireAdmin, async (req, res) => {
  try {
    const { likeIds } = req.body;

    if (!likeIds || !Array.isArray(likeIds)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: likeIds array'
      });
    }

    const result = await Like.deleteMany({ _id: { $in: likeIds } });

    res.json({
      success: true,
      message: `${result.deletedCount} likes removed successfully`,
      data: {
        deletedCount: result.deletedCount
      }
    });
  } catch (error) {
    console.error('Error performing bulk like removal:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform bulk like removal'
    });
  }
});

module.exports = router;
