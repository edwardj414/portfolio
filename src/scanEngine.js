/**
 * SCAN ENGINE
 * -----------
 * One RAF loop drives everything:
 *  1. Moves the beam div from top → bottom over DURATION ms.
 *  2. Every frame, finds all [data-scan] elements in the DOM.
 *  3. When the beam's centre crosses an element's top edge it gets
 *     the class "scan-in" — no hook, no listener, no React state.
 *
 * Usage in JSX:  <p data-scan>Hello</p>
 * The element starts invisible (CSS) and flickers in when hit.
 */

const DELAY    = 800;   // ms before sweep starts (lets React finish painting)
const DURATION = 3500;  // ms for one full-page sweep

let engineStarted = false;

export function startScanEngine(beamEl) {
  if (engineStarted) return;
  engineStarted = true;

  let startTs  = null;
  let raf      = null;
  const vh     = () => window.innerHeight;

  const run = (ts) => {
    if (!startTs) startTs = ts;

    const elapsed  = ts - startTs;
    const progress = Math.min(elapsed / DURATION, 1);

    // Smooth ease-in-out
    const eased = progress < 0.5
      ? 4 * progress ** 3
      : 1 - (-2 * progress + 2) ** 3 / 2;

    // Beam travels: starts 160px above viewport, ends 160px below
    const beamTop    = -160 + eased * (vh() + 320);
    const beamCentreY = beamTop + 70; // centre of 140px beam

    // ── Move beam ──
    if (beamEl) {
      beamEl.style.transform = `translateY(${beamTop}px)`;
      beamEl.style.opacity   =
        progress < 0.04 ? String(progress / 0.04) :
        progress > 0.93 ? String((1 - progress) / 0.07) : '1';
    }

    // ── Reveal elements the beam has passed ──
    const targets = document.querySelectorAll('[data-scan]:not(.scan-in)');
    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (beamCentreY >= rect.top) {
        el.classList.add('scan-in');
      }
    });

    if (progress < 1) {
      raf = requestAnimationFrame(run);
    } else {
      // Beam done — reveal any remaining hidden elements
      document.querySelectorAll('[data-scan]:not(.scan-in)')
        .forEach(el => el.classList.add('scan-in'));
      if (beamEl) beamEl.style.opacity = '0';
    }
  };

  setTimeout(() => {
    raf = requestAnimationFrame(run);
  }, DELAY);

  // Cleanup exposed for HMR / StrictMode
  return () => cancelAnimationFrame(raf);
}
