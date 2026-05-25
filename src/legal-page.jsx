/* global React, Nav, Footer, PageHero, Placeholder */

function LegalPage({ kind }) {
  return (
    <>
      <Nav />
      <main>
        {kind === "privacy" ? <PrivacyDoc /> : <LegalDoc />}
      </main>
      <Footer />
    </>
  );
}

function DocLayout({ eyebrow, title, lastUpdated, meta, children }) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={null}
        meta={meta}
        accent={null}
      />
      <section className="section-cream" style={{ paddingTop: 0, paddingBottom: 160 }}>
        <div className="container">
          <div style={{
            display: "grid", gridTemplateColumns: "240px 1fr", gap: 96,
            alignItems: "flex-start",
          }}>
            <aside style={{ position: "sticky", top: 120 }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>
              {lastUpdated && (
                <div style={{ fontSize: 13, color: "var(--fg-2)", marginBottom: 24 }}>
                  Last updated · {lastUpdated}
                </div>
              )}
              <a href="contact.html" className="btn btn-secondary" style={{ height: 44, padding: "0 18px", fontSize: 14 }}>
                Contact us →
              </a>
            </aside>
            <article className="prose">
              {children}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Privacy Policy
   ============================================================ */
function PrivacyDoc() {
  return (
    <DocLayout
      eyebrow="Privacy Policy"
      title="Privacy Policy."
      meta="GDPR · Swedish AB"
      lastUpdated={<Placeholder label="DATE" />}
    >
      <p>
        Fika Design Co. AB ("Fika," "we," "us") operates the website <strong>fikadesign.studio</strong>. This policy describes what personal data we collect through this website, how we use it, and your rights under the General Data Protection Regulation (GDPR).
      </p>

      <h2>Who we are</h2>
      <p><strong>Data controller:</strong> Fika Design Co. AB</p>
      <ul>
        <li><Placeholder label="Organization number" /></li>
        <li><Placeholder label="Registered address" /></li>
        <li>Contact: <a href="mailto:team@fikadesign.studio" style={{ color: "var(--fika-orange-deep)" }}>team@fikadesign.studio</a></li>
      </ul>

      <h2>What data we collect</h2>
      <p><strong>Contact form submissions:</strong> name, email address, and the content of your message. We collect this only when you voluntarily submit the contact form.</p>
      <p><strong>Website analytics:</strong> we use privacy-respecting analytics that do not track individual users, do not use cookies for tracking purposes, and do not transfer data outside the EU.</p>
      <Placeholder block label="Confirm analytics tool — e.g. Plausible Analytics or Fathom. If no analytics are used, replace this sentence with: 'We do not use website analytics tools.'" />
      <p>We do not collect data through cookies for advertising, tracking, or profiling purposes.</p>

      <h2>How we use your data</h2>
      <p>Contact form data is used solely to respond to your inquiry. It is not shared with third parties, used for marketing, or stored beyond the period necessary to handle your request.</p>

      <h2>Your rights</h2>
      <p>Under GDPR, you have the right to access the personal data we hold about you, request its correction or deletion, and object to its processing. To exercise any of these rights, contact us at <a href="mailto:team@fikadesign.studio" style={{ color: "var(--fika-orange-deep)" }}>team@fikadesign.studio</a>.</p>

      <h2>Data storage</h2>
      <p>Data submitted through the contact form is stored within the EU. We do not transfer personal data to countries outside the European Economic Area.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy periodically. The date at the top of this page reflects the most recent revision.</p>
    </DocLayout>
  );
}

/* ============================================================
   Legal Notice
   ============================================================ */
function LegalDoc() {
  return (
    <DocLayout
      eyebrow="Legal Notice"
      title="Legal Notice."
      meta="Required for Apple review + EU clients"
    >
      <p className="muted">
        This page is the primary reference for Apple's reviewer and for EU-based clients verifying the organization. All fields must be complete before the site goes live.
      </p>

      <h2>Entity</h2>
      <p><strong>Fika Design Co. AB</strong></p>
      <ul>
        <li><Placeholder label="Organization number (Organisationsnummer) — from Bolagsverket" /></li>
        <li><Placeholder label="Registered address — full street address, city, postcode, Sweden" /></li>
        <li><Placeholder label="VAT number (SE + organization number + 01, if registered)" /></li>
      </ul>

      <h2>Contact</h2>
      <ul>
        <li>Email: <a href="mailto:team@fikadesign.studio" style={{ color: "var(--fika-orange-deep)" }}>team@fikadesign.studio</a></li>
        <li>Website: fikadesign.studio</li>
      </ul>

      <h2>Entity status</h2>
      <p>Fika Design Co. AB is a registered Swedish limited company (Aktiebolag), incorporated under Swedish law and registered with Bolagsverket (the Swedish Companies Registration Office).</p>

      <h2>Responsibility for content</h2>
      <p>The content of this website is provided for general information purposes. Fika Design Co. AB takes reasonable care to ensure accuracy but makes no warranties regarding completeness or fitness for any particular purpose.</p>

      <h2>Intellectual property</h2>
      <p>All content on fikadesign.studio — including text, design, and graphics — is the property of Fika Design Co. AB unless otherwise stated. Skouta is a product of Fika Design Co. AB.</p>
    </DocLayout>
  );
}

Object.assign(window, { LegalPage });
