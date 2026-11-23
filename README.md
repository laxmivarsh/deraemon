# Doraemon Universe (ドラえもん ユニバース)

> **Explore the World of Doraemon.** An interactive, cinematic, production-ready anime fan encyclopedia built with Next.js App Router, Three.js, React Three Fiber, GSAP ScrollTrigger, Lenis, and Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-blue.svg)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-sky.svg)](https://tailwindcss.com/)
[![License: Unofficial Fan Tribute](https://img.shields.io/badge/License-Unofficial_Fan_Tribute-yellow.svg)](#disclaimer)

---

## 🌟 Highlights & Key Features

### 1. 🚪 Interactive Anywhere Door 3D Dimensional Gateway
- 3D perspective swinging door mechanism with real-time brass doorknob physics and spatial portal scenes.
- Switch between destination spacetime presets: **Nerima (Tokyo Present)**, **Prehistoric Dinosaur Valley (100 Million BC)**, **22nd Century Cyber Metropolis (Year 2112)**, and the **Moon Rabbit Kingdom**.
- Web Audio synthesizer futuristic warp sound effects.

### 2. 🌍 3D Interactive Neighborhood World (`/world`)
- Procedurally generated Three.js WebGL miniature island:
  - Nobita's two-story house with red roof and 2nd-floor bedroom.
  - The iconic Vacant Lot with 3 stacked concrete pipes.
  - The Anywhere Door standing on the grassy hill.
  - Take-copter flight waypoint with animated spinning propellers.
  - Floating 3D geometric clouds and glowing interactive hotspot beacons.
  - Real-time drag/orbit controls and lightweight 2D fallback mode.

### 3. 👥 Comprehensive Characters Universe (`/characters` & `/characters/[slug]`)
- Canonical profiles for 13+ characters:
  - Doraemon, Nobita Nobi, Shizuka Minamoto, Takeshi "Gian" Goda, Suneo Honekawa, Dorami, Hidetoshi Dekisugi, Tamako Nobi, Nobisuke Nobi, Sewashi Nobi, Jaiko Goda, Mini-Doras, and Mii-chan.
- Filter by category: Main Characters, Family Members, School Friends, Future Characters, Supporting Characters.
- In-depth dynamic routes (`/characters/[slug]`) featuring personality analyses, favorite foods, relationship graphs, canonical trivia, and attribute meters.

### 4. 🔬 Futuristic Gadget Museum (`/gadgets`)
- Real-time 3D WebGL Model Inspector with wireframe toggle, auto-rotation, and ambient lighting color switchers.
- 12+ iconic gadgets with functional physics breakdowns, safety risk levels (*Safe*, *Handle With Care*, *Reality Altering*), and canonical lore.

### 5. 🎬 Movie Collection & Episode Explorer (`/movies` & `/episodes`)
- Theatrical movie encyclopedia spanning 1980 to the present (including *STAND BY ME Doraemon 1 & 2*).
- Detailed metadata: directors, runtime, box office records, synopsis, and featured gadgets.
- Episode Explorer for both the classic 1979 anime run (1,787 episodes) and the modern 2005 HD series.

### 6. 🎮 5 Playable Mini-Games (`/games`)
1. **Doraemon Timed Quiz**: 15-second countdown timer, scoring, streak tracking, canonical explanations, and confetti victory!
2. **Guess the Character**: Silhouette visual hints, progressive clue reveals (-5 points per hint), and multiple-choice guessing.
3. **Gadget Guessing Game**: Emergency scenario dilemmas ("Nobita is trapped in an alley...") with instant feedback.
4. **Memory Match**: 16-card flip deck (8 pairs), move counter, pair tracker, and victory celebrations.
5. **4D Pocket Pull Simulator**: Interactive white half-moon pocket with animated reach-in sequence, audio chime, and surprise gadget drops!

### 7. ⏱️ Spacetime Timeline (`/timeline`)
- Vertical spine chronometer spanning Year 2112 (Doraemon's assembly at Matsushiba factory) to Fujiko F. Fujio's 1969 manga premiere and modern cinematic milestones.

### 8. 🛡️ Protected Admin Dashboard (`/admin`)
- Secure passcode login (`doraemon2112`).
- Real-time stats and full CRUD operations (create, edit, delete, search) for characters, gadgets, movies, quiz questions, and timeline events.
- Supabase PostgreSQL integration with seamless in-memory fallback.

### 9. 🔊 Web Audio API Synthesizer Sound Engine
- Zero external audio file dependencies!
- Procedural oscillator synthesis: Doraemon collar bell chime, Anywhere Door warp, Take-copter whir, pocket pull fanfare, quiz success/buzzer, and button pops.
- Muted by default with a persistent toggle.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom anime theme tokens
- **3D Graphics**: Three.js & React Three Fiber
- **Animations**: GSAP, Motion (Framer Motion), Lenis Smooth Scroll
- **Database**: Supabase PostgreSQL with Row Level Security (RLS) & local fallback
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24.22)
- pnpm 9+ or npm

### Installation
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
pnpm build
pnpm start
```

---

## 🔐 Environment Variables

Create a `.env.local` file (see `.env.example`):
```env
# Optional Supabase Connection (Defaults to canonical local database if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Passcode
NEXT_PUBLIC_ADMIN_SECRET=doraemon2112
```

---

## 📜 Unofficial Fan Project Disclaimer
This digital experience is an independent, non-commercial educational fan project created out of deep love and admiration for the works of **Fujiko F. Fujio**. Doraemon and all related characters, trademarks, and story elements are copyright © Fujiko Pro, Shogakukan, and TV Asahi.
