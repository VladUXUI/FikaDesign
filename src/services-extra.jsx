/* global React, clamp, SERVICES */
/* Three additional Services variants, loaded after services.jsx so they can
   reuse SERVICES + the Services dispatcher. */
const { useState: svc2UseState, useEffect: svc2UseEffect, useRef: svc2UseRef } = React;

/* ============================================================
   Shared corner counter — used by all three new variants
   ============================================================ */
function CornerCounter({ active, total, motion, theme = "light" }) {
  return (
    <div style={{
      position: "absolute", top: 40, right: 56,
      display: "flex", alignItems: "center", gap: 10,
      fontFamily: "var(--font-body)",
      fontSize: 12, fontWeight: 500,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: theme === "dark" ? "rgba(255,255,255,0.7)" : "var(--fg-3)",
      zIndex: 10, fontVariantNumeric: "tabular-nums",
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--fika-orange)" }} />
      <span style={{ color: theme === "dark" ? "white" : "var(--fg-1)" }}>
        {String(active + 1).padStart(2, "0")}
      </span>
      <span style={{ width: 18, height: 1, background: "currentColor", display: "inline-block", opacity: 0.6 }} />
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}

/* ============================================================
   Variant C — Type ticker
   Single massive service title fills the viewport. Cross-fade
   between titles by overlapping renders, each with an opacity
   peak around its index. Body copy stays in the bottom-left.
   ============================================================ */
function ServicesTypeTicker({ motion }) {
  const ref = svc2UseRef(null);
  const [active, setActive] = svc2UseState(0);
  const [t, setT] = svc2UseState(0); // continuous index 0..N
  const N = SERVICES.length;

  svc2UseEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const traveled = -rect.top;
      const p = clamp(traveled / total, 0, 0.9999);
      const cont = p * N;
      setT(cont);
      setActive(Math.min(Math.floor(cont), N - 1));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="services" ref={ref} style={{
      height: `${N * 100}vh`, position: "relative", background: "var(--fika-paper)",
    }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        {/* Stack of titles, cross-faded by index proximity */}
        <div style={{
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 56px",
          width: "100%",
          minHeight: "60vh",
        }}>
          {SERVICES.map((s, i) => {
            const dist = Math.abs(i - t);
            const op = Math.max(0, 1 - dist * 1.4);
            const blur = Math.min(dist * 6, 14);
            const ty = (i - t) * 14; // subtle vertical drift
            return (
              <h3 key={i} style={{
                position: "absolute",
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(72px, 14vw, 220px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                fontVariationSettings: "'opsz' 144, 'SOFT' 30",
                margin: 0,
                color: "var(--fika-espresso)",
                textAlign: "center",
                opacity: op,
                filter: `blur(${motion === "off" ? 0 : blur}px)`,
                transform: `translateY(${motion === "off" ? 0 : ty}px)`,
                transition: motion === "off" ? "none" : "opacity 120ms linear, filter 120ms linear",
                pointerEvents: op > 0.5 ? "auto" : "none",
                width: "100%",
                textWrap: "balance",
                whiteSpace: "nowrap",
              }}>
                {s.title}<span style={{ color: "var(--fika-orange)" }}>.</span>
              </h3>
            );
          })}
        </div>

        {/* Body copy bottom-left, swaps with active */}
        <div style={{
          position: "absolute", bottom: 64, left: 56, right: 56,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 56, pointerEvents: "none",
        }}>
          <div key={"body-" + active} style={{
            maxWidth: 520,
            animation: motion === "off" ? "none" : "tickerBodyIn 600ms cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "auto",
          }}>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: "var(--fg-2)",
              margin: 0, textWrap: "pretty",
            }}>
              {SERVICES[active].long}
            </p>
          </div>
          <a href="services.html" className="btn btn-secondary" style={{ flexShrink: 0, pointerEvents: "auto" }}>
            Full service detail →
          </a>
        </div>
        <style>{`
          @keyframes tickerBodyIn {
            0% { transform: translateY(10px); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ============================================================
   Variant D — Vertical accordion
   5 service titles stacked. Active row expands to reveal body;
   inactive rows compress to just the title.
   ============================================================ */
function ServicesAccordion({ motion }) {
  const ref = svc2UseRef(null);
  const [active, setActive] = svc2UseState(0);
  const N = SERVICES.length;

  svc2UseEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const traveled = -rect.top;
      const p = clamp(traveled / total, 0, 0.9999);
      setActive(Math.min(Math.floor(p * N), N - 1));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="services" ref={ref} style={{
      height: `${N * 100}vh`, position: "relative", background: "var(--fika-paper)",
    }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Accordion rows fill the full height. Use flex weights so the
            active row claims most of the space while others shrink to header height. */}
        <div className="container" style={{
          flex: 1, display: "flex", flexDirection: "column",
          paddingTop: 56, paddingBottom: 56,
          minHeight: 0,
        }}>
          {SERVICES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  appearance: "none", border: 0, background: "transparent",
                  textAlign: "left", padding: "12px 0", margin: 0, color: "inherit", font: "inherit",
                  display: "flex", flexDirection: "column",
                  borderBottom: "1px solid var(--bd-line)",
                  borderTop: i === 0 ? "1px solid var(--bd-line)" : "0",
                  flex: isActive ? "1 1 0" : "0 0 auto",
                  overflow: "hidden",
                  transition: motion === "off" ? "none" : "flex 700ms cubic-bezier(0.16,1,0.3,1)",
                  cursor: "pointer",
                }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr auto",
                  alignItems: "baseline", gap: 28, paddingTop: 8,
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontWeight: 400,
                    fontSize: isActive ? "clamp(48px, 7vw, 96px)" : "clamp(28px, 3.4vw, 44px)",
                    lineHeight: 0.95, letterSpacing: "-0.025em",
                    fontVariationSettings: `'opsz' ${isActive ? 144 : 60}, 'SOFT' ${isActive ? 30 : 55}`,
                    color: isActive ? "var(--fika-espresso)" : "var(--fg-2)",
                    transition: motion === "off" ? "none" : "font-size 600ms cubic-bezier(0.16,1,0.3,1), color 600ms ease",
                    fontStyle: isActive ? "italic" : "normal",
                    textTransform: "none",
                  }}>
                    {s.title}<span style={{ color: "var(--fika-orange)" }}>.</span>
                  </span>
                  <span style={{
                    color: isActive ? "var(--fika-orange)" : "var(--fg-mute)",
                    fontSize: 24, fontFamily: "var(--font-display)",
                    transform: isActive ? "rotate(90deg)" : "rotate(0)",
                    transition: motion === "off" ? "none" : "transform 500ms var(--ease-out), color 300ms ease",
                  }}>
                    →
                  </span>
                </div>
                {/* Body — only renders when active for layout purposes */}
                <div style={{
                  flex: 1, minHeight: 0,
                  display: isActive ? "grid" : "none",
                  gridTemplateColumns: "auto 1fr",
                  gap: 80, paddingTop: 28, paddingBottom: 12,
                }}>
                  <div style={{ maxWidth: 620 }}>
                    <p style={{
                      fontSize: 19, lineHeight: 1.5, color: "var(--fg-1)",
                      margin: "0 0 24px", textWrap: "pretty",
                    }}>
                      {s.long}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {s.keywords.map((k, j) => (
                        <span key={j} style={{
                          padding: "5px 11px", borderRadius: 999,
                          background: "var(--fika-paper-deep)",
                          fontSize: 12, fontWeight: 500, color: "var(--fg-2)",
                          letterSpacing: "-0.005em",
                        }}>{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Variant B — Horizontal pin scroll (snapped)
   Section pins for N viewports. Panels slide horizontally with a
   bouncy snap on each step. The bottom strip is a kinetic nav:
   all 5 service names always visible, an orange squircle slides
   between them as the active panel changes.
   ============================================================ */
function ServicesHorizontal({ motion }) {
  const ref = svc2UseRef(null);
  const [active, setActive] = svc2UseState(0);
  const N = SERVICES.length;

  svc2UseEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const traveled = -rect.top;
      const p = clamp(traveled / total, 0, 1);
      const cont = p * (N - 1);
      // Snap to nearest panel — small dead-zone around .5 to avoid flicker.
      const next = clamp(Math.round(cont), 0, N - 1);
      setActive((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const jumpTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = el.offsetHeight;
    const vh = window.innerHeight;
    const targetY = sectionTop + (i / (N - 1)) * (sectionHeight - vh);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const bouncy = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  const smooth = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <section id="services" ref={ref} style={{
      height: `${N * 100}vh`, position: "relative", background: "var(--fika-paper)",
    }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* TRACK — snaps between panel positions */}
        <div style={{
          flex: 1, overflow: "hidden", position: "relative", minHeight: 0,
        }}>
          <div style={{
            display: "flex", height: "100%",
            transform: `translateX(-${active * 100}vw)`,
            transition: motion === "off" ? "none" : `transform 850ms ${smooth}`,
            willChange: "transform",
          }}>
            {SERVICES.map((s, i) => (
              <HorizontalPanel key={i} s={s} idx={i} active={active} motion={motion} />
            ))}
          </div>
        </div>

        {/* BOTTOM — kinetic nav with squircle pill + CTA */}
        <KineticNav active={active} onJump={jumpTo} motion={motion} bouncy={bouncy} />
      </div>
    </section>
  );
}

function KineticNav({ active, onJump, motion, bouncy }) {
  const itemRefs = svc2UseRef([]);
  const railRef = svc2UseRef(null);
  const [pill, setPill] = svc2UseState({ left: 0, width: 0, ready: false });

  svc2UseEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const el = itemRefs.current[active];
      if (!rail || !el) return;
      const railRect = rail.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setPill({ left: r.left - railRect.left, width: r.width, ready: true });
    };
    // Measure on next frame to ensure layout is settled.
    const t = setTimeout(measure, 30);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  return (
    <div className="horizontal-nav-bar" style={{
      borderTop: "1px solid var(--bd-line)",
      padding: "16px 56px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 32, background: "var(--fika-paper)",
    }}>
      {/* Service rail */}
      <div ref={railRef} style={{
        position: "relative", display: "flex", alignItems: "stretch",
        gap: 4, flex: 1, minWidth: 0,
      }}>
        {/* Squircle highlight */}
        <div aria-hidden="true" style={{
          position: "absolute",
          left: pill.left, width: pill.width,
          top: 0, bottom: 0,
          background: "var(--fika-orange)",
          borderRadius: 22,
          opacity: pill.ready ? 1 : 0,
          transition: motion === "off"
            ? "none"
            : `left 720ms ${bouncy}, width 720ms ${bouncy}, opacity 220ms linear`,
          boxShadow: "0 14px 30px -12px color-mix(in oklab, var(--fika-orange) 55%, transparent)",
          willChange: "left, width",
        }} />
        {SERVICES.map((s, i) => (
          <button
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={() => onJump(i)}
            aria-current={i === active ? "true" : undefined}
            style={{
              position: "relative", zIndex: 1,
              flex: 1, minWidth: 0,
              padding: "16px 18px",
              background: "transparent", border: 0,
              cursor: "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-body)",
              fontSize: 15, fontWeight: 500,
              color: i === active ? "white" : "var(--fg-2)",
              transition: "color 280ms ease",
              letterSpacing: "-0.005em",
              textAlign: "center",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* CTA on the right */}
      <a href="services.html" className="btn btn-secondary" style={{
        flexShrink: 0, height: 48, padding: "0 22px", fontSize: 14,
      }}>
        Full service detail →
      </a>
    </div>
  );
}

function HorizontalPanel({ s, idx, active, motion }) {
  const isActive = idx === active;
  // Subtle content offset for off-screen panels — keeps things kinetic.
  const inactiveDir = idx < active ? -1 : idx > active ? 1 : 0;
  const offset = motion === "off" ? 0 : inactiveDir * 60;
  const smooth = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div className="horizontal-panel" style={{
      width: "100vw", height: "100%", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 56px",
      position: "relative",
    }}>
      <div style={{
        maxWidth: 920, width: "100%",
        transform: `translateX(${offset}px)`,
        opacity: isActive ? 1 : 0.35,
        transition: motion === "off" ? "none" : `transform 850ms ${smooth}, opacity 600ms ${smooth}`,
      }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          Our Services
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(64px, 9vw, 144px)", fontWeight: 400,
          lineHeight: 0.95, letterSpacing: "-0.03em",
          fontVariationSettings: "'opsz' 144, 'SOFT' 30",
          margin: "0 0 36px",
          color: "var(--fika-espresso)",
          textWrap: "balance",
        }}>
          {s.title}<span style={{
            color: "var(--fika-orange)", fontStyle: "italic",
            fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
          }}>.</span>
        </h3>
        <p style={{
          fontSize: 22, lineHeight: 1.45, color: "var(--fg-2)",
          margin: "0 0 36px", maxWidth: 720, textWrap: "pretty",
        }}>
          {s.long}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 720 }}>
          {s.keywords.map((k, j) => (
            <span key={j} style={{
              padding: "6px 14px", borderRadius: 999,
              background: "white", border: "1px solid var(--bd-line)",
              fontSize: 13, fontWeight: 500, color: "var(--fg-1)",
              letterSpacing: "-0.005em",
            }}>{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ServicesTypeTicker, ServicesAccordion, ServicesHorizontal });
