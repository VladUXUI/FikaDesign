/* global React, Nav, Footer, PageHero, Placeholder */

const { useState: ctUseState } = React;

function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function ContactHero() {
  return (
    <PageHero
      eyebrow="Contact"
      title="Get in touch."
      lede="We take on a limited number of projects at a time. If you're working on something in our range, we'd like to hear about it."
      meta="Response · within 2 business days"
      accent="touch."
    />
  );
}

function ContactSection() {
  return (
    <section className="section-cream" style={{ paddingTop: 80, paddingBottom: 120 }}>
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96,
          alignItems: "flex-start",
        }}>
          {/* Left — intro + working notes */}
          <div style={{ position: "sticky", top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Before you write</div>
            <h2 className="display-md" style={{ marginBottom: 28 }}>
              Tell us what you're <span className="wonk-italic" style={{ color: "var(--fika-orange-deep)" }}>building</span>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--fg-1)", marginBottom: 18, textWrap: "pretty" }}>
              Tell us what you're building, where you are in the process, and what kind of help you're looking for. We'll respond within two business days.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg-2)", marginBottom: 32, textWrap: "pretty" }}>
              Don't worry about budget on first contact. We'll discuss scope and capacity once we understand the work.
            </p>
            <div style={{
              padding: "20px 24px", borderLeft: "2px solid var(--fika-orange)",
              background: "var(--bg-raised)", borderRadius: "0 12px 12px 0",
            }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Prefer email?</div>
              <a href="mailto:team@fikadesign.studio" style={{
                fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500,
                color: "var(--fika-espresso)", letterSpacing: "-0.012em",
                fontVariationSettings: "'opsz' 60, 'SOFT' 50",
              }}>
                team@fikadesign.studio
              </a>
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  // Static UI only — submission is a no-op
  const [submitted, setSubmitted] = ctUseState(false);
  const handle = (e) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div style={{
        background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
        borderRadius: 24, padding: 48,
      }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>Thanks</div>
        <h3 className="display-md" style={{ marginBottom: 16 }}>We'll be in touch.</h3>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--fg-2)" }}>
          We'll respond within two business days. If urgent, write directly to <a href="mailto:team@fikadesign.studio" style={{ color: "var(--fika-orange-deep)" }}>team@fikadesign.studio</a>.
        </p>
        <button type="button" onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ marginTop: 28 }}>
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handle} style={{
      background: "var(--bg-raised)", border: "1px solid var(--bd-line)",
      borderRadius: 24, padding: 40,
      display: "flex", flexDirection: "column", gap: 32,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <Field id="name" label="Name" placeholder="Your full name" required />
        <Field id="company" label="Company (optional)" placeholder="Where you work" />
      </div>
      <Field id="email" label="Email" type="email" placeholder="you@somewhere.com" required />
      <Field id="message" label="What you're working on" textarea
             placeholder="A few sentences on the product, where you are in the process, and the kind of help you're looking for." required />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 16, borderTop: "1px solid var(--bd-line)", gap: 24,
      }}>
        <p style={{ fontSize: 12, color: "var(--fg-3)", margin: 0, lineHeight: 1.5, maxWidth: 280 }}>
          By submitting, you agree to our <a href="privacy.html" style={{ color: "var(--fika-orange-deep)" }}>Privacy Policy</a>. We only use your details to respond to your enquiry.
        </p>
        <button type="submit" className="btn btn-primary">Send →</button>
      </div>
    </form>
  );
}

function Field({ id, label, type = "text", placeholder, textarea, required }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">{label}</label>
      {textarea
        ? <textarea id={id} name={id} placeholder={placeholder} required={required} className="form-textarea" rows={5} />
        : <input id={id} name={id} type={type} placeholder={placeholder} required={required} className="form-input" />}
    </div>
  );
}

/* ============================================================
   ContactPage exports
   ============================================================ */
Object.assign(window, { ContactPage });
