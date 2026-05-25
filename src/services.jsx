/* global React, useScrollY, useReveal, clamp */
const { useState: svcUseState, useEffect: svcUseEffect, useRef: svcUseRef } = React;

const SERVICES = [
  {
    num: "01",
    title: "Product design",
    short: "End-to-end product design — from research and strategy through to high-fidelity UI and launch-ready assets.",
    long: "We design digital products from the ground up — or join an existing product where senior design thinking is needed most. Research, IA, interaction, visual design, and launch-ready handoff.",
    keywords: ["Research", "IA", "Interaction", "Visual", "Prototype", "Handoff"],
  },
  {
    num: "02",
    title: "Design engineering",
    short: "From Figma to production. We bridge the gap between design and implementation with precision.",
    long: "Design doesn't end at the Figma handoff. We work across both sides of it — building custom components, writing interaction logic, and ensuring what ships looks like what was designed.",
    keywords: ["Components", "Motion", "AI-assisted dev", "Front-end", "Fidelity"],
  },
  {
    num: "03",
    title: "Content design",
    short: "Information architecture and content strategy that serves the user at every step of the experience.",
    long: "Content is a structural decision before it's a writing decision. Taxonomies, labeling, navigation, notification logic — the design of information as a system.",
    keywords: ["Taxonomy", "IA", "Notification logic", "Bilingual", "Help"],
  },
  {
    num: "04",
    title: "UX writing",
    short: "Every word in your product is a design decision. We make them deliberately.",
    long: "UX writing at Fika is practiced by designers who understand how copy fits into UI. We write for the constraint of the screen, the context of the moment, and the voice of your brand.",
    keywords: ["Onboarding", "Errors", "Empty states", "Push", "Paywall"],
  },
  {
    num: "05",
    title: "Context engineering",
    short: "The design layer behind AI-powered products — system prompts, model behavior, and interaction patterns that work.",
    long: "As AI components become standard, the design of model behavior is as important as the design of the interface. We design system prompts, instruction sets, interaction patterns, and guardrails.",
    keywords: ["System prompts", "Guardrails", "Behavior", "Evals", "AI UX"],
  },
];

function Services({ servicesLayout, motion }) {
  if (servicesLayout === "editorial") return <ServicesEditorial motion={motion} />;
  if (servicesLayout === "grid") return <ServicesGrid motion={motion} />;
  if (servicesLayout === "sticky-side") return <ServicesStickySide motion={motion} />;
  if (servicesLayout === "type-ticker") return <ServicesTypeTicker motion={motion} />;
  if (servicesLayout === "accordion") return <ServicesAccordion motion={motion} />;
  if (servicesLayout === "horizontal") return <ServicesHorizontal motion={motion} />;
  return <ServicesScrollSnap motion={motion} />;
}

/* ============================================================
   Default: scroll-snap one-at-a-time reveal
   - Outer container is 5 * 100vh tall (one screen per service)
   - Inner sticky stage is 100vh, swaps which service is active
   ============================================================ */
