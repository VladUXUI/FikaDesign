/* global React */
/* Shared page primitives used on sub-pages (Work, Services, About, Contact,
   Privacy, Legal). Kept design-consistent with the homepage but quieter — these
   are reading pages, not marketing canvases. */

const { useState: psUseState, useEffect: psUseEffect, useRef: psUseRef } = React;

/* PageHero — eyebrow + huge editorial Fraunces title + lede + optional meta row.
   Used on every sub-page so the entry point is consistent. */
function PageHero({ eyebrow, title, lede, meta, children, accent = "ships" }) {
  // Render the title with an orange wonk-italic emphasis word, like the homepage.
  // accent = the word to emphasize (string match in title), or null for plain.
  const renderTitle = () => {
    if (!accent) return title;
    const idx = title.toLowerCase().lastIndexOf(accent.toLowerCase());
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const word = title.slice(idx, idx + accent.length);
    const after = title.slice(idx + accent.length);
    return (
      <>
        {before}
        <span className="wonk-italic" style={{ color: "var(--fika-orange-deep)" }}>{word}</span>
        {after}
      </>
    );
  };

  return (
    <section className="page-hero" style={{
      paddingTop: 184, paddingBottom: 96, position: "relative",
    }}>
      <div className="container">
        <h1 className="display-mega" style={{ maxWidth: 1180, marginBottom: 36 }}>
          {renderTitle()}
        </h1>

        {lede && (
          <p className="lede-lg" style={{ maxWidth: 720, marginBottom: children ? 36 : 0 }}>
            {lede}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}

/* Placeholder tag — for inline doc PLACEHOLDERS. */
function Placeholder({ label, block, children }) {
  if (block) {
    return (
      <div className="ph-block">
        <span className="ph-block-label">Placeholder — needs from founders</span>
        {label || children}
      </div>
    );
  }
  return <span className="ph">{label || children}</span>;
}

/* SectionHeading — eyebrow + h2 pattern reused across pages. */
function SectionHeading({ eyebrow, title, lede, align = "left", accent }) {
  const renderTitle = () => {
    if (!accent) return title;
    const idx = title.toLowerCase().lastIndexOf(accent.toLowerCase());
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <span className="wonk-italic" style={{ color: "var(--fika-orange-deep)" }}>
          {title.slice(idx, idx + accent.length)}
        </span>
        {title.slice(idx + accent.length)}
      </>
    );
  };
  return (
    <div style={{ textAlign: align, marginBottom: 56 }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>}
      <h2 className="display-lg" style={{ marginBottom: lede ? 24 : 0, maxWidth: 920, ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}) }}>
        {renderTitle()}
      </h2>
      {lede && (
        <p className="lede" style={{ maxWidth: 720, ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}) }}>
          {lede}
        </p>
      )}
    </div>
  );
}

Object.assign(window, { PageHero, Placeholder, SectionHeading });
