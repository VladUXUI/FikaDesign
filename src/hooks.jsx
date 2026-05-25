/* global React */
const { useState, useEffect, useRef, useCallback, useLayoutEffect } = React;

/**
 * useScrollY — track scrollY without re-rendering too often.
 * Returns a ref containing latest scrollY and a state that updates on rAF.
 */
function useScrollY() {
  const [y, setY] = useState(typeof window !== "undefined" ? window.scrollY : 0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

/**
 * useElementProgress — track scroll progress relative to an element.
 * Returns progress 0..1 where 0 = element top hits viewport bottom,
 * 1 = element bottom hits viewport top.
 */
function useElementProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const prog = Math.max(0, Math.min(1, traveled / total));
      setP(prog);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

/**
 * useReveal — slide-up reveal when the element enters viewport.
 * Adds `.pre` class on mount (synchronously, before paint) so the element
 * starts shifted, then removes `.pre` when the element is in view to trigger
 * the CSS transition. Uses scroll/resize listeners (IntersectionObserver is
 * unreliable in some sandboxed iframes).
 *
 * Defaults are visible state — if transitions don't progress, the element
 * stays visible but slightly offset, which is acceptable degradation.
 */
function useReveal(opts = {}) {
  const ref = useRef(null);
  // Add .pre class synchronously after the element mounts.
  useLayoutEffect(() => {
    if (ref.current) ref.current.classList.add("pre");
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const offset = typeof opts.offset === "number" ? opts.offset : 0.12;
    let raf = 0;
    let done = false;
    const reveal = () => {
      if (done || !el.isConnected) return;
      done = true;
      el.classList.remove("pre");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const check = () => {
      if (done || !el.isConnected) return;
      const r = el.getBoundingClientRect();
      const trigger = window.innerHeight * (1 - offset);
      if (r.top < trigger && r.bottom > 0) reveal();
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    // Schedule initial check via setTimeout (fires even when rAF is throttled).
    const initialCheck = setTimeout(check, 60);
    // Failsafe: after a generous timeout, ensure .pre is removed regardless.
    const failsafe = setTimeout(reveal, 1800);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(initialCheck);
      clearTimeout(failsafe);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return ref;
}

/**
 * Lerp helper.
 */
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

Object.assign(window, { useScrollY, useElementProgress, useReveal, lerp, clamp });
