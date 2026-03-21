import { useEffect, useRef, useState } from 'react';
import { onBeamProgress } from '../components/ScanBeam';

/**
 * Reveals an element when the scan beam's viewport-Y crosses the element's
 * viewport top edge. Uses getBoundingClientRect() so it works regardless of
 * scroll position (hero is always in viewport on load).
 *
 * @param {number} triggerOffset  - reveal this many px BEFORE the beam hits the element (default 40)
 */
export default function useScanReveal(triggerOffset = 40) {
  const ref      = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    // Hard fallback — reveal everything 3.8s after mount regardless
    const fallback = setTimeout(() => {
      if (!revealedRef.current) {
        revealedRef.current = true;
        setRevealed(true);
      }
    }, 3800);

    const unsub = onBeamProgress((beamViewportY, progress) => {
      if (revealedRef.current) return;

      // Reveal ALL remaining elements when beam finishes
      if (progress >= 1 || beamViewportY === Infinity) {
        revealedRef.current = true;
        setRevealed(true);
        clearTimeout(fallback);
        return;
      }

      if (!ref.current) return;

      // Use viewport-relative rect (not page-absolute)
      const rect   = ref.current.getBoundingClientRect();
      const elTop  = rect.top; // viewport-relative

      if (beamViewportY >= elTop - triggerOffset) {
        revealedRef.current = true;
        setRevealed(true);
        clearTimeout(fallback);
      }
    });

    return () => {
      unsub();
      clearTimeout(fallback);
    };
  }, [triggerOffset]);

  return { ref, revealed };
}
