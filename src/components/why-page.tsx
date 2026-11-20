import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { content } from "@/data/content";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/chrome";

export function WhyPage() {
  const { t } = useLang();
  return (
    <main>
      <section className="page-hero">
        <div className="wrap grid">
          <Reveal>
            <span className="eyebrow">{t("why.eyebrow")}</span>
            <h1 className="title-xl" dangerouslySetInnerHTML={{ __html: t("why.title") }} />
            <p className="lede">{t("why.lede")}</p>
            <a className="btn btn-primary" href="#baskets">
              {t("why.cta")}
            </a>
          </Reveal>
          <Reveal className="framed">
            <img src="/img/why-organic.jpg" alt="農夫雙手捧住有機泥土同蔬菜" width={720} height={720} />
          </Reveal>
        </div>
      </section>
      <section className="section" id="baskets">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">{t("cmp.eyebrow")}</span>
            <h2 className="title-l">{t("cmp.title")}</h2>
          </Reveal>
          <Compare />
          <p className="fine center" style={{ textAlign: "center" }}>
            {t("cmp.disclaimer")}
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">{t("rs.eyebrow")}</span>
            <h2 className="title-l">{t("rs.title")}</h2>
          </Reveal>
          <Reasons />
        </div>
      </section>
      <section className="section">
        <Miles />
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">{t("sp.eyebrow")}</span>
            <h2 className="title-l">{t("sp.title")}</h2>
          </Reveal>
          <div className="spot">
            {[1, 2, 3, 4].map((n) => (
              <Reveal key={n}>
                <div className="e">{["🏷️", "🧑‍🌾", "📅", "🥔"][n - 1]}</div>
                <h4>{t(`sp.${n}.t`)}</h4>
                <p>{t(`sp.${n}.p`)}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="center">
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <h2 className="title-l">{t("why.end.t")}</h2>
              <div className="hero-ctas">
                <Link className="btn btn-primary" to="/" hash="market">
                  {t("why.end.btn1")}
                </Link>
                <Link className="btn btn-ghost" to="/fun-facts">
                  {t("why.end.btn2")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Compare() {
  const { t, tr } = useLang();
  const [organic, setOrganic] = useState(false);
  return (
    <>
      <div className="switch-wrap">
        <span className={organic ? "side-lbl" : "side-lbl on"}>{t("cmp.a")}</span>
        <button
          className="switch"
          type="button"
          role="switch"
          aria-checked={organic}
          aria-label="Toggle basket"
          onClick={() => setOrganic((v) => !v)}
        />
        <span className={organic ? "side-lbl on" : "side-lbl"}>{t("cmp.b")}</span>
      </div>
      <div className={organic ? "compare organic" : "compare"}>
        <div>
          {content.compare.map((row) => (
            <div className="meter" key={row.n[0]}>
              <div className="name">{tr(row.n)}</div>
              <div className="track">
                <div className="fill" style={{ transform: `scaleX(${(organic ? row.b : row.a) / 100})` }} />
              </div>
              <div className="note">{tr(organic ? row.nb : row.na)}</div>
            </div>
          ))}
        </div>
        <div className="compare-foot">{t(organic ? "cmp.foot.b" : "cmp.foot.a")}</div>
      </div>
    </>
  );
}

function Reasons() {
  const { tr } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <div className="reasons">
      {content.reasons.map((reason, i) => (
        <Reveal key={reason.t[0]} className={i === open ? "reason open" : "reason"}>
          <button
            type="button"
            aria-expanded={i === open}
            onClick={() => setOpen((cur) => (cur === i ? -1 : i))}
          >
            <span className="num">{reason.e}</span>
            <h3>{tr(reason.t)}</h3>
            <span className="plus">+</span>
          </button>
          <div className="body">
            <div>
              <p>{tr(reason.p)}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Miles() {
  const { t, tr } = useLang();
  const origins = content.origins;
  const [idx, setIdx] = useState(3);
  const current = origins[idx];
  const max = origins[origins.length - 1].km;
  const [shown, setShown] = useState(current.km);

  useEffect(() => {
    const target = origins[idx].km;
    const from = shown;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      const eased = 1 - (1 - p) ** 3;
      setShown(Math.round(from + (target - from) * eased));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // shown is the animation start; including it would restart forever
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const times = Math.round(current.km / origins[0].km);
  return (
    <div className="wrap miles">
      <Reveal>
        <span className="eyebrow">{t("fm.eyebrow")}</span>
        <h2 className="title-l">{t("fm.title")}</h2>
        <p className="lede">{t("fm.lede")}</p>
        <div className="origins" id="origins">
          {origins.map((item, n) => (
            <button key={item.n[0]} type="button" className={n === idx ? "on" : undefined} onClick={() => setIdx(n)}>
              {item.e} {tr(item.n)}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="route">
        <div className="path">
          <span className="traveller" style={{ left: `calc(${Math.min(92, 4 + (current.km / max) * 88)}% - 1rem)` }}>
            {current.e}
          </span>
        </div>
        <div className="ends">
          <span>{tr(current.n)}</span>
          <span>{t("fm.to")}</span>
        </div>
        <div className="km">
          {shown.toLocaleString()} <small style={{ fontSize: "1rem" }}>{t("fm.km")}</small>
        </div>
        <div className="cmp">{idx === 0 ? t("fm.local") : t("fm.times", { n: times })}</div>
        <div className="fine">{t("fm.fine")}</div>
      </div>
    </div>
  );
}
