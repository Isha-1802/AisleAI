# 👗 AisleAI – AI-Powered Fashion & Beauty Assistant

> Personalized fashion and beauty recommendations powered by AI.

🌐 **Live Demo:** https://aisle-ai-4avu.vercel.app/

---

## ✨ Overview

**AisleAI** is a full-stack AI-powered fashion and beauty platform that helps users discover outfits, beauty products, and personalized style recommendations through intelligent conversations and interactive styling quizzes.

Built with the MERN stack and powered by **Groq's Llama 3.3 70B Versatile model**, AisleAI combines e-commerce functionality with real-time AI styling assistance to create a modern shopping experience.

---

## 🚀 Features

### 🤖 AI Fashion Stylist

* Real-time AI chat assistant
* Personalized outfit recommendations
* Occasion-based styling suggestions
* Beauty and skincare advice
* Streaming responses for a natural conversation experience

### 🎯 StyleHub Quizzes

* Body shape analysis
* Personal style identification
* Budget-aware recommendations
* Customized fashion insights
* AI-generated style reports

### 🛍️ E-Commerce Experience

* Product catalog browsing
* Advanced product filtering
* Shopping cart functionality
* Wishlist management
* Product reviews and ratings
* User profile management

### 🔐 Authentication & Security

* JWT-based authentication
* Protected routes
* Secure user sessions
* Personalized recommendations

### 💎 Smart Recommendations

* Affordable, Mid-Range, and Luxury suggestions
* Catalog-based product matching
* Context-aware styling advice
* Personalized shopping experience

---

## 🖥️ Live Demo

### Frontend

🔗 https://aisle-ai-4avu.vercel.app/

### Backend API

🔗 https://aisleai-8.onrender.com

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Socket.io Client
* Modern CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.io

### AI Integration

* Groq SDK
* Llama 3.3 70B Versatile

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## 📂 Project Structure

```bash
AisleAI
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   └── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

* Node.js (v22+ recommended)
* MongoDB Atlas or Local MongoDB
* Groq API Key

### Clone Repository

```bash
git clone https://github.com/Isha-1802/AisleAI.git

cd AisleAI
```

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5001/api
```

---

## 🌱 Seed Database

Generate demo products:

```bash
cd backend

npm run seed
```

---

## ▶️ Run Application

### Backend

```bash
cd backend

npm run dev
```

### Frontend

```bash
cd frontend

npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## 🤖 AI Features

### Chat Stylist

Users can ask questions like:

* "What should I wear to a wedding?"
* "Suggest luxury outfits for summer."
* "Recommend skincare products for dry skin."
* "Create a business casual look under ₹5000."

The AI generates personalized recommendations using Groq's Llama 3.3 model while matching products from the catalog.

### StyleHub

Interactive quizzes help users discover:

* Body shape recommendations
* Personal fashion style
* Color preferences
* Budget-friendly styling options

---

## 📈 Future Improvements

* AI-powered virtual try-on
* Outfit image generation
* Fashion trend analysis
* Social sharing
* Personalized wardrobes
* Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Isha**

Built with ❤️ using React, Node.js, MongoDB, and Groq AI.
