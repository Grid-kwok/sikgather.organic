import { Link } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { content, ribbonOf } from "@/data/content";
import { useLang } from "@/lib/i18n";
import { Petals, Reveal } from "@/components/chrome";

/** Add a mini game here. Set `featured: true` for the wide card at the top. */
const GAMES = [
  {
    href: "/play/winged",
    emoji: "🫛",
    color: "sage",
    featured: true,
    title: ["四角豆炒蛋", "四角豆炒蛋", "Winged Bean & Egg"],
    desc: [
      "我哋嘅主打 3D 遊戲。戴上耳機，洗手、切菜、打蛋，明火炒一碟有機四角豆。",
      "我们的主打 3D 游戏。戴上耳机，洗手、切菜、打蛋，明火炒一碟有机四角豆。",
      "Our featured 3D game. Headphones on — wash, chop, beat, then fry organic winged beans.",
    ],
    time: ["約 4 分鐘", "约 4 分钟", "~4 min"],
  },
  {
    href: "/play/field",
    emoji: "🧑‍🌾",
    color: "sage",
    featured: false,
    title: ["有「機」可乘", "有「机」可乘", "Organic Chance"],
    sub: ["落田開工", "落田开工", "Into the field"],
    desc: [
      "揸住小型中耕機落田。70 秒入面整地、播種、收成，白蘿蔔記得深耕。",
      "开着小型中耕机下田。70 秒内整地、播种、收获，白萝卜记得深耕。",
      "Drive a small cultivator into the field. Till, sow and harvest in 70 seconds — daikon needs a deep pass.",
    ],
    time: ["70 秒", "70 秒", "70 sec"],
  },
  {
    href: "/play/dash",
    emoji: "🚜",
    color: "butter",
    featured: false,
    title: ["農場到餐桌", "农场到餐桌", "Farm to Table Dash"],
    desc: [
      "護送一棵菜心由田行到你個碗，沿途避開陷阱！",
      "护送一棵菜心由田间走到你的碗里，沿途避开陷阱！",
      "Guide a choy sum from the field to your bowl — dodge the hazards!",
    ],
    time: ["約 3 分鐘", "约 3 分钟", "~3 min"],
  },
  {
    href: "/play/ads",
    emoji: "📣",
    color: "rose",
    featured: false,
    title: ["廣告小遊戲", "广告小游戏", "Ad Mini Games"],
    desc: [
      "四款有機小遊戲：射泡泡、種大菜、打包同三消。",
      "四款有机小游戏：射泡泡、种大菜、打包和三消。",
      "Four short organic games: bubbles, grow, pack and match.",
    ],
    time: ["4 款", "4 款", "4 games"],
  },
  {
    href: "/play/quiz",
    emoji: "🌱",
    color: "sky",
    featured: false,
    title: ["有機小測驗", "有机小测验", "Organic Brain Quiz"],
    desc: [
      "試下你有幾熟有機，追高分，解鎖隱藏知識卡！",
      "测测你的有机知识，挑战高分，解锁隐藏知识卡！",
      "Test your organic know-how, chase a high score and unlock fact cards!",
    ],
    time: ["約 2 分鐘", "约 2 分钟", "~2 min"],
  },
] as const;

function langIndex(lang: string) {
  return lang === "en" ? 2 : lang === "sc" ? 1 : 0;
}

