<div align="center">

# ✨ AisleAI

### Where Luxury Fashion Meets Artificial Intelligence

*A full-stack MERN e-commerce platform that transforms online shopping into a personalized, AI-powered styling experience.*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-D4AF37?style=for-the-badge)](https://aisle-ai-4avu.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel)](https://aisle-ai-4avu.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://aisleai-8.onrender.com)

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_·_Llama_3-F55036?style=flat-square&logo=meta&logoColor=white)
![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)

<br/>

### 🧭 Quick Links

[![Overview](https://img.shields.io/badge/📖_Overview-1a1a1a?style=for-the-badge)](#-overview)
[![Features](https://img.shields.io/badge/🌟_Features-1a1a1a?style=for-the-badge)](#-key-features)
[![Tech](https://img.shields.io/badge/🏗️_Tech_Stack-1a1a1a?style=for-the-badge)](#-tech-stack--architecture)
[![Setup](https://img.shields.io/badge/🚀_Setup-1a1a1a?style=for-the-badge)](#-getting-started)
[![API](https://img.shields.io/badge/🔌_API-1a1a1a?style=for-the-badge)](#-api-reference)
[![Demo](https://img.shields.io/badge/🎬_Demo-1a1a1a?style=for-the-badge)](#-demo-walkthrough)

</div>

<br/>

<a id="overview"></a>
<div align="center">

![Overview](https://img.shields.io/badge/📖%20%20OVERVIEW-D4AF37?style=for-the-badge&labelColor=1a1a1a)

</div>

## 📖 Overview

**AisleAI** is a modern, production-ready luxury fashion e-commerce platform that blends aesthetic excellence with intelligent functionality. Beyond a traditional storefront, it acts as a **personal AI stylist** — analyzing your preferences, running interactive style quizzes, and delivering tailored fashion recommendations in real time.

Built on the **MERN stack** and powered by **Groq's lightning-fast Llama 3 70B** model, AisleAI delivers a seamless, responsive, and premium shopping journey from browse to bag.

<div align="center">

| 🎯 Goal | 💡 Approach |
|:---:|:---|
| **Personalization** | AI-driven style quizzes & color analysis |
| **Speed** | Groq inference + debounced search + streaming responses |
| **Experience** | Glassmorphism UI, luxury design system, responsive layouts |
| **Trust** | JWT auth, bcrypt hashing, protected routes |

</div>

<br/>

<a id="key-features"></a>
<div align="center">

![Features](https://img.shields.io/badge/🌟%20%20KEY%20FEATURES-FF3F6C?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🌟 Key Features

### 🤖 The Atelier — AI Style Hub
- **Interactive Style Quiz** that learns your aesthetic and returns personalized outfit recommendations.
- **AI Color Analysis** to find the palette that suits you best.
- **Auto-Saved Results** — quiz outcomes stream in live and persist to your profile automatically.

### 💬 AI Stylist Chatbot
- Real-time conversational styling assistant powered by **Llama 3 (Groq)**.
- **Streaming responses** with luxury loading states for a polished feel.
- Persistent **conversation history** stored per user.

### 🛍️ Rich Shopping Experience
- **Advanced Search** with a custom `useDebounce` hook (500ms) and URL sync (`?search=…`) for shareable results.
- **Smart Filters** by category, brand, price range, and occasion.
- **Dynamic Product Pages** (`/product/:id`) with reviews and ratings.
- **Wishlist System** with a live badge counter and one-click "Move to Bag".
- **Shopping Cart** with real-time header updates.
- **Product Reviews** — authenticated users can add, edit, and delete reviews.

### 🔐 Authentication & Security
- Secure **JWT-based** login & registration with show/hide password toggles.
- Passwords hashed with **bcryptjs** — never stored in plain text.
- **Protected routes** guarded by Bearer-token middleware.
- User profiles with saved preferences and favorites.

<br/>

<a id="tech-stack--architecture"></a>
<div align="center">

![Tech Stack](https://img.shields.io/badge/🏗️%20%20TECH%20STACK%20%26%20ARCHITECTURE-D4AF37?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🏗️ Tech Stack & Architecture

<div align="center">

| Layer | Technologies |
|:---|:---|
| **Frontend** | React 19, Vite, React Router 7, Axios, Socket.io-client, Vanilla CSS (custom design system) |
| **Backend** | Node.js, Express 5, Mongoose, Multer, Socket.io |
| **Database** | MongoDB (Atlas) |
| **AI Engine** | Groq SDK — Llama 3 70B |
| **Auth** | JWT (jsonwebtoken) + bcryptjs |
| **Deployment** | Vercel (frontend) · Render (backend) |

</div>

```
AisleAII/
├── frontend/                  # React + Vite SPA
│   └── src/
│       ├── pages/             # Home, Collections, StyleHub, AIStylist, Cart, Profile…
│       ├── components/        # Header, Footer, ReviewSection, ScrollToTop…
│       ├── context/           # AuthContext, CartContext, WishlistContext
│       ├── data/              # Static home & mega-menu data
│       ├── App.jsx            # Router & route definitions
│       └── main.jsx           # Entry point (BrowserRouter)
│
├── backend/                   # Node + Express API
│   └── src/
│       ├── models/            # User, Product, Review, Conversation, Message
│       ├── routes/            # auth, products, ai, chat, user, styleHub, reviews
│       ├── controllers/       # auth, product, chat, review, user logic
│       ├── middleware/        # JWT auth guard
│       └── server.js          # App entry — DB connect + route mounting
│
├── PROJECT.md                 # Full project master guide
└── README.md
```

### 🎨 Design System
- **Palette:** Gold `#D4AF37` · Cream `#FDFBF7` · Accent Pink `#FF3F6C`
- **Glassmorphism** with `backdrop-filter: blur` on hero & footer for a premium feel.
- **Component-scoped CSS** — each view owns its stylesheet for maintainability.

<br/>

<a id="getting-started"></a>
<div align="center">

![Getting Started](https://img.shields.io/badge/🚀%20%20GETTING%20STARTED-FF3F6C?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB** (local instance or an Atlas connection string)
- A **Groq API key** — [get one free](https://console.groq.com/)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Isha-1802/AisleAI.git
cd AisleAI
```

### 2️⃣ Configure the backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5001
GROQ_API_KEY=your_groq_api_key_here
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb://127.0.0.1:27017/aisleai   # or your Atlas SRV string
```

Seed the database (optional) and start the server:
```bash
npm run seed     # optional: populate sample products
npm run dev      # starts on http://localhost:5001
```

### 3️⃣ Configure the frontend
```bash
cd ../frontend
npm install
npm run dev      # starts Vite dev server (http://localhost:5173)
```

Open **http://localhost:5173** and start styling ✨

<br/>

<a id="screenshots"></a>
<div align="center">

![Screenshots](https://img.shields.io/badge/📸%20%20SCREENSHOTS-D4AF37?style=for-the-badge&labelColor=1a1a1a)

</div>

## 📸 Screenshots

<div align="center">

> 🚧 **Screenshots coming soon.** Capture the four shots below, drop them into a `docs/screenshots/` folder, then uncomment the gallery to bring this section to life.

**Shot list:** &nbsp; 🏠 `home.png` &nbsp;·&nbsp; ✨ `stylehub.png` &nbsp;·&nbsp; 💬 `stylist.png` &nbsp;·&nbsp; 🛍️ `collections.png`

</div>

<!--
Once your images exist in docs/screenshots/, delete this comment wrapper to reveal the gallery:

<div align="center">

| Home — Hero & Parallax | The Atelier — AI Style Quiz |
|:---:|:---:|
| <img src="docs/screenshots/home.png" alt="Home page" width="420"/> | <img src="docs/screenshots/stylehub.png" alt="AI Style Hub" width="420"/> |
| **AI Stylist Chat** | **Collections & Filters** |
| <img src="docs/screenshots/stylist.png" alt="AI Stylist chatbot" width="420"/> | <img src="docs/screenshots/collections.png" alt="Collections page" width="420"/> |

_Prefer motion? Record a short walkthrough:_

<img src="docs/screenshots/demo.gif" alt="AisleAI demo" width="720"/>

</div>
-->

<br/>

<a id="demo-walkthrough"></a>
<div align="center">

![Demo Walkthrough](https://img.shields.io/badge/🎬%20%20DEMO%20WALKTHROUGH-FF3F6C?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🎬 Demo Walkthrough

A guided tour of the flagship flows — perfect for a live demo or evaluation.

### Scene 1 · Advanced Search (Responsiveness)
1. Go to **Collections**.
2. Slowly type `Maybelline` in the search bar.
3. Watch the URL update to `…/collections?search=Maybelline` **automatically** — no Enter key. The grid filters live. → **Debouncing in action.**
4. Clear the text and the full grid restores.

### Scene 2 · Wishlist Flow (State Management)
1. On any product card, click the empty **♡ Heart**.
2. The heart turns **red** and a **count badge** appears on the header's wishlist icon.
3. Click the wishlist icon → land on the **Wishlist page** with your item.
4. Click **Move to Bag** → the item leaves the wishlist and the **cart counter increments**.

### Scene 3 · Product Details & Cart
1. Click any product image → the **Product Details** page opens.
2. Click **Add to Bag** → success toast, and the cart badge updates instantly.

### Scene 4 · The Atelier (AI Style Hub)
1. Open **Style Hub** and start the **AI Style Quiz**.
2. Answer the prompts → recommendations **stream in live** and **auto-save** to your profile.
3. Try **AI Color Analysis** for a personalized palette.

### Scene 5 · AI Stylist Chat
1. Head to **AI Stylist**.
2. Ask something like _"What should I wear to a summer wedding?"_
3. Watch the **Llama 3** response stream in — your conversation is saved for later.

<br/>

<a id="api-reference"></a>
<div align="center">

![API Reference](https://img.shields.io/badge/🔌%20%20API%20REFERENCE-D4AF37?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🔌 API Reference

Base URL: `http://localhost:5001/api` · 🔒 = requires `Authorization: Bearer <token>`

### Auth — `/api/auth`
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/register` | Create a new account |
| `POST` | `/login` | Authenticate & receive a JWT |
| `GET` | `/me` 🔒 | Get the current user |

### Products — `/api/products`
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/` | List products (search, filter, paginate) |
| `GET` | `/featured` | Featured products |
| `GET` | `/trending` | Trending products |
| `GET` | `/filters` | Available filter options |
| `GET` | `/compare` | Compare brands |
| `GET` | `/:id` | Product details |

### Style Hub — `/api/style-hub` 🔒
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/color-analysis` | AI color analysis |
| `POST` | `/style-recommendations` | Personalized style picks |
| `POST` | `/quiz-result` | Save quiz outcome |

### AI & Chat — `/api/ai`, `/api/chat` 🔒
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/ai/chat` | One-shot AI stylist message |
| `GET` | `/chat/conversations` | List conversations |
| `GET` | `/chat/conversations/:id` | Get a conversation |
| `POST` | `/chat/conversations` | Start a conversation |
| `POST` | `/chat/message` | Send a message |
| `DELETE` | `/chat/conversations/:id` | Delete a conversation |

### User — `/api/user` 🔒
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/profile` | Get profile |
| `PUT` | `/preferences` | Update preferences |
| `GET` | `/favorites` | List favorites |
| `POST` | `/favorites` | Add a favorite |
| `DELETE` | `/favorites/:productId` | Remove a favorite |
| `DELETE` | `/profile` | Delete account |

### Reviews — `/api/reviews`
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/:productId` | Get product reviews |
| `POST` | `/` 🔒 | Add a review |
| `PUT` | `/:reviewId` 🔒 | Update a review |
| `DELETE` | `/:reviewId` 🔒 | Delete a review |

<br/>

<a id="ai-integration"></a>
<div align="center">

![AI Integration](https://img.shields.io/badge/🧠%20%20AI%20INTEGRATION-FF3F6C?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🧠 AI Integration

AisleAI uses **Groq's Llama 3 70B** for its exceptional speed and reasoning:

- **Prompt Engineering** — carefully crafted system prompts in `backend/src/routes/styleHub.js` make the model behave as a genuine *Fashion Expert*, formatting output to fit the card-based UI.
- **Streaming** — responses stream token-by-token for a responsive chat and quiz experience.
- **Grounded Output** — recommendations are formatted strictly to render cleanly within the app's components.

<br/>

<a id="security"></a>
<div align="center">

![Security](https://img.shields.io/badge/🔒%20%20SECURITY%20HIGHLIGHTS-D4AF37?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🔒 Security Highlights

- 🔑 **Password hashing** with bcryptjs — plain-text passwords never touch the database.
- 🛡️ **JWT middleware** protects private routes; every sensitive request requires a valid Bearer token.
- 🤫 **Environment variables** keep the MongoDB URI, JWT secret, and Groq key out of source control.

<br/>

<a id="roadmap"></a>
<div align="center">

![Roadmap](https://img.shields.io/badge/🗺️%20%20ROADMAP-FF3F6C?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🗺️ Roadmap

- [ ] **Checkout & Payments** — Stripe integration on the existing cart structure.
- [ ] **Expanded profiles** — richer saved-outfit history and style boards.
- [ ] **Image-based styling** — upload a photo for outfit matching (Multer already wired).
- [ ] **Social sharing** of AI-generated looks.

<br/>

<a id="contributing"></a>
<div align="center">

![Contributing](https://img.shields.io/badge/🤝%20%20CONTRIBUTING-D4AF37?style=for-the-badge&labelColor=1a1a1a)

</div>

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a pull request. For major changes, please open an issue first to discuss what you'd like to change.

```bash
# 1. Fork & clone
git checkout -b feature/amazing-feature
# 2. Commit your changes
git commit -m "feat: add amazing feature"
# 3. Push & open a PR
git push origin feature/amazing-feature
```

<br/>

<a id="license"></a>
<div align="center">

![License](https://img.shields.io/badge/📄%20%20LICENSE-FF3F6C?style=for-the-badge&labelColor=1a1a1a)

</div>

## 📄 License

Released under the **ISC License**. See the [`LICENSE`](LICENSE) file for details — you're free to use, modify, and distribute this project with attribution.

---

<div align="center">

### Built with 💛 by **Ishita Thakur**

*AisleAI — style, intelligently curated.*

[![Live Demo](https://img.shields.io/badge/✨_Try_AisleAI_Now-D4AF37?style=for-the-badge)](https://aisle-ai-4avu.vercel.app/)

</div>
