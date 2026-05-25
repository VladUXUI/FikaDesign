/* global React, Nav, Footer, PageHero, SectionHeading, Placeholder */

const { useState: spUseState, useEffect: spUseEffect, useRef: spUseRef } = React;

const FULL_SERVICES = [
  {
    id: "product-design",
    num: "01",
    title: "Product design",
    summary: "We design digital products from the ground up — or join an existing product where senior design thinking is needed most.",
    paragraphs: [
      "Product design at Fika covers the full cycle: user research, competitive analysis, information architecture, interaction design, visual design, prototyping, and launch-ready asset production. We work in Figma and deliver to your development team with the clarity and precision a small, experienced team can provide — without the overhead of a large agency.",
      "We're particularly suited to early-stage and growth-stage digital products where foundational design decisions carry lasting consequences. We've made those decisions for our own products. We make them carefully.",
    ],
    goodFor: [
      "Startups building their first product.",
      "Growing companies redesigning an existing one.",
      "Organizations that need senior design capability without a full in-house team.",
    ],
    deliverables: ["Research", "Information architecture", "Interaction design", "Design System", "Prototypes", "Launch-ready assets"],
  },
  {
    id: "design-engineering",
    num: "02",
    title: "Design engineering",
    summary: "Design doesn't end at the Figma handoff. The gap between a polished design and a production-quality implementation is where most product quality is lost. We close that gap.",
    paragraphs: [
      "Design engineering at Fika means we work across both sides of the handoff — building custom components, writing interaction logic, and ensuring that what ships looks and behaves like what was designed. We work with modern front-end frameworks and have direct experience building with AI-assisted development tooling.",
      "We built Skouta using this approach: a design-led team that carries the product through to production rather than handing off to a separate engineering function. The result is a product that looks exactly like it was designed to look.",
    ],
    goodFor: [
      "Products where design fidelity matters.",
      "Teams with a development resource that needs a precise design-side counterpart.",
      "Organizations building AI-native products that require custom interaction work.",
    ],
    deliverables: ["Working Prototype", "Interaction logic", "Front-end implementation", "AI-assisted dev workflow", "Design-system enforcement for AI"],
  },
  {
    id: "content-design",
    num: "03",
    title: "Content design",
    summary: "Content is a structural decision before it's a writing decision. Content design at Fika addresses the information architecture of a product — what information exists, where it lives, how it flows, and how it serves the user at every point in their journey.",
    paragraphs: [
      "This is distinct from UX writing (the words themselves) and from editorial content strategy. Content design is the design of information as a system: taxonomies, labeling conventions, navigation structures, help content hierarchies, notification logic, and the connective tissue between them.",
      "We applied this to Skouta's entire alert structure — five categories, multiple priority levels, three data formats, six official sources, bilingual output — and made it feel simple to the person holding the phone. That's what content design does.",
    ],
    goodFor: [
      "Products with complex or regulated information.",
      "Multi-language or multi-market products.",
      "Organizations scaling a product that has outgrown its original information structure.",
    ],
    deliverables: ["Taxonomies", "Information architecture", "Navigation systems", "Notification logic", "Help content hierarchies"],
  },
  {
    id: "ux-writing",
    num: "04",
    title: "UX writing",
    summary: "Every word in a digital product is a design decision. Button labels, error messages, onboarding screens, push notifications, empty states, tooltips, paywalls — each one affects whether a user understands what to do, trusts the product, and comes back.",
    paragraphs: [
      "UX writing at Fika is practiced by designers who understand how copy fits into UI, not writers who receive a brief from a distance. We write for the constraint of the screen, the context of the user's moment, and the specific voice of your brand.",
      "We've written every word in Skouta — from the onboarding welcome screen to the paywall copy to the error states. We know what a mistranslated push notification costs in uninstalls, and what a well-written empty state does for retention. We apply that knowledge to client work.",
    ],
    goodFor: [
      "Any digital product. UX writing is not optional — every product either has considered copy or accidental copy.",
      "Products preparing for App Store or major launch where copy quality is reviewed.",
      "Teams with brand voice guidelines that aren't translating into the UI.",
    ],
    deliverables: ["Onboarding flows", "Error and empty states", "Push notification templates", "Paywall and pricing copy", "In-app help"],
  },
  {
    id: "context-engineering",
    num: "05",
    title: "Context engineering",
    summary: "Context engineering is the design discipline behind AI-powered products. It is the craft of defining what an AI model knows, how it behaves, what it will and won't do, and how it responds — across every interaction in a product.",
    paragraphs: [
      "As AI components become standard in digital products, the design of model behavior has become as important as the design of the interface. A poorly designed system prompt produces inconsistent, unreliable, or unsafe AI behavior. A well-designed one is invisible — the AI does exactly what the product needs, every time, within the constraints the product requires.",
      "Fika offers context engineering as a standalone service and as part of a broader product design engagement. We design system prompts, model instruction sets, interaction patterns for AI-powered components, and the guardrail structures that keep AI behavior aligned with product intent. We built and applied this to Skouta's translation pipeline and alert processing architecture.",
      "This is a new discipline. The vocabulary is still forming. If you're building a product with an AI component and you're not sure who should own the design of its behavior — this is that service.",
    ],
    goodFor: [
      "Products with AI-powered features: chat interfaces, AI content generation, automated workflows, AI translation or summarization.",
      "Organizations evaluating how to integrate AI responsibly into an existing product.",
      "Teams building AI-native products who need a design-led owner of model behavior.",
    ],
    deliverables: ["System prompt architecture", "Model instruction sets", "Interaction patterns for AI components", "Guardrail structures", "Behavior evaluations"],
  },
];

