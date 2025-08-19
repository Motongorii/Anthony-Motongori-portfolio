const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    index: true
  },
  contentType: {
    type: String,
    required: true,
    enum: ['blog_post', 'poem', 'comment', 'project'],
    default: 'blog_post'
  },
  userId: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    browser: String,
    os: String,
    device: String,
    country: String,
    city: String
  }
});

// Compound index to prevent duplicate likes
likeSchema.index({ postId: 1, userId: 1, contentType: 1 }, { unique: true });
likeSchema.index({ contentType: 1, timestamp: -1 });
likeSchema.index({ timestamp: -1 });

// Static method to get like count for a post
likeSchema.statics.getLikeCount = async function(postId, contentType = 'blog_post') {
  return await this.countDocuments({ postId, contentType });
};

// Static method to check if user liked a post
likeSchema.statics.hasUserLiked = async function(postId, userId, contentType = 'blog_post') {
  const like = await this.findOne({ postId, userId, contentType });
  return !!like;
};

// Static method to toggle like
likeSchema.statics.toggleLike = async function(postId, userId, contentType = 'blog_post', sessionData = {}) {
  const existingLike = await this.findOne({ postId, userId, contentType });
  
  if (existingLike) {
    // Unlike - remove the like
    await this.deleteOne({ _id: existingLike._id });
    return { liked: false, count: await this.getLikeCount(postId, contentType) };
  } else {
    // Like - create new like
    const newLike = new this({
      postId,
      userId,
      contentType,
      sessionId: sessionData.sessionId,
      ipAddress: sessionData.ipAddress,
      userAgent: sessionData.userAgent,
      metadata: sessionData.metadata
    });
    
    await newLike.save();
    return { liked: true, count: await this.getLikeCount(postId, contentType) };
  }
};

// Static method to get like analytics
likeSchema.statics.getLikeAnalytics = async function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const analytics = await this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          contentType: '$contentType',
          date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }
        },
        count: { $sum: 1 },
        uniqueUsers: { $addToSet: '$userId' }
      }
    },
    {
      $group: {
        _id: '$_id.contentType',
        dailyStats: {
          $push: {
            date: '$_id.date',
            count: '$count',
            uniqueUsers: { $size: '$uniqueUsers' }
          }
        },
        totalLikes: { $sum: '$count' },
        totalUniqueUsers: { $sum: { $size: '$uniqueUsers' } }
      }
    },
    {
      $sort: { totalLikes: -1 }
    }
  ]);

  return analytics;
};

// Static method to get top liked posts
likeSchema.statics.getTopLikedPosts = async function(contentType = 'blog_post', limit = 10) {
  return await this.aggregate([
    {
      $match: { contentType }
    },
    {
      $group: {
        _id: '$postId',
        likeCount: { $sum: 1 },
        lastLiked: { $max: '$timestamp' }
      }
    },
    {
      $sort: { likeCount: -1, lastLiked: -1 }
    },
    {
      $limit: limit
    }
  ]);
};

// Static method to get real-time like stats
likeSchema.statics.getRealTimeLikeStats = async function() {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const [hourly, daily, total] = await Promise.all([
    this.countDocuments({ timestamp: { $gte: oneHourAgo } }),
    this.countDocuments({ timestamp: { $gte: oneDayAgo } }),
    this.countDocuments()
  ]);

  return {
    hourly,
    daily,
    total,
    lastUpdated: now
  };
};

module.exports = mongoose.model('Like', likeSchema);
