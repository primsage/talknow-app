# Technical PRD - TalkNow

## 1. Technical Goals
To build a multi-tenant SaaS that is secure, performant, and easily embeddable while providing advanced features like session tracking and heatmap visualization.

## 2. Core Technical Architecture
The application is a monorepo-style project (managed with Docker Compose) consisting of:
-   **`backend/`**: Node.js Express server with TypeScript.
-   **`frontend/`**: Vite + React 19 dashboard.
-   **`widget/`**: Vite + React 19 widget (built as IIFE).

## 3. Database Schema (MongoDB/Mongoose)

### 3.1 User Model
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum ('admin', 'business_owner', 'agent')
- `businessId`: Reference to Business

### 3.2 Business Model
- `name`: String
- `website`: String
- `subscription`:
  - `plan`: Enum ('free', 'pro', 'premium', 'extra_premium')
  - `leadsUsed`: Number
  - `leadsLimit`: Number
- `widgetSettings`:
  - `primaryColor`: String
  - `welcomeMessage`: String
- `integrations`:
  - `googleMeet`: { accessToken, refreshToken }
  - `zoom`: { accessToken }

### 3.3 Lead Model
- `businessId`: Reference to Business
- `type`: Enum ('chat', 'callback', 'whatsapp')
- `visitorInfo`: { name, email, phone, browser, country }
- `status`: Enum ('new', 'contacted', 'converted')

### 3.4 Session Model
- `businessId`: Reference to Business
- `sessionId`: String (Unique per visitor session)
- `events`: Array of { type, x, y, timestamp, scrollPos }

## 4. Key Implementation Details

### 4.1 Multi-Tenancy
Multi-tenancy is achieved at the data level. Every document (Lead, Session, Message, User) is associated with a `businessId`. Middleware ensures that a `business_owner` can only access data belonging to their own `businessId`.

### 4.2 Widget Embedding (IIFE + Shadow DOM)
- **Build Process**: The widget is bundled into a single JavaScript file using Vite's `lib` mode.
- **Injection**: A loader script creates a `div` on the host page, attaches a Shadow Root, and mounts the React application inside it.
- **Isolation**: Shadow DOM prevents the host website's CSS from affecting the widget UI.

### 4.3 Session Tracking & Heatmaps
- **Capture**: The widget listens for `click` and `scroll` events.
- **Throttling**: Events are batched and sent to the `/api/widget/track` endpoint every 5 seconds to minimize network overhead.
- **Visualization**: The dashboard renders the tracked website inside an `iframe`. A transparent `canvas` is overlaid on the iframe, and click coordinates are plotted as a heatmap using libraries like `simpleheat`.

### 4.4 Real-time Chat
- **Engine**: Socket.io.
- **Rooms**: Sockets join rooms based on `businessId` and `visitorId` to ensure private communication between visitors and agents.

## 5. API Design Principles
- **RESTful**: standard GET, POST, PUT, DELETE methods.
- **Validation**: Every request body is validated using **Zod** schemas before reaching the controller.
- **Security**: JWT tokens are passed in the `Authorization: Bearer <token>` header.

## 6. Deployment Workflow
- **Dockerization**: Each service has its own `Dockerfile`.
- **Orchestration**: `docker-compose.yml` manages the networking between the backend, frontend, widget, and MongoDB.
- **Production Build**:
  - Frontend and Widget are compiled to static assets.
  - Backend is compiled from TS to JS using `tsc`.
