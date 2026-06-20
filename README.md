# ExploreGH 🌍🇬🇭

> Discover the beauty of Ghana — A comprehensive mobile tourism platform connecting tourists with verified local guides, vendors, and experiences across Ghana.

---

## 📱 About The App

ExploreGH is a mobile tourism app built for the **CodeQuest 2026** competition at **Kwame Nkrumah University of Science and Technology (KNUST)**, Department of Computer Science.

The app connects foreign and local tourists with verified local guides, vendors, and real-time information about tourist sites across all regions of Ghana — all in one place.

---

## 👥 Team — Group 122

| Name | Student ID | Role |
|---|---|---|
| Abubakar Lukeman Agambilla | 21152011 | Backend — Auth Service & User Service |
| Amoah-Duah Darrel Nana Kwabena | 21152016 | Backend — Site Service & Crowd Service |
| Sampah Prince Sarfo | 21152140 | Backend — Vendor Service & Search Service |
| Ntow Yorke Emmanuel | 21152271 | Backend — Guide Service & Trip Service |
| Ampene Emmanuel | 21152292 | Frontend — All screens & UI + Notification Service & Geolocation Service |

---

## 🚀 Features

- 🏛️ **Tourist Site Discovery** — Browse and search tourist sites across all regions of Ghana
- 👥 **Real-Time Crowd Meter** — See how busy a location is before visiting
- 🛍️ **Vendor Marketplace** — Connect with local vendors, artisans and cultural practitioners
- 🎖️ **Tour Guide Booking** — Find and book verified local tour guides
- 📅 **Trip Planner** — Build a day-by-day itinerary for your Ghana trip
- ⚠️ **Safety Alerts** — Real-time community safety reports and warnings
- 🤝 **Cultural Etiquette Guide** — Learn customs, dress codes and taboos by region
- 🗣️ **Language Phrasebook** — Essential phrases in Twi, Ga, Ewe and Hausa
- 🎉 **Festivals & Events Calendar** — Upcoming Ghanaian festivals and cultural events
- 🚨 **Emergency Contacts** — Police, hospitals and embassies across Ghana
- 🔔 **Push Notifications** — Real-time alerts for safety, bookings and trip reminders

---

## 🖥️ Screens (18 Total)

| Screen | Description |
|---|---|
| Splash Screen | App loading screen with branding |
| Welcome Screen | App introduction with Get Started button |
| Register Screen | New user registration with form validation |
| Login Screen | User login with form validation |
| Home Tab | Featured sites with search and category filtering |
| Explore Tab | Browse sites by category and region |
| Vendors Tab | Vendor marketplace with search and filtering |
| Guides Tab | Tour guide listing with search and availability filter |
| More Tab | Profile and access to all features |
| Site Details | Full details of a tourist site |
| Safety Alerts | Real-time safety warnings |
| Trip Planner | Personal trip itinerary management |
| Cultural Guide | Cultural etiquette by region |
| Phrasebook | Local language phrases |
| Emergency Contacts | Emergency services directory |
| Festivals & Events | Upcoming Ghanaian festivals |
| Coming Soon | Placeholder for features in development |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Mobile Frontend | React Native, Expo, TypeScript |
| Navigation | Expo Router |
| Backend Services | Java, Spring Boot |
| Database | PostgreSQL |
| Caching | Redis |
| API Gateway | Spring Cloud Gateway |
| Authentication | JWT (JSON Web Tokens) |
| Push Notifications | Firebase Cloud Messaging |
| Version Control | Git & GitHub |
| Architecture | Microservices |

---

## 📦 How To Run The Frontend

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/ExploreGh/exploregh-frontend.git
```

2. **Navigate into the project folder**
```bash
cd exploregh-frontend
```

3. **Install dependencies**
```bash
npm install
```

4. **Start the development server**
```bash
npx expo start
```

5. **View the app**
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your phone

---

## 📁 Project Structure

exploregh-frontend/

├── app/

│   ├── (tabs)/

│   │   ├── home.tsx        ← Home tab

│   │   ├── explore.tsx     ← Explore tab

│   │   ├── vendors.tsx     ← Vendors tab

│   │   ├── guides.tsx      ← Guides tab

│   │   ├── more.tsx        ← More tab

│   │   └── _layout.tsx     ← Tab navigation layout

│   ├── splash.tsx          ← Splash screen

│   ├── index.tsx           ← Welcome screen

│   ├── register.tsx        ← Register screen

│   ├── login.tsx           ← Login screen

│   ├── site-details.tsx    ← Site details screen

│   ├── safety-alerts.tsx   ← Safety alerts screen

│   ├── trip-planner.tsx    ← Trip planner screen

│   ├── cultural-guide.tsx  ← Cultural guide screen

│   ├── phrasebook.tsx      ← Language phrasebook screen

│   ├── emergency-contacts.tsx ← Emergency contacts screen

│   ├── festivals.tsx       ← Festivals & events screen

│   ├── coming-soon.tsx     ← Coming soon screen

│   └── _layout.tsx         ← Root navigation layout

├── assets/                 ← Images and fonts

├── package.json            ← Project dependencies

├── tsconfig.json           ← TypeScript configuration

└── README.md               ← This file

---

## 🎨 Design

- **Primary Color:** Ghana Green `#006B3F`
- **Secondary Color:** Ghana Gold `#FCD20F`
- **Background:** Light Gray `#f5f5f5`
- **Typography:** System default fonts

The design is inspired by the **colors of the Ghana flag** 🇬🇭

---

## 📊 Current Status

| Module | Status |
|---|---|
| Frontend — All 18 screens | ✅ Complete |
| Bottom navigation bar | ✅ Complete |
| Form validation | ✅ Complete |
| Search & filtering | ✅ Complete |
| Wishlist feature | ✅ Complete |
| Backend microservices | ⏳ In Progress |
| Frontend — Backend integration | ⏳ Pending backend completion |

---

## 🏫 Academic Information

- **University:** Kwame Nkrumah University of Science and Technology (KNUST)
- **Faculty:** Physical and Computational Sciences
- **Department:** Computer Science
- **Competition:** CodeQuest 2026
- **Group Number:** 122

---

*Built with ❤️ for Ghana 🇬🇭*