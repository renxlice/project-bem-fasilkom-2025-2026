# Copilot Instructions for project-bem-fasilkom-2025-2026

## Project Overview
This is a React + Vite web application for BEM Fasilkom, featuring QR code scanning, Firebase integration, and modular page/component structure. The project uses Vite for fast development and HMR, and ESLint for code quality.

## Architecture & Key Patterns
- **Entry Point:** `src/main.jsx` sets up React Router and page routing.
- **Pages:** Located in `src/Pages/`, each page (e.g., `Home.jsx`, `ScannerPage.jsx`) is routed via React Router.
- **Components:** Reusable UI elements in `src/Components/`. Example: `QRScanner.jsx` for QR code scanning.
- **Service Layer:** `src/Service/` contains integrations (e.g., `firebase.js` for Firestore CRUD and listeners).
- **Styles:** CSS files in `src/Styles/` for page/component styling.

## Data Flow & Integration
- **QR Scanning:** `ScannerPage.jsx` uses `QRScanner` and interacts with Firestore via `saveToFirestore` and `listenToAbsensi`.
- **Firestore:** All attendance data is stored in the `absensi` collection. Use `saveToFirestore(data)` to add, and `listenToAbsensi(callback)` for real-time updates.
- **Routing:** All navigation is handled via React Router (`BrowserRouter`, `Routes`, `Route`).

## Developer Workflows
- **Start Dev Server:** `pnpm dev` or `npm run dev` (runs Vite)
- **Build:** `pnpm build` or `npm run build`
- **Preview Production Build:** `pnpm preview` or `npm run preview`
- **Lint:** `pnpm lint` or `npm run lint`

## Conventions & Patterns
- **React Function Components:** All components/pages use function syntax and hooks.
- **Module Imports:** Use relative imports within `src/`.
- **Firestore Usage:** Always use the provided service functions for DB access.
- **Error Handling:** Show user alerts via local state (see `ScannerPage.jsx`).
- **Styling:** Use CSS modules in `src/Styles/` for scoped styles.

## External Dependencies
- **Firebase:** Used for Firestore and analytics. Config in `src/Service/firebase.js`.
- **QR Code:** Uses `html5-qrcode`, `qrcode`, and `react-qr-reader` for scanning/generation.
- **Routing:** `react-router-dom` for navigation.
- **Other:** `sweetalert2` for alerts, `swiper` for carousels, `three` for 3D, `xlsx` for Excel parsing.

## Examples
- **Add attendance:** `saveToFirestore({ nim, nama })`
- **Listen for updates:** `listenToAbsensi(callback)`
- **Scan QR:** Use `QRScanner` component in a page

## Key Files
- `src/main.jsx` (app entry, routing)
- `src/Pages/ScannerPage.jsx` (QR scan logic)
- `src/Service/firebase.js` (Firestore integration)
- `src/Components/QRScanner.jsx` (QR scanner UI)

---
If any conventions or workflows are unclear, please request clarification or examples from maintainers.
