# 📘 AISLE AI - COMPLETE PROJECT MASTER GUIDE

## 1. 🏗️ PROJECT ARCHITECTURE
AisleAI is a modern, full-stack **MERN** application designed to revolutionize luxury fashion e-commerce with Artificial Intelligence.

*   **Frontend:** React.js (Vite), Vanilla CSS (Custom Design System).
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB (Atlas).
*   **AI Engine:** Groq SDK (Llama 3 70B Model).
*   **Authentication:** JWT (JSON Web Tokens).

---

## 2. 📂 FILE STRUCTURE & KEY DIRECTORIES

### **Frontend (`/frontend/src`)**
*   **`main.jsx`**: The entry point. Wraps the app in `BrowserRouter`.
*   **`App.jsx`**: The main router. Defines all routes (`/`, `/login`, `/style-hub`, etc.).
*   **`components/`**: Reusable UI blocks.
    *   `Navbar.jsx`: The top navigation bar. Handles "logged in" state display.
    *   `Footer.jsx`: The site footer with links.
    *   `ProductCard.jsx`: Displays individual product details.
*   **`pages/`**: The main views.
    *   `Home.jsx`: The landing page with Hero, Parallax, and featured sections.
    *   `Login.jsx` / `Register.jsx`: Auth forms.
    *   `StyleHub.jsx`: **"The Atelier"** - The core AI quiz feature.
    *   `AiStylist.jsx`: The AI Chatbot interface.
    *   `Collections.jsx`: The product catalog.
    *   `InfoPage.jsx`: Dynamic page for About, Contact, Shipping, etc.
*   **`assets/`**: Images and static files.

### **Backend (`/backend/src`)**
*   **`server.js`**: The server entry point. Connects to MongoDB and sets up routes.
*   **`models/`**: Database schemas (Mongoose).
    *   `User.js`: Stores name, email, password (hashed).
    *   `Product.js`: Stores product details (price, image, category).
*   **`routes/`**: API endpoints.
    *   `auth.js`: Login/Register endpoints.
    *   `styleHub.js`: Handles AI Quiz logic and Groq API calls.
    *   `products.js`: Fetches product data.
*   **`controllers/`**: The logic behind the routes.
    *   `authController.js`: Handles registration and login logic (hashing passwords, generating tokens).
*   **`middleware/`**:
    *   `auth.js`: Verifies JWT tokens to protect private routes.

---

## AisleAI - Premium Fashion E-Commerce Platform
**Project Status: Production Ready (v1.2)**
**Last Updated:** December 09, 2025

AisleAI is a luxury fashion e-commerce platform that combines aesthetic excellence with robust functionality. It features a responsive React frontend, a Node.js/Express backend, and MongoDB database, fully deployed on Vercel (Frontend) and Render (Backend).

---

## 🚀 Key Features Implemented

### 1. **Advanced Search Functionality**
-   **Debounced Search:** The search bar in the "Collections" page uses a custom `useDebounce` hook (500ms delay). This ensures smooth typing without firing excessive API calls.
-   **URL Sync:** Search queries are instantly reflected in the URL parameters (e.g., `?search=lipstick`), allowing search results to be shared or bookmarked.
-   **Auto-Reset:** Searching automatically resets the pagination to Page 1 for consistent results.

### 2. **Wishlist System**
-   **Global State:** Managed via `WishlistContext`, accessible from anywhere in the app.
-   **Badge Notification:** The Header Wishlist icon displays a real-time count badge (red) when items are added.
-   **Smart Interaction:**
    -   **Product Cards:** "Heart" button is purely functional and does not trigger the product page link (event propagation fixed).
    -   **Visual Feedback:** Heart turns red (`#ff3f6c`) when active.
    -   **Management:** Users can "Move to Bag" or "Remove" items directly from the dedicated Wishlist page.

### 3. **Product Experience**
-   **Dynamic Routing:** Individual product pages (`/product/:id`) fetch data dynamically.
-   **Clean UI:** Refactored Product Cards prevent invalid HTML nesting (Buttons outside of Anchors) for reliable cross-browser performance.
-   **Filters:** Robust filtering by Category, Brand, Price, and Occasion.

