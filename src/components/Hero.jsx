import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const ROLES = [
  'Python Developer',
  'Django REST Expert',
  'Full-Stack Engineer',
  'EdTech Builder',
  'React Developer',
];

function useTyping(words, speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const s = useRef({ wi: 0, ci: 0, del: false });

  useEffect(() => {
    let timer;
    const tick = () => {
      const { wi, ci, del } = s.current;
      const word = words[wi];
      if (!del) {
        if (ci < word.length) {
          s.current.ci += 1;
          setText(word.slice(0, s.current.ci));
          timer = setTimeout(tick, speed);
        } else {
          timer = setTimeout(() => { s.current.del = true; tick(); }, pause);
        }
      } else {
        if (ci > 0) {
          s.current.ci -= 1;
          setText(word.slice(0, s.current.ci));
          timer = setTimeout(tick, speed / 2);
        } else {
          s.current.del = false;
          s.current.wi  = (wi + 1) % words.length;
          s.current.ci  = 0;
          setText('');
          timer = setTimeout(tick, 100);
        }
      }
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  // only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}

function MatrixCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const cols  = Math.floor(w / 18);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = '01アイウエオDJANGOPYTHON{}[]()<>/\\';
    let raf;
    const draw = () => {
      ctx.fillStyle = 'rgba(2,8,23,0.05)';
      ctx.fillRect(0, 0, w, h);
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillStyle = y*18 < 30 ? '#00d4ff' : `rgba(0,153,187,${Math.random()*0.4+0.1})`;
        ctx.font = '11px JetBrains Mono,monospace';
        ctx.fillText(ch, i*18, y*18);
        if (y*18 > h && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 0.5;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className="hero__matrix" />;
}

export default function Hero() {
  const role = useTyping(ROLES);
  return (
    <section className="hero" id="hero">
      <div className="hero__matrix-wrap"><MatrixCanvas /></div>
      <div className="hero__orb hero__orb--cyan" />
      <div className="hero__orb hero__orb--violet" />
      <div className="hero__inner">
        <div className="hero__left">
          <div data-scan className="hero__sys-line">
            <span className="hero__sys-dot status-dot" />
            <span className="hero__sys-text">SYSTEM ONLINE — PORTFOLIO v2.0 // CHENNAI, INDIA</span>
          </div>
          <div data-scan className="hero__greeting">INITIALIZING...</div>
          <h1 data-scan className="hero__name glitch" data-text="DHILIPAN">DHILIPAN</h1>
          <div data-scan className="hero__role-line">
            <span className="hero__role-bracket">[ </span>
            <span className="hero__role">{role}</span>
            <span className="blink hero__cursor">_</span>
            <span className="hero__role-bracket"> ]</span>
          </div>
          <p data-scan className="hero__bio">
            <span className="hero__hl">2+ years</span> of production experience at{' '}
            <span className="hero__hl">Ionixx Technologies</span> building large-scale web apps
            with Django REST Framework &amp; React. Improved API performance by{' '}
            <span className="hero__hl">28%</span> and shipped FinTech, EdTech, and Stripe-integrated platforms.
          </p>
          <div data-scan className="hero__actions">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact"  className="btn btn-outline">Get In Touch</a>
          </div>
          <div data-scan className="hero__stats">
            {[
              { v: '2+',  l: 'Years Exp'    },
              { v: '28%', l: 'API Boost'    },
              { v: '4+',  l: 'Django Apps'  },
              { v: '2',   l: 'Personal Projects'}
            ].map(({ v, l }) => (
              <div key={l} className="hero__stat" data-scan-child>
                <span className="hero__stat-val">{v}</span>
                <span className="hero__stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__right">
          <div data-scan className="hero__terminal card">
            <div className="hero__term-bar">
              <div className="hero__term-dots">
                <span style={{background:'#ff5f56'}} />
                <span style={{background:'#ffbd2e'}} />
                <span style={{background:'#27c93f'}} />
              </div>
              <span className="hero__term-title">dhilipan@django ~ python</span>
              <span className="hero__term-ping">● LIVE</span>
            </div>
            <pre className="hero__code">{`# performance_api.py — Production
from rest_framework.views import APIView
from rest_framework.response import Response

class ESignatureView(APIView):
    """
    Optimized by 28% via package profiling
    & design pattern restructuring.
    """
    def post(self, request):
        serializer = SignatureSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.save())

# ✓ Stripe · Docker · Railway · DRF`}</pre>
            <div className="hero__term-glow" />
          </div>
          <div data-scan className="hero__badges">
            {['Python','Django','DRF','React','PostgreSQL','Docker','Stripe','JWT'].map((t,i)=>(
              <span key={t} className="chip" data-scan-child style={{transitionDelay:`${i*55}ms`}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="hero__scroll">
        <div className="hero__scroll-line"><div className="hero__scroll-fill" /></div>
        <span className="hero__scroll-label">SCROLL</span>
      </div>
    </section>
  );
}