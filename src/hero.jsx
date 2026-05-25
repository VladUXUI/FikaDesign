/* global React, useScrollY, useReveal, clamp */
const { useState: heroUseState, useEffect: heroUseEffect, useRef: heroUseRef, useMemo: heroUseMemo } = React;

function Hero({ tagline, heroLayout, motion }) {
  // Headline content per tagline tweak
  const headline = heroUseMemo(() => headlineFor(tagline), [tagline]);
  const sub = "Fika Design Co. is a Sweden-based product design studio. We design and build digital products — for our own portfolio and for the clients we work with. Our services span product design, design engineering, content design, UX writing, and context engineering.";

  // Shared bits
  const ctas =
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <a href="work.html" className="btn btn-primary">See our work</a>
      <a href="contact.html" className="btn btn-secondary">Get in touch</a>
    </div>;


  if (heroLayout === "type") return <HeroType headline={headline} sub={sub} ctas={ctas} motion={motion} />;
  if (heroLayout === "kinetic") return <HeroKinetic headline={headline} sub={sub} ctas={ctas} motion={motion} />;
  if (heroLayout === "skouta-peek") return <HeroSkoutaPeek headline={headline} sub={sub} ctas={ctas} motion={motion} />;
  if (heroLayout === "canvas") return <HeroCanvas headline={headline} sub={sub} ctas={ctas} motion={motion} />;
  return <HeroType headline={headline} sub={sub} ctas={ctas} motion={motion} />;
}

// Headline data: { pre: array of words, emphasis: word with wonk italic, post: array }
function headlineFor(tagline) {
  switch (tagline) {
    case "A":return { pre: ["Design", "built", "to"], emphasis: "ship.", post: [] };
    case "B":return { pre: ["Small", "studio."], emphasis: "Real products.", post: [] };
    case "C":return { pre: ["Deliberate", "design."], emphasis: "Real products.", post: [] };
    default:return { pre: ["A", "design", "studio", "that"], emphasis: "ships.", post: [] };
  }
}

/* ============================================================
   Hero variant A — Editorial type. Massive Fraunces, no image.
   Kinetic word treatment + scroll parallax of word baseline.
   ============================================================ */
function HeroType({ headline, sub, ctas, motion }) {
  const y = useScrollY();
  const parallax = motion === "off" ? 0 : motion === "subtle" ? y * 0.05 : y * 0.18;
  const fade = motion === "off" ? 1 : clamp(1 - y / 600, 0, 1);

  return (
    <section id="top" style={{
      minHeight: "100vh", paddingTop: 132, paddingBottom: 120,
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden"
    }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <HeroMetaRow motion={motion} />

        <h1 className="display-mega" style={{
          marginTop: 48, marginBottom: 40,
          maxWidth: "1180px",
          transform: `translateY(${parallax * -0.2}px)`,
          willChange: "transform"
        }}>
          <HeadlineKinetic headline={headline} motion={motion} />
        </h1>

        <p className="lede-lg" style={{ maxWidth: 680, marginBottom: 36 }}>{sub}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          {ctas}
          <ScrollHint motion={motion} fade={fade} />
        </div>
      </div>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        opacity: fade, transition: "opacity 200ms linear",
        pointerEvents: "none"
      }}>
        <Marquee motion={motion} />
      </div>
    </section>);

}

/* ============================================================
   Hero variant B — Type with a kinetic orange mark that grows
   ============================================================ */
function HeroKinetic({ headline, sub, ctas, motion }) {
  const y = useScrollY();
  const scale = motion === "off" ? 1 : 1 + clamp(y / 800, 0, 0.6);
  const rot = motion === "off" ? 0 : clamp(y / 16, 0, 60);

  return (
    <section id="top" style={{
      minHeight: "100vh", paddingTop: 140, paddingBottom: 80,
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden"
    }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 64,
          alignItems: "center"
        }}>
          <div>
            <h1 className="display-xl" style={{ marginBottom: 36 }}>
              <HeadlineKinetic headline={headline} motion={motion} />
            </h1>
            <p className="lede" style={{ maxWidth: 540, marginBottom: 40 }}>{sub}</p>
            {ctas}
          </div>
          <KineticMark scale={scale} rot={rot} motion={motion} />
        </div>
      </div>
    </section>);

}

/* ============================================================
   Hero variant C — Type + a tall iPhone product peek (Skouta)
   ============================================================ */
