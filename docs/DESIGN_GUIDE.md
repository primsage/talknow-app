# Design Guide - TalkNow

## 1. Visual Identity & Brand Voice
TalkNow aims for a professional, trustworthy, and efficient user experience. The design should feel modern and responsive, minimizing friction during setup and daily use.

## 2. Color System
| Token | Hex Code | Usage |
|:---|:---|:---|
| `primary` | `#2563eb` | Primary buttons, active navigation, brand elements. |
| `secondary` | `#10b981` | Success states, booking buttons, online status. |
| `error` | `#ef4444` | Destructive actions, validation errors. |
| `background` | `#f8fafc` | Dashboard main background. |
| `surface` | `#ffffff` | Cards, modals, sidebars. |
| `text-main` | `#1e293b` | Primary text. |
| `text-muted` | `#64748b` | Captions, placeholders, inactive states. |

## 3. Typography Standards
- **Font Stack:** `Inter`, `system-ui`, `-apple-system`, `sans-serif`.
- **H1-H3:** Semi-bold (600) for page titles and section headers.
- **Body:** Regular (400) at `14px` for the dashboard and `16px` for the landing page.
- **Monospace:** `JetBrains Mono` or `Courier New` for code snippets and API keys.

## 4. UI Component Patterns (MUI v6)

### 4.1 Layout Components
- **Dashboard Shell:** A fixed sidebar with a flexible top navigation bar.
- **Card Pattern:** All modules must be wrapped in `<Paper elevation={0} />` with a `1px` border and `12px` border-radius.
- **Grid System:** Use `Grid2` from MUI v6. Standardize on a 12-column layout.

### 4.2 Interaction Feedback
- **Buttons:** Use `textTransform: 'none'`. Contained buttons must have a subtle `0.5s` shadow transition on hover.
- **Loading States:** Use `<Skeleton />` for dashboard cards during initial data fetch instead of full-page spinners.

## 5. Widget Technical Design (Shadow DOM)
The widget must remain completely isolated from the host website's CSS.
- **Encapsulation:** All React components are mounted inside a `ShadowRoot`.
- **Style Injection:** Use `CacheProvider` from Emotion to inject styles into the shadow root rather than the document head.
- **Z-Index Strategy:** The widget container should use a high z-index (e.g., `2147483647`) to ensure it stays on top of all host elements.

## 6. Accessibility & Responsiveness

### 6.1 Accessibility (WCAG 2.1)
- **Contrast:** Ensure a minimum contrast ratio of 4.5:1 for text.
- **Keyboard Nav:** Every interactive element in the widget must be focusable and operable via the `Tab` and `Enter` keys.
- **Aria Labels:** Provide `aria-label` for all icon-only buttons (e.g., the widget close button).

### 6.2 Responsive Breakpoints
| Breakpoint | Width | Usage |
|:---|:---|:---|
| `xs` | 0px | Mobile (Portrait) - Widget becomes full-screen. |
| `sm` | 600px | Mobile (Landscape) / Tablets. |
| `md` | 900px | Small Laptops - Sidebar collapses. |
| `lg` | 1200px | Standard Desktop. |
| `xl` | 1536px | Large Displays. |

## 7. Iconography
- **Library:** `Lucide React`
- **Stroke Width:** `2px`
- **Sizing:** Standard icons should be `20px` in the dashboard and `24px` in the widget.
