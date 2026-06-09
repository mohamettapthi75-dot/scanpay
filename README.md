# 🚀 Unified Mobile Money Platform (Somalia & Somaliland)

A production-ready Fintech architecture that unifies mobile money services (ZAAD, EVC Plus, Sahal, eDahab, Telesom, Golis, Somtel) into a single smart, intuitive interface. 

The application functions as a **smart transaction layer**, reading live balances, automating USSD/API execution via Telecom APIs, and providing a modern P2P and Merchant payment network through dynamic QR codes.

---

## 🌟 Key Features

*   **📱 Unified Telecom Integration:** Abstraction layer designed to communicate with major national mobile money systems seamlessly.
*   **💳 Dynamic QR Code Payments:** Lightning-fast P2P and C2B transaction networking via QR generation and scanning.
*   **🔐 Role-Based Security Modes:** Fully separated and localized interfaces for **Customers** and **Merchants**.
*   **🏦 Real-Time Dashboards:** Instant insights into balances and transaction histories without needing USSD codes.
*   **🔒 Secure App Enclave:** Localized biometric simulation and PIN-based login barriers for sensitive data protection.

---

## 🆕 Latest Updates & Enhancements

*   **🎨 Merchant Theme Overhaul:** Re-engineered the Merchant Dashboard with a striking, high-contrast **Red Gradient Theme** (`#E8192C` to `#B01221`) for immediate visual distinction from standard consumer accounts.
*   **🎛️ Optimized Merchant Navigation:** Decluttered the merchant interface by streamlining quick-access tools. The merchant action grid now intentionally focuses on primary operational needs: **Merchant QR**, **Send Money**, and dedicated **Support**.
*   **⚙️ Redirection Logic Refined:** Improved authentication and routing—merchants are effortlessly segmented to their specialized dashboards, streamlining user flow instantly upon login and category selection.

---

## 🛠 Tech Stack

This project leverages a modern **Full-Stack Monorepo** environment for seamless deployments and rapid development:

**Frontend Ecosystem**
*   **Framework:** React 18 + Vite + TypeScript
*   **Styling & UI:** Tailwind CSS (Mobile-first, High-Performance)
*   **State Management:** Zustand
*   **Animations:** Motion (Framer Motion)
*   **Routing:** React Router v7

**Backend Architecture**
*   **Runtime:** Node.js + Express + `tsx` / `esbuild`
*   **Pattern:** Controller / Service / Extensible Adapters (`BaseTelecomAdapter`)

---

## 🗂 Directory Structure

```text
.
├── src/
│   ├── backend/         # Express server logic & APIs
│   │   ├── adapters/    # Telecom API Integrations (ZAAD, EVC, Sahal placeholders)
│   │   ├── middleware/  # Auth, Input Validation, Role-Based Access Guards
│   │   ├── models/      # Database Schemas & Interfaces
│   │   ├── routes/      # Application REST API Routes
│   │   └── app.ts       # Express Engine
│   ├── components/      # Shared React Components (Layouts, UI Elements)
│   ├── hooks/           # Custom React Hooks for data pulling
│   ├── pages/           # Application Screens (Login, Home, Activity...)
│   ├── store/           # Zustand Global State stores
│   └── main.tsx         # React DOM Entry
├── dist/                # Production Distribution Output
├── server.ts            # Node.js Server + Vite Middleware Injection for Dev
├── package.json         # Dependency & Script Manifest
└── README.md            # You are here!
```

---

## 🔌 Telecom Adapter System

The application is powered by an abstract `BaseTelecomAdapter` architecture. When a user requests a payment loop:
1.  **Detection:** App detects the active user's telecom provider.
2.  **Intercept:** A specific subclass (e.g., `ZAADAdapter` or `EVCAdapter`) intercepts the request.
3.  **Execution:** The adapter bridges the standard REST API to the secure, telecom-specific interface.

*(Note: Provider credentials require API keys in production. Extensible structures are fully mounted and ready for API secrets).*

---

## 🚀 Getting Started

Follow these steps to spin up the local development environment.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and assign your secrets appropriately.

### 3. Start Development Server
This fires up the unified full-stack server (Vite + Express).
```bash
npm run dev
```

### 4. Build for Production
Compiles the React application into static assets, and bundles the Express server via `esbuild`.
```bash
npm run build
```

### 5. Start Production Server
```bash
npm start
```
