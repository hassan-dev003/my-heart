# 💓 My Heartbeat

**Send your heartbeat to someone you love.**

A beautiful, interactive Valentine's web app where you create a personalized pulsing heart animation with a custom message and share it with someone special via a unique link.

🔗 **Live Demo:** [my-heartbeat.vercel.app](https://my-heartbeat.vercel.app)

![My Heartbeat Preview](https://img.shields.io/badge/Made_with-Love-red?style=for-the-badge) ![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=flat-square&logo=tailwindcss) ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- **Realistic heartbeat animation** — lub-DUB pulsing that mimics a real heartbeat, not just a simple scale bounce
- **Tap your rhythm** — tap a button to set a custom BPM, or choose from poetic presets like *"thinking of you"* and *"when you smile"*
- **5 curated Valentine's themes** — Rose, Blush, Burgundy, Garden, and Golden — each with matched backgrounds, glows, and accents
- **Floating heart particles** — gentle petals drift upward for an ambient, romantic atmosphere
- **Shareable links** — all customization is encoded in the URL (base64 hash), no backend needed
- **URL shortening** — auto-shortens links via TinyURL for clean sharing
- **Immersive Viewer Mode** — recipients see a full-screen, distraction-free heartbeat experience
- **Mobile responsive** — controls-first layout on mobile, side-by-side on desktop

## 🖼️ Screenshots

| Create Mode | Viewer Mode |
|:-----------:|:-----------:|
| Customize your message, rhythm, and theme | The immersive experience your recipient sees |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/my-heartbeat.git
cd my-heartbeat

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
pnpm build
```

This outputs a static site to the `dist/` folder, ready to deploy anywhere.

---

## 🌐 Deployment

This is a fully static app — no backend, no database, no server. Deploy it anywhere that hosts static files.

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Follow the prompts, and you'll have a live URL in ~30 seconds.

### Netlify

1. Run `pnpm build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag your `dist` folder onto the page
4. Done — instant live URL

### GitHub Pages

1. Run `pnpm build`
2. Deploy the `dist` folder to the `gh-pages` branch
3. Enable GitHub Pages in your repo settings

---

## 🏗️ Project Structure

```
my-heartbeat/
├── public/
│   └── heart.svg              # Favicon
├── src/
│   ├── components/
│   │   ├── background/
│   │   │   └── ParticleField.tsx   # Floating heart particles
│   │   └── heart/
│   │       └── HeartSVG.tsx        # Pulsing heart animation
│   ├── lib/
│   │   ├── themes.ts              # Color theme definitions
│   │   ├── types.ts               # TypeScript interfaces
│   │   ├── urlUtils.ts            # Base64 URL encoding/decoding
│   │   └── utils.ts               # Shared utilities
│   ├── views/
│   │   ├── CreateMode.tsx         # Editor / customization UI
│   │   └── ViewerMode.tsx         # Immersive recipient view
│   ├── App.tsx                    # Root component & routing
│   ├── index.css                  # Global styles
│   └── main.tsx                   # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🎨 Themes

| Theme | Vibe |
|-------|------|
| **Rose** | Classic red — warm and timeless |
| **Blush** | Soft pink — gentle and sweet |
| **Burgundy** | Deep wine — elegant and passionate |
| **Garden** | Red with green accents — natural and earthy |
| **Golden** | Red with gold accents — luxurious and warm |

Want to add your own theme? Edit `src/lib/themes.ts` — each theme is just an object with color values.

---

## 🔗 How Sharing Works

All customization data (message, names, BPM, theme) is encoded into a **base64 hash fragment** in the URL:

```
my-heartbeat.vercel.app/#eyJtc2ciOiJJIGxvdmUgeW91...
```

- No backend or database needed
- The recipient can't read the message from the URL (no spoilers!)
- Links are auto-shortened via TinyURL for clean sharing
- Works offline once loaded

---

## 🛠️ Tech Stack

- **[React 19](https://react.dev/)** — UI framework
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Vite](https://vite.dev/)** — Build tool & dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** — Animations
- **[Lucide React](https://lucide.dev/)** — Icons

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

Some ideas for contributions:
- New themes
- Sound effects (optional heartbeat audio)
- Download as GIF
- Haptic feedback on mobile
- Internationalization (i18n)
- Accessibility improvements

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You're free to fork, modify, and use this however you like. Just keep the love going. 💓

---

## 💌 Story

Built in a single night before Valentine's Day 2026 as a heartfelt gift for friends and family. The idea: what if you could literally send someone your heartbeat?

Made with love using Claude, Cursor, and a lot of coffee.

---

<p align="center">
  <i>Send your heartbeat to someone you love</i> 💓
</p>
