# Hybrid Pillars Website

A modern, responsive website for hybridpillars.com built with Next.js, React, and TypeScript.

## Features

- 🏠 Landing page with hero section
- 🤖 Agents listing page with interactive cards
- 📞 AI Caller Agent interface with call controls
- 📝 Contact form for each agent with EmailJS integration
- 💾 Form submissions stored in Supabase
- 📊 Admin dashboard to view all submissions
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
├── app/
│   ├── agent-form/
│   │   └── [agentName]/
│   │       └── page.tsx    # Dynamic form page for each agent
│   ├── admin/
│   │   └── page.tsx        # Admin dashboard (/admin)
│   └── ...
├── components/
│   ├── agentCard.tsx       # Agent card component
│   └── callInterface.tsx   # Call interface component
├── lib/
│   ├── emailjs.ts          # EmailJS integration
│   └── supabase.ts         # Supabase integration
├── config.json             # Content configuration
└── package.json
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_TO_EMAIL=your_email@example.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Dashboard Password
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template and use the HTML from `emailjs-template.html` file, or create a template with these variables:
   - `{{from_name}}` - User's name
   - `{{from_email}}` - User's email
   - `{{phone}}` - User's phone
   - `{{message}}` - User's query
   - `{{agent_name}}` - Selected agent name
4. Copy your Public Key, Service ID, and Template ID to `.env.local`

**Note:** The template file `emailjs-template.html` contains a pre-designed email template that displays all form information in a professional format. Copy the HTML content into your EmailJS template editor.

### Supabase Setup

1. Create a project at [Supabase](https://supabase.com/)
2. Go to SQL Editor and run the SQL from `supabase-setup.sql` to create the `form_submissions` table
3. Go to Project Settings > API and copy your Project URL and anon/public key
4. Add them to `.env.local`

### Content Configuration

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

## Admin Dashboard

Access the admin dashboard at `/admin` to view all form submissions. You'll need to enter the password set in `NEXT_PUBLIC_ADMIN_PASSWORD`.

The dashboard displays:
- All form submissions
- Submission details (name, email, phone, query, agent name)
- Submission dates
- Refresh functionality

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email Service**: EmailJS
- **Database**: Supabase
- **UI**: Modern, responsive design with gradient effects

