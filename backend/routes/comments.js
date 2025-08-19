const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Middleware to check admin authentication
const requireAdmin = (req, res, next) => {
  const { password } = req.headers;
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Get comments for a specific post (public)
router.get('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { includeReplies = 'true' } = req.query;
    
    const comments = await Comment.getCommentsForPost(
      postId, 
      includeReplies === 'true'
    );

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comments'
    });
  }
});

// Add a new comment (public)
router.post('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const {
      author,
      content,
      parentCommentId,
      sessionId,
      ipAddress,
      userAgent
    } = req.body;

    // Validate required fields
    if (!author?.name || !author?.email || !content) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: author name, email, and content'
      });
    }

    // Basic spam detection
    const recentComments = await Comment.countDocuments({
      'author.email': author.email,
      timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) } // Last hour
    });

    if (recentComments >= 5) {
      return res.status(429).json({
        success: false,
        error: 'Too many comments from this email. Please wait before posting again.'
      });
    }

    const comment = new Comment({
      postId,
      author,
      content,
      parentCommentId,
      sessionId,
      ipAddress,
      userAgent,
      isApproved: false // Comments require admin approval
    });

    await comment.save();

    res.json({
      success: true,
      message: 'Comment submitted successfully and awaiting approval',
      data: {
        commentId: comment._id,
        status: 'pending_approval'
      }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add comment'
    });
  }
});

// Get all comments (admin only)
router.get('/all', requireAdmin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status = 'all',
      postId 
    } = req.query;

    let query = {};
    
    if (status !== 'all') {
      if (status === 'pending') query.isApproved = false;
      else if (status === 'approved') query.isApproved = true;
      else if (status === 'spam') query.isSpam = true;
    }
    
    if (postId) query.postId = postId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [comments, total] = await Promise.all([
      Comment.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('replies'),
      Comment.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        comments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching all comments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comments'
    });
  }
});

// Approve comment (admin only)
router.patch('/:commentId/approve', requireAdmin, async (req, res) => {
  try {
    const { commentId } = req.params;
    
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { 
        isApproved: true,
        isSpam: false 
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    res.json({
      success: true,
      message: 'Comment approved successfully',
      data: comment
    });
  } catch (error) {
    console.error('Error approving comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to approve comment'
    });
  }
});

// Mark comment as spam (admin only)
router.patch('/:commentId/spam', requireAdmin, async (req, res) => {
  try {
    const { commentId } = req.params;
    
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { 
        isSpam: true,
        isApproved: false 
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    res.json({
      success: true,
      message: 'Comment marked as spam',
      data: comment
    });
  } catch (error) {
    console.error('Error marking comment as spam:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark comment as spam'
    });
  }
});

// Delete comment (admin only)
router.delete('/:commentId', requireAdmin, async (req, res) => {
  try {
    const { commentId } = req.params;
    
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete comment'
    });
  }
});

// Get comment analytics (admin only)
router.get('/analytics', requireAdmin, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const analytics = await Comment.getCommentAnalytics(parseInt(days));

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching comment analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comment analytics'
    });
  }
});

// Bulk actions (admin only)
router.post('/bulk-actions', requireAdmin, async (req, res) => {
  try {
    const { action, commentIds } = req.body;

    if (!action || !commentIds || !Array.isArray(commentIds)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: action and commentIds array'
      });
    }

    let updateData = {};
    
    switch (action) {
      case 'approve':
        updateData = { isApproved: true, isSpam: false };
        break;
      case 'reject':
        updateData = { isApproved: false, isSpam: false };
        break;
      case 'spam':
        updateData = { isSpam: true, isApproved: false };
        break;
      case 'delete':
        await Comment.deleteMany({ _id: { $in: commentIds } });
        return res.json({
          success: true,
          message: `${commentIds.length} comments deleted successfully`
        });
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action. Use: approve, reject, spam, or delete'
        });
    }

    const result = await Comment.updateMany(
      { _id: { $in: commentIds } },
      updateData
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} comments ${action}ed successfully`,
      data: {
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    console.error('Error performing bulk actions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform bulk actions'
    });
  }
});

module.exports = router;
