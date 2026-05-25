/* global React, useReveal */
const { useRef: credUseRef } = React;

/* Career credibility — wordmark-style logos rendered as type, since no logos provided */
function Credibility({ motion }) {
  const ref = useReveal();
  // Wordmark placeholders set in different display styles for variety
  const logos = [
    { name: "Volvo",      style: { fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.06em", fontSize: 24, textTransform: "uppercase" } },
    { name: "ING Bank",   style: { fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "-0.01em", fontSize: 26 } },
    { name: "MetaMask",   style: { fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 26 } },
    { name: "Kraken",     style: { fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "-0.01em", fontSize: 26 } },
    { name: "Consensys",  style: { fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "-0.02em", fontSize: 26 } },
  ];
  return (
    <section ref={ref} className={"section " + (motion === "off" ? "" : "reveal")}
             style={{ paddingTop: 100, paddingBottom: 100, background: "var(--fika-paper)" }}>
      <div className="container">
        <div className="credibility-grid" style={{
          display: "grid", gridTemplateColumns: "auto 1fr", gap: 80, alignItems: "center",
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Experience from</div>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400,
              color: "var(--fg-2)", lineHeight: 1.3, letterSpacing: "-0.01em",
              fontVariationSettings: "'opsz' 48, 'SOFT' 50",
              maxWidth: 280,
            }}>
              Skouta was built by two designers with senior careers in product.
            </div>
          </div>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "40px 56px",
            alignItems: "center", justifyContent: "flex-end",
            color: "var(--fg-1)",
            opacity: 0.85,
          }}>
            {logos.map((l, i) => (
              <span key={i} style={{ ...l.style, color: "var(--fg-1)" }}>
                {l.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Credibility = Credibility;
