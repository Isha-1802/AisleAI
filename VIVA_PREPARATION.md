# 🎓 AisleAI Viva - Simplified Guide

This version is written in simple English with the **simplest possible code**.

---

## 🗣️ Part 1: About Your Project & You

### 1. Tell us about your project (AisleAI)
**Simple Answer:**
"I built a luxury fashion website called **AisleAI**. It’s like an online store but with an **AI Stylist**.
*   **How it works:** Users take a style quiz, and the AI (Groq API) suggests outfits for them.
*   **Tech Stack:** I used **React** for the website, **Node.js** for the backend, and **MongoDB** database.
*   **Best Feature:** I made a custom search bar that updates the URL automatically while you type."

### 2. What are your skills?
**Simple Answer:**
"I am a Full Stack Developer.
*   **React:** I know hooks like `useState` and `useEffect`.
*   **Backend:** I can build APIs using Node.js and Express.
*   **Problem Solving:** I am good at debugging and fixing errors."

### 3. What was your biggest challenge?
**Simple Answer:**
"The hardest part was **deployment**. The Frontend (Vercel) couldn't talk to the Backend (Render).
**Fix:** I found out it was a security issue called **CORS**. I added code in my backend to allow my frontend URL to access the data. Then it worked."

### 4. What are the CRUD operations in your project?
I have implemented **11 CRUD operations** across Users, Wishlist, Products, and the **AI Stylist Chat**.

| Resource | Operation | API Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **User** | **CREATE** | `POST /register` | Creates a new user account. |
| **User** | **READ** | `GET /me` | Fetches the current user's profile. |
| **User** | **UPDATE** | `PUT /preferences` | Updates style preferences. |
| **User** | **DELETE** | `DELETE /profile` | Deletes the user account. |
| **Favorites** | **CREATE** | `POST /favorites` | Adds item to wishlist. |
| **Favorites** | **READ** | `GET /favorites` | View wishlist items. |
| **Favorites** | **DELETE** | `DELETE /favorites/:id` | Remove from wishlist. |
| **Products** | **READ** | `GET /products` | View the shop. |
| **AI Chat** | **CREATE** | `POST /chat/message` | **Creates** a new message in the database. |
| **AI Chat** | **READ** | `GET /chat/conversations` | **Reads** past chat history. |
| **AI Chat** | **DELETE** | `DELETE /chat/conversations/:id` | **Deletes** a specific chat thread. |

> **Yes, your AI Stylist uses CRUD!** It saves every message to MongoDB so users can see their history.

---

## 🕵️‍♀️ Part 2: How to Show CRUD in "Inspect Element"

If the examiner asks: *"Show me the API call happening"*, follow these steps:

1.  **Right-click** anywhere on your page and select **Inspect**.
2.  Click the **Network** tab at the top.
3.  Click the **Fetch/XHR** filter (this hides images/CSS so you only see API calls).
4.  Perform the action on the screen and watch the list.

### 📝 The Cheat Sheet for Demo

| To Show This... | Go To This Page... | Do This Action... | Look in Network Tab For... |
| :--- | :--- | :--- | :--- |
| **Create User** | Register Page | Fill form -> Click "Register" | Name: `register`<br>Status: `201 Created` |
| **Read User** | *Any Page* | Just refresh the page (App checks login) | Name: `me`<br>Status: `200 OK` |
| **Create Favorite** | Collections | Click the "Heart" ♡ icon on a dress | Name: `favorites`<br>Status: `200 OK` |
| **AI Chat (Create)** | AI Stylist Page | Send a message like "Find me a red dress" | Name: `message`<br>Status: `200 OK` |
| **AI Chat (Read)** | AI Stylist Page | Just open the page (loads history) | Name: `conversations`<br>Status: `200 OK` |

---

## 📝 Part 3: Coding Questions (Made Simple)

### 1. Filter Even Numbers
**Question:** Get only even numbers from a list.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// Keep numbers where (number % 2) is 0
const evens = numbers.filter(x => x % 2 === 0);

console.log(evens); // [2, 4, 6]
```

### 2. Polyfills (Writing your own versions)
If they ask: "Write your own .map() function."

**Map Polyfill (Simplest Version):**
```javascript
Array.prototype.myMap = function(fn) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(fn(this[i]));
  }
  
  return result;
};
```

**Filter Polyfill (Simplest Version):**
```javascript
Array.prototype.myFilter = function(fn) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    // If the function returns true, keep the item
    if (fn(this[i]) === true) {
      result.push(this[i]);
    }
  }
  
  return result;
};
```

### 3. Deep Clone (Copying an object)
**Answer:**
```javascript
const copy = JSON.parse(JSON.stringify(original));
```

---

## 🧠 Part 4: Theory Concepts

### 1. The `this` keyword
*   It refers to **who called the function**.
*   `obj.func()` -> `this` is `obj`.
*   `func()` -> `this` is global (window).
*   **Arrow functions (`=>`)** don't have their own `this`.

### 2. Promises (Pizza Analogy)
*   **Promise.all (The Combo):** I need Pizza **AND** Coke. If one is missing, I cancel.
*   **Promise.race (The Race):** I ordered from 2 places. I eat specifically **whichever arrives first**.
*   **Promise.any (The Backup):** I call 3 taxis. I take the **first one that actually shows up**.
