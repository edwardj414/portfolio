import { useEffect, useRef, useState, useCallback } from 'react';
import './Splash.css';

const BOOT_LINES = [
  { t: 0,    text: '> INITIALIZING PORTFOLIO v2.0...',        color: '#00d4ff' },
  { t: 320,  text: '> LOADING DJANGO REST FRAMEWORK...',       color: '#4a6fa0' },
  { t: 620,  text: '> MOUNTING REACT COMPONENTS...',           color: '#4a6fa0' },
  { t: 900,  text: '> CONNECTING TO RAILWAY API...',           color: '#4a6fa0' },
  { t: 1150, text: '> VERCEL DEPLOYMENT READY...',             color: '#4a6fa0' },
  { t: 1380, text: '> ALL SYSTEMS OPERATIONAL',                color: '#00d4ff' },
  { t: 1600, text: '> WELCOME // DHILIPAN BALASUBRAMANIAN',    color: '#a855f7' },
];

/* ─── Honeycomb transition canvas ─── */
function useHoneycombTransition(canvasRef, active, onDone) {
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    // Hex geometry
    const R  = 48;                        // hex circumradius
    const rW = R * Math.sqrt(3);          // flat-top hex width
    const rH = R * 2;                     // hex height
    const cols = Math.ceil(W / rW) + 2;
    const rows = Math.ceil(H / (rH * 0.75)) + 2;

    // Build hex grid with wave-order (diagonal sweep from top-left)
    const hexes = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * rW + (row % 2 === 0 ? 0 : rW / 2) - rW / 2;
        const y = row * rH * 0.75 - rH / 2;
        // Wave delay: distance from top-left corner (diagonal ripple)
        const waveOrder = (col + row * 0.6);
        hexes.push({ x, y, waveOrder, progress: 0, done: false });
      }
    }

    // Sort order for consistent wave
    const maxWave = Math.max(...hexes.map(h => h.waveOrder));

    // Draw a single pointy-top hexagon at (cx,cy) with given progress (0→1)
    const drawHex = (cx, cy, prog) => {
      const r = R * prog;
      if (r < 1) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30);
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Dark fill — near-black navy, not cyan
      const alpha = Math.min(prog * 1.4, 1);
      ctx.fillStyle = `rgba(3, 8, 20, ${alpha})`;
      ctx.fill();

      // Thin glowing border that fades as hex fills
      if (prog < 0.85) {
        ctx.strokeStyle = `rgba(0, 180, 210, ${(1 - prog) * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    };

    const WAVE_DURATION = 900;   // ms for full wave sweep
    const HOLD          = 80;    // ms of hold at full black
    let startTs = null;
    let raf;

    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;

      ctx.clearRect(0, 0, W, H);

      let allDone = true;

      hexes.forEach(hex => {
        // Map this hex's waveOrder to a start time within WAVE_DURATION
        const hexStart = (hex.waveOrder / maxWave) * (WAVE_DURATION * 0.65);
        const hexElapsed = Math.max(0, elapsed - hexStart);
        const localProgress = Math.min(hexElapsed / 320, 1); // 320ms per hex to fill
        hex.progress = localProgress;
        if (localProgress < 1) allDone = false;
        drawHex(hex.x, hex.y, localProgress);
      });

      if (!allDone || elapsed < WAVE_DURATION + HOLD) {
        raf = requestAnimationFrame(animate);
      } else {
        // Fill a solid rect over everything to ensure no gaps before page appears
        ctx.fillStyle = '#030814';
        ctx.fillRect(0, 0, W, H);
        onDone?.();
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [active, canvasRef, onDone]);
}

export default function Splash({ onComplete }) {
  const matrixRef   = useRef(null);
  const hexRef      = useRef(null);
  const [lines, setLines]       = useState([]);
  const [progress, setProgress] = useState(0);
  const [hexActive, setHexActive] = useState(false);
  const [hidden, setHidden]       = useState(false);

  const handleHexDone = useCallback(() => {
    setHidden(true);
    setTimeout(onComplete, 60);
  }, [onComplete]);

  useHoneycombTransition(hexRef, hexActive, handleHexDone);

  /* Matrix rain */
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const cols  = Math.floor(w / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -80);
    const chars = '01アイウエオDJANGOPYTHON{}[]REACT';
    let raf;
    const draw = () => {
      ctx.fillStyle = 'rgba(2,8,23,0.04)';
      ctx.fillRect(0, 0, w, h);
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = y*16 < 40 ? '#00d4ff' : `rgba(0,153,187,${Math.random()*0.35+0.05})`;
        ctx.font = '12px JetBrains Mono,monospace';
        ctx.fillText(ch, i*16, y*16);
        if (y*16 > h && Math.random() > 0.97) drops[i] = 0;
        else drops[i] += 0.6;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Boot sequence + trigger hex exit */
  useEffect(() => {
    BOOT_LINES.forEach(({ t, text, color }) => {
      setTimeout(() => setLines(l => [...l, { text, color }]), t);
    });

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1.4;
      });
    }, 28);

    const exitTimer = setTimeout(() => {
      setHexActive(true); // kick off honeycomb
    }, 2600);

    return () => { clearInterval(interval); clearTimeout(exitTimer); };
  }, []);

  if (hidden) return null;

  return (
    <div className="splash">
      {/* Matrix background */}
      <canvas ref={matrixRef} className="splash__canvas" />

      {/* Center UI — fades out when hex starts */}
      <div className={`splash__center ${hexActive ? 'splash__center--exit' : ''}`}>
        <div className="splash__logo">
          <span className="splash__logo-dh">DH</span>
          <span className="splash__logo-rest">ILIPAN</span>
          <span className="splash__logo-tag">.DEV</span>
        </div>
        <div className="splash__terminal">
          {lines.map((l, i) => (
            <div key={i} className="splash__line" style={{ color: l.color }}>
              {l.text}
            </div>
          ))}
          <span className="splash__cursor blink">█</span>
        </div>
        <div className="splash__bar-wrap">
          <div className="splash__bar-track">
            <div className="splash__bar-fill" style={{ width: `${progress}%` }} />
            <div className="splash__bar-glow" style={{ left: `${progress}%` }} />
          </div>
          <span className="splash__bar-pct">{Math.floor(progress)}%</span>
        </div>
      </div>

      {/* Honeycomb transition canvas — on top of everything */}
      <canvas ref={hexRef} className={`splash__hex ${hexActive ? 'splash__hex--active' : ''}`} />
    </div>
  );
}