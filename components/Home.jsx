"use client";

import React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { SkoutaSection } from "./Skouta";
import { Credibility } from "./Credibility";
import { Studio } from "./Studio";
import { ClosingCTA } from "./Closing";

// Baked design defaults (formerly the live "tweaks" panel).
const MOTION = "bold";

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero tagline="default" heroLayout="kinetic" motion={MOTION} />
        <Services servicesLayout="horizontal" motion={MOTION} />
        <SkoutaSection skoutaVisual="phone" motion={MOTION} />
        <Credibility motion={MOTION} />
        <Studio motion={MOTION} />
        <ClosingCTA motion={MOTION} />
      </main>
      <Footer />
    </>
  );
}

export { Home };
