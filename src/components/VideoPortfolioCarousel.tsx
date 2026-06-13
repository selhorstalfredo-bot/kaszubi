"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiMic, FiVolume2 } from "react-icons/fi";
import { useTranslations } from "next-intl";

const CAROUSEL_DATA = [
  {
    id: 1,
    key: "one_piece",
    pl: "https://youtu.be/t6zxHuue8pE",
    eng: "https://youtu.be/GkVZawiMdgM"
  },
  {
    id: 2,
    key: "aventurine",
    pl: "https://youtu.be/wF1tjNPKSEc",
    eng: "https://youtu.be/mjVmNaWncJU"
  },
  {
    id: 3,
    key: "transformers_one",
    pl: "https://youtu.be/LgaJQUbig-w",
    eng: "https://youtu.be/AjLwUCeUtP8"
  },
  {
    id: 4,
    key: "billy_henshin",
    pl: "https://youtu.be/mskDR8xJ4lk",
    eng: "https://youtu.be/nDndEOa9RA0"
  },
  {
    id: 5,
    key: "edgerunners",
    pl: "https://youtu.be/4SUtkClQySU",
    eng: "https://youtu.be/YvLZXot88js"
  },
  {
    id: 6,
    key: "mr_stark",
    pl: "https://youtu.be/9GJPLEGpZGQ",
    eng: "https://youtu.be/jFNKnVFqcyE"
  },
  {
    id: 7,
    key: "chainsaw_man",
    pl: "https://youtu.be/U5e1eu48ktw",
    eng: "https://youtu.be/BkKPnzpCDAg"
  },
  {
    id: 8,
    key: "dare_devil",
    pl: "https://youtu.be/WSWL68kjppo",
    eng: "https://youtu.be/yX0vNrls8SU"
  },
  {
    id: 9,
    key: "sin",
    pl: "https://youtu.be/WZZ6Hj0A_3g",
    eng: "https://youtu.be/KRbKGPNVq5g"
  }
];

// Extract YouTube video ID from various URL formats (watch?v=, youtu.be/, shorts/)
function extractYouTubeId(url: string): string {
  const patterns = [
    /youtu\.be\/([^?&#]+)/,
    /youtube\.com\/watch\?v=([^&#]+)/,
    /youtube\.com\/shorts\/([^?&#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return url.split('v=')[1]?.split('&')[0] ?? '';
}

export default function VideoPortfolioCarousel() {
  const t = useTranslations("Portfolio");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lang, setLang] = useState<"PL" | "ENG">("PL");
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset playback directly in event handlers — avoids synchronous setState in useEffect
  const nextSlide = () => { setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length); setIsPlaying(false); };
  const prevSlide = () => { setCurrentIndex((prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length); setIsPlaying(false); };
  const switchLang = (l: "PL" | "ENG") => { setLang(l); setIsPlaying(false); };

  const currentItem = CAROUSEL_DATA[currentIndex];
  const currentVideoUrl = lang === "PL" ? currentItem.pl : currentItem.eng;

  const videoId = extractYouTubeId(currentVideoUrl);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0&iv_load_policy=3&origin=${encodeURIComponent(origin)}`;

  return (
    <section id="portfolio" className="w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">

        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 mb-2">
            {t('badge')}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {t('title')}
          </h2>
        </div>

        {/* Carousel Container — outer wrapper has fixed height so arrows never move */}
        <div className="relative w-full">

          {/* Desktop Left Arrow — absolutely pinned to outer wrapper center */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-[-4rem] top-[200px] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Main Content Area */}
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/5 backdrop-blur-md p-6 md:p-8 lg:p-10">
            {/* Smooth transition wrapper */}
            <div
              key={currentIndex}
              className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 animate-in fade-in slide-in-from-right-4 duration-500"
            >

              {/* Left Side: Video + Toggle */}
              <div className="w-full lg:w-3/5 flex flex-col gap-6">
                <div className="relative w-full pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                  {!isPlaying ? (
                    <div
                      className="absolute inset-0 cursor-pointer group"
                      onClick={() => setIsPlaying(true)}
                    >
                      <Image
                        src={thumbnailUrl}
                        alt="Video Thumbnail"
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        unoptimized
                      />
                      {/* Custom Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={iframeUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>

                {/* PL/ENG Toggle + Mobile Prev/Next in one row */}
                <div className="flex items-center justify-between gap-2">
                  {/* Language toggle */}
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Hide label on very small screens */}
                    <span className="hidden sm:inline text-sm font-semibold text-zinc-500 uppercase tracking-widest shrink-0">{t('version')}</span>
                    <div className="flex bg-black p-1 rounded-full border border-white/10 shadow-inner">
                      <button
                        onClick={() => switchLang('PL')}
                        className={`w-12 sm:min-w-[64px] h-8 sm:h-9 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 ${lang === 'PL' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-zinc-400 hover:text-white'}`}
                      >
                        PL
                      </button>
                      <button
                        onClick={() => switchLang('ENG')}
                        className={`w-12 sm:min-w-[64px] h-8 sm:h-9 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 ${lang === 'ENG' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-zinc-400 hover:text-white'}`}
                      >
                        ENG
                      </button>
                    </div>
                  </div>

                  {/* Mobile-only Prev / Next */}
                  <div className="flex lg:hidden items-center gap-1.5 shrink-0">
                    <button
                      onClick={prevSlide}
                      aria-label={t('prev')}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                    >
                      <FiChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-zinc-600 tabular-nums w-6 text-center">
                      {currentIndex + 1}/{CAROUSEL_DATA.length}
                    </span>
                    <button
                      onClick={nextSlide}
                      aria-label={t('next')}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                    >
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Side: Text & Mobile Nav */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center relative z-10">
                {/* Giant Faded Number Background */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[12rem] lg:text-[16rem] font-black text-white/[0.02] leading-none select-none pointer-events-none -z-10">
                  0{currentIndex + 1}
                </div>

                {/* Eyebrow */}
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
                  {t('projectDetails')}
                </p>

                {/* demoType — unified heading */}
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-3 text-white">
                  {t(`videos.${currentItem.key}.demoType`)}
                </h3>

                {/* Title — series only, small and subtle */}
                <p className="text-lg md:text-xl font-semibold text-zinc-500 tracking-wide mb-6">
                  {t(`videos.${currentItem.key}.title`).split(' – ').slice(1).join(' – ')}
                </p>

                {/* Description */}
                <div className="border-l-2 border-emerald-500 pl-4 mb-6">
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    {t(`videos.${currentItem.key}.desc`)}
                  </p>
                </div>

                {/* Mic & Voice info */}
                <div className="flex flex-col gap-2 mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <FiVolume2 size={14} className="shrink-0 text-emerald-500" />
                    <span className="text-zinc-400">{t(`videos.${currentItem.key}.voice`)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiMic size={14} className="shrink-0 text-emerald-500" />
                    <span className="text-zinc-400">{t(`videos.${currentItem.key}.mic`)}</span>
                  </div>
                </div>

                {/* Slide Indicators (Desktop & Mobile) */}
                <div className="flex items-center gap-3 mt-auto">
                  {CAROUSEL_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>



              </div>

            </div>
          </div>

          {/* Desktop Right Arrow — absolutely pinned to outer wrapper center */}
          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-[-4rem] top-[200px] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>

        </div>
      </div>
    </section>
  );
}
