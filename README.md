# Scotia Compass 🧭

**Verify any financial advice. Built for first-time investors.**

Scotia Compass is a feature inside the Scotiabank mobile app that turns the financial advice young Canadians are already getting from TikTok, Reddit, and the group chat into a one-tap, fact-checked, personalized conversation — backed by real Scotia data and a real licensed advisor when you need one.

Built for **[case]Hacks 2026**.

---

## The four features

1. **Paste any financial advice you see online and Compass tells you if it's true or false.**
2. **Compass uses your real Scotia account info (income, balances, age) so the answer is built around your actual situation, not generic.**
3. **Compass recommends specific Scotia products to buy based on your situation and what you asked about.**
4. **You can chat with an AI advisor anytime, and if you want a real human, one tap connects you to a licensed Scotia advisor.**

Plus two engagement features inspired by Co.Lab's cohort-based learning model:

- **First Investor Cohorts** — small peer groups with a licensed Scotia advisor as mentor
- **First Trade Sprint** — 7-day guided sequence to go from zero to first investment

---

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Anthropic Claude API** (Sonnet 4) for fact-checking and AI advisor chat
- **Lucide React** for icons

---

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Anthropic API key

Create a file called `.env.local` in the project root:

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get a key at https://console.anthropic.com — you'll need to add ~$5 of credits.

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel (for live demo link)

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import the repo
4. Add `ANTHROPIC_API_KEY` as an environment variable
5. Deploy → you get a public URL like `scotia-compass.vercel.app`

---

## Screens

| Route | Description |
|---|---|
| `/` | Home — Maya's Scotia dashboard with Compass entry point |
| `/compass` | Paste social media advice to fact-check |
| `/analysis` | Real Claude API call → verdict + personalized recommendations |
| `/advisor` | AI advisor chat with one-tap escalation to a real Scotia advisor |
| `/cohort` | First Investor Cohort — peer group + licensed advisor mentor |
| `/sprint` | First Trade Sprint — 7-day guided path to first investment |

---

## The mock user

The demo runs on a hardcoded user, "Maya Chen" — 26 years old, $58K income, $3,847 in chequing, $0 invested, $12,400 of unused TFSA room. All of her data flows into every Compass response, making the AI answers feel personal.

Edit `lib/mockUser.ts` to change the demo persona.

---

## What's real vs. mocked

- ✅ **Real**: Claude API integration for fact-checking and advisor chat
- ✅ **Real**: Personalization using mock user data
- ⚠️ **Mocked**: Scotia banking data (would be the actual Scotia API in production)
- ⚠️ **Mocked**: Human advisor handoff (Priya is a scripted persona)
- ⚠️ **Mocked**: Cohort activity feed (static data)

For an 18-month production build, all mocked pieces would plug into existing Scotia infrastructure (Smart Investor's SigFig engine, ScotiaMcLeod advisor pool, AskAI internal LLM).

---

## Team

Built for [case]Hacks 2026 — Closing the Gap: Scotiabank and the Next Generation Investor.
