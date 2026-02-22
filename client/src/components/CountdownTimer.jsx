import { useState, useEffect } from "react";

/**
 * @param {Date|string} targetDate - UTC date
 * @param {string} [endedLabel] - e.g. "Event Started"
 * @param {boolean} [compact] - smaller layout
 */
const CountdownTimer = ({ targetDate, endedLabel = "Event Started", compact = false }) => {
  const target = targetDate ? new Date(targetDate) : null;
  const [now, setNow] = useState(() => new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!target || !mounted) {
    return (
      <div className={compact ? "text-sm text-gray-500" : "text-lg text-gray-500"}>
        —:—:—
      </div>
    );
  }

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return (
      <div
        className={
          compact
            ? "text-sm font-medium text-amber-600 dark:text-amber-400"
            : "text-lg font-semibold text-amber-600 dark:text-amber-400"
        }
      >
        {endedLabel}
      </div>
    );
  }

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  const pad = (n) => String(n).padStart(2, "0");
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  parts.push(`${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);

  return (
    <div
      className={
        compact
          ? "text-sm tabular-nums text-gray-700 dark:text-gray-300"
          : "text-lg tabular-nums font-medium text-gray-800 dark:text-gray-200"
      }
    >
      {parts.join(" ")}
    </div>
  );
};

export default CountdownTimer;
