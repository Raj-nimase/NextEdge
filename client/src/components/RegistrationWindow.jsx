import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer.jsx";

/**
 * Registration window status and countdown.
 * @param {Date|string} registrationStartDate - UTC
 * @param {Date|string} registrationEndDate - UTC
 * @param {boolean} [compact]
 */
const RegistrationWindow = ({
  registrationStartDate,
  registrationEndDate,
  compact = false,
}) => {
  const [now, setNow] = useState(() => new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const start = registrationStartDate ? new Date(registrationStartDate) : null;
  const end = registrationEndDate ? new Date(registrationEndDate) : null;

  if (!mounted || !start || !end) {
    return (
      <div className={compact ? "text-sm text-gray-500" : "text-base text-gray-500"}>
        Registration window not set
      </div>
    );
  }

  if (now < start) {
    return (
      <div
        className={
          compact
            ? "text-sm font-medium text-amber-600 dark:text-amber-400"
            : "text-base font-medium text-amber-600 dark:text-amber-400"
        }
      >
        Registration not open yet
      </div>
    );
  }

  if (now > end) {
    return (
      <div
        className={
          compact
            ? "text-sm font-medium text-red-600 dark:text-red-400"
            : "text-base font-medium text-red-600 dark:text-red-400"
        }
      >
        Registration Closed
      </div>
    );
  }

  return (
    <div className={compact ? "text-sm" : "text-base"}>
      <span className="text-gray-600 dark:text-gray-400">Registration closes in: </span>
      <CountdownTimer targetDate={end} endedLabel="Closed" compact={compact} />
    </div>
  );
};

export default RegistrationWindow;
