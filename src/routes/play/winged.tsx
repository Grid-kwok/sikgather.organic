import { createFileRoute } from "@tanstack/react-router";
import { EmbedGame, WINGED_URL } from "@/components/embed-game";

export const Route = createFileRoute("/play/winged")({
  component: () => <EmbedGame src={WINGED_URL} title="四角豆炒蛋" />,
});
