# 🛒 FreshCart — E-commerce App (React)

A complete online store built with **React** during the **Route Academy Frontend Diploma** (2025): browse products, add to cart and wishlist, and check out — connected to a real REST API.

## ✨ Features
- 🔐 **Authentication** — register, login, forgot password → verify code → reset password (JWT stored and decoded with `jwt-decode`)
- 🛡️ **Protected routes** — cart, wishlist and orders only for logged-in users
- 🏠 **Home** with image sliders (Swiper) and category slider
- 🛍️ **Products, categories and brands** with product details and image gallery
- 🛒 **Cart** — add, update quantity, remove, clear
- ❤️ **Wishlist**
- 💳 **Checkout** — cash on delivery or online payment (checkout session), plus order history
- 📶 **Offline detection** and loading states, toast notifications
- ✅ **Forms** with Formik + Yup validation

## 🛠️ Tech stack
React 19 · Vite · React Router · TanStack React Query · Axios · Context API · Formik & Yup · Tailwind CSS · Swiper

## 📂 Structure
```
src/
├── components/  → Nav, Layout, Card, CartItem, sliders, ProtectedRoute, Offline, Loading...
├── context/     → Token (auth) and Cart context
└── pages/       → Home, Products, ProductDetails, Categories, Brands, Cart, WishList, CheckOut, Orders, Login, Register...
```

## ▶️ Run it
```bash
git clone https://github.com/Mohamed-Elhosinii/Fresh-Cart-.git
cd Fresh-Cart-
npm install
npm run dev
```

API: Route Academy e-commerce API (`ecommerce.routemisr.com`).

---
👤 **Mohamed Mostafa Elhoseny** — [LinkedIn](https://www.linkedin.com/in/mohamed-mostafa-655917273) · [GitHub](https://github.com/Mohamed-Elhosinii)
