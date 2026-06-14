"use client";

import { useEffect, useState } from "react";

export function Countdown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(date).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [date]);

  return (
    <div className="flex items-center gap-1 text-sm font-semibold">
      <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Live dans</span>
      {[
        { v: timeLeft.days, l: "j" },
        { v: timeLeft.hours, l: "h" },
        { v: timeLeft.minutes, l: "m" },
        { v: timeLeft.seconds, l: "s" },
      ].map(({ v, l }) => (
        <span key={l} className="flex items-center gap-0.5">
          <span className="gradient-text tabular-nums font-bold">{String(v).padStart(2, "0")}</span>
          <span className="text-slate-400 text-xs">{l}</span>
        </span>
      ))}
    </div>
  );
}
