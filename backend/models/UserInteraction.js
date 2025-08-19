const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  page: {
    type: String,
    required: true,
    enum: ['home', 'work', 'writing', 'spoken-word', 'admin']
  },
  type: {
    type: String,
    required: true,
    enum: ['click', 'scroll', 'hover', 'form_submit', 'button_press', 'link_click']
  },
  element: {
    id: String,
    className: String,
    tagName: String,
    text: String
  },
  coordinates: {
    x: Number,
    y: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  duration: Number, // For hover events
  scrollDepth: Number, // Percentage of page scrolled
  userAgent: String,
  ipAddress: String,
  metadata: {
    screenSize: String,
    viewportSize: String,
    devicePixelRatio: Number
  }
});

// Indexes for better query performance
userInteractionSchema.index({ sessionId: 1, timestamp: -1 });
userInteractionSchema.index({ page: 1, type: 1, timestamp: -1 });
userInteractionSchema.index({ timestamp: -1 });

// Static method to get interaction analytics
userInteractionSchema.statics.getInteractionAnalytics = async function(days = 30) {
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
    {
      $sort: { totalInteractions: -1 }
    }
  ]);

  return analytics;
};

// Static method to get heatmap data
userInteractionSchema.statics.getHeatmapData = async function(page, days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return await this.aggregate([
    {
      $match: {
        page: page,
        timestamp: { $gte: startDate },
        coordinates: { $exists: true }
      }
    },
    {
      $group: {
        _id: {
          x: { $round: ['$coordinates.x', -1] }, // Round to nearest 10px
          y: { $round: ['$coordinates.y', -1] }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

module.exports = mongoose.model('UserInteraction', userInteractionSchema);
