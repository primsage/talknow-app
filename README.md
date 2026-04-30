# TalkNow - Multi-Tenant Website Chat & Lead Widget

TalkNow is a powerful SaaS platform that allows businesses to engage website visitors through a customizable widget. It combines Live Chat, Meeting Booking (Zoom/Google Meet), WhatsApp integration, and advanced visitor tracking (Heatmaps & Session Recordings) into a single solution.

![TalkNow Overview](https://via.placeholder.com/800x400?text=TalkNow+Dashboard+Preview)

## 🚀 Key Features

- **Omni-channel Widget:** Live Chat, Google Meet, Zoom, and WhatsApp lead capture.
- **Advanced Analytics:** Visitor heatmaps and session recordings (available on Pro/Premium plans).
- **Multi-tenant Architecture:** Securely host thousands of businesses with isolated data.
- **Automated Bookings:** Seamless integration with Google Calendar and Zoom for scheduling.
- **Admin Dashboards:** Comprehensive control for both Super Admins and Business Owners.

## 📁 Project Structure

```text
├── backend/            # Node.js Express API (TypeScript)
├── frontend/           # React 19 Dashboard (MUI v6)
├── widget/             # Embeddable React Widget (IIFE)
├── docs/               # Detailed documentation and specifications
└── docker-compose.yml  # Local development orchestration
```

## 🛠️ Quick Start

### Prerequisites
- Docker & Docker Compose installed.

### Setup
1. **Clone the repo:** `git clone https://github.com/your-repo/talknow.git`
2. **Launch with Docker:**
   ```bash
   docker-compose up --build
   ```
3. **Access the platform:**
   - **Dashboard:** [http://localhost:3000](http://localhost:3000)
   - **API:** [http://localhost:5000](http://localhost:5000)
   - **Widget:** [http://localhost:3001](http://localhost:3001)

### Default Admin Credentials
- **Email:** `admin@talknow.com`
- **Password:** `Admin@123`

## 📖 Documentation

For a deep dive into the platform, please refer to the documents in the `/docs` folder:

- **[Product Requirements (PRD)](./docs/PRD.md)** - Vision and goals.
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and data flow.
- **[Technical PRD](./docs/TECHNICAL_PRD.md)** - Deep dive into schemas and logic.
- **[Feature List](./docs/FEATURE_LIST.md)** - Comprehensive list of capabilities.
- **[API Reference](./docs/API_DOCS.md)** - Endpoint documentation.
- **[Design Guide](./docs/DESIGN_GUIDE.md)** - Theme and UI/UX patterns.
- **[Setup & Integration Guide](./docs/SETUP_GUIDE.md)** - Third-party configuration.

## 💳 Subscription Plans

| Feature | Free | Pro | Premium | Extra Premium |
| :--- | :---: | :---: | :---: | :---: |
| Monthly Leads | 50 | Unlimited | Unlimited | Unlimited |
| Chat History | No | Yes | Yes | Yes |
| Heatmaps | No | Yes | Yes | Yes |
| Custom Branding | No | No | No | Yes |

## 🛠️ Tech Stack

- **Frontend:** React 19, MUI v6, Vite, TypeScript.
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io.
- **Services:** Razorpay, SendGrid, Zoom API, Google Calendar API.

---

Built with ❤️ by the TalkNow Team.
