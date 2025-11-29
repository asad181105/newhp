# Hybrid Pillars Website

A modern, responsive website for hybridpillars.com built with Next.js, React, and TypeScript.

## Features

- 🏠 Landing page with hero section
- 🤖 Agents listing page with interactive cards
- 📞 AI Caller Agent interface with call controls
- 📱 Fully responsive design
- ⚙️ Easy content management via config.json

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page (/)
│   ├── agents/
│   │   └── page.tsx        # Agents listing page (/agents)
│   ├── caller-agent/
│   │   └── page.tsx        # AI Caller Agent page (/caller-agent)
│   └── globals.css         # Global styles
├── components/
│   ├── agentCard.tsx       # Agent card component
│   └── callInterface.tsx   # Call interface component
├── config.json             # Content configuration
└── package.json
```

## Configuration

Edit `config.json` to update:
- Site title
- Agent names and statuses
- Landing page text

## 11 Labs AI Caller Integration

To connect the AI Caller Agent to 11 Labs:

1. Open `components/callInterface.tsx`
2. Replace the empty `CALLER_URL` constant with your 11 Labs deployment URL
3. Implement the connection logic in the `handleStartCall` function

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Modern, responsive design with gradient effects

