/* Portfolio Sections A: Nav, Hero, About */

/* ── SVG Icon helpers ──────────────────────── */
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const IconArrowUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);
const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

/* ── Typing hook ───────────────────────────── */
function useTyping(text, speed = 70, delay = 800) {
  const [displayed, setDisplayed] = React.useState('');
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    let i = 0;
    let cancelled = false;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return;
        if (i < text.length) {
          i++;
          setDisplayed(text.slice(0, i));
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, delay);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [text, speed, delay]);

  return { displayed, done };
}

/* ── Navigation ────────────────────────────── */
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { id: 'about', label: 'about' },
    { id: 'works', label: 'works' },
    { id: 'skills', label: 'skills' },
    { id: 'timeline', label: 'timeline' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <React.Fragment>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          Coderk-star<span className="dot">.</span>
        </a>
        <div className="nav-links nav-links-desktop">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="nav-link"
               onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}>
              {l.label}
            </a>
          ))}
        </div>
        <button className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="nav-link"
             onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}>
            {l.label}
          </a>
        ))}
      </div>
    </React.Fragment>
  );
};

/* ── Hero ──────────────────────────────────── */
const Hero = ({ accentColor, particleDensity }) => {
  const { displayed } = useTyping('Engineer / University Student', 65, 900);

  return (
    <section className="hero" id="hero">
      <div className="hero-canvas">
        <ParticleCanvas accentColor={accentColor} density={particleDensity} />
      </div>
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-greeting">&gt; Hi, I'm</p>
          <h1 className="hero-name">Coderk-star</h1>
          <p className="hero-tagline">
            {displayed}<span className="cursor"></span>
          </p>
          <p className="hero-desc">
            フロントエンドやバックエンドを学んでいるエンジニア志望の現役大学生です。
            OSSや自動化ツールに取り組んでいます。
          </p>
          <div className="hero-social">
            <a href="https://github.com/CoderK-star" target="_blank" rel="noopener noreferrer"
               className="hero-social-btn" title="GitHub"><IconGitHub /></a>
            <a href="mailto:codeyuki2@gmail.com"
               className="hero-social-btn" title="Email"><IconMail /></a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
               className="hero-social-btn" title="X / Twitter"><IconX /></a>
          </div>
        </div>

        <div className="neofetch-card">
          <div className="neofetch-header">
            <div className="neofetch-dots"><span></span><span></span><span></span></div>
            <span className="neofetch-title">neofetch</span>
          </div>
          <div className="neofetch-body">
            <div><span className="nf-label">CoderK-star</span><span className="nf-sep">@</span>portfolio</div>
            <span className="neofetch-divider">────────────────</span>
            <div><span className="nf-label">OS</span><span className="nf-sep">:</span> Human v19</div>
            <div><span className="nf-label">Host</span><span className="nf-sep">:</span>JP</div>
            <div><span className="nf-label">Uptime</span><span className="nf-sep">:</span> 2006 ~</div>
            <div><span className="nf-label">Shell</span><span className="nf-sep">:</span> Engineer / Student</div>
            <div><span className="nf-label">Lang</span><span className="nf-sep">:</span> JP, EN, VN</div>
            <div><span className="nf-label">Editor</span><span className="nf-sep">:</span> VS Code</div>
            <div><span className="nf-label">Theme</span><span className="nf-sep">:</span> Dark</div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll"
         onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
        scroll
        <IconChevronDown />
      </a>
    </section>
  );
};

/* ── Terminal Window Component ─────────────── */
const TerminalWindow = ({ title, children }) => (
  <div className="terminal-window">
    <div className="terminal-header">
      <div className="terminal-dots">
        <span className="terminal-dot"></span>
        <span className="terminal-dot"></span>
        <span className="terminal-dot"></span>
      </div>
      <span className="terminal-title-text">{title}</span>
    </div>
    <div className="terminal-body">{children}</div>
  </div>
);

/* ── About ─────────────────────────────────── */
const About = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);

  return (
    <section className="section about-section" id="about" ref={ref}>
      <div className="section-inner">
        <p className="section-label">
          <span className="sl-accent">//</span> About
        </p>
        <div className={`about-grid fade-up ${inView ? 'in-view' : ''}`}>
          <TerminalWindow title="~/about">
            <div className="t-line">
              <span className="t-prompt">$</span>
              <span className="t-cmd">who-am-i</span>
            </div>
            <div className="t-output">CoderK-star</div>

            <div className="t-line">
              <span className="t-prompt">$</span>
              <span className="t-cmd">cat</span> <span className="t-flag">profile.txt</span>
            </div>
            <div className="t-output">
              ベトナム出身、日本に移住して9年目になります。麗澤大学工学部情報システム工学専攻 2年生、
              情報技術や数学を中心に学んでいます。現在はバイブコーディングを使ってOSSや自動化に取り組み、
              スキルアップに励んでいます。
            </div>
            <div className="t-output" style={{ marginBottom: '16px' }}>
              趣味は読書とアニメ鑑賞。英語はTOEIC 650点レベル、
              最近は資格勉強に取り組んでいます。
            </div>

            <div className="t-line">
              <span className="t-prompt">$</span>
              <span className="t-cmd">env</span> <span className="t-flag">| grep INFO</span>
            </div>
            <div className="t-env-tags">
              <span className="t-env-tag">Chiba, Japan</span>
              <span className="t-env-tag">Japanese / English</span>
              <span className="t-env-tag">Engineering</span>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  IconGitHub, IconMail, IconX, IconArrowUp, IconChevronDown,
  useTyping, Nav, Hero, TerminalWindow, About,
});
