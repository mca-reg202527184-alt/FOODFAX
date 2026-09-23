# FoodFax (FoodFlow) 🍔⚡

**FoodFax** is a digital counter ordering, live token queue, and kitchen management system built for high-rush street food stalls, college campus canteens, tapris, and quick-service eateries.

---

## 📌 All Key Features

### 1. 📊 Recharts Monthly & Daily Spending Trends (Orders History)
- **Visual Analytics with Recharts**: Integrated into `OrdersHistoryView` to visualize user expenditure based on order history.
- **Monthly Trends View**: Aggregates food orders month-by-month over a multi-month period, visualizing seasonal eating and canteen spending patterns.
- **30-Day Daily Spending Timeline**: Day-by-day expenditure timeline with interactive sub-filters for **Last 30 Days**, **Last 14 Days**, and **Last 7 Days**.
- **1-Click View Mode Switcher**: Instantly toggle between **Monthly** and **Daily (30D)** views.
- **Key Performance Metric Cards**:
  - **Monthly Mode**: Total Spend (6 Months), Average per Month, Total Orders, and Peak Spending Month.
  - **Daily Mode**: Total Spend, Total Orders, Average Ticket, and Highest Spending Day.
- **Custom Formatted Tooltips**: Displays full month/date, rupee spending (`₹`), order count, and individual stalls visited.
- **Responsive & Accessible**: Mobile-optimized, touch-friendly bars with expand/collapse controls.

---

### 2. 📸 Device Camera Photo Avatar (Firestore Profile Persistence)
- **Live Device Camera Capture**: Built with HTML5 `getUserMedia` API in `CameraAvatarModal`, allowing users to take a selfie or profile photo right from their device camera.
- **Centering Guide & Framing Reticle**: Circular overlay guide ensures face is centered within the frame.
- **Front / Rear Camera Switcher**: One-tap toggle between `user` (front selfie) and `environment` (rear) cameras.
- **Shutter Flash Animation**: Visual snapshot flash effect and instant frame capture.
- **Canvas Processing & Compression**: Centered square crop rendered to an offscreen canvas and compressed to an optimized JPEG data URI (~35KB), keeping Firestore document storage fast and lightweight.
- **Fallback File Upload**: Direct upload support (`<input type="file" accept="image/*" capture="user">`) in case camera permissions are denied or unavailable in restricted browser environments.
- **Firestore Document Persistence**: Saves the resulting image URI directly to the user's Firestore profile document (`users/{userId}`) under the `photoUrl` attribute with merge semantics.
- **Immediate Cross-App Synchronization**: Instant update reflected across the User Profile, navigation Header, and session cache, with options to retake or remove the avatar.

---

### 3. ⏱️ Live Counter Token Tracker & Order Lifecycle
- **Real-Time Queue Progression**: Live order status timeline (`PENDING` ➔ `ACCEPTED` ➔ `PREPARING` ➔ `READY` ➔ `COMPLETED`).
- **Dynamic Status Animation**: Visual pulse and status update highlight when a ticket transitions to `READY for Pickup`.
- **4-Digit Verification PIN & Counter Tokens**: High-contrast token number (e.g. `#142`) for stall counter verification.
- **Instant Cart Auto-Clearing**: Automatically clears cart state immediately upon successful order placement and commit to the database.

---

### 4. 🚫 Customer Order Cancellation Flow
- Direct cancellation option from the live order tracker for pending/preparing orders.
- Modal prompt for cancellation reason (e.g. changed mind, long queue, emergency).
- Updates order status to `CANCELLED` in Firestore with an audit trail timestamp.
- Dispatches immediate real-time push notification and audio alert to the stall owner terminal.

---

### 5. ⭐ Customer Feedback & 5-Star Reviews
- Interactive 5-star rating selector with hover preview and qualitative labels.
- Quick highlight tag chips (*Crispy & Hot 🔥*, *Super Fast Counter ⚡*, *Clean & Hygienic ✨*).
- Written review comments stored in the order document in Firestore.
- Accessible directly on the Live Order Tracker (once completed) and inside the Orders History view.

---

