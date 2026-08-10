# Skouta — Shared Product Context

_Last updated: May 2026. Combines codebase audit (May 2026) and Brand Strategy Session (April 2026). Use this file as the starting context for any AI-assisted product, marketing, or design work._

---

## What Skouta Is

Skouta is a mobile app (iOS & Android) that aggregates real-time public safety alerts from Swedish government sources — police incidents, weather warnings, transport disruptions, civil emergencies — into a single feed with English translation, a map view, push notifications, and a daily digest.

**The central reframe:** Skouta is not an alert app. It is a civic access tool that removes the invisible barrier between a person and the country they chose to live in.

The entry point is the language barrier: English-speaking expats can't use official Swedish sources directly. But the aggregation is the actual product — even a fluent Swedish speaker currently has to check Police, SMHI, Trafikverket, SL, MSB, Västtrafik, and multiple regional operators separately.

---

## Tagline

| Market | Tagline |
|--------|---------|
| English | **Know your ground.** |
| Swedish | **Känn din mark.** |
| Norwegian | **Se hvor landet ligger.** |

Campaign frames (not the primary tagline):
- **"Already local."** — belonging challenge, used in social and onboarding
- **"Eyes open." / "Eyes sharp."** — alert-context copy and social

---

## Who It's For

**Primary:** English-speaking expats and new residents in Sweden. Underserved by the status quo — official alerts are almost exclusively in Swedish — and the language barrier gives Skouta a clear, specific pitch.

**Also a natural fit:** Swedish-speaking residents who want one place for everything. The app supports Swedish as a UI language (in progress), stores original Swedish text alongside translations, and the aggregation + digest value applies regardless of language.

**Not yet supported:** Norwegians (planned Month 15; data model is ready, no sources connected yet).

**Market size:** ~2.1 million foreign-born residents in Sweden (21% of population). ~1.2–1.5 million estimated English-comfortable subset.

---

## The Problem It Solves

Swedish government agencies publish alerts across many separate platforms. An English-speaking resident faces two problems at once: no single source aggregates them, and none of the official sources are in English.

Skouta addresses both:
1. Continuously polling official government APIs (every 5–15 minutes)
2. Translating content with DeepL before storing it
3. Delivering everything as a live feed, map, push notifications, and a morning digest

All content comes from official sources only. The app never editorializes or fills gaps.

---

## Messaging Framework

Three pillars, hierarchical: **Awareness earns attention. Autonomy earns trust. Belonging earns loyalty.** Every piece of Skouta communication should serve at least one pillar.

**North Star Statement**
> Skouta is the civic access tool that lets you feel genuinely connected to the place you chose to live — informed, capable, and present in the same way that local speakers are.

### Pillar 1 — Awareness: Everything around you. In English.
The functional promise. Real-time public alerts from official sources, translated into English the moment they're published.

What it replaces: the Google Translate screenshot ritual, the colleague you ask, the moment you realise something happened and you didn't know.

### Pillar 2 — Autonomy: Your life, in the language you think in.
The emotional promise. Not having to depend on anyone to interpret your own surroundings.

Core phrase (never rewrite): *"Not being dependent on others to translate your own life."*

Position Skouta as capability, never as protection. Never imply Swedish institutions are failing — the gap is structural, not negligent.

### Pillar 3 — Belonging: Feel like you live here — because you do.
The identity promise. Being informed is how you feel like a real resident, not a permanent newcomer.

Target referral sentence (design every experience to earn it): *"It's the only app that actually makes me feel like I live here, not just visit."*

---

## Brand Voice

### The Four Constants

| Constant | Definition | In practice |
|----------|-----------|-------------|
| **Direct** | Says what it means in the fewest words. Never buries the lead. | Lead with information, follow with context. |
| **Warm** | Sounds like a person who cares. Not a system outputting. | Word choice and sentence rhythm carry warmth — not exclamation marks. |
| **Grounded** | Never alarmist. Urgency comes from the information, not the voice. | Calm, factual in alerts. Warmth in onboarding and empty states. |
| **Honest** | Never oversells. Never implies more than it delivers. | Transparent about source, about translation. Limitations stated plainly. |

