import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

// Animates a number from 0 up to `target` once the element scrolls into view.
// Kept as its own hook (not baked into StatCard) so any future component
// that needs a counting number — trending repo stars, a progress metric —
// can reuse this logic instead of duplicating it.
export function useCountUp(target, duration = 1500) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  // `once: true` — we only want this to play the first time it enters
  // the viewport. Without it, scrolling up and back down would replay
  // the count every time, which reads as glitchy rather than polished.
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;

    function tick(now) {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: fast start, slow finish — mimics how a real
      // counter/odometer settles, rather than a robotic linear tick.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration]);

  return { ref, value };
}