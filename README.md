# SpaceSphere

A private space-tech ideation agent. It's built to think and pitch like someone constantly
proposing cutting-edge space-tech solutions — grounded in real orbital mechanics, launch cadence,
and current research rather than vague futurism — and connects ideas back to Adyasha's own
research background (molecular cloud dynamics/star formation, pulsar search algorithms, ML-based
LEO satellite orbit determination).

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind
- Anthropic Claude API (`@anthropic-ai/sdk`) with tool use for live data
- Live data tools:
  - `search_arxiv` — recent papers from arXiv
  - `get_upcoming_launches` — upcoming launch schedule (Launch Library 2 API)
  - `get_near_earth_objects` — near-Earth asteroid close-approach data (NASA NeoWs)

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...   # required
CLAUDE_MODEL=claude-sonnet-5   # optional, this is the default
NASA_API_KEY=...               # optional, defaults to NASA's public DEMO_KEY (rate-limited)
```

Then run:

```bash
npm run dev
```

Open http://localhost:3000.

## Notes

- `.env.local` is gitignored — never commit real API keys.
- The chat UI shows a collapsible "N live lookups used" section under any reply that called a
  tool, so you can see exactly what data grounded the answer.
- All three tools are public/free APIs; `NASA_API_KEY` is the only optional one (get one free at
  https://api.nasa.gov if you hit DEMO_KEY's rate limit).
