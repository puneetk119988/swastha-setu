# Swastha Setu 🩺💬  
*A simple health & wellness portal with AI-style medical chatbot (local demo)*

---

## 📌 Project Overview

**Swastha Setu** is a local web application built as a small project/demo that provides:
- 🏃‍♂️ Exercise videos (played locally)
- 🥗 A simple diet plan
- 🤖 An AI-style medical chatbot that answers questions using a local knowledge base (JSON)

This project is meant for **learning and demonstration purposes** and does **not replace professional medical advice**.

---

## 🚀 Features

- **Home Page**
  - Health tips
  - Medical disclaimer

- **Exercises Tab**
  - Plays exercise videos from local folder (`public/videos/`)
  - Categories like stretching, yoga, warm-up

- **Diet Plan Tab**
  - Simple daily meal suggestions (Breakfast, Lunch, Dinner)

- **AI Chatbot**
  - Chat UI on bottom-right corner
  - Answers common health queries using fuzzy search on local JSON data
  - Shows safety disclaimers and emergency warnings

---

## 🧱 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express  
- **Search Engine:** Fuse.js (fuzzy search)  
- **Data Store:** Local JSON file  
- **Version Control:** Git + GitHub  


---

## ✅ Prerequisites (Install Before Running)

### 1) Node.js (Required)
- Install **Node.js LTS** version (recommended).
- After install, verify:
node -v
npm -v

---

To start the server
node server.js

open browser and paste-
http://localhost:3000/

---

## 📂 Project Structure

```text
swastha-setu/
├── data/
│   └── medical_faq.json
├── public/
│   ├── app.js
│   ├── styles.css
│   ├── index.html
│   └── videos/        # (optional) exercise videos
├── node_modules/
├── package.json
├── package-lock.json
├── server.js
└── README.md
