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

## 3. 🚀 FEATURES & DETAILED WORKFLOWS

### **A. The Home Page (`Home.jsx`)**
*   **Hero Section:** Features a "Luxury Ivory" theme with a "Shop Collection" CTA.
*   **Parallax Effect:** The "Maisons" section uses a fixed background image that creates a depth effect as you scroll.
*   **Featured Collections:** Displays a grid of categories (Ready-to-Wear, Accessories).

### **B. Authentication (The Gatekeeper)**
1.  **User Signs Up:** Enters details in `Register.jsx`.
2.  **Backend Action:** `authController.register` hashes the password using `bcryptjs` and saves the user to MongoDB.
3.  **Token Creation:** A **JWT** is generated and sent back.
4.  **Frontend Action:** The token is stored in `localStorage`. The Navbar updates to show the user's name.

### **C. The Atelier (Style Hub) - AI Quizzes**
*   **Location:** `StyleHub.jsx`
*   **What it does:** Offers 4 quizzes: Color Analysis, Body Shape, Skincare, Makeup.
*   **The Flow:**
    1.  User selects a quiz (e.g., Color Analysis).
    2.  Answers a series of questions (stored in `quizAnswers` state).
    3.  **Submission:** On the last question, `submitQuiz` is called.
    4.  **API Call:** Sends answers to `POST /api/style-hub/quiz-result`.
    5.  **AI Magic (Backend):**
        *   `styleHub.js` receives the answers.
        *   It constructs a specific prompt for the **Groq API**.
        *   **Prompt Engineering:** We explicitly tell the AI to format the output with `###` separators and `**bold**` text.
    6.  **Rendering (Frontend):**
        *   The frontend receives the text.
        *   It parses the `###` to split the text into 3 sections.
        *   It renders **3 Elegant Cards**: "The Profile", "The Recommendations", "The Strategy".
        *   It applies **Montserrat** font for readability and renders bullet points with gold accents.

### **D. AI Stylist (Chat)**
*   **Location:** `AiStylist.jsx`
*   **Function:** A chat interface where users can ask open-ended fashion questions.
*   **Backend:** Uses `routes/chat.js` to send the conversation history to Groq and get a conversational response.

### **E. Shop & Collections**
*   **Location:** `Collections.jsx`
*   **Function:** Fetches products from `GET /api/products`.
*   **Display:** Renders a grid of `ProductCard` components.

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
