const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    index: true
  },
  author: {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    website: String
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  ipAddress: String,
  userAgent: String,
  sessionId: String,
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: {
    count: {
      type: Number,
      default: 0
    },
    users: [String] // Array of session IDs or user identifiers
  },
  metadata: {
    browser: String,
    os: String,
    device: String,
    country: String,
    city: String
  }
});

// Indexes for better query performance
commentSchema.index({ postId: 1, timestamp: -1 });
commentSchema.index({ isApproved: 1, timestamp: -1 });
commentSchema.index({ author: { email: 1 } });
commentSchema.index({ parentCommentId: 1 });

// Virtual for comment age
commentSchema.virtual('age').get(function() {
  const now = new Date();
  const diff = now - this.timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
});

// Static method to get comments for a post
commentSchema.statics.getCommentsForPost = async function(postId, includeReplies = true) {
  const query = { postId, isApproved: true, parentCommentId: null };
  
  if (includeReplies) {
    return await this.find(query)
      .populate({
        path: 'replies',
        match: { isApproved: true },
        options: { sort: { timestamp: 1 } }
      })
      .sort({ timestamp: -1 });
  }
  
  return await this.find(query).sort({ timestamp: -1 });
};

// Static method to get comment analytics
commentSchema.statics.getCommentAnalytics = async function(days = 30) {
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
          date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          isApproved: '$isApproved'
        },
        count: { $sum: 1 },
        totalLikes: { $sum: '$likes.count' }
      }
    },
    {
      $group: {
        _id: '$_id.date',
        totalComments: { $sum: '$count' },
        approvedComments: {
          $sum: {
            $cond: [{ $eq: ['$_id.isApproved', true] }, '$count', 0]
          }
        },
        pendingComments: {
          $sum: {
            $cond: [{ $eq: ['$_id.isApproved', false] }, '$count', 0]
          }
        },
        totalLikes: { $sum: '$totalLikes' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  return analytics;
};

// Method to add like
commentSchema.methods.addLike = function(userId) {
  if (!this.likes.users.includes(userId)) {
    this.likes.users.push(userId);
    this.likes.count += 1;
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove like
commentSchema.methods.removeLike = function(userId) {
  const index = this.likes.users.indexOf(userId);
  if (index > -1) {
    this.likes.users.splice(index, 1);
    this.likes.count = Math.max(0, this.likes.count - 1);
    return this.save();
  }
  return Promise.resolve(this);
};

module.exports = mongoose.model('Comment', commentSchema);
