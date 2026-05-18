"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageSwitch = (newLocale: string) => {
    // @ts-expect-error - dynamic params issue in type definition
    router.replace({ pathname, params }, { locale: newLocale });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full relative bg-neutral-950/80 backdrop-blur-xl border-t border-white/5 py-10 md:py-12 px-4 sm:px-6 md:px-12 z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <p className="text-zinc-500 text-sm font-medium">
            {t("copyright")}
          </p>
        </div>

        
        {/* Middle: Minimal Contact Info */}
        <div className="flex flex-col items-center gap-3 text-sm text-zinc-400">
          <a
            href="mailto:skrytyva@gmail.com"
            className="hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5 min-h-[44px] flex items-center"
          >
            skrytyva@gmail.com
          </a>
          <a
            href="tel:+48507730399"
            className="hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5 min-h-[44px] flex items-center"
          >
            +48 507 730 399
          </a>
        </div>

        {/* Right: Language Switcher & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-6">
          



          <button 
            onClick={scrollToTop}
            className="text-xs font-semibold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            {t("backToTop")} ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
