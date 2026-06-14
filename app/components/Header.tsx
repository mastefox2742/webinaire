"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Countdown } from "./Countdown";

export function Header({ date }: { date: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-violet-100 shadow-sm"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Image
            src="/IMG-20260502-WA0007.jpg"
            alt="Alpha Tech"
            width={36}
            height={36}
            className="rounded-lg object-contain"
          />
          <span className="font-bold text-slate-800 hidden sm:inline">Groupe Alpha</span>
        </div>

        <Countdown date={date} />

        <a href="#inscription" className="btn-primary !py-2 !px-4 sm:!px-6 text-sm whitespace-nowrap pulse-glow">
          Je m'inscris
        </a>
      </div>
    </header>
  );
}
