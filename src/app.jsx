/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect,
   Nav, Hero, Services, SkoutaSection, Credibility, Studio, ClosingCTA, Footer */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tagline": "default",
  "motion": "bold",
  "heroLayout": "kinetic",
  "skoutaVisual": "phone",
  "servicesLayout": "horizontal"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Reflect motion mode on body for global CSS (reveals are no-op when "off")
  React.useEffect(() => {
    document.body.setAttribute("data-motion", t.motion);
  }, [t.motion]);

  return (
    <>
      <Nav />
      <main>
        <Hero
          tagline={t.tagline}
          heroLayout={t.heroLayout}
          motion={t.motion}
        />
        <Services
          servicesLayout={t.servicesLayout}
          motion={t.motion}
        />
        <SkoutaSection
          skoutaVisual={t.skoutaVisual}
          motion={t.motion}
        />
        <Credibility motion={t.motion} />
        <Studio motion={t.motion} />
        <ClosingCTA motion={t.motion} />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tagline / H1" />
        <TweakSelect
          label="Headline"
          value={t.tagline}
          options={[
            { label: "Default — A design studio that ships.", value: "default" },
            { label: "A — Design built to ship.",             value: "A" },
            { label: "B — Small studio. Real products.",      value: "B" },
            { label: "C — Deliberate design. Real products.", value: "C" },
          ]}
          onChange={(v) => setTweak("tagline", v)}
        />

        <TweakSection label="Animation intensity" />
        <TweakRadio
          label="Motion"
          value={t.motion}
          options={["off", "subtle", "bold"]}
          onChange={(v) => setTweak("motion", v)}
        />

        <TweakSection label="Hero layout" />
        <TweakSelect
          label="Layout"
          value={t.heroLayout}
          options={[
            { label: "Editorial type",      value: "type" },
            { label: "Type + kinetic mark", value: "kinetic" },
            { label: "Type + Skouta peek",  value: "skouta-peek" },
            { label: "Type on motion canvas", value: "canvas" },
          ]}
          onChange={(v) => setTweak("heroLayout", v)}
        />

        <TweakSection label="Services layout" />
        <TweakSelect
          label="Layout"
          value={t.servicesLayout}
          options={[
            { label: "Scroll-snap reveal",   value: "scroll-snap" },
            { label: "Type ticker",          value: "type-ticker" },
            { label: "Vertical accordion",   value: "accordion" },
            { label: "Horizontal pin",       value: "horizontal" },
            { label: "Editorial list",       value: "editorial" },
            { label: "Grid of cards",        value: "grid" },
            { label: "Sticky side label",    value: "sticky-side" },
          ]}
          onChange={(v) => setTweak("servicesLayout", v)}
        />

        <TweakSection label="Skouta visual" />
        <TweakSelect
          label="Treatment"
          value={t.skoutaVisual}
          options={[
            { label: "iPhone mockup",   value: "phone" },
            { label: "Live alert feed", value: "feed" },
            { label: "Map of Sweden",   value: "map" },
            { label: "Pull-quote card", value: "quote" },
          ]}
          onChange={(v) => setTweak("skoutaVisual", v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
