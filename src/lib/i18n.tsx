import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, htmlLang, pick, type Lang } from "@/data/content";

type I18n = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  tr: (values: string[]) => string;
  tc: (obj: Record<Lang, string>) => string;
};

const Ctx = createContext<I18n | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tc");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sikgather-lang");
      if (saved === "tc" || saved === "sc" || saved === "en") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang];
  }, [lang]);

  const value = useMemo<I18n>(() => {
    const tr = (values: string[]) => pick(values, lang);
    return {
      lang,
      setLang: (next) => {
        setLangState(next);
        try {
          localStorage.setItem("sikgather-lang", next);
        } catch {
          /* ignore */
        }
      },
      tr,
      tc: (obj) => obj[lang],
      t: (key, vars) => {
        const raw = content.text[key];
        if (!raw || typeof raw[0] !== "string") return key;
        let text = tr(raw);
        if (vars) {
          for (const [name, val] of Object.entries(vars)) {
            text = text.replaceAll(`{${name}}`, String(val));
          }
        }
        return text;
      },
    };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang outside LangProvider");
  return ctx;
}
