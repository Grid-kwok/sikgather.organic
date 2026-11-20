import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { content } from "@/data/content";
import { useLang } from "@/lib/i18n";

const NAV = [
  { to: "/", label: "nav.home", match: "home" },
  { to: "/why-organic", label: "nav.why", match: "why" },
  { to: "/fun-facts", label: "nav.facts", match: "facts" },
  { to: "/", hash: "games", label: "nav.games", match: "games" },
] as const;

export function SiteHeader() {
  const { t } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const active = (match: (typeof NAV)[number]["match"]) =>
    match === "home"
      ? path === "/"
      : match === "why"
        ? path.startsWith("/why-organic")
        : match === "facts" && path.startsWith("/fun-facts");

  return (
    <header className="site-header" id="site-header">
      <div className="wrap bar">
        <Link className="brand" to="/" aria-label="惜聚田耕首頁">
          <img src="/img/logo.jpg" alt="惜聚田耕標誌" width={48} height={48} />
          <span className="brand-text">
            <b>{t("brand.name")}</b>
            <small>{t("brand.tag")}</small>
          </span>
        </Link>
        <nav className={open ? "nav open" : "nav"} id="nav">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              className={active(item.match) ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <button
          className="menu-btn"
          type="button"
          aria-label="Menu"
          aria-controls="nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t, tc } = useLang();
  const market = content.market;
  const handle = market.instagram.replace(/\/+$/, "").split("/").pop();
  return (
    <footer className="site-footer" id="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img src="/img/logo.jpg" alt="惜聚田耕標誌" width={64} height={64} />
              <b>惜聚田耕 · SikGather</b>
            </div>
            <p>{t("foot.about")}</p>
            <a className="foot-ig" href={market.instagram} target="_blank" rel="noopener noreferrer">
              {t("foot.ig")} <b>@{handle}</b>
            </a>
          </div>
          <div>
            <h4>{t("foot.explore")}</h4>
            <Link to="/">{t("nav.home")}</Link>
            <Link to="/why-organic">{t("nav.why")}</Link>
            <Link to="/fun-facts">{t("nav.facts")}</Link>
            <Link to="/" hash="games">
              {t("nav.games")}
            </Link>
          </div>
          <div>
            <h4>{t("foot.visit")}</h4>
            <p style={{ margin: "0 0 .4rem" }}>
              <b>{tc(market.name)}</b>
              <br />
              {tc(market.when)}
              <br />
              {tc(market.where)}
            </p>
            <a href={market.mapLink} target="_blank" rel="noopener noreferrer">
              {t("foot.map")}
            </a>
          </div>
        </div>
        <div className="foot-bottom">
          © {new Date().getFullYear()} 惜聚田耕 SikGather · {tc(market.name)} · {t("foot.made")}
        </div>
      </div>
    </footer>
  );
}

export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setOn(true);
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={[on ? "reveal in" : "reveal", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

const PETALS = ["🌸", "🍃", "🌼", "🍂", "🌿"];

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDuration: `${9 + (i % 5) * 2}s`,
            animationDelay: `${-i * 3}s`,
            fontSize: `${0.9 + (i % 4) * 0.22}rem`,
          }}
        >
          {PETALS[i % PETALS.length]}
        </span>
      ))}
    </div>
  );
}