---

## 🔍 How to Inspect & Demo (Evaluation Guide)

Follow these steps to demonstrate the application's full capabilities during evaluation:

### **Scene 1: The Search Demo (Responsiveness)**
1.  Navigate to the **Collections** page.
2.  Locate the Search Bar at the top right of the product grid.
3.  **Action:** Type "Maybelline" slowly.
4.  **Observation:** Notice the URL changes to `.../collections?search=Maybelline` automatically. The product grid updates to show only matching items without you pressing "Enter". This demonstrates **Debouncing**.
5.  **Action:** Clear the text.
6.  **Observation:** The grid restores to show all products.

### **Scene 2: The Wishlist Flow (State Management)**
1.  On the Collections page, find any product card (e.g., a Dress).
2.  **Action:** Click the empty "Heart" icon on the card.
3.  **Observation:**
    -   The Heart turns **Red**.
    -   Look at the **Header**: A red number badge (e.g., "1") appears on the Wishlist icon.
4.  **Action:** Click the Header Wishlist Icon.
5.  **Observation:** You are navigated to the **Wishlist Page**. The item is present there.
6.  **Action:** Click "**Move to Bag**".
7.  **Observation:** An alert confirms the move, the item leaves the wishlist, and the Cart counter in the header increments.

### **Scene 3: Product Details & Cart**
1.  Go back to Collections.
2.  **Action:** Click on any Product Image.
3.  **Observation:** You are taken to the **Product Details Page**.
4.  **Action:** Click "**Add to Bag**".
5.  **Observation:** Success alert appears. The Cart badge updates immediately.

### **Scene 4: Filters**
1.  On Collections page, verify the Sidebar filters.
2.  **Action:** Select a Category (e.g., "Dresses") and a Price Range.
3.  **Observation:** The grid filters dynamically.

---

## 🛠 Recent Critical Fixes (Quality Assurance)
-   **Fix:** Resolved "Missing closing div" build errors in `Collections.jsx` ensuring 100% successful Vercel deployments.
-   **Fix:** Removed recursive/duplicate imports in `ProductDetails.jsx` that were causing build collisions.
-   **Fix:** Refactored `ProductCard` to move `<button>` elements outside of `<a href...>` tags, adhering to valid HTML5 standards and fixing click-blocking issues.

## 🔗 Live Deployment
-   **Frontend:** `https://aisle-ai-4avu.vercel.app`
-   **Backend:** `https://aisle-ai-production.onrender.com`

*Good luck with the presentation! The project is stable and feature-complete.*

---

## 4. 🛠️ TECHNICAL DEEP DIVE

### **State Management**
*   We use React's `useState` for local state (e.g., `activeQuiz`, `quizStep`, `user`).
*   We use `useEffect` to trigger actions on load (e.g., checking if a user is logged in).

### **Styling Strategy**
*   **CSS Modules/Files:** Each component has its own CSS file (e.g., `Home.css`, `StyleHub.css`).
*   **Design System:** We use variables (implicitly) for colors like `#D4AF37` (Gold) and `#FDFBF7` (Cream).
*   **Glassmorphism:** Used in the Footer and Hero for a modern, premium feel (`backdrop-filter: blur`).

### **Security**
*   **Passwords:** Never stored in plain text. Hashed with `bcryptjs`.
*   **API Access:** Protected routes require a valid Bearer Token in the header.
*   **Environment Variables:** Sensitive keys (MongoDB URI, Groq API Key) are stored in `.env` and never committed to code.

### **AI Integration Details**
*   **Model:** Llama 3 (via Groq) is used for its speed and reasoning capabilities.
*   **Prompt Engineering:** The prompts are carefully crafted in `backend/src/routes/styleHub.js` to ensure the AI acts like a "Fashion Expert" and formats the output strictly for our card layout.

---

## 5. 🔮 FUTURE SCALABILITY
*   **Cart & Checkout:** The structure exists to add `CartContext` and Stripe integration.
*   **User Profile:** `userController.js` can be expanded to allow users to save their AI results.

---
*This document serves as the single source of truth for the AisleAI codebase.*
