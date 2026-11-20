import { createFileRoute } from "@tanstack/react-router";
import { EmbedGame, DASH_URL } from "@/components/embed-game";

export const Route = createFileRoute("/play/dash")({
  component: () => <EmbedGame src={DASH_URL} title="農場到餐桌" />,
});
