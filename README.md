# 🚀 Glen Rio Aristo - Premium Portfolio

A high-end, Apple-inspired digital portfolio built with a **Vibe Engineering** mindset. Featuring a seamless booking system, AI-integrated workflows, and a sophisticated Bento Grid architecture.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tailwind 4](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Cloudflare Workers](https://img.shields.io/badge/Deployed-Cloudflare-F38020?style=flat-square&logo=cloudflare)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square&logo=drizzle)

## ✨ Key Features

- ** Apple-Inspired UI**: Clean, minimal, and premium aesthetic using Tailwind 4 and Framer Motion.
- **📅 Smart Booking System**: Integrated with **Google Calendar API** for real-time strategy session scheduling.
- **🗄️ Robust Backend**: Powered by **Drizzle ORM** & **Supabase (PostgreSQL)** for performant data handling.
- **📄 Interactive CV**: Real-time PDF generation using `@react-pdf/renderer` with a custom-designed aesthetic.
- **☁️ Edge Deployment**: Optimized for **Cloudflare Workers** using the **OpenNext** adapter for ultra-low latency.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 & Lucide Icons
- **Animations**: Framer Motion
- **Database**: PostgreSQL (Supabase) via Drizzle ORM
- **Deployment**: Cloudflare Workers / Pages
- **Misc**: Google Cloud Console (Calendar API), Zod for validation

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- A Supabase Instance
- Google Cloud Service Account (for Calendar)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/glenrioariesto/Portofolio.git
   cd Portofolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your-postgresql-url"
   GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@iam.gserviceaccount.com"
   GOOGLE_PRIVATE_KEY="your-private-key"
   GOOGLE_CALENDAR_ID="your-email@gmail.com"
   ```

4. **Initialize Database:**
   ```bash
   npx drizzle-kit push
   ```

5. **Run Development:**
   ```bash
   npm run dev
   ```

## 🚀 Deployment (Cloudflare)

This project is optimized for Cloudflare using `@opennextjs/cloudflare`.

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Set secrets on Cloudflare:**
   ```bash
   npx wrangler secret put DATABASE_URL
   npx wrangler secret put GOOGLE_PRIVATE_KEY
   ```

3. **Deploy:**
   ```bash
   npx wrangler deploy
   ```

---

Built with ❤️ by [Glen Rio Aristo](https://glenrioariesto.com)
