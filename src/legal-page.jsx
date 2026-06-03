/* global React, Nav, Footer, PageHero, Placeholder */

function LegalPage({ kind }) {
  return (
    <>
      <Nav />
      <main>
        {kind === "privacy" ? <PrivacyDoc /> : kind === "terms" ? <TermsDoc /> : <LegalDoc />}
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
      lastUpdated="3 June 2026"
    >
      <p>
        Fika Design Co. AB ("Fika," "we," "us") operates the website <strong>fikadesign.studio</strong>. This policy describes what personal data we collect through this website, how we use it, and your rights under the General Data Protection Regulation (GDPR).
      </p>

      <h2>Who we are</h2>
      <p><strong>Data controller:</strong> Fika Design Co. AB</p>
      <ul>
        <li>Organization number: 559558-4516</li>
        <li>Aspedalsvägen 23, 417 27 Göteborg, Sweden</li>
        <li>Contact: <a href="mailto:team@fikadesign.studio" style={{ color: "var(--fika-orange-deep)" }}>team@fikadesign.studio</a></li>
      </ul>

      <h2>What data we collect</h2>
      <p><strong>Contact form submissions.</strong> When you submit the contact form we collect your name, email address, and the content of your message. Company name is optional. We collect this information only when you voluntarily provide it.</p>
      <p><strong>Website analytics.</strong> We use Vercel Analytics to understand how this website is used. Vercel Analytics is cookieless — it does not place tracking cookies on your device, does not identify or track individual visitors across sessions or sites, and collects only aggregate, anonymised data (such as page views and referrer). Data is processed by Vercel Inc. (USA) under Standard Contractual Clauses (SCCs) as a lawful transfer mechanism under GDPR.</p>
      <p>We do not use advertising networks, behavioural tracking, or third-party profiling tools of any kind.</p>

      <h2>How we use your data</h2>
      <p>Contact form submissions are used solely to respond to your enquiry. Your details are not shared with third parties, added to marketing lists, or retained beyond the time reasonably needed to handle your request.</p>
      <p>Analytics data is used in aggregate to improve the website. It cannot be used to identify you.</p>

      <h2>Legal basis for processing</h2>
      <p>We process contact form data on the basis of <strong>legitimate interests</strong> — specifically, responding to a request you have initiated. Analytics data is processed on the same basis, given that it is aggregate and non-identifying. You may object to either at any time.</p>

      <h2>Your rights</h2>
      <p>Under GDPR you have the right to access, correct, or delete the personal data we hold about you, to restrict or object to its processing, and to data portability. To exercise any of these rights, contact us at <a href="mailto:team@fikadesign.studio" style={{ color: "var(--fika-orange-deep)" }}>team@fikadesign.studio</a>. You also have the right to lodge a complaint with <strong>Integritetsskyddsmyndigheten (IMY)</strong>, Sweden's data protection authority, at <a href="https://www.imy.se" style={{ color: "var(--fika-orange-deep)" }} target="_blank" rel="noopener noreferrer">imy.se</a>.</p>

      <h2>Data retention</h2>
      <p>Contact form messages are kept only as long as necessary to handle your enquiry and are then deleted. We do not operate a long-term CRM or marketing database.</p>

      <h2>Third-party services</h2>
      <p>This site is hosted on <strong>Vercel</strong>. Google Fonts are loaded at page render for typography; no personal data is sent in this request beyond standard HTTP headers (IP address, browser). Both services have their own privacy policies.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the website after an update constitutes acceptance of the revised policy.</p>
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
        <li>Organization number: 559558-4516</li>
        <li>Aspedalsvägen 23, 417 27 Göteborg, Sweden</li>
        <li>VAT number: SE559558451601</li>
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

/* ============================================================
   Terms of Service
   ============================================================ */
function TermsDoc() {
  return (
    <DocLayout
      eyebrow="Terms of Service"
      title="Terms of Service."
      meta="Website use · Swedish law"
      lastUpdated="3 June 2026"
    >
      <p>
        These terms govern your use of the website <strong>fikadesign.studio</strong>, operated by Fika Design Co. AB ("Fika," "we," "us"). By accessing or using this website you agree to these terms. If you do not agree, please do not use the website.
      </p>
      <p>
        These terms apply to the website only. They do not govern client engagements or the use of Skouta — those are covered by separate agreements.
      </p>

      <h2>About this website</h2>
      <p>fikadesign.studio is a marketing and informational website for Fika Design Co. AB, a product design studio based in Sweden. It presents our services, work, and contact details. No products are sold, and no user accounts are created, through this website.</p>

      <h2>Acceptable use</h2>
      <p>You may use this website for lawful purposes only. You must not use it in any way that is unlawful, fraudulent, or harmful, or in connection with any unlawful or fraudulent purpose. Specifically, you must not attempt to gain unauthorised access to any part of the website or its underlying infrastructure, submit false or misleading information through the contact form, use automated tools to scrape or harvest content without our prior written consent, or interfere with the availability or performance of the website.</p>

      <h2>Intellectual property</h2>
      <p>All content on fikadesign.studio — including text, design, graphics, code, and the Fika Design Co. brand — is the property of Fika Design Co. AB or its licensors and is protected by Swedish and international intellectual property law. Skouta and its associated brand assets are products of Fika Design Co. AB.</p>
      <p>You may not reproduce, distribute, or create derivative works from any content on this website without our express written permission.</p>

      <h2>Third-party links</h2>
      <p>This website may contain links to third-party websites (for example, the App Store or social media profiles). These links are provided for convenience only. We have no control over the content of linked sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>

      <h2>Disclaimers</h2>
      <p>This website is provided "as is" without warranties of any kind, express or implied. We make no warranty that the website will be uninterrupted, error-free, or free of viruses or other harmful components. Information on the website is provided for general informational purposes and may not be complete or current.</p>

      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by Swedish law, Fika Design Co. AB shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, this website. Our total liability for any claim arising from your use of the website shall not exceed SEK 500.</p>

      <h2>Governing law and jurisdiction</h2>
      <p>These terms are governed by and construed in accordance with the laws of Sweden. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the Swedish courts.</p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms from time to time. The date at the top of this page reflects the most recent revision. Continued use of the website after an update constitutes acceptance of the revised terms.</p>

      <h2>Contact</h2>
      <p>Questions about these terms? Write to us at <a href="mailto:team@fikadesign.studio" style={{ color: "var(--fika-orange-deep)" }}>team@fikadesign.studio</a>.</p>
    </DocLayout>
  );
}

Object.assign(window, { LegalPage });
