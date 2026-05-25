/* global React, useReveal, useScrollY, clamp, SkoutaPhonePreview */
const { useState: skUseState, useEffect: skUseEffect, useRef: skUseRef } = React;

function SkoutaSection({ skoutaVisual, motion }) {
  const ref = skUseRef(null);
  return (
    <section id="work" ref={ref} className="section section-cream" style={{ paddingTop: 140, paddingBottom: 140, overflow: "hidden" }}>
      <div className="container">
        <SectionHeader motion={motion} />
        <div style={{
          marginTop: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}>
          <SkoutaText motion={motion} />
          <SkoutaVisual variant={skoutaVisual} motion={motion} />
        </div>
        <SkoutaMeta motion={motion} />
      </div>
    </section>
  );
}

function SectionHeader({ motion }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={motion === "off" ? "" : "reveal"} style={{
      display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32,
      borderBottom: "1px solid var(--bd-line)", paddingBottom: 32,
    }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Our work</div>
        <h2 className="display-lg">
          Built it ourselves <em style={{ color: "var(--fika-orange-deep)", fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1" }}>first</em>.
        </h2>
      </div>
    </div>
  );
}

function SkoutaText({ motion }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={motion === "off" ? "" : "reveal"}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <img src="assets/SkoutaLogo.svg" alt="" aria-hidden="true" style={{ width: 28, height: 28, display: "block" }} />
        <span style={{
          padding: "6px 12px", borderRadius: 999,
          background: "var(--fika-espresso)", color: "white",
          fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
        }}>Skouta</span>
        <span className="meta" style={{ color: "var(--fg-3)" }}>iOS first · Android soon · 2026</span>
      </div>
      <h3 className="display-md" style={{ marginBottom: 16 }}>
        Know your <span className="wonk-italic" style={{ color: "var(--fika-orange-deep)" }}>ground</span>.
      </h3>
      <p className="lede" style={{ marginBottom: 18 }}>
        A civic access tool for everyone living in Sweden — official public alerts, real-time, in English. Built so that not speaking Swedish never means missing what's happening around you.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--fg-2)", marginBottom: 36, maxWidth: 540 }}>
        We conceived, designed, and launched Skouta as a founder-led product. Our work covered product design, content design, UX writing, and context engineering — from first concept to the App Store.
      </p>
      <a href="work.html" className="btn btn-primary">Read the case study →</a>
    </div>
  );
}

function SkoutaMeta({ motion }) {
  const ref = useReveal();
  const stats = [
    { v: "2.1M", l: "Foreign-born residents in Sweden" },
    { v: "08", l: "Official Swedish government data sources" },
    { v: "14 d", l: "of Skouta Premium for every new user" },
    { v: "03", l: "Tabs · Home, Alerts, Profile" },
  ];
  return (
    <div ref={ref} className={motion === "off" ? "" : "reveal"} style={{
      marginTop: 88, borderTop: "1px solid var(--bd-line)", paddingTop: 32,
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32,
    }}>
      {stats.map((s, i) => (
        <div key={i}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 54, fontWeight: 400,
            lineHeight: 1, letterSpacing: "-0.02em", color: "var(--fika-espresso)",
            fontVariationSettings: "'opsz' 96, 'SOFT' 45",
            marginBottom: 10,
          }}>{s.v}</div>
          <div style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.45, maxWidth: 220 }}>
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Visual variants
   ============================================================ */
function SkoutaVisual({ variant, motion }) {
  if (variant === "feed") return <FeedVisual motion={motion} />;
  if (variant === "map") return <MapVisual motion={motion} />;
  if (variant === "quote") return <QuoteVisual motion={motion} />;
  return <PhoneVisual motion={motion} />;
}

function PhoneVisual({ motion }) {
  const y = useScrollY();
  const float = motion === "off" ? 0 : Math.sin(y / 200) * 6;
  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", position: "relative",
      minHeight: 720,
    }}>
      {/* Backdrop orange shape */}
      <div style={{
        position: "absolute", width: 360, height: 360,
        background: "color-mix(in oklab, var(--fika-orange) 18%, transparent)",
        borderRadius: "50%", filter: "blur(60px)",
        transform: `translateY(${motion === "off" ? 0 : y * -0.05}px)`,
      }} />
      <div style={{
        transform: `translateY(${float}px) rotate(-3deg)`,
        transition: "transform 80ms linear",
      }}>
        <SkoutaPhonePreview />
      </div>
      {/* Floating annotations — pills around the phone for callouts */}
      <Annotation top={20}   left={-20}  text="Three-tab IA" motion={motion} y={y} dy={20} />
      <Annotation top={320}  left={-50}  text="Daily Digest" motion={motion} y={y} dy={16} />
      <Annotation bottom={180} right={-30} text="Free safety value · ad-free feed, always" motion={motion} y={y} dy={-15} />
    </div>
  );
}

