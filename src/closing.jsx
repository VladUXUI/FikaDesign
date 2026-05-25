/* global React, useReveal, useScrollY, useElementProgress, clamp */
const { useRef: closeUseRef } = React;

function ClosingCTA({ motion }) {
  const ref = closeUseRef(null);
  const p = useElementProgress(ref);
  const enabled = motion !== "off";
  // Type rises from bottom as section progresses
  const headlineY = enabled ? (1 - clamp(p * 1.6 - 0.2, 0, 1)) * 60 : 0;

  return (
    <section id="contact" ref={ref} className="section-orange"
             style={{
               padding: "180px 0 100px",
               position: "relative", overflow: "hidden",
             }}>
      {/* Decorative scrim */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12), transparent 60%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="eyebrow" style={{ color: "rgba(255,255,255,0.8)", marginBottom: 24 }}>
          Working on something?
        </div>

        <h2 className="closing-headline" style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 8vw, 108px)",
          lineHeight: 0.9, letterSpacing: "-0.035em",
          fontVariationSettings: "'opsz' 144, 'SOFT' 30",
          margin: 0, color: "white",
          transform: `translateY(${headlineY}px)`,
          willChange: "transform",
        }}>
          We'd like to <em style={{ fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1", color: "var(--fika-espresso)" }}>hear</em><br />
          about it.
        </h2>

        <div style={{
          marginTop: 56, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
        }}>
          <a href="mailto:team@fikadesign.studio" className="btn btn-on-orange">
            team@fikadesign.studio
          </a>
          <a href="contact.html" className="btn btn-on-orange-ghost">
            Use the form →
          </a>
        </div>
      </div>
    </section>
  );
}

window.ClosingCTA = ClosingCTA;
