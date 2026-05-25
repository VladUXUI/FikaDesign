/* global React, useReveal, useScrollY, useElementProgress, clamp */
const { useRef: studioUseRef } = React;

function Studio({ motion }) {
  const ref = studioUseRef(null);
  const p = useElementProgress(ref);
  const y = useScrollY();

  return (
    <section id="studio" ref={ref} className="section section-ink"
             style={{ paddingTop: 160, paddingBottom: 160, position: "relative", overflow: "hidden" }}>
      {/* Background grain + an off-screen orange wash that reveals on scroll */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: "var(--fika-orange)",
        transform: `scaleX(${motion === "off" ? 1 : p})`,
        transformOrigin: "left",
        transition: "transform 200ms linear",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center",
        }}>
          {/* Left — text */}
          <StudioCopy motion={motion} />
          {/* Right — documentary photo cluster with parallax */}
          <PhotoCluster motion={motion} y={y} />
        </div>
      </div>
    </section>
  );
}

function StudioCopy({ motion }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={motion === "off" ? "" : "reveal"}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Who we are</div>
      <h2 className="display-lg" style={{ marginBottom: 32, color: "var(--fika-paper)" }}>
        A two-person studio. <em style={{ color: "var(--fika-orange-soft)", fontStyle: "italic", fontVariationSettings: "'opsz' 96, 'SOFT' 80, 'WONK' 1" }}>Direct access</em> from the first email.
      </h2>
      <p style={{
        fontSize: 21, lineHeight: 1.45, color: "rgba(250,250,250,0.78)",
        marginBottom: 20, textWrap: "pretty", maxWidth: 540,
      }}>
        Fika Design Co. is a Sweden-based studio founded by two designers who have shipped products for major organizations — and for themselves.
      </p>
      <p style={{
        fontSize: 17, lineHeight: 1.6, color: "rgba(250,250,250,0.65)",
        marginBottom: 36, maxWidth: 540,
      }}>
        We work with startups and growing companies that need senior product design without a large agency. Small team. Direct access. Work that reaches users.
      </p>
      <a href="about.html" className="btn btn-on-ink">About us →</a>
    </div>
  );
}

function PhotoCluster({ motion, y }) {
  const off = motion === "off" ? 0 : 1;
  return (
    <div style={{ position: "relative", height: 620 }}>
      {/* Big primary */}
      <div className="photo studio" style={{
        position: "absolute", top: 0, left: 40, right: 0, height: 420, borderRadius: 16,
        transform: `translateY(${y * -0.04 * off}px)`,
      }}>
        <div className="grain" />
        <div className="photo-label">Photo · two screens, morning light</div>
      </div>
      {/* Lower-left secondary */}
      <div className="photo coffee" style={{
        position: "absolute", bottom: 40, left: 0, width: 280, height: 260, borderRadius: 16,
        transform: `translateY(${y * -0.09 * off}px)`,
        boxShadow: "var(--sh-4)",
      }}>
        <div className="grain" />
        <div className="photo-label">Photo · coffee, paper, hands</div>
      </div>
      {/* Lower-right small */}
      <div className="photo hands" style={{
        position: "absolute", bottom: 0, right: 24, width: 220, height: 200, borderRadius: 16,
        transform: `translateY(${y * -0.06 * off}px) rotate(${motion === "off" ? 0 : 3}deg)`,
        boxShadow: "var(--sh-3)",
      }}>
        <div className="grain" />
        <div className="photo-label">Photo · keyboard, late afternoon</div>
      </div>
    </div>
  );
}

window.Studio = Studio;
