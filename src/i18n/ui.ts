import type { Lang } from "@/i18n/defaultLangOptions";

export const ui = {
  en: {
    "footer.designBy": "Design by me",
    "footer.codeBy": "Code by",
    "footer.assetsBy": "Assets by",
    "footer.logoBy": "Logo by",
    "footer.legal": "Legal Notice",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookie Policy",
  },
  es: {
    "footer.designBy": "Diseño propio",
    "footer.codeBy": "Código de",
    "footer.assetsBy": "Gráficos de",
    "footer.logoBy": "Logo de",
    "footer.legal": "Aviso legal",
    "footer.privacy": "Política de privacidad",
    "footer.cookies": "Política de cookies",
  },
} as const;

export function useTranslations(lang: Lang) {
  return function translate(key: keyof (typeof ui)["en"]) {
    return ui[lang]?.[key] || ui["en"][key];
  };
}