function ServicesScrollSnap({ motion }) {
  const ref = svcUseRef(null);
  const [active, setActive] = svcUseState(0);
  const [progress, setProgress] = svcUseState(0); // within current service (0..1)
  const N = SERVICES.length;

  svcUseEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = rect.height - vh; // pinning duration
      const traveled = -rect.top;
      const t = clamp(traveled / totalScroll, 0, 0.9999);
      const idx = Math.floor(t * N);
      const within = (t * N) - idx;
      setActive(Math.min(idx, N - 1));
      setProgress(within);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="services" ref={ref} style={{
      height: `${N * 100}vh`,
      position: "relative",
      background: "var(--fika-paper)",
    }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Section header bar */}
        <div className="container" style={{
          paddingTop: 110, paddingBottom: 28,
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: 32,
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>What we do</div>
            <h2 className="display-lg">Five services, one senior team.</h2>
          </div>
          <a href="services.html" className="btn btn-secondary services-cta-desktop" style={{ flexShrink: 0 }}>
            Full service detail →
          </a>
        </div>

        {/* Stage */}
        <div className="container services-stage" style={{
          flex: 1, display: "grid", gridTemplateColumns: "minmax(0, 0.5fr) minmax(0, 1.1fr) minmax(0, 1fr)", gap: 56,
          alignItems: "stretch", paddingBottom: 28,
          minHeight: 0,
        }}>
          {/* Progress rail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 8 }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                opacity: i === active ? 1 : 0.4,
                transition: "opacity 400ms var(--ease-out)",
              }}>
                <span className="meta" style={{ width: 28, color: i === active ? "var(--fika-orange-deep)" : "var(--fg-3)" }}>
                  {s.num}
                </span>
                <div style={{ flex: 1, height: 1, background: "var(--bd-line)", position: "relative" }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0,
                    width: i < active ? "100%" : i === active ? `${progress * 100}%` : "0%",
                    background: "var(--fika-orange)",
                    transition: "width 220ms linear",
                  }} />
                </div>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                  color: i === active ? "var(--fg-1)" : "var(--fg-3)",
                  whiteSpace: "nowrap",
                }}>{s.title}</span>
              </div>
            ))}
            <a href="services.html" className="btn btn-secondary services-cta-mobile" style={{ marginTop: 8 }}>
              Full service detail →
            </a>
          </div>

          {/* Active service text */}
          <div key={"text-" + active} style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            animation: motion === "off" ? "none" : "svcSlideIn 700ms cubic-bezier(0.16,1,0.3,1)",
            minWidth: 0,
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(96px, 12vw, 180px)",
              lineHeight: 0.85, color: "var(--fika-orange)",
              fontVariationSettings: "'opsz' 144, 'SOFT' 30",
              letterSpacing: "-0.04em",
              marginBottom: 20,
            }}>
              {SERVICES[active].num}
            </div>
            <h3 className="display-md" style={{ marginBottom: 18 }}>
              {SERVICES[active].title}
            </h3>
            <p style={{
              fontSize: 17, lineHeight: 1.5, color: "var(--fg-2)",
              maxWidth: 480, margin: 0,
            }}>
              {SERVICES[active].long}
            </p>
          </div>

          {/* Visual */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ServiceVisual idx={active} motion={motion} progress={progress} />
          </div>
        </div>

        <style>{`
          @keyframes svcSlideIn {
            0% { transform: translateY(16px); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}

/* Per-service visual — abstract type-driven cards */
function ServiceVisual({ idx, motion, progress }) {
  const s = SERVICES[idx];
  const wobble = motion === "off" ? 0 : Math.sin(progress * Math.PI) * 6;
  return (
    <div style={{
      width: "100%", maxWidth: 420, maxHeight: "min(100%, 480px)",
      aspectRatio: "5/6",
      background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
      borderRadius: 24, padding: 28, position: "relative", overflow: "hidden",
      boxShadow: "var(--sh-3)",
      transform: `translateY(${wobble}px)`,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      gap: 16,
    }}>
      {/* Top: floating chips of keywords */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {s.keywords.map((k, i) => (
          <span key={i} style={{
            padding: "8px 14px", borderRadius: 999,
            background: i === 0 ? "var(--fika-orange)" : "var(--fika-paper-deep)",
            color: i === 0 ? "white" : "var(--fg-1)",
            fontSize: 13, fontWeight: 500, letterSpacing: "-0.005em",
            animation: motion === "off" ? "none" : `chipFloat ${3 + i * 0.5}s ease-in-out infinite ${i * 0.2}s alternate`,
          }}>
            {k}
          </span>
        ))}
        <style>{`
          @keyframes chipFloat {
            0% { transform: translateY(0); }
            100% { transform: translateY(-4px); }
          }
        `}</style>
      </div>

      {/* Bottom: service-specific glyph */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: 1, color: "var(--fika-espresso)",
        fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
        letterSpacing: "-0.025em",
        alignSelf: "flex-end",
        textAlign: "right",
        maxWidth: "100%",
        wordBreak: "break-word",
      }}>
        {s.title.split(" ")[0].toLowerCase()}.
      </div>

      {/* Decorative orange dot */}
      <div style={{
        position: "absolute", top: 24, right: 24,
        width: 10, height: 10, borderRadius: 999, background: "var(--fika-orange)",
        boxShadow: "0 0 0 5px color-mix(in oklab, var(--fika-orange) 18%, transparent)",
      }} />
    </div>
  );
}

/* ============================================================
   Variant — Editorial numbered list
   ============================================================ */
function ServicesEditorial({ motion }) {
  return (
    <section id="services" className="section section-paper" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, gap: 32 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>What we do</div>
            <h2 className="display-lg">Five services, one senior team.</h2>
          </div>
          <a href="services.html" className="btn btn-secondary">Full service detail →</a>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--bd-line)" }}>
          {SERVICES.map((s, i) => <EditorialServiceRow key={i} service={s} motion={motion} />)}
        </ul>
      </div>
    </section>
  );
}

function EditorialServiceRow({ service, motion }) {
  const [hover, setHover] = svcUseState(false);
  const ref = useReveal();
  return (
    <li ref={ref} className={motion === "off" ? "" : "reveal"}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          borderBottom: "1px solid var(--bd-line)",
          padding: "36px 0",
          display: "grid", gridTemplateColumns: "80px 1fr 1.4fr 40px",
          gap: 32, alignItems: "baseline",
          background: hover ? "color-mix(in oklab, var(--fika-orange) 4%, transparent)" : "transparent",
          transition: "background 280ms var(--ease-out)",
          cursor: "pointer",
        }}>
      <span className="meta" style={{ color: "var(--fika-orange-deep)" }}>{service.num}</span>
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 400,
        margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em",
        fontVariationSettings: "'opsz' 72, 'SOFT' 60",
        fontStyle: hover ? "italic" : "normal",
        transition: "font-style 200ms var(--ease-out)",
      }}>{service.title}</h3>
      <p className="lede" style={{ maxWidth: 520 }}>{service.short}</p>
      <span style={{
        color: "var(--fika-orange)", fontSize: 22, fontWeight: 400,
        transform: hover ? "translateX(6px)" : "translateX(0)",
        transition: "transform 280ms var(--ease-out)",
      }}>→</span>
    </li>
  );
}

/* ============================================================
   Variant — Grid of cards
   ============================================================ */
function ServicesGrid({ motion }) {
  return (
    <section id="services" className="section section-paper" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, gap: 32 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>What we do</div>
            <h2 className="display-lg">Five services, one senior team.</h2>
          </div>
          <a href="services.html" className="btn btn-secondary">Full service detail →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {SERVICES.map((s, i) => {
            const isLast = i === SERVICES.length - 1;
            return (
              <div key={i} style={{
                gridColumn: isLast ? "span 3" : "span 1",
                background: isLast ? "var(--fika-espresso)" : "var(--bg-raised)",
                color: isLast ? "var(--fika-paper)" : "inherit",
                border: isLast ? "none" : "1px solid var(--bd-line)",
                borderRadius: 24, padding: 32,
                minHeight: 320,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div>
                  <div className="meta" style={{ color: isLast ? "var(--fika-orange-soft)" : "var(--fika-orange-deep)", marginBottom: 16 }}>{s.num}</div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: isLast ? 56 : 32,
                    fontWeight: 400, margin: 0, lineHeight: 1.05, letterSpacing: "-0.018em",
                    fontVariationSettings: `'opsz' ${isLast ? 96 : 60}, 'SOFT' 55`,
                  }}>{s.title}</h3>
                </div>
                <p style={{
                  fontSize: 15, lineHeight: 1.5, color: isLast ? "rgba(250,250,250,0.78)" : "var(--fg-2)",
                  margin: 0, maxWidth: isLast ? 620 : "none",
                }}>{s.short}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Variant — Sticky side: left sticky title, right scrolling list
   ============================================================ */
function ServicesStickySide({ motion }) {
  return (
    <section id="services" className="section section-paper" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "flex-start" }}>
          <div style={{ position: "sticky", top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>What we do</div>
            <h2 className="display-lg" style={{ marginBottom: 24 }}>Five services, one senior team.</h2>
            <p className="lede" style={{ marginBottom: 28, maxWidth: 380 }}>
              Across the full product design stack — including the content and AI behavior layers most studios don't cover.
            </p>
            <a href="services.html" className="btn btn-secondary">Full service detail →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {SERVICES.map((s, i) => {
              const ref = useReveal();
              return (
                <div key={i} ref={ref} className={motion === "off" ? "" : "reveal"}>
                  <div className="meta" style={{ color: "var(--fika-orange-deep)", marginBottom: 12 }}>{s.num}</div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 400,
                    margin: "0 0 18px 0", lineHeight: 1.05, letterSpacing: "-0.018em",
                    fontVariationSettings: "'opsz' 72, 'SOFT' 55",
                  }}>{s.title}</h3>
                  <p className="lede" style={{ maxWidth: 560 }}>{s.long}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services, SERVICES });