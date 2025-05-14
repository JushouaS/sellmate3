import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    logEvent(analytics, eventName, eventParams);
  }
};

// Common event types
export const AnalyticsEvents = {
  // Authentication events
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',
  
  // User interaction events
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  
  // E-commerce events
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  
  // Error events
  ERROR: 'error'
} as const; 