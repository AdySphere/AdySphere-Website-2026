# AdySphere Co. website

Marketing site for AdySphere Co., a Dubai-based Microsoft AI Cloud Partner.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · React Three Fiber + drei (3D hero) · Motion · MDX.

## Run locally

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local   # then add your Resend key (see below)
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript only
```

## Where things live

| Path | What it is |
|---|---|
| `app/` | Pages. One folder per URL (`app/solutions/page.tsx` is `/solutions`). |
| `components/hero/` | The 3D hero. `HeroScene.tsx` is the WebGL scene; `HeroStage.tsx` handles lazy loading and fallbacks. |
| `components/home/` | Homepage sections. |
| `lib/site.ts` | **Most copy lives here**: contact details, offers, modules, industries, FAQ, founder. Edit this first. |
| `content/case-studies/` | Case studies (MDX). |
| `content/research/` | Research projects (MDX), plus `publications.json` and `tools.json`. |
| `content/insights/` | Insights blog posts (MDX). |
| `public/brand/` | Logo files. |
| `public/llms.txt` | Plain-text summary for AI assistants and search tools. |

## Add an Insights post

Create `content/insights/my-post-slug.mdx`:

```mdx
---
title: "Your title"
description: "One or two sentences. Used on the listing, in search results and for social sharing."
date: "2026-11-01"
category: "Dynamics 365"          # one category; new categories get their own page automatically
tags: ["Project Operations", "Finance"]
draft: false                      # true shows a Draft label and keeps it out of the sitemap and search
---

Write the post in Markdown. Use ## for section headings.
```

The URL is `/insights/my-post-slug`. Category and tag pages update on the next build.

## Add a research project

Research is a separate collection and never appears in Insights. Create `content/research/project-slug.mdx`:

```mdx
---
title: "Project title"
status: "Exploring"               # Exploring | Active | Published
area: "Computational astrophysics"
abstract: "Two or three sentences."
methods: ["Method one", "Method two"]
links: { paper: "https://...", code: "https://github.com/...", data: "https://..." }
date: "2026-11-01"
draft: false
---

The project write-up.
```

Publications go in `content/research/publications.json`, and datasets and tools in `content/research/tools.json`.

The two `DRAFT` projects in `content/research/` are placeholders: replace or delete them.

## Add or edit a case study

Edit the MDX files in `content/case-studies/`. Every `outcome` is currently `TODO`. Only replace it with numbers the client has approved.

## Swap in the logo files

Put your files in `public/brand/` with these names (see `public/brand/README.md`):

- `wordmark-dark.png` / `.svg`: ivory wordmark for dark backgrounds. The header and footer use the PNG.
- `wordmark-light.png` / `.svg`: black wordmark for light backgrounds.
- `mark.svg`: the brand mark. Used for the static hero fallback and social images. **Currently a placeholder.**
- `mark.glb`: optional 3D model. If present, the 3D hero loads it instead of extruding `mark.svg`.

## Swap in the hero artwork (particle face)

The hero turns an image into particles: bright, teal pixels become particles, which stream in and form the image.
Dark parts of the image, or transparent ones, are ignored.

1. Save the image as `public/brand/hero-face.png` (square, at least 800 x 800, transparent or on black), and a WebP
   copy as `hero-face.webp`.
2. `heroArt` in `lib/site.ts` points at the WebP.

The same image is shown as a still picture before the particles start, and for visitors who prefer reduced motion.
The particles start on the visitor's first interaction (move, scroll, tap), which keeps page load fast.

## Swap in a real Dubai skyline video

The homepage skyline section draws an animated Dubai skyline in code. To use real footage instead:

1. Get a licensed clip (for example from Pexels or Pixabay, both free for commercial use). Aim for 1920x1080, H.264 MP4,
   a 10 to 20 second loop, under about 6 MB. Export one frame as a JPG poster.
2. Save them as `public/media/dubai-skyline.mp4` and `public/media/dubai-skyline.jpg`.
3. In `lib/site.ts`, set `cityVideo = { src: "/media/dubai-skyline.mp4", poster: "/media/dubai-skyline.jpg" }`.

The video only loads when the section is near the screen, pauses when it scrolls away, and stays still for visitors
who prefer reduced motion.

## Contact form

The forms on the homepage and `/contact` post to `app/api/contact/route.ts`, which emails `mallicka@adysphere.com` through [Resend](https://resend.com).

1. Create a Resend account and verify the `adysphere.com` domain.
2. Set `RESEND_API_KEY` (and optionally `CONTACT_TO`, `CONTACT_FROM`) in `.env.local` and in Vercel.
3. Optional: set `NEXT_PUBLIC_BOOKING_URL` to a Calendly or Microsoft Bookings link to show a booking calendar under the form.

Spam protection: a hidden honeypot field, a minimum fill time, and a per-IP rate limit.

## Things still marked TODO

Search the code for `TODO` to find them all:

- Certifications in the trust strip (`components/home/TrustStrip.tsx`)
- Case study outcomes (`content/case-studies/`)
- Founder photo and personal LinkedIn (`lib/site.ts`)
- Research projects, publications and tools (`content/research/`)
- The real `mark.svg`
- Optionally, a skyline video (`cityVideo` in `lib/site.ts`)

## Deploying

See [DEPLOY.md](./DEPLOY.md).
