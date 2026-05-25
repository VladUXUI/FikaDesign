/* global React, Nav, Footer, PageHero, Placeholder, SectionHeading */

const { useState: workUseState, useEffect: workUseEffect, useRef: workUseRef } = React;

const CHAPTERS = [
  { id: "overview",  num: "01", title: "Overview" },
  { id: "challenge", num: "02", title: "The challenge" },
  { id: "role",      num: "03", title: "Our role" },
  { id: "built",     num: "04", title: "What we built" },
  { id: "decisions", num: "05", title: "Key design decisions" },
];

function WorkPage() {
  return (
    <>
      <Nav />
      <main>
        <WorkHero />
        <SkoutaCaseStudy />
        <CareerCredibility />
        <NextProjectCTA />
      </main>
      <Footer />
    </>
  );
}

function WorkHero() {
  return (
    <PageHero
      eyebrow="Our work"
      title="Know your ground."
      lede="Skouta is a civic access tool for everyone living in Sweden — conceived, designed, and shipped by Fika Design Co. One product, end-to-end, with full accountability for every decision."
      meta="Skouta · iOS first"
      accent="ground."
    />
  );
}

/* ============================================================
   Skouta case study — spec-rail + narrative layout
   Left: sticky list of chapters that highlights active section
   Right: long-form scrolling content
   ============================================================ */
