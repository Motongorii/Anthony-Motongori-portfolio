import { useEffect, useCallback } from 'react';
import { trackPageView, trackInteraction, initAnalytics } from '../utils/analytics';

// Hook for page view tracking
export const usePageView = (pageName) => {
  useEffect(() => {
    trackPageView(pageName);
  }, [pageName]);
};

// Hook for interaction tracking
export const useInteractionTracking = () => {
  const trackClick = useCallback((element, type = 'click') => {
    trackInteraction(type, element);
  }, []);

  const trackButtonPress = useCallback((element) => {
    trackInteraction('button_press', element);
  }, []);

  const trackLinkClick = useCallback((element) => {
    trackInteraction('link_click', element);
  }, []);

  const trackFormSubmit = useCallback((element) => {
    trackInteraction('form_submit', element);
  }, []);

  return {
    trackClick,
    trackButtonPress,
    trackLinkClick,
    trackFormSubmit
  };
};

// Hook for initializing analytics
export const useAnalyticsInit = () => {
  useEffect(() => {
    initAnalytics();
  }, []);
};

// Hook for tracking specific elements
export const useElementTracking = (elementRef, type = 'click') => {
  const trackElement = useCallback(() => {
    if (elementRef.current) {
      trackInteraction(type, elementRef.current);
    }
  }, [elementRef, type]);

  return trackElement;
};

// Hook for tracking form interactions
export const useFormTracking = (formRef) => {
  const trackForm = useCallback((action) => {
    if (formRef.current) {
      trackInteraction(`form_${action}`, formRef.current);
    }
  }, [formRef]);

  return {
    trackFormSubmit: () => trackForm('submit'),
    trackFormFocus: () => trackForm('focus'),
    trackFormBlur: () => trackForm('blur')
  };
};
