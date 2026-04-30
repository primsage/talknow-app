# Setup & Integration Guide - TalkNow

## 1. Quick Start (Development)
For local development using Docker, see the root `README.md`.

---

## 2. Manual Environment Configuration
Every service requires a `.env` file. Below are the production-grade requirements.

### Backend `.env` Template
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/talknow?retryWrites=true&w=majority

# Security
JWT_SECRET=generate_a_long_random_string_here
CORS_ORIGIN=https://dashboard.talknow.com

# External Integrations (Mandatory for Production)
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
SENDGRID_API_KEY=SG....
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
ZOOM_CLIENT_ID=...
ZOOM_CLIENT_SECRET=...
```

---

## 3. Production Deployment Strategy

### 3.1 Infrastructure Requirements
- **Server:** Minimum 2 vCPU, 4GB RAM.
- **Node.js:** v20.x (LTS).
- **Process Manager:** PM2 is recommended for keeping the backend alive.

### 3.2 Nginx Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name api.talknow.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3.3 CI/CD Pipeline (GitHub Actions Example)
1. **Lint & Test:** Run `npm run lint` and `npm test` on every push.
2. **Build:** Compile TypeScript to JavaScript for the backend; build Vite bundles for the frontend and widget.
3. **Deploy:** Sync static assets to S3/Cloudfront (Frontend/Widget) and push Docker images to ECR (Backend).

---

## 4. Integration Deep Dive

### 4.1 Razorpay Webhooks
In the Razorpay Dashboard, set the Webhook URL to `https://api.talknow.com/api/payments/webhook`.
- **Secret:** Must match `RAZORPAY_WEBHOOK_SECRET` in your `.env`.
- **Events:**
  - `payment.captured`
  - `subscription.activated`
  - `subscription.charged`

### 4.2 Google Calendar API (OAuth)
1. Enable the **Google Calendar API** in the Google Cloud Console.
2. Set the redirect URI to `https://api.talknow.com/api/integrations/google/callback`.
3. Use `offline` access type to receive a `refresh_token`.

---

## 5. Monitoring & Maintenance

### 5.1 Logging
Logs are written to `stdout` and can be collected by tools like Logtail or AWS CloudWatch.
- **Production Level:** `info`
- **Audit Level:** `warn` and `error`

### 5.2 Error Tracking (Sentry)
To enable Sentry, add `SENTRY_DSN` to your environment variables.
```typescript
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### 5.3 Database Backups
- **Strategy:** Daily automated snapshots via MongoDB Atlas.
- **Retention:** 30 days.

---

## 6. Scaling the Widget
To serve the widget script (`widget.js`) to millions of visitors without latency:
1. **CDN:** Upload the `dist/widget.js` to a CDN (e.g., Cloudfront, Akamai).
2. **Versioning:** Use versioned paths (e.g., `/v1.2.3/widget.js`) to prevent cache-busting issues while allowing for instant rollbacks.
3. **Compression:** Ensure your server/CDN serves the file with Gzip or Brotli compression.
