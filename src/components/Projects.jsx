import { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 'pyplatform',
    num: '001',
    label: 'Featured Project',
    title: 'PythonLearn',
    subtitle: 'Interactive Python Learning Platform',
    desc: 'A production-grade EdTech platform built from scratch. Features 35+ interactive lessons across 12 topics, an XP-based quiz engine, animated snake cursor, dark futuristic UI, and real-time progress tracking — all powered by Django REST Framework.',
    previewImg: '/preview-pyplatform.png',
    live: 'https://pyplatform.vercel.app/',
    siteUrl: 'https://pyplatform.vercel.app/',
    github: 'https://github.com/edwardj414/pyplatform',
    tags: ['Django', 'DRF', 'React', 'Vite', 'Tailwind', 'PostgreSQL', 'Railway', 'Vercel'],
    stats: [{ k: 'Lessons', v: '35+' }, { k: 'Topics', v: '17' }, { k: 'Engine',    v: 'XP Quiz' }],
    accent: 'var(--emerald-bright)',
    rgb: '0,212,255',
  },
  {
    id: 'djangolearn',
    num: '002',
    label: 'Featured Project',
    title: 'DjangoLearn',
    subtitle: 'Interactive Django Tutorial Platform',
    desc: 'A full-featured Django learning platform with Monaco Editor integration for live in-browser code editing, lesson progress tracking, JWT authentication, and a Railway + Vercel deployment pipeline.',
    previewImg: '/preview-djangolearn.png',
    live: 'https://djangolearn.vercel.app/',
    siteUrl: 'https://djangolearn.vercel.app/',
    github: 'https://github.com/edwardj414/djangolearn',
    tags: ['Django', 'DRF', 'React', 'Monaco Editor', 'Render', 'PostgreSQL', 'JWT'],
    stats: [{ k: 'Editor', v: 'Monaco' }, { k: 'Backend', v: 'Render' }, { k: 'Auth', v: 'JWT' }],
    accent: 'var(--violet-bright)',
    rgb: '168,85,247',
  },
  {
    id: 'portfolio',
    num: '003',
    label: 'Personal Project',
    title: 'Portfolio v2.0',
    subtitle: 'This Developer Portfolio',
    desc: 'A deep-ocean cyberpunk portfolio with matrix rain canvas, one-shot scan beam reveal, glitch animations, animated hex grid, and a custom RAF-driven cursor — built in React + Vite, deployed on Vercel.',
    previewImg: null,
    live: '#',
    siteUrl: null,
    github: '#',
    tags: ['React', 'Vite', 'CSS', 'Vercel', 'RAF Engine'],
    stats: [{ k: 'Theme', v: 'Cyberpunk' }, { k: 'Deploy', v: 'Vercel' }, { k: 'FX', v: '20+' }],
    accent: 'var(--cyan)',
    rgb: '0,212,255',
  },
];

function BrowserMockup({ previewImg, siteUrl, accent, rgb }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bmock ${hovered ? 'bmock--hovered' : ''}`}
      style={{ '--accent': accent, '--rgb': rgb }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Browser chrome bar */}
      <div className="bmock__bar">
        <div className="bmock__dots">
          <span style={{ background: '#ff5f56' }} />
          <span style={{ background: '#ffbd2e' }} />
          <span style={{ background: '#27c93f' }} />
        </div>
        <div className="bmock__addr">
          <span className="bmock__lock">🔒</span>
          <span className="bmock__url">{siteUrl}</span>
        </div>
        <a href={siteUrl} target="_blank" rel="noreferrer" className="bmock__extlink">↗</a>
      </div>

      {/* Static preview image */}
      <div className="bmock__screen">
        <img
          src={previewImg}
          alt={`${siteUrl} preview`}
          className="bmock__img"
          loading="lazy"
        />

        {/* Hover CTA overlay */}
        <div className="bmock__overlay">
          <a href={siteUrl} target="_blank" rel="noreferrer" className="bmock__cta">
            Visit Live Site ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ p, flip }) {
  return (
    <div
      data-scan
      className={`pf-card ${flip ? 'pf-card--flip' : ''}`}
      style={{ '--accent': p.accent, '--rgb': p.rgb }}
    >
      {/* Text side */}
      <div className="pf-card__text">
        <div className="pf-card__label">{p.label}</div>
        <h3 className="pf-card__title">{p.title}</h3>
        <p className="pf-card__subtitle">{p.subtitle}</p>
        <div className="pf-card__desc-box">
          <p className="pf-card__desc">{p.desc}</p>
        </div>
        <div className="pf-card__stats">
          {p.stats.map(({ k, v }) => (
            <div key={k} className="pf-card__stat">
              <span className="pf-card__stat-v">{v}</span>
              <span className="pf-card__stat-k">{k}</span>
            </div>
          ))}
        </div>
        <div className="pf-card__tags">
          {p.tags.map(t => <span key={t} className="chip pf-tag">{t}</span>)}
        </div>
        <div className="pf-card__actions">
          <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary">Live Demo ↗</a>
          <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
        </div>
      </div>

      {/* Preview side */}
      <div className="pf-card__preview">
        <BrowserMockup
          previewImg={p.previewImg}
          siteUrl={p.siteUrl}
          accent={p.accent}
          rgb={p.rgb}
        />
        <div
          className="pf-card__glow"
          style={{ background: `radial-gradient(ellipse, rgba(${p.rgb},0.1) 0%, transparent 70%)` }}
        />
      </div>
    </div>
  );
}

function SmallCard({ p }) {
  return (
    <div data-scan className="ps-card card" style={{ '--accent': p.accent }}>
      <div className="ps-card__top">
        <span className="ps-card__num">[{p.num}]</span>
        <span className="ps-card__label">{p.label}</span>
      </div>
      <div className="ps-card__bar" style={{ background: p.accent }} />
      <h3 className="ps-card__title">{p.title}</h3>
      <p className="ps-card__sub">{p.subtitle}</p>
      <p className="ps-card__desc">{p.desc}</p>
      <div className="ps-card__tags">
        {p.tags.map(t => <span key={t} className="chip ps-tag">{t}</span>)}
      </div>
      <div className="ps-card__actions">
        <a href={p.live}   className="btn btn-primary  ps-btn">Live</a>
        <a href={p.github} className="btn btn-outline  ps-btn">GitHub</a>
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = PROJECTS.filter(p => p.previewImg);
  const others   = PROJECTS.filter(p => !p.previewImg);

  return (
    <section className="projects" id="projects">
      <div className="projects__inner">

        <div data-scan className="projects__hd">
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            Deployed <span style={{ color: 'var(--cyan)' }}>Systems</span>
          </h2>
          <p className="section-subtitle">
            Production applications shipped end-to-end — live previews below.
          </p>
        </div>

        <div className="projects__featured">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} p={p} flip={i % 2 === 1} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="projects__others">
            <div data-scan className="projects__others-label">Other Projects</div>
            <div className="projects__others-grid">
              {others.map(p => <SmallCard key={p.id} p={p} />)}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
