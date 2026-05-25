/* global React, useReveal */
const { useRef: credUseRef } = React;

/* Career credibility — wordmark-style logos rendered as type, since no logos provided */
function Credibility({ motion }) {
  const ref = useReveal();
  // Wordmark placeholders set in different display styles for variety
  const logos = [
    { name: "Spotify",   style: { fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "-0.02em", fontSize: 28 } },
    { name: "Klarna",    style: { fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", fontSize: 28, fontVariationSettings: "'opsz' 60, 'SOFT' 60" } },
    { name: "IKEA",      style: { fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.04em", fontSize: 26 } },
    { name: "Bonnier",   style: { fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 26, fontVariationSettings: "'opsz' 60, 'SOFT' 40" } },
    { name: "H&M",       style: { fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 28 } },
    { name: "Telia",     style: { fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 26, letterSpacing: "-0.01em" } },
  ];
  return (
    <section ref={ref} className={"section " + (motion === "off" ? "" : "reveal")}
             style={{ paddingTop: 100, paddingBottom: 100, background: "var(--fika-paper)" }}>
      <div className="container">
        <div style={{
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
        <div style={{ marginTop: 28, fontSize: 12, color: "var(--fg-3)", textAlign: "right", letterSpacing: "0.04em" }}>
          Placeholder — final logos from founders' previous careers
        </div>
      </div>
    </section>
  );
}

window.Credibility = Credibility;
