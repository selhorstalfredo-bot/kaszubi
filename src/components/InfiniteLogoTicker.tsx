"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type LogoItem = {
  name: string;
  src: string;
};

const LOGOS: LogoItem[] = [
  { src: "/logos/no-deer-allowed.png", name: "NO DEER ALLOWED" },
  { src: "/logos/vox-studio.png", name: "VOX STUDIO" },
  { src: "/logos/ls-mark.png", name: "LS MARK" },
  { src: "/logos/na-biwaku-bez-laku.png", name: "NA BIWAKU BEZ LAKU" },
  { src: "/logos/essa-tim.png", name: "ESSA TIM" },
  { src: "/logos/dramawave.png", name: "DRAMAWAVE" },
  { src: "/logos/reelshort.png", name: "REELSHORT" },
];

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {LOGOS.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center px-8 md:px-12 lg:px-16 group"
        >
          <Image
            src={item.src}
            alt={item.name}
            width={160}
            height={48}
            className="h-8 md:h-10 lg:h-12 w-auto object-contain
                       grayscale opacity-50
                       transition-all duration-500
                       group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110
                       select-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

export default function InfiniteLogoTicker() {
  const t = useTranslations("LogoTicker");
  return (
    <section className="w-full py-14 md:py-20">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-14 px-4">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-3">
          {t("badge")}
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-100 leading-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm md:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
          {t("description")}
        </p>
        {/* Subtle divider */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-700" />
          <div className="h-1 w-1 rounded-full bg-zinc-600" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-700" />
        </div>
      </div>

      {/* Ticker strip */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-ticker lg:animate-ticker-desktop hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow />
          <LogoRow />
          <LogoRow />
        </div>
      </div>
    </section>
  );
}
