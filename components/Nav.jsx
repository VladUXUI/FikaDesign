"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useScrollY } from "./hooks";

const { useState: navUseState, useEffect: navUseEffect } = React;

function Nav() {
  const y = useScrollY();
  const scrolled = y > 24;
  const [open, setOpen] = navUseState(false);

  // Close mobile menu if viewport grows past breakpoint
  navUseEffect(() => {
    const onResize = () => { if (window.innerWidth > 820) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while menu is open
  navUseEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ESC closes menu
  navUseEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className="site-nav" data-scrolled={scrolled ? "true" : "false"} data-open={open ? "true" : "false"}>
        <div className="container nav-row">
          <a href="/" className="nav-logo" aria-label="Fika Design Co.">
            <img src="/FikaLogo.svg" alt="" />
            <span>Fika Design Co.</span>
          </a>
          {/* Desktop links */}
          <div className="nav-desktop">
            <NavLink href="/work" label="Work" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/about" label="About" />
            <NavLink href="/contact" label="Contact" />
            <a href="/contact" className="btn btn-primary nav-cta">
              Start a project
            </a>
          </div>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="hamburger-icon">
              <span /><span /><span />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={"nav-menu" + (open ? " is-open" : "")}
        aria-hidden={!open}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      >
        <div className="nav-menu-inner">
          <MobileMenuItem href="/work" onClick={() => setOpen(false)}>Work</MobileMenuItem>
          <MobileMenuItem href="/services" onClick={() => setOpen(false)}>Services</MobileMenuItem>
          <MobileMenuItem href="/about" onClick={() => setOpen(false)}>About</MobileMenuItem>
          <MobileMenuItem href="/contact" onClick={() => setOpen(false)}>Contact</MobileMenuItem>
          <a href="/contact" className="btn btn-primary nav-menu-cta" onClick={() => setOpen(false)}>
            Start a project
          </a>
          <div className="nav-menu-foot">
            <a href="mailto:team@fikadesign.studio">team@fikadesign.studio</a>
            <span>Sweden · Est. 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}

function isActivePage(href, pathname) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({ href, label }) {
  const pathname = usePathname();
  const [hover, setHover] = navUseState(false);
  const active = isActivePage(href, pathname);
  const lit = hover || active;
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="nav-link"
      aria-current={active ? "page" : undefined}
      style={{ color: active ? "var(--fg-0, var(--fg-1))" : undefined }}
    >
      {label}
      <span className="nav-link-underline" style={{
        transform: `scaleX(${lit ? 1 : 0})`,
        transformOrigin: lit ? "left" : "right",
      }} />
    </a>
  );
}

function MobileMenuItem({ href, onClick, children }) {
  const pathname = usePathname();
  const active = isActivePage(href, pathname);
  return (
    <a href={href} onClick={onClick}
      className={"nav-menu-link" + (active ? " is-active" : "")}
      aria-current={active ? "page" : undefined}
    >
      {children}
      <span className="nav-menu-arrow" aria-hidden="true">→</span>
    </a>
  );
}

export { Nav };