### 6. 🏪 Stall Owner Terminal & Kitchen KDS (Kitchen Display System)
- **Real-Time Counter Board**: Live digital tickets separated by `Incoming`, `In Kitchen`, `Ready for Pickup`, and `Completed`.
- **One-Tap Status Actions**: Update ticket states instantly with audio feedback.
- **Menu Availability Toggle**: Mark items in/out of stock in seconds during rush hours.
- **Sales Analytics**: Daily revenue, order counts, average ticket size, and top-selling items.

---

### 7. 📱 QR Code Counter Ordering
- Integrated camera QR scanner for scanning stall counter QR codes.
- Instantly opens the exact stall menu with prep times, veg/non-veg tags, and instant checkout.

---

### 8. 🔊 Accessibility, Audio Chimes & Speech Caller
- **Audio Chimes**: Synthesized Web Audio bells on token state changes.
- **Voice Token Caller**: Web Speech API announces token numbers when ready (e.g. *"Token number 142 is ready for pickup"*).
- **High-Contrast Mode**: Toggleable high-contrast color scheme for enhanced outdoor readability.

---

### 9. 📍 Stall Location & Navigation
- Stall GPS coordinates (`latitude`, `longitude`) and area landmark descriptions.
- 1-click deep links to Google Maps driving and walking navigation (`https://www.google.com/maps/dir/?api=1&destination=lat,lng`).
- Optional embedded Google Maps support when `VITE_GOOGLE_MAPS_API_KEY` is provided.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4 |
| **Charts & Data Visualization** | Recharts (`BarChart`, `ResponsiveContainer`, `Tooltip`) |
| **Icons** | Lucide React |
| **Camera & Media** | HTML5 MediaDevices API (`getUserMedia`), Canvas 2D API |
| **Database & Auth** | Google Cloud Firestore & Firebase Authentication |
| **Audio & Speech** | HTML5 Web Audio API & Web Speech API |

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── common/              # Header, Navigation, ActiveOrderBanner, EmptyState
│   │   ├── order/               # SpendingTrendsChart (Recharts), OrderRatingReview
│   │   ├── profile/             # CameraAvatarModal (Camera capture & Firestore save)
│   │   ├── business/            # Owner Terminal, Kitchen KDS components
│   │   └── shop/                # Stall cards, menus, stall details
│   ├── context/
│   │   ├── AuthContext.tsx      # User authentication, profile avatar methods
│   │   ├── CartContext.tsx      # Cart state management & auto-clear hook
│   │   ├── AccessibilityContext.tsx # Audio chimes & voice caller
│   │   └── RouterContext.tsx    # Lightweight client routing
│   ├── services/
│   │   ├── authService.ts       # Firestore user profile & photoUrl updates
│   │   ├── orderService.ts      # Customer order queries & status updates
│   │   ├── orderRealtimeService.ts # Realtime Firestore order subscriptions
│   │   ├── shopService.ts       # Food stall data & location
│   │   └── menuService.ts       # Stall food items & categories
│   ├── views/
│   │   ├── OrdersHistoryView.tsx # Order tokens, history, Recharts spending bar chart
│   │   ├── ProfileView.tsx       # User profile, camera avatar trigger & display
│   │   ├── CompleteProfileView.tsx # Onboarding & profile photo setup
│   │   ├── OrderTrackingView.tsx # Live token progress & cancellation flow
│   │   └── BusinessTerminalView.tsx # Stall owner terminal
│   ├── types.ts                 # TypeScript interfaces (Order, AuthUser, Shop, etc.)
│   └── firebase.ts              # Firebase app, auth, and firestore initialization
├── firestore.rules              # Cloud Firestore security rules
├── firebase-blueprint.json      # Intermediate schema definition
└── package.json                 # Project dependencies
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The app will run on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

### 4. Type Check / Lint
```bash
npm run lint
```

---

## 🔒 Firestore Security Rules

Firestore security rules enforce:
- Granular document-level permission controls for `users/{userId}` and `orders/{orderId}`.
- Role-based permissions (`customer`, `owner`, `admin`).
- Safe profile photo updates (`photoUrl` URI storage).
- Validated state transitions preventing order race conditions during peak counter rush hours.
