# API Documentation - TalkNow

## 1. Overview
The TalkNow API is a RESTful interface that uses JSON for both request and response payloads. All dates are returned in ISO 8601 format.

- **Base URL:** `http://localhost:5000/api`
- **Authentication:** JWT Bearer Token

---

## 2. Authentication (`/auth`)

### User Registration
`POST /auth/register`

**Request Body:**
```json
{
  "email": "owner@example.com",
  "password": "Password@123",
  "name": "John Doe",
  "businessName": "Acme Corp"
}
```

**Success Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "email": "owner@example.com",
    "role": "business_owner",
    "businessId": "64f1a2b3c4d5e6f7g8h9i0j2"
  }
}
```

---

## 3. Widget Operations (`/widget`)

### Submit Lead
`POST /widget/lead/:businessId`

**Path Parameters:**
- `businessId`: The unique ID of the business.

**Request Body:**
```json
{
  "type": "chat",
  "name": "Jane Visitor",
  "email": "jane@visitor.com",
  "phone": "+1234567890",
  "message": "I'm interested in your services.",
  "visitorInfo": {
    "browser": "Chrome",
    "os": "MacOS",
    "country": "USA",
    "referrer": "https://google.com"
  }
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "leadId": "74f1a2b3c4d5e6f7g8h9i0k3"
}
```

**Error Response (403 Forbidden):**
```json
{
  "message": "Lead limit reached for this business. Please upgrade your plan."
}
```

---

## 4. Dashboard Operations (`/dashboard`)
*Requires Authorization: Bearer <token>*

### Get Analytics Stats
`GET /dashboard/stats`

**Success Response (200 OK):**
```json
{
  "totalLeads": 156,
  "totalBookings": 42,
  "activeSessions": 12,
  "conversionRate": 3.4,
  "leadsByDay": [
    { "date": "2023-10-01", "count": 12 },
    { "date": "2023-10-02", "count": 15 }
  ]
}
```

---

## 5. Error Codes Reference

| Status | Code | Description |
|:---|:---|:---|
| 400 | `BAD_REQUEST` | Validation failed or missing required fields. |
| 401 | `UNAUTHORIZED` | Invalid or expired token. |
| 403 | `FORBIDDEN` | Permission denied or subscription limit reached. |
| 404 | `NOT_FOUND` | The requested resource does not exist. |
| 429 | `TOO_MANY_REQUESTS` | Rate limit exceeded. |
| 500 | `INTERNAL_SERVER_ERROR` | An unexpected error occurred on the server. |

---

## 6. Real-time Events (Socket.io)

### Namespace: `/widget`

#### Client to Server
- `join`: `{ businessId, visitorId }` - Joins the private chat room.
- `message:send`: `{ text, sender: 'visitor' }` - Sends a new chat message.
- `typing:start`: - Notifies agents that the visitor is typing.

#### Server to Client
- `message:receive`: `{ text, sender: 'agent', timestamp }` - Received message from agent.
- `agent:status`: `{ online: true }` - Agent availability update.