### What the voice is NOT
- Alarmist or urgency-manufactured
- Paternalistic or protective (implies weakness)
- Government-adjacent or institutional
- AI-jargon ("AI-powered multilingual civic data aggregator")
- Unhinged or comedic

### Channel Guide

**In-app alerts:** Factual, source-first, no sensationalism.
- ✓ "Police incident reported on Sveavägen. Source: Swedish Police."
- ✗ "BREAKING: Major police operation — stay safe!"

**Onboarding:** Warm, encouraging, assumes intelligence.
- ✓ "Pick the things that matter to your day. You can always change these later."
- ✗ "Please select your preferred notification categories."

**Empty states:** Brief, warm, Pip present.
- ✓ "All quiet in Södermalm — Pip checked. Enjoy your day."
- ✗ "No alerts found for your selected region."

**Push notifications:** Clear, calm, never alarmist. Format: Location · Category.
- ✓ "Södermalm · Police incident. Tap for details."
- ✗ "⚠️ ALERT: Something is happening near you!"

**Morning digest:** Pip's moment. Warm, brief, daily ritual.
- ✓ "Good morning. Pip's been watching. Here's what happened in your area overnight."

**Error states:** Human, honest, helpful.
- ✓ "Couldn't load the latest alerts — check your connection. Your cached alerts are below."
- ✗ "Error 503: Service unavailable."

**App Store:** Problem-first, human, benefit-led (not feature-led). Trust language leads. Never mention AI in core value proposition.

**Website:** Short declarative headlines, founder voice permitted, specific trust signals.
- Headlines: "Know your ground." / "Official. English. Real-time." / "Every alert that matters. None that don't."
- Trust: "Every alert links to its original official source. We translate — we never editorialize."

**Instagram:** Open with the human moment, close with Skouta. The contrast IS the hook — Swedish alert text alongside Skouta's English translation.

**Reddit (r/TillSverige, r/stockholm, r/gothenburg):** 9 contributions of genuine value for every 1 mention of Skouta. First person, self-aware, honest about limitations. Pip does NOT appear on Reddit — founders are the voice here.

---

## Pip — Brand Character

**The small one who always knows first.**

| Attribute | Definition |
|-----------|-----------|
| Name | Pip |
| Pronouns | They/them — gender-neutral |
| Species | Small passerine bird (the logo) — not an owl |
| Personality | Quietly observant, wry, warm, sharp. Slightly pleased with itself for having spotted something before you did — but warm about sharing. |
| Brand archetype | The Sharp Observer. Like a local who's watched the city for years and can spot things others miss. |
| Primary function | Owns the morning digest. Every daily summary is Pip's morning report. |
| Secondary function | Social media personality. Posts observations. Reacts to civic moments. Calls out quiet days. |

**Etymology:** 'To pip' = the first crack in an eggshell when a bird hatches — the first signal. In radar terminology, a 'pip' is the smallest echo signal. Skouta is the radar. Pip is the signal that comes back.

**Pip voice examples:**
- "Pip spotted something."
- "Good morning. Pip checked."
- "All quiet in Södermalm — Pip's watching."
- "Good morning. Pip's been watching overnight. Here's what happened in your area."
- "All quiet in Södermalm tonight — enjoy it. Pip's still here."

**What Pip is NOT:** Threatening, passive-aggressive, emergency-coded, alarming, government-adjacent, comical.

---

## Founder Story

Built by two expats in Sweden — a UX writer/content designer and a product designer — both users of the app they built.

> "We moved to Sweden. We love living here. And from the day we arrived, we hit the same wall that every person who moves here without speaking Swedish hits immediately: public information in this country is almost entirely monolingual."

The gap isn't in the quality of Swedish public information — it's excellent. The gap is that nobody built the English-language layer on top of it. So they did.

