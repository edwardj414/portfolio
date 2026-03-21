import './About.css';

const TIMELINE = [

  {
    year: '2025',
    code: 'PROJ',
    title: 'PythonLearn Platform',
    place: 'Personal Project',
    desc: 'Launched a full Python learning platform — 35+ lessons, XP quiz engine, animated UI, and user progress tracking on Django REST + React.',
  },
  {
    year: '2024',
    code: 'PROJ',
    title: 'DjangoLearn Platform',
    place: 'Personal Project',
    desc: 'Built an interactive Django tutorial site with Monaco Editor, JWT auth, lesson tracking, and full Railway + Vercel CI/CD pipeline.',
  },
  {
    year: '2021–2024',
    code: 'EXP',
    title: 'Trainee Programmer — Python',
    place: 'Ionixx Technologies, Chennai',
    desc: 'Built RESTful APIs across 3 Django-based projects. Boosted API performance 28% via package optimisation. Integrated Stripe payments, migrated a Java 8 Banking project to DRF, and deployed apps with Docker.',
  },
  {
    year: '2018–2022',
    code: 'EDU',
    title: 'B.E. Computer Science & Engineering',
    place: 'Paavai Engineering College, Namakkal',
    desc: 'Graduated with CGPA 7.98. Foundations in data structures, algorithms, DBMS, and software engineering.',
  },
];

const CERTS = [
  { title: 'Ethical Hacking', org: 'Kaashiv Intotech, Chennai', year: '2020' },
  { title: 'SD – Artificial Intelligence', org: 'SmartAnt Technologies, Chennai', year: '2021' },
];

const LANGS = [
  { l: 'Tamil',   level: 'Native',           pct: 100 },
  { l: 'English', level: 'Business Fluent',  pct: 90  },
  { l: 'French',  level: 'Fluent (R/S)',     pct: 70  },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__bg-text" aria-hidden>ABOUT</div>
      <div className="about__inner">
        <div className="about__header" data-scan>
          <div className="section-label">Identity</div>
          <h2 className="section-title">The Dev Behind<br/><span className="about__accent">The Terminal</span></h2>
        </div>
        <div className="about__body">

          {/* BIO CARD */}
          <div className="about__bio-frame card" data-scan>
            <div className="about__bio-hd">
              <span className="about__bio-tag">&gt;_ profile.json</span>
              <span className="about__bio-status chip">ACTIVE</span>
            </div>
            <div className="about__bio-body">
              <p>A highly motivated Python developer with <span className="about__hl">2+ years of production experience</span> at Ionixx Technologies — designing, enhancing, and maintaining large-scale web applications using advanced Python and Django concepts.</p>
              <p>My passion lies in <span className="about__hl">EdTech platforms</span> and developer-first tools. I built PythonLearn and DjangoLearn from scratch to make complex frameworks accessible through clean UI and gamified learning.</p>
              <p>I thrive in environments that value <span className="about__hl">continuous learning</span>, clean code, and delivering measurable impact — like the 28% API performance boost at Ionixx.</p>
            </div>
            <div className="about__meta">
              {[
                { k: 'LOCATION', v: 'Udumalpet / Chennai, India 🇮🇳' },
                { k: 'ROLE',     v: 'Python / Full-Stack Developer'   },
                { k: 'COMPANY',  v: 'Ionixx Technologies (2021–2024)' },
                { k: 'CONTACT',  v: 'dhilipanvb.414@proton.me',        active: true },
              ].map(({ k, v, active }) => (
                <div key={k} className="about__meta-row">
                  <span className="about__meta-key">{k}</span>
                  <span className={`about__meta-val ${active ? 'about__meta-val--active' : ''}`}>
                    {active && <span className="status-dot" style={{ marginRight: 8 }} />}{v}
                  </span>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="about__langs">
              <span className="about__langs-title">Languages</span>
              {LANGS.map(({ l, level, pct }) => (
                <div key={l} className="about__lang-row">
                  <span className="about__lang-name">{l}</span>
                  <span className="about__lang-level">{level}</span>
                  <div className="about__lang-bar">
                    <div className="about__lang-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE + CERTS */}
          <div className="about__right" data-scan>
            <div className="about__timeline-title">SYSTEM LOG</div>
            {TIMELINE.map(({ year, code, title, place, desc }) => (
              <div key={code+year} className="about__entry">
                <div className="about__entry-side">
                  <span className="about__entry-year">{year}</span>
                  <span className="about__entry-code">{code}</span>
                </div>
                <div className="about__entry-line">
                  <div className="about__entry-dot" />
                </div>
                <div className="about__entry-body">
                  <h4 className="about__entry-title">{title}</h4>
                  <span className="about__entry-place">{place}</span>
                  <p className="about__entry-desc">{desc}</p>
                </div>
              </div>
            ))}

            <div className="about__certs">
              <div className="about__certs-title">CERTIFICATIONS</div>
              {CERTS.map(({ title, org, year }) => (
                <div key={title} className="about__cert">
                  <span className="about__cert-icon">◈</span>
                  <div>
                    <div className="about__cert-name">{title}</div>
                    <div className="about__cert-org">{org} · {year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