function HeroSkoutaPeek({ headline, sub, ctas, motion }) {
  const y = useScrollY();
  const phoneY = motion === "off" ? 0 : -y * 0.15;
  const phoneRot = motion === "off" ? -6 : -6 + clamp(y / 60, 0, 4);

  return (
    <section id="top" style={{
      minHeight: "100vh", paddingTop: 140, paddingBottom: 80,
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden"
    }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <HeroMetaRow motion={motion} />
        <div style={{
          display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 64,
          alignItems: "center", marginTop: 56
        }}>
          <div>
            <h1 className="display-xl" style={{ marginBottom: 36 }}>
              <HeadlineKinetic headline={headline} motion={motion} />
            </h1>
            <p className="lede" style={{ maxWidth: 540, marginBottom: 40 }}>{sub}</p>
            {ctas}
          </div>
          <div style={{
            position: "relative", height: 620, display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <div style={{
              transform: `translateY(${phoneY}px) rotate(${phoneRot}deg)`,
              transformOrigin: "center",
              willChange: "transform",
              transition: "transform 60ms linear"
            }}>
              <SkoutaPhonePreview />
            </div>
            <div style={{
              position: "absolute", left: -40, top: 60,
              padding: "8px 14px", borderRadius: 999, background: "var(--fika-orange)", color: "white",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", boxShadow: "var(--sh-3)",
              transform: motion === "off" ? "none" : `translateY(${y * -0.05}px)`
            }}>
              Skouta · iOS first, Android soon
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
        <Marquee motion={motion} />
      </div>
    </section>);

}

/* ============================================================
   Hero variant D — Motion canvas: animated orange shapes behind type
   ============================================================ */
function HeroCanvas({ headline, sub, ctas, motion }) {
  const y = useScrollY();
  return (
    <section id="top" style={{
      minHeight: "100vh", paddingTop: 140, paddingBottom: 80,
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "var(--fika-paper)"
    }}>
      <MotionCanvasBackdrop y={y} motion={motion} />
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <HeroMetaRow motion={motion} />
        <h1 className="display-mega" style={{ marginTop: 56, marginBottom: 36, maxWidth: 1180 }}>
          <HeadlineKinetic headline={headline} motion={motion} />
        </h1>
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr) auto",
          gap: 64, alignItems: "end"
        }}>
          <p className="lede-lg" style={{ maxWidth: 620 }}>{sub}</p>
          {ctas}
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 2 }}>
        <Marquee motion={motion} />
      </div>
    </section>);

}

/* ============================================================
   Shared bits
   ============================================================ */

function HeroMetaRow({ motion }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={motion === "off" ? "" : "reveal-fade"}
    style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      paddingBottom: 18, borderBottom: "1px solid var(--bd-line)",
      gap: 24, flexWrap: "wrap"
    }}>
      <span className="meta">Sweden · Est. 2026</span>
      <span className="meta" style={{ color: "var(--fg-2)" }}>
        Product · Engineering · Content · Writing · Context
      </span>
    </div>);

}

/**
 * HeadlineKinetic — renders headline words with the emphasis word in orange
 * wonk-italic Fraunces. (Previously animated; animations don't reliably play
 * in hidden iframes so we render statically — the type does the work.)
 */
function HeadlineKinetic({ headline, motion }) {
  return (
    <span>
      {headline.pre.map((w, i) =>
      <span key={"pre" + i} className="kw">{w}</span>
      )}
      <span className="kw kw-em">{headline.emphasis}</span>
      {(headline.post || []).map((w, i) =>
      <span key={"post" + i} className="kw">{w}</span>
      )}
    </span>);

}

function ScrollHint({ motion, fade }) {
  if (motion === "off") return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      color: "var(--fg-3)", fontSize: 12, fontWeight: 500,
      letterSpacing: "0.14em", textTransform: "uppercase",
      opacity: fade
    }}>
      <span style={{ width: 24, height: 1, background: "currentColor", display: "inline-block" }} />
      Scroll
      <span style={{
        display: "inline-block", width: 18, height: 28, border: "1px solid var(--fg-3)",
        borderRadius: 999, position: "relative"
      }}>
        <span style={{
          position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)",
          width: 2, height: 6, background: "var(--fg-3)", borderRadius: 2,
          animation: "scrollNudge 1.6s ease-in-out infinite"
        }} />
        <style>{`@keyframes scrollNudge {0%,100%{transform:translate(-50%,0);opacity:1}50%{transform:translate(-50%,8px);opacity:0.3}}`}</style>
      </span>
    </div>);

}

