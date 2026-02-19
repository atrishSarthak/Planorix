# PLANORIX

AI-powered architectural visualization platform that transforms 2D floor plans into photorealistic 3D renders.

![PLANORIX](public/readme/readme-hero.webp)

## 🚀 Features

- **AI-Powered 3D Rendering**: Transform 2D floor plans into photorealistic 3D visualizations using Gemini AI
- **Interactive 3D Orb**: Stunning mouse-tracking orb with metallic rings and distortion effects
- **User Authentication**: Secure sign-in with Puter accounts
- **Project Management**: Save, load, and manage your architectural projects
- **Side-by-Side Comparison**: Compare original floor plans with AI-generated renders
- **Export Functionality**: Download your renders in high quality

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router 7** - Routing and SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Puter.js** - Cloud services (auth, storage, AI, hosting)
- **Gemini AI** - Image generation

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd planorix

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Add your Puter worker URL to .env.local
VITE_PUTER_WORKER_URL=https://brave-mouse-4972.puter.work
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `VITE_PUTER_WORKER_URL` with your Puter worker URL
   - Example: `https://brave-mouse-4972.puter.work`
4. Deploy!

Vercel will automatically detect React Router and configure the build settings.

### Important Notes for Vercel

- The `.env` file is gitignored for security
- Use `.env.example` as a template
- Always set `VITE_PUTER_WORKER_URL` in Vercel's environment variables
- The app won't work without this environment variable

### Environment Variables

Required:
- `VITE_PUTER_WORKER_URL` - Your Puter worker endpoint (get from https://puter.com)

## 🔧 Puter Worker Setup

The project requires a Puter worker for backend functionality. The worker code is in `lib/puter.worker.js`.

Deploy it to Puter and update your environment variable with the worker URL.

## 📝 License

MIT

## 🙏 Credits

Built with inspiration from modern design tools and architectural visualization platforms.

---

**PLANORIX** - Build beautiful spaces at the speed of thought
