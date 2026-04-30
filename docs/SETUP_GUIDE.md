# Setup & Integration Guide - TalkNow

## 1. Local Development Setup
Follow these steps to get the entire TalkNow ecosystem running on your machine.

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local linting/testing)
- A MongoDB instance (provided by Docker Compose by default)

### Installation
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-repo/talknow.git
    cd talknow
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in each of the following directories. Use `.env.example` as a template where available.

    **`backend/.env`**:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://mongo:27017/talknow
    JWT_SECRET=your_super_secret_jwt_key
    FRONTEND_URL=http://localhost:3000
    WIDGET_URL=http://localhost:3001

    # Integrations
    RAZORPAY_KEY_ID=...
    RAZORPAY_KEY_SECRET=...
    SENDGRID_API_KEY=...
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    ZOOM_CLIENT_ID=...
    ZOOM_CLIENT_SECRET=...
    ```

3.  **Run with Docker:**
    ```bash
    docker-compose up --build
    ```
    - Dashboard: `http://localhost:3000`
    - Widget Script: `http://localhost:3001/widget.js`
    - Backend: `http://localhost:5000`

---

## 2. Third-Party Integrations

### 2.1 Razorpay (Payments)
1.  Create a Razorpay account.
2.  Navigate to **Settings > API Keys** to generate your Key ID and Secret.
3.  Configure a Webhook in Razorpay pointing to `https://your-api.com/api/payments/webhook`.
4.  Subscribe to `payment.captured` and `subscription.activated` events.

### 2.2 Google Meet (OAuth)
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project and enable the **Google Calendar API**.
3.  Configure the **OAuth Consent Screen**.
4.  Create **OAuth 2.0 Client IDs**. Add `https://your-api.com/api/integrations/google/callback` as an Authorized Redirect URI.

### 2.3 Zoom (OAuth)
1.  Go to the [Zoom App Marketplace](https://marketplace.zoom.us/).
2.  Create an **OAuth App**.
3.  Add `https://your-api.com/api/integrations/zoom/callback` to the Redirect URL list.
4.  Enable the `meeting:write` scope.

### 2.4 SendGrid (Email)
1.  Create a SendGrid account.
2.  Generate an **API Key** under **Settings > API Keys**.
3.  Verify your **Sender Identity** to ensure emails aren't marked as spam.

---

## 3. Embedding the Widget
To add the TalkNow widget to any website, paste the following snippet before the closing `</body>` tag:

```html
<script>
  (function(w, d, s, o, f, js, fjs) {
    w['TalkNow-Widget'] = o;
    w[o] = w[o] || function() { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'tn', 'http://localhost:3001/widget.js'));

  tn('init', 'YOUR_BUSINESS_ID_HERE');
</script>
```

---

## 4. Database Seeding
To create a default admin user for testing:
1.  Exec into the backend container: `docker exec -it talknow-backend bash`
2.  Run the seed script: `npm run seed`
    - **Default Admin:** `admin@talknow.com`
    - **Password:** `Admin@123`