Use carefully: deploy authenticity, never seek fame through it. Never frame as criticism of Swedish society or institutions.

---

## Competitive Context

**Bluelight Sweden (#1 Swedish News):** Police alerts only, Swedish only despite claiming 14 languages, 3.2 rating, privacy contradiction (claims no ads, tracks for advertising). Skouta's direct response: English-first, multi-source, privacy-by-design.

**SOS Alarm 112:** English support has been requested in reviews since 2019 — officially ignored. This is Skouta's clearest opportunity.

**Global English apps (NYT, BBC, Guardian):** Confirm large English-literate audience in Sweden. None serve Sweden-specific content. Skouta fills this gap.

**Key insight:** Every Swedish app's tagline describes the product, not the user. Skouta is the first app in this space that speaks to the person holding the phone. The coral-and-dark palette is visually singular in the Swedish App Store.

---

## How It Works

### The App (Three Tabs)

**Home** — Location-centric view. Shows status for the selected location ("All clear", "Attention", or "Take care") based on nearby active alerts. Cards show: area donut chart by category, closest incident with distance, last major event (past 7 days), outdoor conditions (temperature + AQI). Users swipe between saved locations. Premium: up to 5 locations.

**Alerts** — Full alert feed in map view or list view (toggled by floating pill button). Map view uses Mapbox markers. Filters: alert level (Critical / Important / Minor), category, location. Tapping opens a bottom-sheet drawer with full translated body, source attribution, map preview, and alert level badge.

**Profile** — Account management, saved locations, settings, subscription details, about/legal. Manages: up to 5 saved locations (name, city, optional address, radius 500m–5000m, background image), notification preferences per category, Daily Digest delivery time, appearance (light/dark/system), account deletion.

### Onboarding

Four steps: intro slides → add home city + push notification permission → "You're all set for 14 days of Skouta Premium" screen. No credit card required. Premium access begins immediately.

### Data Sources

| Source | What it fetches | Frequency |
|--------|----------------|-----------|
| Swedish Police (polisen.se) | Crime, safety, traffic incidents | Every 10 min |
| SMHI | Weather warnings | Every 15 min |
| Trafikverket | Road, rail, ferry disruptions | Every 10 min |
| SL | Stockholm public transport | Every 15 min |
| Krisinformation.se (MSB) | National crisis and emergency alerts | Every 10 min |
| Västtrafik | Västra Götaland transport | Every 15 min |
| GTFS Regional | 9 regional operators (Skåne, Uppsala, Östergötland, Halland, Örebro, Gävleborg, Västmanland, Dalarna, Västernorrland) | Every 15 min |
| WeatherAPI | City weather + AQI for 39 Swedish cities | Every hour |

All alerts stored in a single PostgreSQL table. Real-time delivery via Supabase Realtime (WebSocket) — no client polling. DeepL translates every new alert before storage.

### Push Notifications

- **Critical:** pushed immediately to all users regardless of category preferences
- **High (Important):** pushed if user opted in to that category
- **Medium / Low (Minor):** digest only, never individual pushes

### Daily Digest

Runs nightly. Includes: summary sentence, per-location breakdowns, 7-day trend, category breakdown, time-of-day distribution. Delivered as a push at the user's chosen time (default 08:00). **Premium only.**

---

## Alert Model

**Categories:** `police` · `weather` · `transport` · `fire` · `general` · `ferry` · `accident` · `roadworks` · `animals`

**Priority → Display mapping:**

| Raw priority | Display label | Push behaviour |
|-------------|--------------|---------------|
| `critical` | Critical | Always pushed |
| `high` | Important | Pushed if opted in |
| `medium` | Minor | Digest only |
| `low` | Minor | Digest only |

---

## Business Model

### Tiers

**Free**
- Real-time national alert feed
- Map view
- 1 saved location
- Critical push notifications only

**Premium (45 kr/month · 299 kr/year)**
- Everything in Free, plus:
- Up to 5 saved locations with custom names and background images
- Hyperlocal alerts filtered to each location's radius
- Location-filtered alert feed
- Daily Digest with 7-day trend and category breakdown
- Customisable push notifications by category
- Alert history, municipality RSS feeds, commute filters _(post-launch — not yet built)_

### 14 Days of Skouta Premium

All new users get full Premium access from the moment onboarding completes. No card required. Server-side timer (`trial_started_at`). **Never call it a "trial" in user-facing copy.** After it ends, users revert to Free; secondary saved locations become inactive (data retained).

### Pricing

| Plan | Price | Saving |
|------|-------|--------|
| Monthly | 45 kr/month | — |
| Annual | 299 kr/year (0.82 kr/day) | 44% vs monthly |

Currency: SEK only. _(Note: stale EUR references exist in UI copy — these need updating.)_

Payment via RevenueCat. Billing managed by App Store. _(Note: RevenueCat purchase call not yet wired — paywall UI is built but doesn't charge yet.)_

---

## Current Status (May 2026)

| Area | Status |
|------|--------|
| Backend (Edge Functions + DB) | Live on Supabase Stockholm (eu-north-1) |
| All 8 data source fetchers | Deployed and running on cron |
| iOS app | Built; pre-launch (EAS Build) |
| Android app | Not yet built (planned Month 10) |
| Subscription / payment | Paywall UI built; RevenueCat not wired |
| DeepL translation | Ready; paused until launch |
| Daily Digest | Backend live; UI built |
| Push notifications | Implemented for critical alerts |
| Norway expansion | Planned Month 15; data model ready |
| GDPR | Supabase in EU ✓; DPAs with partners pending |
| Privacy policy | Placeholder in-app; document not written |
| Alert history screen | Not built; post-launch |
| Municipality RSS feeds | Not built; post-launch |
| Commute filters | Not built; post-launch |
| Swedish UI locale | Nearly complete; needs one review pass |

---

## Key Terminology

**Pip** — Skouta's brand character. A gender-neutral bird. The small one who always knows first. Appears in loading states, paywall, onboarding, digest illustrations, and social media.

**Know your ground** — The tagline. Not a functional description — a feeling of presence, belonging, and awareness. Never rewrite to a feature description.

**Alert level** — User-facing priority label. Maps: `critical → Critical`, `high → Important`, `medium/low → Minor`.

**Daily Digest** — Morning summary (Premium only) of overnight alerts across all saved locations. Pip's primary moment. Delivered as a push at the user's chosen time.

**Location** — A saved place. City (filtered by bounding box) or address (filtered by radius). Up to 5 (Premium) or 1 (Free).

**14 days of Skouta Premium** — Free full access given to every new user at onboarding. Never called a "trial" in copy. Tracked as `trial_started_at` in the database.

**Source** — The official government body an alert originates from. Always stored and displayed with attribution. Source attribution is a brand feature, not a legal footnote.

**GTFS** — General Transit Feed Specification. Format used for regional transport alerts from 9 Swedish operators via Trafiklab.

---

## What Skouta Is NOT

- A news app or crime feed
- An AI product (never lead with "AI-powered")
- A criticism of Swedish institutions — the gap is structural
- A safety/protection product — it empowers, it doesn't protect
- Affiliated with any Swedish or Norwegian authority

_For emergencies, always call 112._

---

## Open Questions / Known Issues

1. **Stale EUR copy** — Plan screen and subscribe promo reference EUR prices. Needs updating to SEK.
2. **Alert history** — Not built, but referenced in UI copy. Needs audit to find all surfaces.
3. **In-app sources screen** — Needs Västtrafik and GTFS Regional operators added.
4. **Swedish locale (`sv.json`)** — Nearly complete; needs one review pass before enabling.
5. **Privacy policy** — Placeholder only; document not written.
6. **DPAs** — Pending with Supabase, Mapbox, DeepL, Expo.