function Marquee({ motion }) {
  const items = ["Product design", "Design engineering", "Content design", "UX writing", "Context engineering", "Product design", "Design engineering", "Content design", "UX writing", "Context engineering"];
  return (
    <div style={{
      borderTop: "1px solid var(--bd-line)",
      padding: "20px 0",
      overflow: "hidden",
      maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)"
    }}>
      <div style={{
        display: "flex", gap: 56, whiteSpace: "nowrap",
        animation: motion === "off" ? "none" : "marqueeScroll 38s linear infinite"
      }}>
        {[0, 1].map((set) => items.map((it, i) =>
        <span key={set + "-" + i} style={{
          fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400,
          fontVariationSettings: "'opsz' 48, 'SOFT' 50",
          color: "var(--fg-2)", display: "inline-flex", alignItems: "center", gap: 56
        }}>
            {it}
            <span style={{ width: 6, height: 6, background: "var(--fika-orange)", borderRadius: 999 }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeScroll {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>);

}

/* Kinetic mark: morphing coral squircle with Fika wordmark on top + orbiting dot */
function KineticMark({ scale, rot, motion }) {
  return (
    <div style={{ position: "relative", height: 520, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Morphing coral squircle (background) */}
      <div style={{
        position: "absolute",
        width: 360, height: 360,
        background: "var(--fika-orange)",
        borderRadius: 80,
        transform: `scale(${scale}) rotate(${rot}deg)`,
        transformOrigin: "center",
        transition: "transform 60ms linear",
        boxShadow: "0 40px 80px -20px color-mix(in oklab, var(--fika-orange) 50%, transparent)",
        animation: motion === "off" ? "none" : "kineticMorph 9s ease-in-out infinite",
        willChange: "transform, border-radius"
      }} />
      <style>{`
        @keyframes kineticMorph {
          0%,100% { border-radius: 80px 80px 80px 80px; }
          20%     { border-radius: 180px 80px 80px 80px; } /* TL */
          40%     { border-radius: 80px 180px 80px 80px; } /* TR */
          60%     { border-radius: 80px 80px 180px 80px; } /* BR */
          80%     { border-radius: 80px 80px 80px 180px; } /* BL */
        }
      `}</style>
      {/* Wordmark on top — rides the same scroll-driven transform so it stays
          locked to the morphing squircle behind it. */}
      <img
        src="assets/FikaWordmark.svg"
        alt="Fika Design Co."
        style={{
          position: "relative",
          width: 240,
          height: "auto",
          display: "block",
          pointerEvents: "none",
          zIndex: 2,
          transform: `scale(${scale}) rotate(${rot}deg)`,
          transformOrigin: "center",
          transition: "transform 60ms linear",
          willChange: "transform"
        }}
      />
      {/* Small orbiting espresso dot */}
      <div style={{
        position: "absolute", inset: 0,
        animation: motion === "off" ? "none" : "kineticOrbit 12s linear infinite",
        zIndex: 3
      }}>
        <span style={{
          position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)",
          width: 18, height: 18, borderRadius: 999, background: "var(--fika-espresso)"
        }} />
        <style>{`@keyframes kineticOrbit {0%{transform:rotate(0)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    </div>);

}

function MotionCanvasBackdrop({ y, motion }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 1,
      pointerEvents: "none"
    }}>
      <div style={{
        position: "absolute", left: "-10%", top: "10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "color-mix(in oklab, var(--fika-orange) 18%, transparent)",
        filter: "blur(80px)",
        transform: motion === "off" ? "none" : `translateY(${y * 0.25}px) scale(${1 + Math.min(y, 800) / 1600})`
      }} />
      <div style={{
        position: "absolute", right: "-5%", bottom: "5%",
        width: 480, height: 480, borderRadius: "50%",
        background: "color-mix(in oklab, var(--fika-orange) 12%, transparent)",
        filter: "blur(100px)",
        transform: motion === "off" ? "none" : `translateY(${y * -0.15}px)`
      }} />
    </div>);

}

/* Skouta phone preview — iPhone bezel with a user-fillable image-slot inside.
   Rendered at 2× native size and scaled down with CSS transform, so the
   image-slot's re-encode cap (which scales with clientWidth) keeps a
   sharper raster than a small 280px-wide slot would allow. */
function SkoutaPhonePreview() {
  const NATIVE_W = 560, NATIVE_H = 1160;
  const SCALE = 0.5;
  const DISPLAY_W = NATIVE_W * SCALE;   // 280
  const DISPLAY_H = NATIVE_H * SCALE;   // 580
  return (
    <div style={{ width: DISPLAY_W, height: DISPLAY_H }}>
      <div style={{
        width: NATIVE_W, height: NATIVE_H,
        transform: `scale(${SCALE})`,
        transformOrigin: "top left",
      }}>
        <div style={{
          width: NATIVE_W, height: NATIVE_H,
          background: "var(--fika-black)",
          borderRadius: 96,
          padding: 20,
          boxShadow: "0 50px 100px -20px rgba(0,0,0,0.4), 0 30px 60px -30px rgba(0,0,0,0.3)",
          border: "2px solid #1a1a1a",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Inner screen — image-slot fills the phone. Host background
              matches the bezel so the rounded corners blend in instead of
              flashing the slot's default light backing color. */}
          <image-slot
            id="skouta-phone-screen"
            shape="rounded"
            radius="74"
            fit="cover"
            src="uploads/Simulator Screenshot - iPhone 17 Pro - 2026-05-25 at 10.03.23.png"
            placeholder="Drop the Skouta screenshot"
            style={{
              width: "100%", height: "100%",
              display: "block",
              background: "var(--fika-black)"
            }}>
          </image-slot>
          {/* Notch overlay on top of the slot */}
          <div style={{
            position: "absolute", top: 44, left: "50%", transform: "translateX(-50%)",
            width: 200, height: 56, background: "var(--fika-black)", borderRadius: 999, zIndex: 5,
            pointerEvents: "none"
          }} />
        </div>
      </div>
    </div>);

}

Object.assign(window, { Hero, SkoutaPhonePreview });