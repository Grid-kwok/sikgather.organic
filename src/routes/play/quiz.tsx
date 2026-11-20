import { createFileRoute } from "@tanstack/react-router";
import { EmbedGame, QUIZ_URL } from "@/components/embed-game";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/play/quiz")({
  component: QuizPlay,
});

function QuizPlay() {
  const { lang } = useLang();
  const title = lang === "en" ? "Organic Brain Quiz" : lang === "sc" ? "有机小测验" : "有機小測驗";
  return <EmbedGame src={QUIZ_URL} title={title} />;
}