export function HomePage() {
  const { t, lang } = useLang();
  const i = langIndex(lang);
  const ribbon = ribbonOf(lang);

  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <img src="/img/hero-farm.jpg" alt="綠色有機農田，一排排菜田伸去好遠" />
        </div>
        <div className="hero-card">
          <img className="logo-ring" src="/img/logo.jpg" alt="惜聚田耕標誌" width={104} height={104} />
          <h1>{t("brand.name")}</h1>
          <p className="sub">{t("hero.sub")}</p>
          <p>{t("hero.p")}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#market">
              {t("hero.cta1")}
            </a>
            <a className="btn btn-ghost" href="#games">
              {t("hero.cta2")}
            </a>
          </div>
        </div>
        <Petals />
        <div className="scroll-hint">{t("hero.scroll")}</div>
      </section>
      <div className="ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[0, 1, 2, 3].map((copy) => (
            <span key={copy} style={{ display: "contents" }}>
              {ribbon.map((item) => (
                <span key={`${copy}-${item}`}>{item}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <section className="section" id="about">
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">{t("about.eyebrow")}</span>
            <h2 className="title-l" dangerouslySetInnerHTML={{ __html: t("about.title") }} />
            <p className="lede">{t("about.lede")}</p>
          </Reveal>
          <div className="trio">
            <Paper tape="" ico="📚" title={t("about.c1.t")} body={t("about.c1.p")} />
            <Paper tape="rose" ico="👩‍🌾" title={t("about.c2.t")} body={t("about.c2.p")} />
            <Paper tape="sage" ico="🎮" title={t("about.c3.t")} body={t("about.c3.p")} />
          </div>
        </div>
      </section>
      <section className="section market" id="market">
        <div className="wrap">
          <Reveal className="postcard">
            <div className="postcard-img">
              <img src="/img/market-stall.jpg" alt="中環農墟攤檔，新鮮蔬菜同農夫" />
              <div className="stamp" dangerouslySetInnerHTML={{ __html: t("market.stamp") }} />
            </div>
            <MarketBody />
          </Reveal>
        </div>
      </section>
      <Season />
      <section className="section" id="games" style={{ paddingTop: "2rem" }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <span className="eyebrow">{t("games.eyebrow")}</span>
            <h2 className="title-l">{t("games.title")}</h2>
            <p className="lede">{t("games.lede")}</p>
          </Reveal>
          <div className="games">
            {GAMES.filter((game) => game.featured).map((game) => (
              <FeaturedGame
                key={game.href}
                href={game.href}
                emoji={game.emoji}
                title={game.title[i]}
                desc={game.desc[i]}
                time={game.time[i]}
                play={t("games.play")}
                badge={lang === "en" ? "Featured · 3D" : "主打 · 3D"}
                kicker={lang === "en" ? "The one to play" : lang === "sc" ? "主打游戏" : "主打遊戲"}
              />
            ))}
            {GAMES.filter((game) => !game.featured).map((game) => (
              <GameCard
                key={game.href}
                href={game.href}
                emoji={game.emoji}
                color={game.color}
                title={game.title[i]}
                sub={"sub" in game ? game.sub[i] : undefined}
                desc={game.desc[i]}
                time={game.time[i]}
                play={t("games.play")}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap teasers">
          <Link className="teaser a" to="/why-organic">
            <span className="big" aria-hidden="true">
              🧺
            </span>
            <h3>{t("teaser.why")}</h3>
            <span className="go">{t("teaser.why.go")}</span>
          </Link>
          <Link className="teaser b" to="/fun-facts">
            <span className="big" aria-hidden="true">
              🥕
            </span>
            <h3>{t("teaser.facts")}</h3>
            <span className="go">{t("teaser.facts.go")}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function Paper({ tape, ico, title, body }: { tape: string; ico: string; title: string; body: string }) {
  return (
    <Reveal className="paper-card">
      <span className={tape ? `tape ${tape}` : "tape"} />
      <div className="ico">{ico}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </Reveal>
  );
}

function MarketBody() {
  const { t, tc } = useLang();
  const market = content.market;
  const cd = useCountdown();
  const units = [t("cd.d"), t("cd.h"), t("cd.m"), t("cd.s")];
  return (
    <div className="postcard-body">
      <span className="eyebrow">{t("market.eyebrow")}</span>
      <h2 className="title-l">{tc(market.name)}</h2>
      <p className="lede">{t("market.lede")}</p>
      <ul className="info-list">
        <li>
          <span className="i">🗓️</span>
          <div>
            <small>{t("market.when")}</small>
            <b>{tc(market.when)}</b>
          </div>
        </li>
        <li>
          <span className="i">📍</span>
          <div>
            <small>{t("market.where")}</small>
            <b>{tc(market.where)}</b>
          </div>
        </li>
        <li>
          <span className="i">🌾</span>
          <div>
            <small>{t("market.who")}</small>
            <b>{tc(market.organiser)}</b> · <span>{tc(market.since)}</span>
          </div>
        </li>
      </ul>
      <MarketPrep />
      <div className={cd.live ? "countdown live" : "countdown"} aria-live="polite">
        <div className="lbl">
          {cd.live ? (
            <>
              <span className="live-dot" />
              {t("market.live")}
            </>
          ) : (
            t("market.next")
          )}
        </div>
        {!cd.live && (
          <div className="nums">
            {cd.parts.map((n, idx) => (
              <div key={units[idx]}>
                <b>{String(n).padStart(2, "0")}</b>
                <span>{units[idx]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="hero-ctas" style={{ justifyContent: "flex-start" }}>
        <a className="btn btn-primary" href={market.mapLink} target="_blank" rel="noopener noreferrer">
          {t("market.btn")}
        </a>
        <a className="btn btn-ghost" href={market.instagram} target="_blank" rel="noopener noreferrer">
          {t("market.ig")}
        </a>
      </div>
    </div>
  );
}

function MarketPrep() {
  const { t } = useLang();
  const items = [t("market.prep.1"), t("market.prep.2")];
  const [on, setOn] = useState([false, false]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sikgather-market-prep");
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length >= 2) setOn([Boolean(parsed[0]), Boolean(parsed[1])]);
    } catch {
      /* ignore */
    }
  }, []);
  function toggle(index: number) {
    setOn((prev) => {
      const next = prev.map((value, i) => (i === index ? !value : value));
      try {
        localStorage.setItem("sikgather-market-prep", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }
  const done = on.every(Boolean);
  return (
    <div className="prep">
      <p className="prep-title">{t("market.prep.title")}</p>
      <ul>
        {items.map((label, index) => (
          <li key={label}>
            <button type="button" aria-pressed={on[index]} className={on[index] ? "on" : undefined} onClick={() => toggle(index)}>
              <span className="box" aria-hidden="true">
                {on[index] ? "✓" : ""}
              </span>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
      {done ? <p className="prep-done">{t("market.prep.done")}</p> : null}
    </div>
  );
}

const HK_OFFSET_MS = 8 * 60 * 60 * 1000;

function marketClock(
  now = Date.now(),
  marketDay = content.market.marketDay,
  open = content.market.openTime,
  close = content.market.closeTime,
) {
  const [openH, openM] = open.split(":").map(Number);
  const [closeH, closeM] = close.split(":").map(Number);
  const hk = new Date(now + HK_OFFSET_MS);
  const y = hk.getUTCFullYear();
  const month = hk.getUTCMonth();
  const date = hk.getUTCDate();
  const dow = hk.getUTCDay();
  const minutes = hk.getUTCHours() * 60 + hk.getUTCMinutes();
  const openMin = openH * 60 + openM;
  const closeMin = closeH * 60 + closeM;
  const at = (dayOffset: number, mins: number) =>
    Date.UTC(y, month, date + dayOffset) + mins * 60_000 - HK_OFFSET_MS;

  if (dow === marketDay && minutes >= openMin && minutes < closeMin) {
    return { live: true, parts: [0, 0, 0, 0] };
  }

  let delta = (marketDay - dow + 7) % 7;
  if (delta === 0 && minutes >= openMin) delta = 7;
  const secs = Math.max(0, Math.floor((at(delta, openMin) - now) / 1000));
  return {
    live: false,
    parts: [
      Math.floor(secs / 86400),
      Math.floor((secs % 86400) / 3600),
      Math.floor((secs % 3600) / 60),
      secs % 60,
    ],
  };
}

function useCountdown() {
  const [state, setState] = useState(() => marketClock());
  useEffect(() => {
    const tick = () => setState(marketClock());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return state;
}

function Season() {
  const { t, tr } = useLang();
  const hkNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const month = hkNow.getUTCMonth() + 1;
  const [season, setSeason] = useState<"cool" | "hot">(month >= 4 && month <= 9 ? "hot" : "cool");
  const [idx, setIdx] = useState(0);
  const [draw, setDraw] = useState(0);
  const list = content.seasons[season];
  const veg = list[idx] ?? list[0];
  function pickToday() {
    setIdx((current) => {
      if (list.length < 2) return 0;
      let next = current;
      while (next === current) next = Math.floor(Math.random() * list.length);
      return next;
    });
    setDraw((n) => n + 1);
  }
  return (
    <section className="section" id="season">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal className="section-head">
          <span className="eyebrow">{t("season.eyebrow")}</span>
          <h2 className="title-l">{t("season.title")}</h2>
          <p className="lede center">{t("season.lede")}</p>
        </Reveal>
        <div className="season-toggle" role="group" aria-label="季節">
          <button
            type="button"
            className={season === "cool" ? "on" : undefined}
            aria-pressed={season === "cool"}
            onClick={() => {
              setSeason("cool");
              setIdx(0);
            }}
          >
            {t("season.cool")}
          </button>
          <button
            type="button"
            className={season === "hot" ? "on" : undefined}
            aria-pressed={season === "hot"}
            onClick={() => {
              setSeason("hot");
              setIdx(0);
            }}
          >
            {t("season.hot")}
          </button>
        </div>
        <div className="draw-row">
          <button type="button" className="btn btn-ghost draw-btn" onClick={pickToday}>
            {t("season.draw")}
          </button>
        </div>
        <div className="veg-row">
          {list.map((item, n) => (
            <button
              key={item.n[0]}
              type="button"
              className={n === idx ? "veg-chip on" : "veg-chip"}
              style={{ animationDelay: `${n * 60}ms` }}
              aria-pressed={n === idx}
              onClick={() => setIdx(n)}
            >
              <span className="e">{item.e}</span>
              {tr(item.n)}
            </button>
          ))}
        </div>
        <div className="tip-card swap" style={{ textAlign: "left" }} key={`${season}-${idx}-${draw}`}>
          <h4>
            {veg.e} {tr(veg.n)}
          </h4>
          {veg.tags?.length ? (
            <div className="veg-tags">
              {veg.tags.map((tag) => (
                <span className="veg-tag" key={tag[0]}>
                  {tr(tag)}
                </span>
              ))}
            </div>
          ) : null}
          <p>{tr(veg.t)}</p>
          <div className="by">{t("season.by")}</div>
        </div>
      </div>
    </section>
  );
}

function FeaturedGame({
  href,
  emoji,
  title,
  desc,
  time,
  play,
  badge,
  kicker,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  time: string;
  play: string;
  badge: string;
  kicker: string;
}) {
  return (
    <Link to={href} className="feature-game">
      <div className="feature-visual">
        <span className="feature-badge">{badge}</span>
        <span className="feature-emoji" aria-hidden="true">
          {emoji}
        </span>
      </div>
      <div className="feature-copy">
        <p className="feature-kicker">{kicker}</p>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="feature-time">⏱ {time}</span>
        <span className="feature-cta">{play}</span>
      </div>
    </Link>
  );
}

function GameCard({
  href,
  emoji,
  color,
  title,
  sub,
  desc,
  time,
  play,
}: {
  href: string;
  emoji: string;
  color: string;
  title: string;
  sub?: string;
  desc: string;
  time: string;
  play: string;
}) {
  const [tilt, setTilt] = useState("");
  return (
    <Link
      to={href}
      className={`game ${color}`}
      style={tilt ? { transform: tilt } : undefined}
      onMouseMove={(e: MouseEvent<HTMLAnchorElement>) => {
        const box = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width - 0.5;
        const y = (e.clientY - box.top) / box.height - 0.5;
        setTilt(`perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`);
      }}
      onMouseLeave={() => setTilt("")}
    >
      <div className="game-thumb">
        <span>{emoji}</span>
      </div>
      <div className="game-body">
        <h3>{title}</h3>
        {sub ? <p className="game-sub">{sub}</p> : null}
        <p>{desc}</p>
        <div className="game-meta">
          <span>⏱ {time}</span>
          <span className="pill play-btn">{play}</span>
        </div>
      </div>
    </Link>
  );
}
