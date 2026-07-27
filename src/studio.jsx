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
        <div className="studio-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center",
        }}>
          <div className="studio-copy"><StudioCopy motion={motion} /></div>
          <div className="studio-photos"><PhotoCluster /></div>
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

function PhotoCluster() {
  const cardBase = {
    position: "absolute",
    width: "62%",
    aspectRatio: "1 / 1",
    borderRadius: 24,
    overflow: "hidden",
    border: "1px solid rgba(250,250,250,0.14)",
    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55)",
    background: "var(--fika-espresso)",
  };
  const imgStyle = {
    width: "100%", height: "100%", objectFit: "cover", display: "block",
  };
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
      {/* Adina — back, upper left, tilted left */}
      <div style={{
        ...cardBase,
        top: "2%", left: "0%",
        transform: "rotate(-6deg)",
        zIndex: 1,
      }}>
        <img src="uploads/Adina_avatar.png" alt="Adina Cretu — Fika Design Co." style={imgStyle} />
      </div>
      {/* Vlad — front, lower right, tilted right */}
      <div style={{
        ...cardBase,
        bottom: "2%", right: "0%",
        transform: "rotate(5deg)",
        zIndex: 2,
      }}>
        <img src="uploads/Vlad_Avatar.png" alt="Vlad Todirut — Fika Design Co." style={imgStyle} />
      </div>
    </div>
  );
}

window.Studio = Studio;
