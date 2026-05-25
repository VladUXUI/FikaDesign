/* global React */

function Footer() {
  return (
    <footer style={{
      background: "var(--fika-espresso)", color: "var(--fika-paper)",
      padding: "72px 0 28px",
    }}>
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48,
          paddingBottom: 56,
        }}>
          <div>
            <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <img src="assets/FikaLogo.svg" alt="" style={{ height: 40, width: "auto" }} />
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500,
                letterSpacing: "-0.018em", color: "white",
                fontVariationSettings: "'opsz' 60, 'SOFT' 50",
              }}>Fika Design Co.</span>
            </a>
            <p style={{
              fontSize: 15, lineHeight: 1.55, color: "rgba(250,250,250,0.65)",
              maxWidth: 360, margin: 0,
            }}>
              A Sweden-based product design studio. We design and build digital products — for our own portfolio and for the clients we work with.
            </p>
          </div>
          <FooterCol title="Studio" links={[
            { l: "Work", h: "work.html" },
            { l: "Services", h: "services.html" },
            { l: "About", h: "about.html" },
            { l: "Contact", h: "contact.html" },
          ]} />
          <FooterCol title="Services" links={[
            { l: "Product design", h: "services.html#product-design" },
            { l: "Design engineering", h: "services.html#design-engineering" },
            { l: "Content design", h: "services.html#content-design" },
            { l: "UX writing", h: "services.html#ux-writing" },
            { l: "Context engineering", h: "services.html#context-engineering" },
          ]} />
          <FooterCol title="Contact" links={[
            { l: "team@fikadesign.studio", h: "mailto:team@fikadesign.studio" },
            { l: "Sweden", h: null },
            { l: "Response within 2 business days", h: null },
          ]} />
        </div>
        <div style={{
          paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.18)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 24, flexWrap: "wrap",
          fontSize: 13, color: "rgba(250,250,250,0.55)",
        }}>
          <div>© 2026 Fika Design Co. AB · Sweden · team@fikadesign.studio</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="privacy.html" className="footer-legal-link">Privacy Policy</a>
            <a href="legal.html" className="footer-legal-link">Legal Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)", marginBottom: 18, fontWeight: 500,
      }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((x, i) => (
          <li key={i}>
            {x.h ? (
              <a href={x.h} className="footer-link" style={{ fontSize: 14.5, lineHeight: 1.4 }}>
                {x.l}
              </a>
            ) : (
              <span style={{ fontSize: 14.5, color: "rgba(250,250,250,0.55)", lineHeight: 1.4 }}>{x.l}</span>
            )}
          </li>
        ))}
      </ul>
      <style>{`
        .footer-link{color:rgba(250,250,250,0.82);transition:color 180ms var(--ease-out)}
        .footer-link:hover{color:var(--fika-orange)}
        .footer-legal-link{color:rgba(250,250,250,0.55);transition:color 180ms var(--ease-out)}
        .footer-legal-link:hover{color:var(--fika-orange)}
      `}</style>
    </div>
  );
}

window.Footer = Footer;
