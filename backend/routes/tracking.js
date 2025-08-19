const express = require('express');
const router = express.Router();
const PageView = require('../models/PageView');
const UserInteraction = require('../models/UserInteraction');

// Track page view
router.post('/page-view', async (req, res) => {
  try {
    const {
      page,
      url,
      userAgent,
      ipAddress,
      referrer,
      sessionId,
      device,
      browser,
      os,
      country,
      city
    } = req.body;

    // Validate required fields
    if (!page || !url || !sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: page, url, sessionId'
      });
    }

    // Check if this is a returning visitor
    const existingSession = await PageView.findOne({ sessionId });
    const isReturning = !!existingSession;

    const pageView = new PageView({
      page,
      url,
      userAgent,
      ipAddress,
      referrer,
      sessionId,
      isReturning,
      device,
      browser,
      os,
      country,
      city
    });

    await pageView.save();

    res.json({
      success: true,
      message: 'Page view tracked successfully',
      data: {
        pageViewId: pageView._id,
        isReturning
      }
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track page view'
    });
  }
});

// Track user interaction
router.post('/interaction', async (req, res) => {
  try {
    const {
      sessionId,
      page,
      type,
      element,
      coordinates,
      duration,
      scrollDepth,
      userAgent,
      ipAddress,
      metadata
    } = req.body;

    // Validate required fields
    if (!sessionId || !page || !type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId, page, type'
      });
    }

    const interaction = new UserInteraction({
      sessionId,
      page,
      type,
      element,
      coordinates,
      duration,
      scrollDepth,
      userAgent,
      ipAddress,
      metadata
    });

    await interaction.save();

    res.json({
      success: true,
      message: 'Interaction tracked successfully',
      data: {
        interactionId: interaction._id
      }
    });
  } catch (error) {
    console.error('Error tracking user interaction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track interaction'
    });
  }
});

// Track scroll depth
router.post('/scroll', async (req, res) => {
  try {
    const {
      sessionId,
      page,
      scrollDepth,
      userAgent,
      ipAddress
    } = req.body;

    if (!sessionId || !page || scrollDepth === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId, page, scrollDepth'
      });
    }

    const interaction = new UserInteraction({
      sessionId,
      page,
      type: 'scroll',
      scrollDepth,
      userAgent,
      ipAddress,
      timestamp: new Date()
    });

    await interaction.save();

    res.json({
      success: true,
      message: 'Scroll depth tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking scroll depth:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track scroll depth'
    });
  }
});

// Track time spent on page
router.post('/time-spent', async (req, res) => {
  try {
    const {
      sessionId,
      page,
      timeSpent,
      userAgent,
      ipAddress
    } = req.body;

    if (!sessionId || !page || !timeSpent) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId, page, timeSpent'
      });
    }

    // Update existing page view with time spent
    const pageView = await PageView.findOne({ sessionId, page }).sort({ timestamp: -1 });
    
    if (pageView) {
      pageView.timeSpent = timeSpent;
      await pageView.save();
    }

    res.json({
      success: true,
      message: 'Time spent tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking time spent:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track time spent'
    });
  }
});

// Get session info (for debugging)
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const [pageViews, interactions] = await Promise.all([
      PageView.find({ sessionId }).sort({ timestamp: -1 }),
      UserInteraction.find({ sessionId }).sort({ timestamp: -1 })
    ]);

    res.json({
      success: true,
      data: {
        sessionId,
        pageViews,
        interactions,
        totalPageViews: pageViews.length,
        totalInteractions: interactions.length
      }
    });
  } catch (error) {
    console.error('Error fetching session info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch session info'
    });
  }
});

// Health check for tracking service
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Tracking service is healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
