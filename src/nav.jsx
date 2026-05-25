/* global React, useScrollY */
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
          <a href="#top" className="nav-logo" aria-label="Fika Design Co.">
            <img src="assets/FikaLogo.svg" alt="" />
            <span>Fika Design Co.</span>
          </a>
          {/* Desktop links */}
          <div className="nav-desktop">
            <NavLink href="work.html" label="Work" />
            <NavLink href="services.html" label="Services" />
            <NavLink href="about.html" label="About" />
            <NavLink href="contact.html" label="Contact" />
            <a href="contact.html" className="btn btn-primary nav-cta">
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
          <MobileMenuItem href="work.html" onClick={() => setOpen(false)}>Work</MobileMenuItem>
          <MobileMenuItem href="services.html" onClick={() => setOpen(false)}>Services</MobileMenuItem>
          <MobileMenuItem href="about.html" onClick={() => setOpen(false)}>About</MobileMenuItem>
          <MobileMenuItem href="contact.html" onClick={() => setOpen(false)}>Contact</MobileMenuItem>
          <a href="contact.html" className="btn btn-primary nav-menu-cta" onClick={() => setOpen(false)}>
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

function isActivePage(href) {
  const path = window.location.pathname;
  if (href === "index.html") return path === "/" || path.endsWith("/") || path.endsWith("index.html");
  return path.endsWith(href);
}

function NavLink({ href, label }) {
  const [hover, setHover] = navUseState(false);
  const active = isActivePage(href);
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
  const active = isActivePage(href);
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

window.Nav = Nav;
