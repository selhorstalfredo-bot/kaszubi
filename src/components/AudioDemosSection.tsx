"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { FiPlay, FiPause } from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────────────────
//  AUDIO FILES — folder: /public/audio/
//    "Demo Aktorskie - Michał Kaszubowski.wav"
//    "Demo Audiobook - MichałKaszubowski .wav"
//    "Demo Reklamowe - Michał Kaszubowski.wav"
//    "Demo Reklamowe 2 - Michał Kaszubowski.wav"
// ─────────────────────────────────────────────────────────────────────────────

const AUDIO_DEMOS = [
  {
    id: "demo-aktorskie",
    key: "acting",
    file: "/audio/Demo Aktorskie - Michał Kaszubowski.wav",
  },
  {
    id: "demo-lektorskie",
    key: "audiobook",
    file: "/audio/Demo Audiobook - MichałKaszubowski .wav",
  },
  {
    id: "demo-reklamowe",
    key: "commercial1",
    file: "/audio/Demo Reklamowe - Michał Kaszubowski.wav",
  },
  {
    id: "demo-reklamowe-2",
    key: "commercial2",
    file: "/audio/Demo Reklamowe 2 - Michał Kaszubowski.wav",
  },
];

function VolumeIcon({ muted, volume }: { muted: boolean; volume: number }) {
  if (muted || volume === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    );
  }
  if (volume < 0.4) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function AudioPlayerCard({
  demo,
  index,
}: {
  demo: (typeof AUDIO_DEMOS)[0];
  index: number;
}) {
  const t = useTranslations("AudioDemos");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const formatTime = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play(); }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const handleEnded = () => setIsPlaying(false);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audio) { audio.volume = val; audio.muted = val === 0; }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    setIsMuted(next);
    audio.muted = next;
    if (!next && volume === 0) {
      setVolume(0.8);
      audio.volume = 0.8;
    }
  };

  const effectiveVolume = isMuted ? 0 : volume;
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative rounded-2xl bg-neutral-900/60 border border-white/5 backdrop-blur-md p-6 hover:border-emerald-500/20 transition-all duration-500 overflow-hidden">
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />

      {/* Giant faded index */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
        {indexLabel}
      </div>

      <div className="relative z-10 flex flex-col gap-5">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400 mb-1">
              {t(`demos.${demo.key}.type`)}
            </p>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              {t(`demos.${demo.key}.title`)}
            </h3>
          </div>

          {/* ── Volume control (top-right) ── */}
          <div
            className="flex items-center gap-2"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            {/* Horizontal slider — expands to the left */}
            <div
              className="overflow-hidden transition-all duration-300 ease-out flex items-center"
              style={{ width: showVolume ? "88px" : "0px", opacity: showVolume ? 1 : 0 }}
            >
              {/* Custom styled slider track + thumb */}
              <div className="relative w-full flex items-center" style={{ height: "20px" }}>
                {/* Track background */}
                <div className="absolute left-0 right-0 h-3 bg-white/10 rounded-full top-1/2 -translate-y-1/2" />
                {/* Filled portion — goes from left to center of thumb */}
                <div
                  className="absolute left-0 h-3 bg-emerald-500 rounded-full pointer-events-none top-1/2 -translate-y-1/2 transition-[width] duration-75"
                  style={{ width: `calc(${effectiveVolume} * (100% - 20px) + 10px)` }}
                />
                {/* Thumb knob — constrained so it never overflows the container */}
                <div
                  className="absolute w-5 h-5 bg-white rounded-full top-1/2 -translate-y-1/2 pointer-events-none transition-[left] duration-75 shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  style={{ left: `calc(${effectiveVolume} * (100% - 20px))` }}
                />
                {/* Invisible native range — captures all input */}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={effectiveVolume}
                  onChange={handleVolumeChange}
                  aria-label="Głośność"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0"
                  style={{ WebkitAppearance: "none" }}
                />
              </div>
            </div>

            {/* Mute button — the icon box */}
            <button
              onClick={toggleMute}
              onFocus={() => setShowVolume(true)}
              onBlur={() => setShowVolume(false)}
              aria-label={isMuted ? "Włącz dźwięk" : "Wycisz"}
              className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 ${
                isMuted
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-white/5 border-white/10 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30"
              }`}
            >
              <VolumeIcon muted={isMuted} volume={volume} />
            </button>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center gap-3">

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pauza" : "Odtwórz"}
            className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
            {isPlaying
              ? <FiPause size={20} />
              : <FiPlay size={20} className="ml-0.5" />
            }
          </button>

          {/* Seek + time */}
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            <div
              className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group/bar"
              onClick={handleSeek}
            >
              <div
                className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <div className="flex text-[10px] text-zinc-600 tabular-nums">
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Native audio */}
      <audio
        ref={audioRef}
        src={demo.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
}

export default function AudioDemosSection() {
  const t = useTranslations("AudioDemos");

  return (
    <section id="audio-demos" className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 mb-2">
            {t("badge")}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {AUDIO_DEMOS.map((demo, i) => (
            <AudioPlayerCard key={demo.id} demo={demo} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
