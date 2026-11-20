import { createFileRoute } from "@tanstack/react-router";
import { WhyPage } from "@/components/why-page";

export const Route = createFileRoute("/why-organic")({
  component: WhyPage,
});
