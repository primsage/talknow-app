import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

class Tracker {
  private businessId: string;
  private sessionId: string;
  private events: any[] = [];
  private flushInterval: number = 5000; // 5 seconds

  constructor(businessId: string) {
    this.businessId = businessId;
    this.sessionId = localStorage.getItem('talknow_session_id') || Math.random().toString(36).substring(7);
    localStorage.setItem('talknow_session_id', this.sessionId);
    this.init();
  }

  private init() {
    window.addEventListener('click', (e) => this.trackEvent('click', { x: e.clientX, y: e.clientY, target: (e.target as HTMLElement).tagName }));
    window.addEventListener('scroll', () => this.trackEvent('scroll', { y: window.scrollY }));
    // Mouse movement sampling could be added here if needed, but keeping it light for now

    setInterval(() => this.flush(), this.flushInterval);

    // Track page view immediately
    this.trackEvent('page_view', { url: window.location.href, referrer: document.referrer });
  }

  private trackEvent(type: string, data: any) {
    this.events.push({
      type,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  }

  private async flush() {
    if (this.events.length === 0) return;

    const payload = {
      businessId: this.businessId,
      sessionId: this.sessionId,
      events: [...this.events],
      screen: { width: window.innerWidth, height: window.innerHeight }
    };

    this.events = [];

    try {
      await axios.post(`${API_URL}/widget/track`, payload);
    } catch (err) {
      console.error('Tracking failed', err);
      // Re-add events to try again?
    }
  }
}

export default Tracker;
