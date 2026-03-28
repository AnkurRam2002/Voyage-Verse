<div align="center">

![Voyage Verse Hero](file:///C:/Users/Ankur%20Ram/.gemini/antigravity/brain/38f00c04-7b6e-48bd-bb8c-f41d731ab378/voyage_verse_hero_1774238886499.png)

# 🗺️ VoyageVerse
**A premium, full-stack travel storytelling platform built with Next.js 15, Auth.js v5, and MongoDB.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-764ABC?style=for-the-badge&logo=next.js)](https://authjs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind](https://img.shields.io/badge/CSS-Vanilla-blue?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)

[Explore Stories](https://voyage-verse.vercel.app/blog)
</div>

---

## ✨ Overview

**VoyageVerse** is more than just a travel blog; it's a living map of your adventures. Designed for the modern traveler, it combines high-performance server-side rendering with a rich, interactive interface to make documenting journeys as beautiful as the trips themselves.

## 🚀 Key Features

### 🖌️ Rich Text Storytelling
Document your travels with a full-featured **TipTap-powered** editor. Support for headings, lists, links, and embedded images ensures your stories look professional and engaging.

### 📍 Interactive Journey Map
Visualize your global footprint with an integrated **Leaflet.js** map. Every story is tagged with a location, geocoded via **Nominatim**, and pinned on an interactive world map.

### 🖼️ Automated Scenery Discovery
Don't have a photo? VoyageVerse uses the **Pexels API** to automatically suggest stunning travel photography based on your story's title and location.

### 📊 Advanced Admin Suite
A glassmorphic administrative dashboard powered by **Recharts**. Track user growth, story engagement, and manage content with a sleek, real-time interface.

### 🔐 Enterprise-Grade Security
Authentication handled by **Auth.js v5 (NextAuth)**, supporting both secure Credentials (hashed with bcrypt) and seamless GitHub OAuth integration.

---

## 🛠️ Tech Stack

- **Core**: Next.js 15 (App Router), React 19
- **Database**: MongoDB Atlas with Mongoose ODM
- **Auth**: Auth.js v5 (NextAuth)
- **Styling**: Vanilla CSS (Modern CSS Variables & Glassmorphism)
- **Map**: Leaflet.js & OpenStreetMap
- **Charts**: Recharts
- **APIs**: Pexels API, Nominatim Geocoding

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18.x or later
- MongoDB Atlas cluster
- Pexels API Key
- GitHub OAuth App (for social login)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnkurRam2002/Voyage-Verse.git
   cd voyage-verse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO=your_mongodb_uri
   AUTH_SECRET=your_nextauth_secret
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   PEXELS_API_KEY=your_pexels_api_key
   NEXT_PUBLIC_PROD_URL=https://voyage-verse.vercel.app
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

---

<div align="center">
Built with ❤️ by Ankur Ram
</div>