function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <ServicesHero />
        <ServicesIndex />
        {FULL_SERVICES.map((s) => (
          <ServiceSection key={s.id} service={s} />
        ))}
        <WorkingWith />
      </main>
      <Footer />
    </>
  );
}

function ServicesHero() {
  return (
    <PageHero
      eyebrow="Services"
      title="Five services. One small, senior team."
      lede="We work across the full product design stack — from research and strategy to the content and AI-behavior layers that most studios don't cover."
      meta="01 — 05"
      accent="senior team."
    />
  );
}

/* Services index — five rows acting as a quick-jump table of contents */
function ServicesIndex() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 120, background: "var(--fika-paper)" }}>
      <div className="container">
        <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--bd-line)" }}>
          {FULL_SERVICES.map((s) => (
            <IndexRow key={s.id} service={s} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function IndexRow({ service }) {
  const [hover, setHover] = spUseState(false);
  return (
    <li
      style={{ borderBottom: "1px solid var(--bd-line)" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a href={"#" + service.id} style={{
        display: "grid",
        gridTemplateColumns: "60px minmax(0, 1.2fr) minmax(0, 1.8fr) 40px",
        gap: 32, alignItems: "baseline",
        padding: "26px 0",
        background: hover ? "color-mix(in oklab, var(--fika-orange) 4%, transparent)" : "transparent",
        transition: "background 260ms var(--ease-out)",
      }}>
        <span className="meta" style={{ color: "var(--fika-orange-deep)" }}>{service.num}</span>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: "clamp(32px, 3.6vw, 52px)", lineHeight: 1.05,
          letterSpacing: "-0.02em",
          fontVariationSettings: "'opsz' 72, 'SOFT' 55",
          color: "var(--fika-espresso)",
          fontStyle: hover ? "italic" : "normal",
          transition: "font-style 220ms var(--ease-out)",
        }}>
          {service.title}
        </span>
        <span style={{ fontSize: 16, lineHeight: 1.5, color: "var(--fg-2)", maxWidth: 540 }}>
          {service.summary}
        </span>
        <span style={{
          color: "var(--fika-orange)", fontSize: 22,
          transform: hover ? "translateX(6px)" : "translateX(0)",
          transition: "transform 260ms var(--ease-out)",
          textAlign: "right",
        }}>↓</span>
      </a>
    </li>
  );
}

/* Full per-service section */
function ServiceSection({ service }) {
  const isLast = service.id === FULL_SERVICES[FULL_SERVICES.length - 1].id;
  const isEven = parseInt(service.num, 10) % 2 === 0;
  const bg = service.id === "context-engineering" ? "section-ink"
           : isEven ? "section-cream" : "section-paper";

  return (
    <section id={service.id} className={bg} style={{ paddingTop: 140, paddingBottom: 140, position: "relative" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 64 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Service {service.num}</div>
            <h2 className="display-lg" style={{
              color: bg === "section-ink" ? "var(--fika-paper)" : "var(--fika-espresso)",
            }}>
              {service.title}<span style={{
                color: bg === "section-ink" ? "var(--fika-orange-soft)" : "var(--fika-orange)",
                fontStyle: "italic",
                fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
              }}>.</span>
            </h2>
          </div>
          <p style={{
            fontSize: 22, lineHeight: 1.45, margin: 0, textWrap: "pretty",
            color: bg === "section-ink" ? "rgba(250,250,250,0.78)" : "var(--fg-1)",
            alignSelf: "center",
            maxWidth: 580,
          }}>
            {service.summary}
          </p>
        </div>

        {/* Body */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80,
          alignItems: "flex-start", paddingTop: 56, borderTop: bg === "section-ink" ? "1px solid rgba(255,255,255,0.18)" : "1px solid var(--bd-line)",
        }}>
          <div>
            {service.paragraphs.map((p, i) => (
              <p key={i} style={{
                fontSize: 17, lineHeight: 1.65, margin: "0 0 18px",
                color: bg === "section-ink" ? "rgba(250,250,250,0.85)" : "var(--fg-1)",
                maxWidth: 620, textWrap: "pretty",
              }}>{p}</p>
            ))}
            <Deliverables items={service.deliverables} darkBg={bg === "section-ink"} />
          </div>
          <GoodForCard items={service.goodFor} darkBg={bg === "section-ink"} />
        </div>
      </div>
    </section>
  );
}

function Deliverables({ items, darkBg }) {
  return (
    <div style={{ marginTop: 32 }}>
      <div className="eyebrow" style={{ marginBottom: 14, color: darkBg ? "rgba(255,255,255,0.7)" : undefined }}>
        Deliverables
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((d, i) => (
          <span key={i} style={{
            padding: "8px 16px", borderRadius: 999,
            background: darkBg ? "rgba(255,255,255,0.06)" : "var(--bg-raised)",
            border: "1px solid " + (darkBg ? "rgba(255,255,255,0.16)" : "var(--bd-line)"),
            fontSize: 13.5, fontWeight: 500,
            color: darkBg ? "var(--fika-paper)" : "var(--fg-1)",
            letterSpacing: "-0.005em",
          }}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function GoodForCard({ items, darkBg }) {
  return (
    <aside style={{
      padding: 32, borderRadius: 20,
      background: darkBg ? "rgba(255,255,255,0.04)" : "var(--bg-raised)",
      border: "1px solid " + (darkBg ? "rgba(255,255,255,0.14)" : "var(--bd-line)"),
      position: "sticky", top: 120,
    }}>
      <div className="eyebrow" style={{ marginBottom: 16, color: darkBg ? "rgba(255,255,255,0.7)" : undefined }}>
        Good for
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: "grid", gridTemplateColumns: "16px 1fr", gap: 12, alignItems: "baseline",
            fontSize: 15.5, lineHeight: 1.5,
            color: darkBg ? "var(--fika-paper)" : "var(--fg-1)",
          }}>
            <span style={{
              display: "inline-block", width: 6, height: 6, borderRadius: 999,
              background: darkBg ? "var(--fika-orange-soft)" : "var(--fika-orange)",
              transform: "translateY(7px)",
            }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function WorkingWith() {
  return (
    <section className="section-orange" style={{ paddingTop: 140, paddingBottom: 100 }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 24, color: "rgba(255,255,255,0.8)" }}>Working with us</div>
        <h2 className="display-xl" style={{ marginBottom: 32, color: "white" }}>
          Two people. <span className="wonk-italic" style={{ color: "var(--fika-espresso)" }}>Direct access</span> from the first email.
        </h2>
        <p style={{
          fontSize: 22, lineHeight: 1.5, color: "rgba(255,255,255,0.92)",
          maxWidth: 720, marginBottom: 24, textWrap: "pretty",
        }}>
          Fika is a two-person studio. That means direct access to senior practitioners on every project — not a senior pitch followed by junior delivery.
        </p>
        <p style={{
          fontSize: 18, lineHeight: 1.55, color: "rgba(255,255,255,0.78)",
          maxWidth: 640, marginBottom: 48, textWrap: "pretty",
        }}>
          We take a small number of projects at a time and we're straightforward about capacity. If you're working on something in our range, we'd like to hear about it.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="mailto:team@fikadesign.studio" className="btn btn-on-orange">team@fikadesign.studio</a>
          <a href="contact.html" className="btn btn-on-orange-ghost">Use the form →</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ServicesPage });
