import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // ISO string e.g. "2027-02-01T00:00:00Z"
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isPassed) {
    return (
      <span className="font-mono text-xs px-2.5 py-1 bg-red-950/40 border border-red-800/60 text-red-400 rounded">
        Deadline Passed
      </span>
    );
  }

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 font-mono text-xs tabular-nums text-[#3b9eff]">
        <span><strong className="text-white font-semibold">{timeLeft.days}</strong>d</span>
        <span><strong className="text-white font-semibold">{String(timeLeft.hours).padStart(2, '0')}</strong>h</span>
        <span><strong className="text-white font-semibold">{String(timeLeft.minutes).padStart(2, '0')}</strong>m</span>
        <span><strong className="text-white font-semibold">{String(timeLeft.seconds).padStart(2, '0')}</strong>s</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#0d0d0d] border border-[#222222]">
        <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
          {timeLeft.days}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#888888] mt-0.5">Days</span>
      </div>
      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#0d0d0d] border border-[#222222]">
        <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#888888] mt-0.5">Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#0d0d0d] border border-[#222222]">
        <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#888888] mt-0.5">Mins</span>
      </div>
      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#0d0d0d] border border-[#222222]">
        <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#3b9eff] tabular-nums">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#888888] mt-0.5">Secs</span>
      </div>
    </div>
  );
};
