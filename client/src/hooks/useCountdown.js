import { useEffect, useRef, useState } from "react";

// One hook, two uses: OTP expiry (5 min) and resend cooldown (30s) both
// need "count down from N to 0, tell me when it hits 0." Same shape,
// different starting number — no reason to write this logic twice.
export function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  function start(from = initialSeconds) {
    setSeconds(from);
  }

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [seconds > 0]);

  return { seconds, start };
}