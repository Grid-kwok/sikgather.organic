import { createFileRoute } from "@tanstack/react-router";
import { EmbedGame, FIELD_URL } from "@/components/embed-game";

export const Route = createFileRoute("/play/field")({
  component: () => <EmbedGame src={FIELD_URL} title="有「機」可乘" />,
});
