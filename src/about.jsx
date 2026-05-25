/* global React, Nav, Footer, PageHero, Placeholder, SectionHeading */

function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutHero />
        <StudioStory />
        <TheTeam />
        <HowWeWork />
      </main>
      <Footer />
    </>
  );
}

function AboutHero() {
  return (
    <PageHero
      eyebrow="About"
      title="A studio that ships."
      lede="Fika Design Co. AB is a Sweden-based product design studio founded by two designers who built Skouta — a live app launching iOS-first, with Android soon after — and now bring the same standard of work to clients."
      meta="Founded 2026 · AB"
      accent="ships."
    />
  );
}

function StudioStory() {
  return (
    <section id="story" className="section-cream" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container">
        <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 96, alignItems: "flex-start" }}>
          <div style={{ position: "sticky", top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Studio story</div>
            <h2 className="display-md" style={{ marginBottom: 28 }}>
              We moved to Sweden. We built something we needed. Then we decided to do the{" "}
              <span className="wonk-italic" style={{ color: "var(--fika-orange-deep)" }}>same</span> for others.
            </h2>
            <div className="photo studio" style={{ aspectRatio: "4/5", borderRadius: 16, marginTop: 32 }}>
              <div className="grain" />
              <div className="photo-label">Photo · workspace, morning</div>
            </div>
          </div>
          <div style={{ maxWidth: 680 }}>
            <Para>
              Fika Design Co. was founded by two designers — a product designer and a UX writer and content designer — who came to Sweden from elsewhere, found the same walls that every non-Swedish speaker finds, and responded the way designers respond: by building something.
            </Para>
            <Para>
              That something is Skouta — a real-time public alert app that translates official Swedish government information into English. It's on the App Store. We use it every day.
            </Para>
            <Para>
              Building a product end-to-end — not as a consulting engagement, but as founders with full accountability for every decision — changed how we think about design. It sharpened what we value: <strong>precision over decoration</strong>, <strong>shipping over presenting</strong>, <strong>trust over novelty</strong>.
            </Para>
            <Para>
              Fika Design Co. exists to bring that standard of design work to the clients we take on.
            </Para>
            <FikaConcept />
          </div>
        </div>
      </div>
    </section>
  );
}

function Para({ children }) {
  return (
    <p style={{ fontSize: 19, lineHeight: 1.6, margin: "0 0 24px", color: "var(--fg-1)", textWrap: "pretty" }}>
      {children}
    </p>
  );
}

function FikaConcept() {
  return (
    <div style={{
      marginTop: 40, padding: "32px 36px",
      background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
      borderRadius: 18,
    }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>On the name</div>
      <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: "var(--fg-1)", textWrap: "pretty" }}>
        The name comes from the Swedish tradition of taking a deliberate pause — coffee, conversation, then back to work with clarity. It describes how we approach problems: <strong>with patience before conviction, and conviction before output.</strong>
      </p>
    </div>
  );
}

/* ============================================================
   The team — two founders, placeholder bios
   ============================================================ */
function TheTeam() {
  return (
    <section id="team" className="section-paper" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="container">
        <SectionHeading
          eyebrow="The team"
          title="Two people. Two careers. One studio."
          lede="Two designers with complementary careers — one in product design, one in content design and UX writing — who built a product together before building a studio."
          accent="One studio."
        />
        <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <FounderCard idx={1} role="Product designer and co-founder" />
          <FounderCard idx={2} role="UX writer, content designer, and co-founder" />
        </div>
      </div>
    </section>
  );
}

