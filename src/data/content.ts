import raw from "./content.json";

export type Lang = "tc" | "sc" | "en";

const order: Lang[] = ["tc", "sc", "en"];

export function pick(values: string[] | undefined, lang: Lang): string {
  if (!values?.length) return "";
  const i = order.indexOf(lang);
  return values[i] ?? values[0] ?? "";
}

export function ribbonOf(lang: Lang): string[] {
  const ribbon = (raw as { text: { ribbon: string[][] } }).text.ribbon;
  const i = order.indexOf(lang);
  return ribbon[i] ?? ribbon[0];
}

export const content = raw as unknown as {
  text: Record<string, string[]>;
  seasons: {
    cool: { e: string; n: string[]; t: string[]; tags?: string[][] }[];
    hot: { e: string; n: string[]; t: string[]; tags?: string[][] }[];
  };
  compare: { n: string[]; a: number; b: number; na: string[]; nb: string[] }[];
  reasons: { e: string; t: string[]; p: string[] }[];
  origins: { e: string; km: number; n: string[] }[];
  facts: { e: string; c: string; t: string[]; q: string[]; p: string[] }[];
  myths: { a: boolean; s: string[]; x: string[] }[];
  personality: {
    questions: { q: string[]; o: { e: string; k: string; t: string[] }[] }[];
    results: Record<string, { e: string; n: string[]; d: string[]; cook?: string[] }>;
  };
  market: {
    name: Record<Lang, string>;
    when: Record<Lang, string>;
    where: Record<Lang, string>;
    organiser: Record<Lang, string>;
    since: Record<Lang, string>;
    marketDay: number;
    openTime: string;
    closeTime: string;
    mapLink: string;
    instagram: string;
  };
};

export const htmlLang: Record<Lang, string> = {
  tc: "zh-Hant-HK",
  sc: "zh-Hans",
  en: "en",
};
