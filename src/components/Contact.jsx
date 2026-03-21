import { useState } from 'react';
import './Contact.css';

const MY_EMAIL = 'dhilipanvb.414@proton.me';
const MY_NAME  = 'Dhilipan Balasubramanian';

/* ── Email template generator ── */
function buildEmailTemplate({ name, email, message }) {
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const subject = `Portfolio Enquiry from ${name}`;

  // Plain-text body (works for mailto + Gmail)
  const body = [
    `Hi ${MY_NAME},`,
    ``,
    `I came across your portfolio and would like to get in touch.`,
    ``,
    `─────────────────────────────`,
    `  Name    : ${name}`,
    `  Email   : ${email}`,
    `  Date    : ${date}`,
    `─────────────────────────────`,
    ``,
    `Message:`,
    `${message}`,
    ``,
    `─────────────────────────────`,
    ``,
    `Looking forward to your response.`,
    ``,
    `Best regards,`,
    `${name}`,
    `${email}`,
  ].join('\n');

  return { subject, body };
}

/* ── Open in Gmail compose (Chrome) with fallback to mailto ── */
function openEmail({ subject, body }) {
  const encoded = {
    to:      encodeURIComponent(MY_EMAIL),
    su:      encodeURIComponent(subject),
    body:    encodeURIComponent(body),
  };

  // Gmail compose URL — opens in Chrome's default Gmail tab
  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encoded.to}` +
    `&su=${encoded.su}` +
    `&body=${encoded.body}`;

  // mailto fallback (opens system mail app if Gmail fails)
  const mailtoUrl =
    `mailto:${MY_EMAIL}` +
    `?subject=${encoded.su}` +
    `&body=${encoded.body}`;

  // Try Gmail first; if the tab is blocked, fall back to mailto
  const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = mailtoUrl;
  }
}

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@dhilipan414',
    href: 'https://github.com/edwardj414',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/dhilipan414',
    href: 'https://linkedin.com/in/dhilipan414',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'Email',
    handle: 'dhilipanvb.414@proton.me',
    href: 'mailto:dhilipanvb.414@proton.me',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | opening | sent
  const [openedWith, setOpenedWith] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setStatus('opening');

    const { subject, body } = buildEmailTemplate(form);

    // Detect if Gmail is likely available (Chrome + logged-in Gmail)
    // We always try Gmail first, falling back to mailto
    const encoded = {
      to:   encodeURIComponent(MY_EMAIL),
      su:   encodeURIComponent(subject),
      body: encodeURIComponent(body),
    };

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encoded.to}&su=${encoded.su}&body=${encoded.body}`;

    const mailtoUrl =
      `mailto:${MY_EMAIL}?subject=${encoded.su}&body=${encoded.body}`;

    // Small delay so the "opening" state is visible
    setTimeout(() => {
      const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        // Pop-up blocked — fall back to mailto (system mail app)
        window.location.href = mailtoUrl;
        setOpenedWith('mail app');
      } else {
        setOpenedWith('Gmail');
      }
      setStatus('sent');
    }, 600);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__glow-l" />
      <div className="contact__glow-r" />

      <div className="contact__inner">
        <div data-scan className="contact__header">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Initiate <span className="contact__accent">Connection</span></h2>
          <p className="section-subtitle">Ready to build something? Send a transmission and I'll respond within 24 hours.</p>
        </div>

        <div className="contact__body">
          {/* FORM */}
          <div data-scan className="contact__form-wrap card">
            <div className="contact__form-top">
              <div className="contact__form-dots">
                <span style={{ background: '#ff5f56' }} />
                <span style={{ background: '#ffbd2e' }} />
                <span style={{ background: '#27c93f' }} />
              </div>
              <span className="contact__form-label">TRANSMIT MESSAGE</span>
              <span className="contact__form-online chip">● ONLINE</span>
            </div>

            {status === 'sent' ? (
              <div className="contact__success">
                <div className="contact__success-ring">
                  <span className="contact__success-icon">✓</span>
                </div>
                <h3 className="contact__success-title">Email Template Ready</h3>
                <p className="contact__success-sub">
                  Opened in <strong>{openedWith}</strong> with your message pre-filled.
                  Just hit Send!
                </p>
                <div className="contact__success-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const { subject, body } = buildEmailTemplate(form);
                      openEmail({ subject, body });
                    }}
                  >
                    Open Again ↗
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => { setStatus('idle'); setForm({ name:'', email:'', message:'' }); setOpenedWith(''); }}
                  >
                    New Message
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit}>
                {[
                  { id: 'name',  label: 'YOUR_NAME',  type: 'text',  placeholder: 'John Doe' },
                  { id: 'email', label: 'YOUR_EMAIL', type: 'email', placeholder: 'john@example.com' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="contact__field">
                    <label className="contact__label" htmlFor={id}>
                      <span className="contact__label-sym">▸ </span>{label}
                    </label>
                    <input
                      id={id} name={id} type={type}
                      className="contact__input"
                      placeholder={placeholder}
                      value={form[id]}
                      onChange={onChange}
                      required
                    />
                  </div>
                ))}
                <div className="contact__field">
                  <label className="contact__label" htmlFor="message">
                    <span className="contact__label-sym">▸ </span>MESSAGE_BODY
                  </label>
                  <textarea
                    id="message" name="message"
                    className="contact__input contact__textarea"
                    placeholder="I'd like to discuss..."
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary contact__submit ${status === 'opening' ? 'contact__submit--busy' : ''}`}
                  disabled={status === 'opening'}
                >
                  {status === 'opening'
                    ? <><span className="contact__spinner" /> Opening Email...</>
                    : <>Send via Gmail / Mail App →</>}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT */}
          <div data-scan className="contact__panel">
            <div className="contact__socials card">
              <div className="contact__socials-head">
                <span className="contact__socials-title">Direct Links</span>
              </div>
              {SOCIALS.map(({ label, handle, href, icon }) => (
                <a key={label} href={href} className="contact__social" target="_blank" rel="noreferrer">
                  <span className="contact__social-icon">{icon}</span>
                  <div className="contact__social-info">
                    <span className="contact__social-label">{label}</span>
                    <span className="contact__social-handle">{handle}</span>
                  </div>
                  <span className="contact__social-arrow">→</span>
                </a>
              ))}
            </div>

            <div className="contact__status card">
              <div className="contact__status-row">
                <span className="status-dot" />
                <span className="contact__status-title">Available for Work</span>
              </div>
              <p className="contact__status-desc">Open to full-time Python/Django roles, freelance projects, and EdTech collaborations. Available immediately.</p>
            </div>

            <div className="contact__terminal card">
              <pre className="contact__term-code">{`>>> import dhilipan
>>> dhilipan.status()
{ available: True,
  location: "Chennai, IN",
  response_time: "< 24h" }
>>> dhilipan.hire()
"Let's build something great."`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}