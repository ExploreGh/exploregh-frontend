# ExploreGH

> Discover the beauty of Ghana — a mobile tourism platform connecting tourists with verified local guides, vendors and experiences across Ghana.

---

## About The App

ExploreGH is a mobile tourism app built for the CodeQuest 2026 competition at Kwame Nkrumah University of Science and Technology (KNUST), Department of Computer Science.

The app connects foreign and local tourists with verified local guides, vendors, and real-time information about tourist sites across all regions of Ghana — all in one place.

---

## Team — Group 122

| Name | Student ID | Role |
|---|---|---|
| Abubakar Lukeman Agambilla | 21152011 | Backend — Auth Service & User Service |
| Amoah-Duah Darrel Nana Kwabena | 21152016 | Backend — Site Service & Crowd Service |
| Sampah Prince Sarfo | 21152140 | Backend — Vendor Service & Search Service |
| Ntow Yorke Emmanuel | 21152271 | Backend — Guide Service & Trip Service |
| Ampene Emmanuel | 21152292 | Frontend — All screens & UI + Notification Service & Geolocation Service |

---

## Features

- Tourist Site Discovery — browse and search sites across all regions with photos and ratings
- Real-Time Crowd Meter — see how busy a location is before visiting
- Vendor Marketplace — connect with local vendors, artisans and cultural practitioners
- Tour Guide Booking — find and book verified local tour guides
- Trip Planner — build a day-by-day itinerary for your Ghana trip
- Safety Alerts — community safety reports with severity levels
- Cultural Etiquette Guide — customs, dress codes and taboos by region
- Language Phrasebook — essential phrases in Twi, Ga, Ewe and Hausa with phonetics
- Festivals & Events Calendar — upcoming Ghanaian festivals
- Emergency Contacts — police, hospitals and embassies across Ghana
- Role-Based Registration — separate flows for Tourists, Vendors and Tour Guides with admin review

---

## Design System (v2)

The entire UI is driven by a token system in `constants/theme.ts`:

- Palette — Ghana flag colours: forest green `#006B3F`, gold `#FCD20F`, red `#CE1126`, ink `#161B18` on a soft mist background
- Signature element — the KenteStrip: a thin woven stripe in flag colours under every header
- Icons — Ionicons vector icons throughout (no emojis)
- Images — real photography for sites, vendors, guides and festivals (Unsplash placeholders until the backend provides real site photos)

---

## Technology Stack

| Layer | Technology |
|---|---|
| Mobile Frontend | React Native, Expo, TypeScript |
| Navigation | Expo Router (file-based) |
| Icons | @expo/vector-icons (Ionicons) |
| Backend Services | Java, Spring Boot |
| Database | PostgreSQL |
| Caching | Redis |
| API Gateway | Spring Cloud Gateway |
| Authentication | JWT (JSON Web Tokens) |
| Push Notifications | Firebase Cloud Messaging |
| Version Control | Git & GitHub |
| Architecture | Microservices |

---

## How To Run

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Steps

```bash
# 1. Install dependencies
npm install

# 2. If Expo warns about package versions, align them automatically
npx expo install --fix

# 3. Start the development server
npx expo start
```

Then press **`w`** to open in the web browser, or scan the QR code with the **Expo Go** app on your phone.

---

## Project Structure

```
exploregh-frontend/
├── app/                        # All screens (file-based routing)
│   ├── (tabs)/                 # Bottom tab screens
│   │   ├── home.tsx            # Home — featured carousel + site list
│   │   ├── explore.tsx         # Explore — categories & regions
│   │   ├── vendors.tsx         # Vendor marketplace
│   │   ├── guides.tsx          # Tour guides
│   │   ├── more.tsx            # Profile & feature menu
│   │   └── _layout.tsx         # Tab bar (Ionicons)
│   ├── splash.tsx              # Splash screen
│   ├── index.tsx               # Welcome screen (photo background)
│   ├── login.tsx               # Login
│   ├── register.tsx            # Role-based registration
│   ├── application-submitted.tsx
│   ├── site-details.tsx        # Site details (photo hero)
│   ├── safety-alerts.tsx
│   ├── trip-planner.tsx
│   ├── cultural-guide.tsx
│   ├── phrasebook.tsx
│   ├── emergency-contacts.tsx
│   ├── festivals.tsx
│   ├── coming-soon.tsx
│   └── _layout.tsx             # Root navigation stack
├── components/                 # Reusable building blocks
│   ├── Button.tsx              # 4 variants + icons + loading
│   ├── Card.tsx
│   ├── Chip.tsx                # Category filter pills
│   ├── SearchBar.tsx
│   ├── ScreenHeader.tsx        # Consistent inner-screen header
│   ├── KenteStrip.tsx          # Signature kente accent stripe
│   ├── Avatar.tsx              # Initials avatar
│   ├── EmptyState.tsx
│   ├── LoadingSpinner.tsx
│   └── index.ts
├── constants/
│   └── theme.ts                # Colors, radius, spacing, shadows
├── data/
│   └── mockData.ts             # ALL mock data + image URLs (swap for API later)
├── assets/images/              # Logo & app icons
├── app.json                    # Expo configuration
├── package.json
└── tsconfig.json
```

---

## Backend Integration Plan

All mock data lives in `data/mockData.ts`. When the backend microservices are live:

1. Create `constants/api.ts` with the gateway base URL
2. Create `services/` (authService, siteService, vendorService, guideService)
3. Replace `import { sites } from '@/data/mockData'` with `fetch` calls
4. The screens themselves need almost no changes — the data shapes already match the proposal

---

## Academic Information

- University: Kwame Nkrumah University of Science and Technology (KNUST)
- Faculty: Physical and Computational Sciences
- Department: Computer Science
- Competition: CodeQuest 2026
- Group Number: 122

---

Built with love for Ghana