function SkoutaCaseStudy() {
  const [active, setActive] = workUseState("overview");
  const sectionRefs = workUseRef({});

  workUseEffect(() => {
    let raf = 0;
    const measure = () => {
      const trigger = window.innerHeight * 0.35;
      let current = CHAPTERS[0].id;
      for (const c of CHAPTERS) {
        const el = sectionRefs.current[c.id];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= trigger) current = c.id;
      }
      setActive(current);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="section-cream" style={{ paddingTop: 72, paddingBottom: 160 }}>
      <div className="container">
        {/* Project header */}
        <div style={{ marginBottom: 80, paddingBottom: 56, borderBottom: "1px solid var(--bd-line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <img src="assets/SkoutaLogo.svg" alt="" aria-hidden="true" style={{ width: 36, height: 36, display: "block" }} />
            <span style={{
              padding: "8px 14px", borderRadius: 999, background: "var(--fika-espresso)", color: "white",
              fontSize: 11.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>Skouta</span>
            <span className="meta" style={{ color: "var(--fg-3)" }}>iOS first · Android soon · App Store</span>
          </div>
          <h2 className="display-xl" style={{ marginBottom: 32 }}>
            A civic access tool<br />
            for everyone living{" "}
            <span className="wonk-italic" style={{ color: "var(--fika-orange-deep)" }}>in Sweden</span>.
          </h2>
          {/* Project facts strip */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32,
            marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--bd-line)",
          }}>
            {[
              { k: "Role", v: "Founder-led product" },
              { k: "Platform", v: "iOS first, Android to follow" },
              { k: "Services applied", v: "Product, content, UX writing, context engineering" },
              { k: "Status", v: <Placeholder label="iOS launch · Q3 2026 · Android shortly after" /> },
            ].map((x, i) => (
              <div key={i}>
                <div className="meta" style={{ color: "var(--fg-3)", marginBottom: 10 }}>{x.k}</div>
                <div style={{ fontSize: 15, lineHeight: 1.45, color: "var(--fg-1)", letterSpacing: "-0.005em" }}>
                  {x.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spec rail + narrative */}
        <div style={{
          display: "grid", gridTemplateColumns: "260px 1fr", gap: 96,
          alignItems: "flex-start",
        }}>
          {/* Sticky chapter rail */}
          <aside style={{ position: "sticky", top: 120, alignSelf: "flex-start" }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Case study</div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CHAPTERS.map((c) => {
                const isActive = c.id === active;
                return (
                  <li key={c.id} style={{ borderTop: "1px solid var(--bd-line)" }}>
                    <a href={"#" + c.id} style={{
                      display: "grid", gridTemplateColumns: "32px 1fr",
                      gap: 14, alignItems: "baseline",
                      padding: "14px 0",
                      color: isActive ? "var(--fika-espresso)" : "var(--fg-3)",
                      transition: "color 260ms var(--ease-out)",
                      position: "relative",
                    }}>
                      <span className="meta" style={{ color: isActive ? "var(--fika-orange-deep)" : "var(--fg-3)" }}>{c.num}</span>
                      <span style={{
                        fontSize: 15, fontWeight: 500, letterSpacing: "-0.005em",
                        color: "inherit",
                      }}>
                        {c.title}
                      </span>
                      {isActive && (
                        <span aria-hidden="true" style={{
                          position: "absolute", left: -16, top: 16, bottom: 16,
                          width: 2, background: "var(--fika-orange)",
                        }} />
                      )}
                    </a>
                  </li>
                );
              })}
              <li style={{ borderTop: "1px solid var(--bd-line)", borderBottom: "1px solid var(--bd-line)" }} />
            </ol>
            <a href="contact.html" className="btn btn-secondary" style={{ marginTop: 32, height: 44, padding: "0 18px", fontSize: 14 }}>
              Discuss a project →
            </a>
          </aside>

          {/* Long-form narrative */}
          <article style={{ maxWidth: 720, minWidth: 0 }}>
            <Chapter id="overview" num="01" title="Overview" sectionRefs={sectionRefs}>
              <p>
                Sweden has 2.1 million foreign-born residents — about 21% of the population. Its public alert infrastructure is authoritative, well-maintained, and almost entirely in Swedish. For the roughly 1.2 million English-comfortable residents who live here without fluent Swedish, that’s not a gap. It’s a wall.
              </p>
              <p>
                Skouta is a civic access tool that removes that wall. A real-time mobile application — launching on iOS first, with Android shortly after — that aggregates official Swedish government alerts and delivers them in English, accurately, with full source attribution, and without editorializing.
              </p>
              <p>
                The tagline says it directly: <strong>Know your ground.</strong> Not a feature description. A feeling of presence, belonging, and awareness in the place you chose to live.
              </p>
              <PullQuote>
                Not being dependent on others to translate your own life.
              </PullQuote>
              <PullQuote>
                Trust is not a feature of Skouta. It is the product.
              </PullQuote>
            </Chapter>

            <Chapter id="challenge" num="02" title="The challenge" sectionRefs={sectionRefs}>
              <p>
                Public safety information is only useful if you can understand it. An expat receiving a police alert on their street in Swedish faces a binary choice: spend time trying to translate it, or ignore it. Neither is acceptable for information that can directly affect your safety or daily routine.
              </p>
              <p>
                The problem wasn’t the data. Sweden’s official sources — Swedish Police, SMHI, Trafikverket, SL, Krisinformation (MSB), Västtrafik, and regional transport operators — are freely available via public APIs, well-structured, and reliably updated. The problem was access.
              </p>
              <p style={{ fontWeight: 500, color: "var(--fg-1)" }}>
                No English-language layer existed. We built one.
              </p>
            </Chapter>

            <Chapter id="role" num="03" title="Our role" sectionRefs={sectionRefs}>
              <p>
                Fika Design Co. conceived, designed, and launched Skouta as a founder-led product. There was no client brief. Every decision — from product strategy and information architecture to push notification design, translation quality control, and the free/paid feature split — was made by us, with full accountability for the outcome.
              </p>
              <ServicesApplied />
            </Chapter>

            <Chapter id="built" num="04" title="What we built" sectionRefs={sectionRefs}>
              <p style={{ marginBottom: 24 }}>
                A three-tab mobile application aggregating real-time alerts from eight official Swedish government data sources, translated into English and delivered with full source attribution. Built iOS-first with Android following shortly after launch. The product includes:
              </p>
              <FeatureList />
              <PipCard />
              <Sources />
            </Chapter>

            <Chapter id="decisions" num="05" title="Key design decisions" sectionRefs={sectionRefs}>
              <DecisionCard
                num="01"
                title="The alerts feed is permanently ad-free."
                body="Monetization lives entirely in a separate, opt-in Discover tab. This was a non-negotiable product principle established at the outset."
              />
              <DecisionCard
                num="02"
                title="The free tier delivers genuine safety value."
                body="Multiple saved locations, filtered notifications, and the morning digest sit behind the paid tier — not the core alert feed."
              />
              <DecisionCard
                num="03"
                title="Every alert carries explicit source attribution."
                body="Plus a translation disclaimer. Trust is not a feature of Skouta. It is the product."
              />
            </Chapter>
          </article>
        </div>
      </div>
    </section>
  );
}

function Chapter({ id, num, title, sectionRefs, children }) {
  return (
    <section id={id} ref={(el) => { sectionRefs.current[id] = el; }} style={{
      marginBottom: 96, paddingTop: 8,
    }}>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28,
        paddingBottom: 16, borderBottom: "1px solid var(--bd-line)",
      }}>
        <span className="meta" style={{ color: "var(--fika-orange-deep)" }}>{num}</span>
        <h3 className="display-md" style={{ fontWeight: 500, fontSize: "clamp(28px, 3vw, 40px)" }}>{title}</h3>
      </div>
      <div className="prose" style={{ maxWidth: "unset" }}>
        {children}
      </div>
    </section>
  );
}

function PullQuote({ children }) {
  return (
    <blockquote style={{
      margin: "36px 0", padding: "0 0 0 24px",
      borderLeft: "2px solid var(--fika-orange)",
      fontFamily: "var(--font-display)", fontStyle: "italic",
      fontSize: "clamp(24px, 2.4vw, 32px)", lineHeight: 1.25,
      fontVariationSettings: "'opsz' 72, 'SOFT' 80, 'WONK' 1",
      color: "var(--fika-cocoa)", letterSpacing: "-0.012em", textWrap: "balance",
    }}>
      "{children}"
    </blockquote>
  );
}

function ServicesApplied() {
  const items = [
    { label: "Product design", body: "End-to-end. From competitive analysis and information architecture through UI design, component library, onboarding flows, and App Store assets." },
    { label: "Content design", body: "Alert taxonomy, five-category information hierarchy, bilingual product logic, and guide library structure covering Swedish public services." },
    { label: "UX writing", body: "All in-app copy: onboarding flows, push notification templates, empty states, error states, paywall copy, morning digest, and the full guide library." },
    { label: "Context engineering", body: "System prompt architecture and AI behavior design for the translation pipeline and alert processing layer." },
  ];
  return (
    <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 0 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Services applied</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((x, i) => (
          <li key={i} style={{
            borderTop: "1px solid var(--bd-line)",
            padding: "20px 0",
            display: "grid", gridTemplateColumns: "200px 1fr", gap: 32,
            alignItems: "baseline",
          }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: "var(--fika-espresso)", letterSpacing: "-0.005em" }}>
              {x.label}
            </span>
            <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg-2)", textWrap: "pretty" }}>
              {x.body}
            </span>
          </li>
        ))}
        <li style={{ borderTop: "1px solid var(--bd-line)" }} />
      </ul>
    </div>
  );
}

function FeatureList() {
  const features = [
    { num: "A", body: "A three-tab application — Home (location-centric status), Alerts (live feed in map or list view), and Profile — covering nine alert categories: police, weather, transport, fire, ferry, accident, roadworks, animals, and general." },
    { num: "B", body: "A geographic map view with category-coded alert pins across Sweden, powered by Mapbox." },
    { num: "C", body: "A push notification system with category-level opt-in controls. Critical alerts push to everyone; Important alerts respect opt-in; lower priority lives in the digest." },
    { num: "D", body: "Plain-English source attribution and translation disclaimer on every single alert — a brand feature, not a legal footnote." },
    { num: "E", body: "A free/paid structure built around 14 days of Skouta Premium for every new user, with personalization gated behind the paid tier and core safety value permanently free." },
    { num: "F", body: "The Daily Digest — Pip’s morning report — designed as the primary long-term retention hook on the paid tier." },
  ];
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 16 }}>
      {features.map((f, i) => (
        <li key={i} style={{
          display: "grid", gridTemplateColumns: "32px 1fr", gap: 16, alignItems: "baseline",
        }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500,
            color: "var(--fika-orange-deep)", letterSpacing: "-0.012em",
            fontVariationSettings: "'opsz' 48, 'SOFT' 50",
          }}>{f.num}</span>
          <span style={{ fontSize: 17, lineHeight: 1.6, color: "var(--fg-1)" }}>{f.body}</span>
        </li>
      ))}
    </ul>
  );
}

