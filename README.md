# 🏦 Secure Banking API – JWT Authentication with Express.js

> 💡 *"Your money deserves security — your API should too."*  
A secure and minimal **banking API** built using **Node.js**, **Express**, and **JWT (JSON Web Tokens)** for authentication and access control.

---

## ✨ Overview

This project demonstrates how to implement **token-based authentication** in an Express.js application for secure API endpoints.  
It simulates a mini banking system where users can:

- 🔐 **Login** to get a signed JWT token  
- 💰 **Check balance** securely  
- ➕ **Deposit funds**  
- ➖ **Withdraw money** with proper balance validation  

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js** | Server-side runtime |
| **Express.js** | API framework |
| **JWT (jsonwebtoken)** | Authentication & authorization |
| **Body-parser** | JSON request parsing |

---

## ⚙️ Features

✅ **JWT Authentication Middleware** – Protects sensitive routes  
✅ **Error Handling** – Handles invalid tokens & insufficient funds  
✅ **Token Expiry** – Tokens automatically expire after 1 hour  
✅ **Simple Demo User** – No database needed for quick testing  
✅ **Ready for Extension** – Easily add MongoDB or refresh tokens later  

---

## 🧩 API Endpoints

| Method | Route | Description | Auth Required |
|--------|--------|--------------|----------------|
| `POST` | `/login` | Login with username & password to get a JWT token | ❌ |
| `GET` | `/balance` | View current account balance | ✅ |
| `POST` | `/deposit` | Deposit money into the account | ✅ |
| `POST` | `/withdraw` | Withdraw money from the account | ✅ |

---

## 🚀 How to Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/secure-banking-api.git
cd secure-banking-api
