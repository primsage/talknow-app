# Design Guide - TalkNow

## 1. Visual Identity
TalkNow uses a clean, modern "SaaS-style" aesthetic. The interface is designed to be unobtrusive for visitors and highly functional for business owners.

### Color Palette
- **Primary Blue:** `#2563eb` (Used for primary actions, branding, and active states)
- **Secondary Green:** `#10b981` (Used for success messages, "Book Now" buttons, and online status)
- **Background Gray:** `#f8fafc` (Main background for the dashboard to reduce eye strain)
- **Surface White:** `#ffffff` (Used for cards, modals, and the widget container)
- **Text Primary:** `#1e293b` (Dark navy for maximum readability)

## 2. Typography
- **Primary Font:** `Inter`, fallback to `Roboto`.
- **Headings:** Bold weight (600), utilizing `h5` and `h6` for dashboard cards.
- **Body:** Standard weight (400), with `14px` base size for the dashboard to fit more information.

## 3. Component Library (MUI v6)
The project utilizes **Material UI v6**. Key implementation patterns include:

### Layouts
- **Grid2:** Used exclusively for responsive layouts.
  - Syntax: `<Grid size={{ xs: 12, md: 6 }}>`
- **Paper:** Used with a custom border-radius (`12px`) and subtle box-shadow for all dashboard modules.

### Buttons
- **Style:** Rounded corners (`8px`), no uppercase text (`textTransform: 'none'`).
- **Variants:**
  - `contained`: Primary actions.
  - `outlined`: Secondary or destructive actions.

### Interaction States
- **Hover:** Subtle background color shifts or scale increases for the floating widget.
- **Loading:** Circular progress overlays during API calls or data fetching.

## 4. Widget UX Principles
- **Minimalist Trigger:** The widget should be a small floating action button (FAB) that doesn't obstruct website content.
- **Shadow DOM:** Ensures that the "Host Website" cannot override widget styles.
- **Proactive Engagement:** After 5 seconds, a small "speech bubble" greeting appears to encourage interaction.
- **Direct Redirection:** WhatsApp links should open in a new tab to prevent visitors from leaving the host website.

## 5. Dashboard UX Principles
- **Density:** Information-dense but organized. Leads and bookings are presented in tables or lists with clear status indicators.
- **Feedback:** Success/Error toasts (Snackbars) appear after every significant action (e.g., saving settings, adding a team member).
- **Empty States:** Clear instructions or "Get Started" buttons when no data (leads/bookings) is present.

## 6. Icons
- **Library:** Lucide React or Material Icons.
- **Usage:** Used sparingly to provide visual cues (e.g., a phone icon for callback requests, a calendar icon for bookings).
