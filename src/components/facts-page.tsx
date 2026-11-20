import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { content } from "@/data/content";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/chrome";

export function FactsPage() {
  const { t } = useLang();
  return (
    <main>
      <section className="page-hero">
        <div className="wrap grid">
          <Reveal>
            <span className="eyebrow">{t("ff.eyebrow")}</span>
            <h1 className="title-xl" dangerouslySetInnerHTML={{ __html: t("ff.title") }} />
            <p className="lede">{t("ff.lede")}</p>
          </Reveal>
          <ShakeBasket />
        </div>
      </section>
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="wrap">
          <FlipCards />
        </div>
      </section>
      <section className="section" id="myth">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">{t("mf.eyebrow")}</span>
            <h2 className="title-l">{t("mf.title")}</h2>
          </Reveal>
          <MythQuiz />
        </div>
      </section>
      <section className="section" id="veggie-quiz" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">{t("pq.eyebrow")}</span>
            <h2 className="title-l">{t("pq.title")}</h2>
          </Reveal>
          <Personality />
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <h2 className="title-l">{t("ff.end.t")}</h2>
              <div className="hero-ctas">
                <Link className="btn btn-primary" to="/" hash="market">
                  {t("why.end.btn1")}
                </Link>
                <Link className="btn btn-ghost" to="/" hash="games">
                  {t("hero.cta2")}
                </Link>
                <Link className="btn btn-ghost" to="/why-organic">
                  {t("ff.end.why")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function ShakeBasket() {
  const { t, tr } = useLang();
  const facts = content.facts;
  const [idx, setIdx] = useState(-1);
  const [shaking, setShaking] = useState(false);
  const fact = idx >= 0 ? facts[idx] : null;
  return (
    <div className="shake-zone">
      <button
        className={shaking ? "basket-btn shaking" : "basket-btn"}
        id="basket"
        type="button"
        aria-label="Shake the basket"
        onClick={() => {
          let next = Math.floor(Math.random() * facts.length);
          if (facts.length > 1 && next === idx) next = (next + 1) % facts.length;
          setShaking(false);
          requestAnimationFrame(() => setShaking(true));
          window.setTimeout(() => setIdx(next), 280);
        }}
        onAnimationEnd={() => setShaking(false)}
      >
        🧺
      </button>
      <div className="hand" style={{ fontSize: "1.4rem", color: "var(--terracotta)" }}>
        {t("ff.shake")}
      </div>
      <div className="random-fact" aria-live="polite" key={idx}>
        {fact ? (
          <>
            <div className="e">{fact.e}</div>
            <h3>{tr(fact.t)}</h3>
            <p style={{ margin: 0 }}>{tr(fact.p)}</p>
          </>
        ) : (
          <p style={{ margin: "1.4rem 0" }}>{t("ff.shake.start")}</p>
        )}
      </div>
    </div>
  );
}

function FlipCards() {
  const { t, tr, lang } = useLang();
  const facts = content.facts;
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());
  const total = facts.length;
  const label =
    flipped.size === total ? t("ff.allflipped") : t("ff.flipped", { n: flipped.size, t: total });
  return (
    <>
      <Reveal className="section-head center">
        <span className="eyebrow">{t("ff.cards.eyebrow")}</span>
        <h2 className="title-l">{t("ff.cards.title")}</h2>
        <span className="counter-badge">{label}</span>
        <div className="card-tools">
          <button
            type="button"
            onClick={() => setFlipped(new Set(facts.map((_, n) => n)))}
          >
            {t("ff.flipall")}
          </button>
          <button type="button" onClick={() => setFlipped(new Set())}>
            {t("ff.reset")}
          </button>
        </div>
      </Reveal>
      <div className="flip-grid">
        {facts.map((fact, i) => {
          const on = flipped.has(i);
          return (
            <button
              key={fact.t[0]}
              type="button"
              className={on ? "flip flipped" : "flip"}
              aria-pressed={on}
              onClick={() => {
                setFlipped((prev) => {
                  const next = new Set(prev);
                  if (next.has(i)) next.delete(i);
                  else next.add(i);
                  return next;
                });
              }}
            >
              <div className="flip-inner">
                <div className={`flip-face flip-front bg-${fact.c}`}>
                  <div className="e">{fact.e}</div>
                  <h3>{tr(fact.t)}</h3>
                  <div className="q">{tr(fact.q)}</div>
                  <div className="tap">↻ {t("ff.tap")}</div>
                </div>
                <div className="flip-face flip-back">
                      <div className="wow">
                        {fact.e} {lang === "en" ? "Whoa!" : "哇！"}
                      </div>
                  <p>{tr(fact.p)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function MythQuiz() {
  const { t, tr } = useLang();
  const myths = content.myths;
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);

  if (i >= myths.length) {
    const ratio = score / myths.length;
    const key = ratio >= 0.85 ? "mf.r.hi" : ratio >= 0.5 ? "mf.r.mid" : "mf.r.lo";
    return (
      <div className="quiz">
        <div className="hand" style={{ fontSize: "1.5rem", color: "var(--terracotta)" }}>
          {t("mf.done")}
        </div>
        <div className="score">
          {score} / {myths.length}
        </div>
        <p style={{ fontSize: "1.15rem", margin: "1rem 0 1.6rem" }}>{t(key)}</p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setI(0);
            setScore(0);
            setPick(null);
          }}
        >
          {t("mf.again")}
        </button>
      </div>
    );
  }

  const item = myths[i];
  const correct = pick === null ? null : pick === item.a;
  return (
    <div className={shake ? "quiz shake-x" : "quiz"} onAnimationEnd={() => setShake(false)}>
      <div className="progress">
        {myths.map((_, n) => (
          <i key={n} className={n < i ? "done" : n === i ? "cur" : undefined} />
        ))}
      </div>
      <div className="statement">“{tr(item.s)}”</div>
      <div className="choices">
        <button
          className="fact"
          type="button"
          disabled={pick !== null}
          onClick={() => {
            setPick(true);
            if (item.a) setScore((s) => s + 1);
            else setShake(true);
          }}
        >
          {t("mf.fact")}
        </button>
        <button
          className="myth"
          type="button"
          disabled={pick !== null}
          onClick={() => {
            setPick(false);
            if (!item.a) setScore((s) => s + 1);
            else setShake(true);
          }}
        >
          {t("mf.myth")}
        </button>
      </div>
      <div className="feedback" aria-live="polite">
        {pick !== null && (
          <>
            <div className={correct ? "verdict ok" : "verdict no"}>
              {t(correct ? "mf.right" : "mf.wrong")} {item.a ? t("mf.fact") : t("mf.myth")}
            </div>
            <p>{tr(item.x)}</p>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                setI((n) => n + 1);
                setPick(null);
              }}
            >
              {t("mf.next")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Personality() {
  const { t, tr } = useLang();
  const quiz = content.personality;
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const result = useMemo(() => {
    if (i < quiz.questions.length) return null;
    const counts: Record<string, number> = {};
    picks.forEach((k) => {
      counts[k] = (counts[k] || 0) + 1;
    });
    const key = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a] || picks.lastIndexOf(b) - picks.lastIndexOf(a),
    )[0];
    return key ? quiz.results[key] : null;
  }, [quiz, picks, i]);

  if (result) {
    return (
      <div className="persona-wrap">
        <article className="persona-card">
          <p className="persona-kicker">{t("pq.you")}</p>
          <div className="result-veg">{result.e}</div>
          <span className="persona-tag">{t("pq.tag")}</span>
          <h3 className="result-name">{tr(result.n)}</h3>
          <p className="persona-desc">{tr(result.d)}</p>
          {result.cook ? (
            <div className="persona-cook">
              <small>{t("pq.cook")}</small>
              <p>{tr(result.cook)}</p>
            </div>
          ) : null}
          <p className="persona-brand">惜聚田耕 · SikGather</p>
        </article>
        <div className="hero-ctas">
          <button
            className="btn btn-primary"
            type="button"
            onClick={async () => {
              const text = `${t("pq.you")} ${result.e} ${tr(result.n)}！${tr(result.d)} ${result.cook ? tr(result.cook) : ""} — 惜聚田耕 SikGather`;
              try {
                await navigator.clipboard.writeText(text);
                setNote(t("pq.copied"));
              } catch {
                setNote(text);
              }
            }}
          >
            {t("pq.share")}
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => {
              setI(0);
              setPicks([]);
              setNote("");
            }}
          >
            {t("pq.again")}
          </button>
        </div>
        {note ? <p className="fine">{note}</p> : null}
      </div>
    );
  }

  const q = quiz.questions[i];
  return (
    <div className="quiz" style={{ boxShadow: "10px 10px 0 var(--sage)" }}>
      <div className="progress">
        {quiz.questions.map((_, n) => (
          <i key={n} className={n < i ? "done" : n === i ? "cur" : undefined} />
        ))}
      </div>
      <div className="hand" style={{ fontSize: "1.3rem", color: "var(--terracotta)" }}>
        {t("pq.q", { n: i + 1, t: quiz.questions.length })}
      </div>
      <div className="statement" style={{ minHeight: "auto" }}>
        {tr(q.q)}
      </div>
      <div className="pq-options">
        {q.o.map((opt) => (
          <button
            key={opt.t[0]}
            type="button"
            onClick={() => {
              setPicks((prev) => [...prev, opt.k]);
              setI((n) => n + 1);
            }}
          >
            <span className="e">{opt.e}</span>
            {tr(opt.t)}
          </button>
        ))}
      </div>
    </div>
  );
}
