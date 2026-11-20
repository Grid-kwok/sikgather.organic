import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

export const QUIZ_URL = "https://abdabdhamy.github.io/1Cv5M2Car3wasd/";
export const WINGED_URL = "https://four-bean-egg.grok.me/";
export const DASH_URL = "https://abdabdhamy.github.io/1Xc-LkntW/";
export const FIELD_URL = "https://tiger-stone-marble-mist.grok.me/";

export function EmbedGame({
  src,
  title,
  backTo = "/",
  backHash = "games",
  backLabel,
}: {
  src: string;
  title: string;
  backTo?: "/" | "/play/ads";
  backHash?: string;
  backLabel?: string;
}) {
  const { lang } = useLang();
  const back = backLabel ?? (lang === "en" ? "← Mini games" : "← 迷你遊戲");
  return (
    <main className="winged-shell">
      <div className="winged-bar">
        <Link to={backTo} hash={backHash || undefined}>
          {back}
        </Link>
        <b>{title}</b>
      </div>
      <iframe title={title} src={src} allow="autoplay" referrerPolicy="no-referrer-when-downgrade" />
    </main>
  );
}