function Sources() {
  const sources = [
    { name: "Swedish Police",       domain: "polisen.se",          cat: "Police incidents" },
    { name: "SMHI",                 domain: "smhi.se",             cat: "Weather warnings" },
    { name: "Trafikverket",         domain: "trafikverket.se",     cat: "Road, rail, ferry" },
    { name: "SL",                   domain: "sl.se",               cat: "Transport · Stockholm" },
    { name: "Krisinformation (MSB)",domain: "krisinformation.se",  cat: "National crisis & emergency" },
    { name: "Västtrafik",            domain: "vasttrafik.se",       cat: "Transport · Västra Götaland" },
    { name: "GTFS Regional",         domain: "trafiklab.se",        cat: "9 regional operators" },
    { name: "WeatherAPI",            domain: "weatherapi.com",      cat: "City conditions · 39 cities" },
  ];
  return (
    <div style={{ marginTop: 32, padding: 28, background: "var(--fika-paper)", border: "1px solid var(--bd-line)", borderRadius: 18 }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Eight official data sources</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
        {sources.map((s, i) => (
          <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, paddingBottom: 10, borderBottom: "1px solid var(--bd-hair)" }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--fika-espresso)", letterSpacing: "-0.005em" }}>{s.name}</span>
            <span style={{ fontSize: 12, color: "var(--fg-3)", letterSpacing: "0.02em", fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>{s.cat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Pip card — brand character introduction inside the case study */
function PipCard() {
  return (
    <div style={{
      marginTop: 32, padding: 32,
      background: "var(--fika-espresso)", color: "var(--fika-paper)",
      borderRadius: 18, position: "relative", overflow: "hidden",
      display: "grid", gridTemplateColumns: "96px 1fr", gap: 28, alignItems: "flex-start",
    }}>
      <img src="assets/SkoutaLogo.svg" alt="Pip — the Skouta bird" style={{ width: 96, height: 96, display: "block" }} />
      <div>
        <div className="eyebrow" style={{ color: "var(--fika-orange-soft)", marginBottom: 10 }}>Brand character</div>
        <h4 style={{
          margin: "0 0 12px", fontFamily: "var(--font-display)",
          fontSize: 26, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.012em",
          fontVariationSettings: "'opsz' 60, 'SOFT' 50",
        }}>Pip — the small one who always knows first.</h4>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.55, color: "rgba(250,250,250,0.82)", textWrap: "pretty" }}>
          Pip is the bird inside the Skouta mark. Gender-neutral, quietly observant, wry and warm. Pip owns the Daily Digest and shows up across empty states, onboarding, and social. Etymology: “pip” is the first crack in an eggshell when a bird hatches — the first signal. Skouta is the radar; Pip is the signal that comes back.
        </p>
      </div>
    </div>
  );
}

function DecisionCard({ num, title, body }) {
  return (
    <div style={{
      marginBottom: 16, padding: 28,
      background: "var(--fika-paper)",
      border: "1px solid var(--bd-line)",
      borderRadius: 18,
      display: "grid", gridTemplateColumns: "48px 1fr", gap: 20, alignItems: "baseline",
    }}>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500,
        color: "var(--fika-orange-deep)", letterSpacing: "-0.018em",
        fontVariationSettings: "'opsz' 60, 'SOFT' 50",
      }}>{num}</span>
      <div>
        <h4 style={{
          margin: "0 0 10px", fontFamily: "var(--font-display)",
          fontSize: 24, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.012em",
          fontVariationSettings: "'opsz' 48, 'SOFT' 50",
          color: "var(--fika-espresso)", textWrap: "balance",
        }}>{title}</h4>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.55, color: "var(--fg-2)", textWrap: "pretty" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Career credibility — Founder bios
   ============================================================ */
function CareerCredibility() {
  return (
    <section className="section-paper" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="container">
        <SectionHeading
          eyebrow="The experience behind the work"
          title="Two designers. Two careers. One product."
          lede="Skouta was built by two designers with senior careers at some of Europe's most recognized organizations. Our individual experience spans product design, content strategy, UX writing, and digital product leadership."
          accent="One product."
        />
        <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 16 }}>
          <FounderCard idx={1} />
          <FounderCard idx={2} />
        </div>
      </div>
    </section>
  );
}

const FOUNDERS = {
  1: {
    name: "Vlad Todirut",
    avatar: "uploads/Vlad_Avatar.png",
    role: "Product designer and co-founder",
    linkedin: "https://www.linkedin.com/in/vladtodirut/",
    bio: "Sixteen years of product design across fintech and Web3 — at companies including Consensys, MetaMask, Thesis, and Mezo. At Fika, he leads product design end-to-end: IA, interaction systems, visual design, and production. On Skouta, he shaped every screen from first concept to the App Store.",
  },
  2: {
    name: "Adina Cretu",
    avatar: "uploads/Adina_avatar.png",
    role: "UX writer, content designer, and co-founder",
    linkedin: "https://se.linkedin.com/in/adinacretu",
    bio: "A content designer and UX writer working at the intersection of language, interaction, and adaptive technology — currently at Volvo Group, designing digital product content at scale. Her specialisms include conversation design and generative AI. At Fika and on Skouta, she owns all content design, UX writing, and the editorial voice.",
  },
};

function FounderCard({ idx }) {
  const f = FOUNDERS[idx];
  return (
    <div style={{
      background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
      borderRadius: 24, padding: 36, minHeight: 380,
      display: "flex", flexDirection: "column", gap: 24,
    }}>
      <div className="photo studio" style={{ aspectRatio: "5/4", borderRadius: 14, position: "relative" }}>
        <img src={f.avatar} alt={f.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600,
          margin: 0, lineHeight: 1.1, letterSpacing: "-0.015em",
          fontVariationSettings: "'opsz' 60, 'SOFT' 30",
          color: "var(--fika-espresso)",
        }}>{f.name}</h3>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--fg-3)", marginBottom: 4 }}>{f.role}</div>
        <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: "var(--fg-2)", textWrap: "pretty" }}>
          {f.bio}
        </p>
        <a href={f.linkedin} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4,
          fontSize: 13, fontWeight: 500, color: "var(--fika-espresso)",
          textDecoration: "none", opacity: 0.55,
          transition: "opacity 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.55}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}

function NextProjectCTA() {
  return (
    <section className="section-ink" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>
        <h2 className="display-lg" style={{ color: "var(--fika-paper)", maxWidth: 720 }}>
          More case studies <span className="wonk-italic" style={{ color: "var(--fika-orange-soft)" }}>coming</span> as we ship them.
        </h2>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="services.html" className="btn btn-on-ink">See services</a>
          <a href="contact.html" className="btn btn-on-orange-ghost">Get in touch →</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WorkPage });