function Annotation({ top, bottom, left, right, text, motion, y, dy }) {
  return (
    <div style={{
      position: "absolute", top, bottom, left, right,
      background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
      borderRadius: 999, padding: "10px 16px",
      fontSize: 13, fontWeight: 500, color: "var(--fg-1)",
      boxShadow: "var(--sh-3)",
      transform: motion === "off" ? "none" : `translateY(${(y || 0) * 0.04 * (dy < 0 ? -1 : 1)}px)`,
      maxWidth: 200, textAlign: "center", letterSpacing: "-0.005em",
    }}>{text}</div>
  );
}

function FeedVisual({ motion }) {
  // Animated stream of alerts — real category model
  const alerts = [
    { tag: "POLICE",    color: "#C73D11", title: "Incident on Sveavägen",   src: "Polisen",       time: "12 min" },
    { tag: "WEATHER",   color: "#496A82", title: "Heavy snow · Class 1",     src: "SMHI",           time: "1 h" },
    { tag: "TRANSPORT", color: "#5E7A4A", title: "Red line · signal failure", src: "SL",            time: "2 h" },
    { tag: "ROADWORKS", color: "#D9A441", title: "E4 closure · Jönköping",   src: "Trafikverket",   time: "3 h" },
    { tag: "FERRY",     color: "#6E6E6E", title: "Vaxholm route · cancelled",src: "Västtrafik",     time: "5 h" },
  ];
  return (
    <div style={{
      background: "var(--fika-espresso)", borderRadius: 24, padding: 32,
      color: "white", height: 620, position: "relative", overflow: "hidden",
      boxShadow: "var(--sh-4)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--fika-orange)",
            boxShadow: "0 0 0 4px color-mix(in oklab, var(--fika-orange) 30%, transparent)",
            animation: motion === "off" ? "none" : "livePulse 2s ease-in-out infinite",
          }} />
          <span className="meta" style={{ color: "rgba(255,255,255,0.7)" }}>Live · Skouta feed</span>
        </div>
        <span className="meta" style={{ color: "rgba(255,255,255,0.5)" }}>Now · Sweden</span>
      </div>
      <style>{`@keyframes livePulse {0%,100%{opacity:1}50%{opacity:0.4}} @keyframes alertStreamIn {0%{transform:translateY(20px)}100%{transform:translateY(0)}}`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {alerts.map((a, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14, padding: "16px 18px",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 12,
            animation: motion === "off" ? "none" : `alertStreamIn 700ms cubic-bezier(0.16,1,0.3,1) ${i * 140 + 200}ms backwards`,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: a.color }}>
                  {a.tag}
                </span>
                <span style={{ width: 3, height: 3, borderRadius: 999, background: "rgba(255,255,255,0.3)" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Source · {a.src}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.005em" }}>
                {a.title}
              </div>
            </div>
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", alignSelf: "flex-start" }}>
              {a.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapVisual({ motion }) {
  // Stylized Sweden silhouette with category-coded pins
  const pins = [
    { x: 58, y: 78, color: "#C73D11", label: "Police · Malmö" },         // South
    { x: 60, y: 64, color: "#496A82", label: "Weather · Göteborg" },     // West
    { x: 64, y: 56, color: "#5E7A4A", label: "Transport · Stockholm" },  // East
    { x: 56, y: 44, color: "#D9A441", label: "Roadworks · Sundsvall" },  // Mid
    { x: 50, y: 28, color: "#EC4F1E", label: "Fire · Umeå" },            // Up
    { x: 44, y: 14, color: "#6E6E6E", label: "Weather · Kiruna" },       // North
  ];
  return (
    <div style={{
      background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
      borderRadius: 24, padding: 32,
      height: 620, position: "relative", overflow: "hidden", boxShadow: "var(--sh-3)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span className="meta" style={{ color: "var(--fika-orange-deep)" }}>Live map · 8 sources</span>
        <span className="meta" style={{ color: "var(--fg-3)" }}>Sweden · today</span>
      </div>
      <svg viewBox="0 0 100 110" style={{ width: "100%", height: "calc(100% - 40px)", display: "block" }} aria-hidden="true">
        {/* Stylized Sweden silhouette - simplified */}
        <path d="M 50,2 L 56,8 L 52,16 L 56,24 L 50,32 L 56,40 L 52,50 L 60,58 L 56,66 L 62,72 L 58,82 L 64,90 L 56,98 L 50,100 L 46,92 L 42,82 L 46,72 L 42,62 L 46,52 L 42,42 L 46,32 L 42,22 L 46,12 Z"
              fill="var(--fika-paper-deep)" stroke="var(--bd-line)" strokeWidth="0.3" />
        {pins.map((p, i) => (
          <g key={i} style={{
            transformOrigin: `${p.x}px ${p.y}px`,
            animation: motion === "off" ? "none" : `pinPulse 2.4s ease-in-out ${i * 0.3}s infinite`,
          }}>
            <circle cx={p.x} cy={p.y} r="2.4" fill={p.color} />
            <circle cx={p.x} cy={p.y} r="1.3" fill="white" />
          </g>
        ))}
        <style>{`@keyframes pinPulse {0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:0.7}}`}</style>
      </svg>
      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 24, left: 32, right: 32,
        display: "flex", flexWrap: "wrap", gap: 12,
      }}>
        {[
          { c: "#C73D11", t: "Police" },
          { c: "#496A82", t: "Weather" },
          { c: "#5E7A4A", t: "Transport" },
          { c: "#D9A441", t: "Roadworks" },
          { c: "#EC4F1E", t: "Fire" },
          { c: "#6E6E6E", t: "Ferry" },
        ].map((l, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--fg-2)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: l.c }} />
            {l.t}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuoteVisual({ motion }) {
  return (
    <div style={{
      background: "var(--fika-espresso)", color: "white",
      borderRadius: 24, padding: 56,
      height: 620, display: "flex", flexDirection: "column", justifyContent: "space-between",
      boxShadow: "var(--sh-4)", position: "relative", overflow: "hidden",
    }}>
      <span className="eyebrow" style={{ color: "var(--fika-orange-soft)" }}>Operating principle</span>
      <div style={{
        fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 44, lineHeight: 1.15, fontWeight: 400,
        letterSpacing: "-0.015em",
        fontVariationSettings: "'opsz' 96, 'SOFT' 80, 'WONK' 1",
      }}>
        "Trust is not a feature of Skouta. It is the product."
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: 20 }}>
        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
          Design principle, established at outset
        </div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
          Every alert carries explicit source attribution and a translation disclaimer. The feed is permanently ad-free. Monetization lives in a separate opt-in tab.
        </div>
      </div>
      <div style={{
        position: "absolute", top: -60, right: -60, width: 280, height: 280,
        background: "color-mix(in oklab, var(--fika-orange) 22%, transparent)",
        borderRadius: "50%", filter: "blur(80px)",
      }} />
    </div>
  );
}

Object.assign(window, { SkoutaSection });
