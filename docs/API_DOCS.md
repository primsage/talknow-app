# API Documentation - TalkNow

## 1. Authentication (`/api/auth`)

### Register
`POST /register`
- **Body**: `{ email, password, name, businessName }`
- **Description**: Registers a new business owner and creates their business profile.

### Login
`POST /login`
- **Body**: `{ email, password }`
- **Response**: `{ token, user: { id, role, businessId } }`

---

## 2. Widget API (`/api/widget`)
*Note: These endpoints are consumed by the embeddable widget on host websites.*

### Get Widget Configuration
`GET /config/:businessId`
- **Description**: Fetches theme colors, welcome messages, and plan details for the widget.

### Submit Lead
`POST /lead/:businessId`
- **Body**: `{ type, name, email, phone, message, preferredTime, visitorInfo }`
- **Description**: Creates a new lead. Returns 403 if the business has exceeded its monthly lead limit.

### Track Events
`POST /track`
- **Body**: `{ businessId, sessionId, events: [{ type, x, y, scrollPos, timestamp }], screen: { width, height } }`
- **Description**: Batches visitor interaction events for heatmaps and recordings. Restricted to paid plans.

### Get Chat History
`GET /chat/:businessId/:visitorId`
- **Description**: Retrieves previous messages for a specific visitor session.

---

## 3. Dashboard API (`/api/dashboard`)
*Note: Requires Authorization: Bearer <token>*

### Get Stats
`GET /stats`
- **Description**: Returns aggregate data (total leads, bookings, conversion rate) for the logged-in business.

### Get Leads
`GET /leads`
- **Description**: List all leads for the business with pagination and filtering.

### Get Heatmap Data
`GET /heatmap/:businessId`
- **Description**: Returns all click/scroll events for a business within a timeframe.

---

## 4. Team Management (`/api/team`)
*Note: Requires Authorization: Bearer <token>*

### List Team
`GET /`
- **Description**: Returns all agents associated with the business.

### Add Member
`POST /`
- **Body**: `{ name, email, password, role }`
- **Description**: Creates a new agent account for the business.

---

## 5. Integrations & Payments

### Connect Zoom
`GET /integrations/zoom/connect`
- **Description**: Initiates OAuth flow for Zoom.

### Razorpay Webhook
`POST /payments/webhook`
- **Description**: Handles subscription updates and successful payment notifications.

---

## 6. Error Handling
The API uses standard HTTP status codes:
- `200 OK`: Success
- `201 Created`: Resource created successfully
- `400 Bad Request`: Validation error or missing parameters
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Insufficient permissions or subscription limit reached
- `404 Not Found`: Resource does not exist
- `500 Internal Server Error`: Something went wrong on our end
