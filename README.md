# 🔐 Login System (MERN) — JWT Access & Refresh + OAuth + Captcha + Email OTP

A full **Login System** built with **React (Vite)** frontend and **Node.js / Express** backend with MongoDB.  
Features:

- Access token (JWT) + Refresh token (HTTP-only cookie) flow  
- Google Login (OAuth)  
- Facebook Login (OAuth)  
- reCAPTCHA verification (Google)  
- Email OTP verification (via Nodemailer)  
- Real-time validation on input using **Formik** + **Yup** (validate on every key press)  
- Protected routes (role-based)  
- Admin dashboard 
- Responsive design with TailwindCSS

---

## Live Demo

👉 [Try the app here](https://login-system-chi-ruby.vercel.app)

## ✅ Features overview

- `POST /auth/register` — register (email + password)  
- `POST /auth/login` — login (returns accessToken, set refreshToken cookie)  
- `POST /auth/google` — sign-in via Google token (returns accessToken + sets refresh cookie)  
- `POST /auth/facebook` — sign-in via Facebook token  
- `POST /auth/refresh` — use refresh cookie to obtain new access token  
- `POST /auth/logout` — clear refresh cookie and logout  
- `POST /auth/create-otp` — send OTP to email  
- `GET /home/em` — protected route to return user profile (requires access token)

---

## 🧰 Tech stack

**Frontend**
- React (Vite)  
- Formik, Yup (validation)  
- Axios  
- react-google-recaptcha / react-google-recaptcha-v3  
- Tailwind CSS, Radix UI (optional)

**Backend**
- Node.js + Express  
- MongoDB (mongoose)  
- JWT (jsonwebtoken)  
- Nodemailer (email OTP)  
- CORS, cookie-parser, dotenv

---

## 📋 Prerequisites

- Node.js 18+  
- MongoDB URI (Atlas or local)  
- Google Cloud project for OAuth (Client ID)  
- Facebook App (App ID) and configured Valid OAuth Redirect URIs  
- Google reCAPTCHA keys (site key + secret)  

### 2. Install dependencies

- Frontend:

```bash
  cd client
  npm install
```

- Backend:

```bash
  cd server
  npm install
```

### 4. Run the app

- Start frontend:

```bash
  cd client
  npm run dev
```

npm run dev

- Start backend:

```bash
  cd server
  npm run dev
```

## 🌍 Deployment

- Frontend deployed on Vercel

- Backend deployed on Vercle

## 📸 Screenshots

![Screenshot](./client/public/login-system.png)

## 👤 Author

MOHAMED AWAD – [GitHub](https://github.com/midrra)
| [LinkedIn](https://www.linkedin.com/in/mohamed-3wad/)
