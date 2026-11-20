import { createFileRoute } from "@tanstack/react-router";
import { FactsPage } from "@/components/facts-page";

export const Route = createFileRoute("/fun-facts")({
  component: FactsPage,
});
