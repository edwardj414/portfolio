import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const GROUPS = [
  { icon: '⚙', label: 'Backend', skills: [
    { name: 'Python',             pct: 95 },
    { name: 'Django & DRF',       pct: 93 },
    { name: 'Flask',              pct: 78 },
    { name: 'FastAPI',            pct: 72 },
    { name: 'PostgreSQL / MySQL', pct: 82 },
  ]},
  { icon: '◈', label: 'Frontend', skills: [
    { name: 'React / Vite',       pct: 88 },
    { name: 'JavaScript ES6+',    pct: 84 },
    { name: 'HTML5 & CSS3',       pct: 86 },
    { name: 'Tailwind CSS',       pct: 83 },
    { name: 'Monaco Editor',      pct: 72 },
  ]},
  { icon: '▲', label: 'DevOps & Tools', skills: [
    { name: 'Docker',             pct: 78 },
    { name: 'Git & GitHub Copilot', pct: 88 },
    { name: 'Railway / Vercel',   pct: 90 },
    { name: 'Stripe / SendGrid',  pct: 80 },
    { name: 'Twilio / REST-Auth', pct: 75 },
  ]},
];

const TAGS = [
  'Python','Django','DRF','Flask','FastAPI','React','Vite','Tailwind',
  'PostgreSQL','MySQL','Docker','Git','JWT','Stripe','SendGrid','Twilio',
  'AES','Pandas','NumPy','SDLC','Microservice','MVT','MVC','HTML5','CSS3',
  'GitHub Copilot','Railway','Vercel','REST API',
];

function Bar({ name, pct, animate }) {
  return (
    <div className="sbar">
      <div className="sbar__row">
        <span className="sbar__name">{name}</span>
        <span className="sbar__pct">{pct}<span style={{fontSize:'0.55rem',opacity:0.7}}>%</span></span>
      </div>
      <div className="sbar__track">
        <div className="sbar__fill" style={{ width: animate ? `${pct}%` : '0%' }} />
        <div className="sbar__glow" style={{ left: animate ? `${pct}%` : '0%' }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const barsRef  = useRef(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const el = barsRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnim(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <div data-scan className="skills__hd">
          <div className="section-label">Arsenal</div>
          <h2 className="section-title">Technical <span style={{color:'var(--cyan)'}}>Stack</span></h2>
          <p className="section-subtitle">Tools and technologies from 2+ years of production development.</p>
        </div>
        <div className="skills__grid" ref={barsRef} data-scan>
          {GROUPS.map(({ icon, label, skills }) => (
            <div key={label} className="skills__group card">
              <div className="skills__group-hd">
                <span className="skills__icon">{icon}</span>
                <span className="skills__label">{label}</span>
                <div className="skills__hd-line" />
              </div>
              {skills.map(s => <Bar key={s.name} {...s} animate={anim} />)}
            </div>
          ))}
        </div>
        <div data-scan className="skills__tags-wrap">
          <span className="skills__tags-title">full tech stack</span>
          <div className="skills__tags">
            {TAGS.map((t,i) => (
              <span key={t} className="chip skills__tag" style={{animationDelay:`${i*35}ms`}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
