# Product Requirements Document (PRD) - TalkNow

## 1. Executive Summary
**TalkNow** is a comprehensive multi-tenant SaaS platform designed to help businesses capture, manage, and convert website visitors into leads. It provides an all-in-one widget that integrates real-time chat, meeting booking, and WhatsApp communication directly into any website.

## 2. Problem Statement
Many small to medium-sized businesses struggle to engage visitors in real-time. Fragmented tools for chat, scheduling, and analytics often lead to high costs and technical complexity. Businesses need a unified solution that is easy to install and provides actionable insights like session recordings and heatmaps.

## 3. Goals & Objectives
- **Lead Capture:** Provide multiple channels (Chat, Call, WhatsApp) for visitors to reach out.
- **Automation:** Streamline meeting bookings with automated Zoom and Google Meet integrations.
- **Insights:** Help businesses understand visitor behavior through heatmaps and session recordings.
- **Scalability:** Support multiple businesses (tenants) with a tiered subscription model.

## 4. Target Audience
- **Small Business Owners:** Seeking an affordable way to increase website conversions.
- **Sales Teams:** Needing a direct line to interested prospects.
- **Support Teams:** Requiring a real-time tool to assist customers.
- **Marketing Managers:** Looking for data-driven insights into website performance.

## 5. User Roles & Personas
### 5.1 Super Admin
- Manage all businesses on the platform.
- Adjust global settings and subscription limits.
- Monitor platform-wide performance.

### 5.2 Business Owner
- Configure widget appearance and functionality.
- Manage team members (Agents).
- View leads, bookings, and visitor analytics.
- Manage subscriptions and payments.

### 5.3 Agent
- Respond to live chat messages.
- View assigned leads and scheduled meetings.

### 5.4 Website Visitor
- Interact with the TalkNow widget on a host website.
- Chat with agents, book meetings, or send WhatsApp messages.

## 6. Functional Requirements
### 6.1 Widget Capabilities
- **Multi-channel Engagement:** Support for Live Chat, Meeting Booking (Google Meet/Zoom), and WhatsApp redirection.
- **Customization:** Ability to change colors, positioning, and messaging via the Business Dashboard.
- **Isolation:** Rendered using Shadow DOM to prevent CSS conflicts with the host website.

### 6.2 Business Dashboard
- **Analytics:** Dashboard showing lead counts, session data, and recent activity.
- **Lead Management:** CRUD operations for leads captured via the widget.
- **Team Management:** Add/Remove agents and assign roles.
- **Integrations:** OAuth flow for Google Calendar and Zoom.
- **Heatmaps & Recordings:** Visual overlays of visitor clicks and scrolls.

### 6.3 Subscription System
- **Tiered Plans:** Free, Pro, Premium, and Extra Premium.
- **Feature Gating:** Heatmaps and session recordings restricted to paid plans.
- **Lead Limits:** Automatic capping of leads based on the monthly plan.

## 7. Non-Functional Requirements
- **Performance:** The widget script should be lightweight and load asynchronously to avoid slowing down host websites.
- **Security:** Secure authentication via JWT and role-based access control (RBAC).
- **Reliability:** Real-time chat powered by Socket.io for low-latency communication.
- **Scalability:** Architecture designed to handle thousands of concurrent sessions.

## 8. Success Metrics
- **Conversion Rate:** Increase in visitor-to-lead conversion for client websites.
- **Retention:** Monthly active businesses remaining on the platform.
- **Platform Growth:** Number of new businesses registering and upgrading to paid plans.
