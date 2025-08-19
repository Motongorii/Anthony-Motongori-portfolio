const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'work', 'writing', 'spoken-word', 'admin']
  },
  url: {
    type: String,
    required: true
  },
  userAgent: String,
  ipAddress: String,
  referrer: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: String,
  timeSpent: {
    type: Number,
    default: 0
  },
  isReturning: {
    type: Boolean,
    default: false
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  browser: String,
  os: String,
  country: String,
  city: String
});

// Indexes for better query performance
pageViewSchema.index({ page: 1, timestamp: -1 });
pageViewSchema.index({ sessionId: 1 });
pageViewSchema.index({ timestamp: -1 });

// Static method to get analytics data
pageViewSchema.statics.getAnalytics = async function(days = 30) {
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
          date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }
        },
        count: { $sum: 1 },
        uniqueSessions: { $addToSet: '$sessionId' },
        avgTimeSpent: { $avg: '$timeSpent' }
      }
    },
    {
      $group: {
        _id: '$_id.page',
        dailyStats: {
          $push: {
            date: '$_id.date',
            count: '$count',
            uniqueSessions: { $size: '$uniqueSessions' },
            avgTimeSpent: '$avgTimeSpent'
          }
        },
        totalViews: { $sum: '$count' },
        totalUniqueSessions: { $sum: { $size: '$uniqueSessions' } }
      }
    },
    {
      $sort: { totalViews: -1 }
    }
  ]);

  return analytics;
};

// Static method to get real-time stats
pageViewSchema.statics.getRealTimeStats = async function() {
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

module.exports = mongoose.model('PageView', pageViewSchema);
