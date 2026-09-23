# FoodFax (FoodFlow) 🍔⚡

**FoodFax** is a digital counter ordering, live token queue, and kitchen management system built for high-rush food stalls, college campus canteens, and quick-service street food eateries.

---

## 📌 Features

- **Live Counter Token Tracker**: Real-time order progress timeline, preparation countdown, queue depth estimation, and 4-digit verification PIN.
- **Audio Chimes & Speech Announcements**: Audible counter bells and Web Speech API announcements for noisy stall environments.
- **Customer Order Cancellation Flow**:
  - Customers can cancel pending or preparing orders directly from the tracker.
  - Prompts for cancellation reason (e.g., changed mind, long wait time, emergency).
  - Updates order status to `CANCELLED` in Firestore with chronological history logs.
  - Triggers an instant real-time notification with audio buzzer alert to the stall owner.
- **Customer Feedback & Star Ratings**:
  - 5-star rating selector with hover preview and qualitative labels.
  - Quick highlight feedback tags (e.g., *Crispy & Hot 🔥*, *Super Fast Counter ⚡*, *Clean & Hygienic ✨*).
  - Detailed review comments saved directly to Firestore.
  - Accessible on both the Live Order Tracker (for completed orders) and the Order History view.
- **Shop Location & Navigation**:
  - Displays stall GPS coordinates (`latitude`, `longitude`), campus landmarks, and direct 1-click deep links to Google Maps navigation.

---

## 🗺️ Google Maps API Key Setup Note

> **Note**: Google Maps API key setup is currently **skipped / deferred**.
> The application uses a fallback high-resolution interactive location canvas with live coordinates, radar animations, zoom controls, and direct Google Maps routing links (`https://www.google.com/maps/dir/?api=1&destination=lat,lng`).

### To Enable Embedded Google Maps:
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Maps Embed API** or **Maps JavaScript API** for your project.
3. Generate an API Key under **APIs & Services > Credentials**.
4. Create a `.env` file in the project root:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
   ```
5. Restart the development server. The `GoogleShopMap` component will automatically detect `VITE_GOOGLE_MAPS_API_KEY` and render the official interactive Google Maps frame with custom markers.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database & Realtime**: Firebase Firestore
- **State & Realtime Synchronization**: Firestore `onSnapshot` & transactional token counter
- **Audio & Haptics**: HTML5 Web Audio API synthesizers & Web Speech API

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

---

## 🔒 Security & Firestore Rules

Firestore security rules enforce the **Eight Pillars of Hardened Rules** pattern:
- Granular document-level permission controls
- Strict schema validation
- Protected order state transitions (`PENDING` -> `ACCEPTED` -> `PREPARING` -> `READY` -> `COMPLETED` / `CANCELLED`)
- Atomic transactional token generator preventing collision on peak stall rush hours