const FOUNDERS = {
  1: {
    name: "Vlad Todirut",
    avatar: "uploads/Vlad_Avatar.png",
    linkedin: "https://www.linkedin.com/in/vladtodirut/",
    bio: "Sixteen years of product design across fintech and Web3 — at companies including Consensys, MetaMask, Thesis, and Mezo. At Fika, he leads product design end-to-end: IA, interaction systems, visual design, and production. On Skouta, he shaped every screen from first concept to the App Store.",
  },
  2: {
    name: "Adina Cretu",
    avatar: "uploads/Adina_avatar.png",
    linkedin: "https://se.linkedin.com/in/adinacretu",
    bio: "A content designer and UX writer working at the intersection of language, interaction, and adaptive technology — currently at Volvo Group, designing digital product content at scale. Her specialisms include conversation design and generative AI. At Fika and on Skouta, she owns all content design, UX writing, and the editorial voice.",
  },
};

function FounderCard({ idx, role }) {
  const f = FOUNDERS[idx];
  return (
    <div style={{
      background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
      borderRadius: 24, padding: 0, overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      <div className="photo studio" style={{ aspectRatio: "5/4", position: "relative" }}>
        <img src={f.avatar} alt={f.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600,
            margin: 0, lineHeight: 1.1, letterSpacing: "-0.015em",
            fontVariationSettings: "'opsz' 60, 'SOFT' 30",
            color: "var(--fika-espresso)",
          }}>{f.name}</h2>
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500,
          margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em",
          fontVariationSettings: "'opsz' 60, 'SOFT' 50",
          color: "var(--fika-espresso)", opacity: 0.7,
        }}>
          {role}
        </h3>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: 0, color: "var(--fg-2)", textWrap: "pretty" }}>
          {f.bio}
        </p>
        <a href={f.linkedin} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 14, fontWeight: 500, color: "var(--fika-espresso)",
          textDecoration: "none", opacity: 0.6,
          transition: "opacity 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}

/* ============================================================
   How we work — 4 principles as big-type cards
   ============================================================ */
function HowWeWork() {
  const principles = [
    {
      num: "01",
      title: "Small by design",
      body: "We are two people. We don't scale engagements with junior team members. Every project is handled by the same two people you speak with first. This is a deliberate choice, not a limitation.",
    },
    {
      num: "02",
      title: "Senior from the start",
      body: "Both founders bring careers across major organizations. We've made design decisions at scale. We bring that standard to every project we take on, regardless of size.",
    },
    {
      num: "03",
      title: "Shipping is the standard",
      body: "Good design that doesn't reach users isn't good design. We're oriented toward production — toward work that launches, holds up under real conditions, and improves over time.",
    },
    {
      num: "04",
      title: "Direct and honest",
      body: "We say what we think. We tell you when something won't work. We'd rather have a difficult conversation early than an expensive one late. This is how we work with each other. It's how we work with clients.",
    },
  ];
  return (
    <section id="how-we-work" className="section-ink" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          title="Four principles, applied to every engagement."
          lede="These aren't aspirational. They describe how we already work — for ourselves on Skouta, and for the clients we take on."
          accent="every engagement."
        />
        <div className="how-we-work-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 16 }}>
          {principles.map((p) => (
            <PrincipleCard key={p.num} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ num, title, body }) {
  return (
    <article style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 24, padding: 40,
      display: "flex", flexDirection: "column", gap: 20,
      minHeight: 340,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400,
          color: "var(--fika-orange)", lineHeight: 1,
          fontVariationSettings: "'opsz' 60, 'SOFT' 40",
          letterSpacing: "-0.02em",
        }}>{num}</span>
        <span style={{
          width: 28, height: 1, background: "rgba(255,255,255,0.3)",
        }} />
      </div>
      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 400,
        fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.05,
        letterSpacing: "-0.022em",
        fontVariationSettings: "'opsz' 96, 'SOFT' 40",
        margin: "auto 0 0",
        color: "var(--fika-paper)",
        textWrap: "balance",
      }}>
        {title}<span style={{
          color: "var(--fika-orange-soft)", fontStyle: "italic",
          fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
        }}>.</span>
      </h3>
      <p style={{
        fontSize: 16, lineHeight: 1.55, margin: 0, textWrap: "pretty",
        color: "rgba(250,250,250,0.78)",
      }}>
        {body}
      </p>
    </article>
  );
}

Object.assign(window, { AboutPage });
