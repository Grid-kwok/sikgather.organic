import { Link, createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { EmbedGame } from "@/components/embed-game";
import { useLang } from "@/lib/i18n";

const ADS = [
  {
    id: "shooter",
    href: "https://veggiesshooter.grok.me",
    tone: "sage",
    title: ["有機泡泡射手", "有机泡泡射手", "Organic Bubble Shooter"],
    desc: ["射菜泡泡，三顆同色蔬菜掂住就收成。", "射菜泡泡，三颗同色蔬菜挨住就收获。", "Shoot veggie bubbles — match three of a colour to harvest."],
  },
  {
    id: "grow",
    href: "https://growbigger.grok.me",
    tone: "butter",
    title: ["有機田園 · 大冬瓜", "有机田园 · 大冬瓜", "Organic Garden · Winter Melon"],
    desc: ["同款有機菜一碰就變大，最終目標係大冬瓜。", "同款有机菜一碰就变大，最终目标是大冬瓜。", "Match the same organic veg and grow it — aim for the winter melon."],
  },
  {
    id: "pack",
    href: "https://sapphire-pine-crane-velvet.grok.me",
    tone: "sky",
    title: ["有機田園 · 打包", "有机田园 · 打包", "Organic Garden · Pack"],
    desc: ["限時打包有機菜，順手搞埋堆肥。", "限时打包有机菜，顺便处理堆肥。", "Pack organic veg against the clock, and deal with the compost."],
  },
  {
    id: "glow",
    href: "https://glow-farm.grok.me/",
    tone: "rose",
    title: ["青青樂", "青青乐", "Green Match"],
    desc: ["拖去隔壁，三顆一樣就收成。跟住發光嗰對。", "拖到隔壁，三颗一样就收获。跟着发光的那对。", "Drag to a neighbour. Three of a kind harvests — follow the glowing pair."],
  },
] as const;

type AdsSearch = { game?: string };

export const Route = createFileRoute("/play/ads")({
  validateSearch: (search: Record<string, unknown>): AdsSearch => ({
    game: typeof search.game === "string" ? search.game : undefined,
  }),
  component: AdsPage,
});

function AdsPage() {
  const { game } = Route.useSearch();
  const { lang } = useLang();
  const i = lang === "en" ? 2 : lang === "sc" ? 1 : 0;
  const picked = ADS.find((item) => item.id === game);
  if (picked) {
    return (
      <EmbedGame
        src={picked.href}
        title={picked.title[i]}
        backTo="/play/ads"
        backHash=""
        backLabel={lang === "en" ? "← Ad games" : "← 廣告小遊戲"}
      />
    );
  }
  const copy =
    lang === "en"
      ? {
          kicker: "On air",
          title: "Ad mini games",
          lede: "Four short spots from the stall. Pick a row and it plays.",
          back: "← All mini games",
          play: "Play",
        }
      : lang === "sc"
        ? {
            kicker: "档口广播",
            title: "广告小游戏",
            lede: "四条短片，拣一行就播。",
            back: "← 全部迷你游戏",
            play: "播放",
          }
        : {
            kicker: "檔口廣播",
            title: "廣告小遊戲",
            lede: "四條短片，揀一行就播。",
            back: "← 全部迷你遊戲",
            play: "播放",
          };
  return (
    <main>
      <section className="section" style={{ paddingTop: "1.6rem" }}>
        <div className="wrap">
          <div className="ad-board">
            <aside className="ad-intro">
              <div>
                <p className="ad-kicker">{copy.kicker}</p>
                <h1>{copy.title}</h1>
                <p>{copy.lede}</p>
              </div>
              <Link className="ad-back" to="/" hash="games">
                {copy.back}
              </Link>
            </aside>
            <div className="ad-list">
              {ADS.map((item, n) => (
                <Link
                  key={item.id}
                  to="/play/ads"
                  search={{ game: item.id }}
                  className={`ad-row tone-${item.tone}`}
                >
                  <span className="ad-num">{String(n + 1).padStart(2, "0")}</span>
                  <span className="ad-copy">
                    <h2>{item.title[i]}</h2>
                    <p>{item.desc[i]}</p>
                  </span>
                  <span className="ad-go" aria-label={copy.play}>
                    <Play size={18} strokeWidth={2.4} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
