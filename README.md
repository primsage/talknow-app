# TalkNow - Enterprise-Grade Website Chat & Lead Infrastructure

TalkNow is a high-performance, multi-tenant SaaS platform that enables businesses to capture and convert website visitors into loyal customers. It provides a unified, embeddable widget combining Live Chat, Meeting Scheduling, and deep Visitor Analytics (Heatmaps & Session Recordings).

![TalkNow Banner](https://via.placeholder.com/1200x400?text=TalkNow+SaaS+Platform)

## 🌟 Strategic Features

- **Omni-Channel Engagement:** Integrated Live Chat, Google Meet, Zoom, and WhatsApp.
- **Visitor Intelligence:** Real-time session recordings and click-based heatmaps.
- **Shadow DOM Isolation:** Zero CSS leakage between the widget and host website.
- **Automated Scheduling:** Synchronized booking with Google Calendar and Zoom.
- **Enterprise Security:** JWT-based authentication, RBAC, and rate-limiting.
- **Subscription-Ready:** Tiered plans managed via Razorpay integration.

## 📁 Repository Structure

```text
├── backend/            # Express API with TypeScript (Domain-driven logic)
├── frontend/           # React 19 Dashboard (Enterprise management)
├── widget/             # High-performance React Widget (IIFE bundle)
├── docs/               # Technical Specifications & Documentation
└── docker-compose.yml  # Local development orchestration
```

## 🚀 Quick Start (Development)

### 1. Prerequisites
- Docker & Docker Compose
- Node.js 20+

### 2. Launching the Stack
```bash
docker-compose up --build
```
- **Dashboard:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **Widget Script:** [http://localhost:3001/widget.js](http://localhost:3001/widget.js)

### 3. Default Credentials
- **Admin Email:** `admin@talknow.com`
- **Password:** `Admin@123`

## 📖 Comprehensive Documentation

For detailed technical specifications, architectural overviews, and deployment guides, please refer to the `docs/` directory:

| Document | Description |
|:---|:---|
| 📑 **[PRD](./docs/PRD.md)** | Product strategy, User Stories, and Roadmap. |
| 🏗️ **[Architecture](./docs/ARCHITECTURE.md)** | C4 diagrams, system components, and infrastructure. |
| ⚙️ **[Technical PRD](./docs/TECHNICAL_PRD.md)** | Implementation details, Security, and Scalability. |
| ✨ **[Feature List](./docs/FEATURE_LIST.md)** | Detailed capabilities by user role. |
| 🔌 **[API Documentation](./docs/API_DOCS.md)** | REST API reference and JSON schemas. |
| 🎨 **[Design Guide](./docs/DESIGN_GUIDE.md)** | MUI v6 standards and technical UI patterns. |
| 🛠️ **[Setup Guide](./docs/SETUP_GUIDE.md)** | Production deployment and 3rd-party integrations. |

## 🛠️ Tech Stack

- **Frontend:** React 19, Material UI (MUI) v6, Vite, TypeScript.
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io.
- **DevOps:** Docker, Nginx (recommended), GitHub Actions (recommended).
- **Integrations:** Razorpay (Payments), SendGrid (Email), Zoom & Google (Meetings).

---

© 2024 TalkNow Team. All rights reserved.
