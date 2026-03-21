import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__scan" />
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-box">DH</span>
              <span className="footer__logo-rest">ILIPAN</span>
            </div>
            <p className="footer__tagline">
              2+ years building production web apps —<br/>Python · Django · React · Docker.
            </p>
            <div className="footer__status">
              <span className="status-dot" />
              <span>All systems operational</span>
            </div>
          </div>

          <div className="footer__nav">
            <div className="footer__nav-col">
              <span className="footer__nav-head">Navigate</span>
              {['about','skills','projects','contact'].map(l => (
                <a key={l} href={`#${l}`} className="footer__link">
                  <span className="footer__link-pre">./</span>{l}
                </a>
              ))}
            </div>
            <div className="footer__nav-col">
              <span className="footer__nav-head">Stack</span>
              {['Django 5.x','React 18','PostgreSQL','Railway','Vercel'].map(s => (
                <span key={s} className="footer__stack">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">© {year} Dhilipan Balasubramanian · dhilipanvb.414@proton.me</span>
          <span className="footer__loc">
            <span className="footer__loc-dot">◉</span> Chennai, India
          </span>
          <span className="footer__ver">v2.0.0</span>
        </div>
      </div>

      <div className="footer__bg-text" aria-hidden>DJANGO</div>
    </footer>
  );
}
