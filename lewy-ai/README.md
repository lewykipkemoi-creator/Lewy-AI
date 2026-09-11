# Lewy AI

**Never lose a customer because you replied too late.**

Lewy AI is an AI-powered customer response and lead-recovery SaaS foundation. It is designed to connect business conversations, let Lewy answer routine questions, qualify leads, schedule follow-ups, and escalate important conversations to humans.

## Current MVP

- Modern SaaS dashboard
- Conversation inbox
- AI chat powered by Gemini
- Lead scoring
- Revenue-at-risk overview
- Follow-up queue
- Channel connection placeholders
- Business knowledge panel
- Provider abstraction so OpenAI can be added later
- Vercel-ready Next.js app

## Run locally

```bash
npm install
cp .env.example .env.local
# Add GEMINI_API_KEY to .env.local
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Push this repository to GitHub, import it into Vercel, and add:

`GEMINI_API_KEY`

Optionally set `GEMINI_MODEL`.

## Important

The current UI includes integration controls and a working Gemini endpoint, but production OAuth/webhook integrations for WhatsApp, Gmail, Instagram, Facebook, Telegram and Google Calendar still need to be connected to their official APIs. Do not use unofficial WhatsApp automation.
