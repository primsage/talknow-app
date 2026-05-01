# Technical PRD - TalkNow

## 1. Core Technical Principles
TalkNow is engineered for high availability, multi-tenant isolation, and minimal performance impact on client websites.

## 2. Multi-Tenant Data Isolation
We implement **Logical Separation** at the database layer:
-   **Discriminator Fields:** Every record (User, Business, Lead, Session) contains a `businessId`.
-   **Middleware Enforcement:** The `authMiddleware.ts` ensures that the `req.user.businessId` matches the requested resource's `businessId`.
-   **Global Query Filters:** All Mongoose queries are scoped to the current tenant to prevent cross-tenant data leakage.

## 3. High-Performance Session Tracking
The session tracking module (Heatmaps/Recordings) is built for speed:
-   **Throttling:** Scroll events are throttled to 250ms; mouse moves are throttled to 100ms.
-   **Compression:** Event payloads are sent as minimized JSON to reduce bandwidth.
-   **Storage Optimization:** Session events are stored in a sub-document array or a separate `Events` collection to keep the main `Session` document lean.

## 4. Advanced Security Hardening
-   **Rate Limiting:** `express-rate-limit` is applied to sensitive endpoints (Login, Lead Submission) to prevent brute-force and DoS attacks.
-   **JWT Security:**
    -   Tokens have a 24-hour expiry.
    -   Secrets are managed via environment variables.
-   **Content Security Policy (CSP):** The widget loader script is designed to be compatible with strict CSPs. We provide specific hash/nonce recommendations for host websites.
-   **Cross-Origin Resource Sharing (CORS):** The backend dynamically allows origins based on the registered `website` field in the Business document.

## 5. Socket.io Logic & Scalability
The real-time engine is optimized for high concurrency:
-   **Namespace Isolation:** All widget-related traffic is handled in a `/widget` namespace.
-   **State Management:** Sockets are used for transient state (e.g., "Visitor Typing"); persistent state (Chat History) is synced from MongoDB.
-   **Scaling:** For horizontal scaling, we utilize the `@socket.io/redis-adapter` to sync events across multiple Node.js instances.

## 6. Database Optimization & Indexing
To ensure fast dashboard loading even with millions of leads:
-   **Compound Indexes:**
    -   `{ businessId: 1, createdAt: -1 }` (For fast lead listing)
    -   `{ businessId: 1, type: 1 }` (For filtered analytics)
-   **Aggregation Pipelines:** Used for the main dashboard stats to calculate conversion rates and lead counts in a single pass.

## 7. Widget Injection Mechanism
We use a **Bootloader Pattern**:
1.  **Tiny Script:** A small `<script>` snippet is placed on the host site.
2.  **Async Load:** It creates a dynamic `<script>` tag pointing to our CDN/Server for `widget.js`.
3.  **Encapsulation:**
    ```typescript
    const shadowRoot = host.attachShadow({ mode: 'closed' });
    const root = document.createElement('div');
    shadowRoot.appendChild(root);
    ReactDOM.createRoot(root).render(<App />);
    ```
    -   **Mode 'closed'** prevents host site scripts from accessing the widget internals.

## 8. CI/CD & Production Standards
-   **Environment Parity:** Docker is used for Local, Staging, and Production to ensure "it works on my machine" consistency.
-   **Logging:** Centralized logging using Winston/Morgan with levels (Error, Warn, Info, Debug).
-   **Monitoring:** Sentry integration for real-time error tracking across the frontend and backend.
-   **Health Checks:** `/api/health` endpoint for Kubernetes/Docker container monitoring.
