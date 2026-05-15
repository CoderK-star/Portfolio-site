/* Portfolio Sections B: Works, Skills, Timeline, Footer + useInView hook */

/* ── useInView hook ────────────────────────── */
function useInView(ref, opts = {}) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...opts });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

/* ── Works Data ────────────────────────────── */
const WORKS_DATA = [
  {
    id: 1, title: 'Reitaku Campus',
    period: '2025.04 – 2025.07',
    desc: '初学者向けに操作導線を極力シンプルにしたWebアプリ。トップビューの印象と、登録まで迷わせない体験設計を中心に組み立てました。',
    tech: ['HTML / CSS / JS', 'LP UI設計', 'Mobile First'],
    image: 'assets/images/projects/reitaku/thumb1.png',
    repo: 'https://github.com/CoderK-star/ReitakuCampus',
    featured: true,
  },
  {
    id: 2, title: 'ごみ分別AI Gomical',
    period: '2024.10 – 2024.12',
    desc: 'AWS構成の学習用に、通信経路とサーバの役割が一目でわかる図解つきの検証環境を構築。インフラ構成を言語化して説明できることを重視。',
    tech: ['EC2 / SG', 'Network可視化', 'Backup構成'],
    image: 'assets/images/projects/gomical/thumb1.jpg',
    repo: 'https://github.com/CoderK-star/gomical',
    featured: false,
  },
  {
    id: 3, title: 'Miramath',
    period: '2026.04 – 2026.05',
    desc: '個人レベルに合わせた数学学習WebアプリPWA。LaTeX対応チャット・演習採点・RAGによる資料検索・進捗可視化を実装。Gemini APIをバックエンドに、Vercel + Cloud Run構成で本番稼働中。',
    tech: ['Next.js / FastAPI', 'Google Gemini RAG', 'PostgreSQL + pgvector'],
    image: 'assets/images/projects/miramath/thumb1.png',
    repo: 'https://github.com/CoderK-star/miramath',
    featured: true,
  },
  {
    id: 4, title: 'Zene',
    period: '2026.04 – 2026.05',
    desc: '小説執筆とAI相談を統合したWebエディタ。4モードエージェント（講義・プロット・添削・キャラ）のRAG搭載AI講師と、Tiptapベースの本格エディタを組み合わせ、初心者が作品執筆をゼロから始められる環境を構築。',
    tech: ['Next.js / Tiptap v3', 'OpenAI マルチエージェント', 'SQLite + Drizzle ORM'],
    image: 'assets/images/projects/zene/thumb1.png',
    repo: 'https://github.com/CoderK-star/Zene',
    featured: false,
  },
  {
    id: 5, title: 'Personal Blog',
    period: '2025.01 – 2025.03',
    desc: '記事一覧、プロフィール、ピックアップ導線を1ページで完結させた個人ブログ。読みやすさと更新しやすい構成の両立をテーマに。',
    tech: ['Blog設計', 'Card UI', 'Sidebar導線'],
    image: null, repo: null, wip: true, featured: false,
  },
  {
    id: 6, title: 'Slack Bot UI',
    period: '2025.02 – 2025.04',
    desc: '通知整理や定型応答を自動化するSlack BotのUIモック。スマホから見たときの会話体験を先に固めてから機能を整理。',
    tech: ['Bot会話UI', 'Mobile Mock', '通知導線'],
    image: null, repo: null, wip: true, featured: false,
  },
];

/* ── Works Section ─────────────────────────── */
const WorkCard = ({ project }) => {
  const hasImage = !!project.image;
  const [imgErr, setImgErr] = React.useState(false);

  const placeholderGradients = [
    'linear-gradient(135deg, #1a1a3e, #2a1a40)',
    'linear-gradient(135deg, #1a2a3e, #1a1a30)',
    'linear-gradient(135deg, #2a1a2a, #1a1a3e)',
    'linear-gradient(135deg, #1a2a2a, #12122a)',
  ];

  return (
    <div className={`work-card ${project.featured ? 'work-card-featured' : ''} ${project.wip ? 'work-card-wip' : ''}`}>
      <div className="work-card-visual">
        {hasImage && !imgErr ? (
          <img src={project.image} alt={project.title}
               className="work-card-img" loading="lazy"
               onError={() => setImgErr(true)} />
        ) : (
          <div className="work-card-placeholder"
               style={{ background: placeholderGradients[project.id % placeholderGradients.length] }}>
            {project.wip
              ? <span className="work-card-wip-badge">Coming soon</span>
              : <span className="work-card-placeholder-icon">{'{ }'}</span>
            }
          </div>
        )}
        <div className="work-card-overlay">
          <div className="work-card-period">{project.period}</div>
          <h3 className="work-card-overlay-title">{project.title}</h3>
          <p className="work-card-detail">{project.desc}</p>
          <div className="work-card-tech">
            {project.tech.map((t, i) => (
              <span key={i} className="work-tech-tag">{t}</span>
            ))}
          </div>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer"
               className="work-card-repo-link" title="GitHub で見る"
               onClick={(e) => e.stopPropagation()}>
              <IconGitHub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);

  return (
    <section className="section works-section" id="works" ref={ref}>
      <div className="section-inner">
        <p className="section-label">
          <span className="sl-accent">/*</span> Works <span className="sl-accent">*/</span>
        </p>
        <div className={`works-grid fade-up ${inView ? 'in-view' : ''}`}>
          {WORKS_DATA.map((p) => <WorkCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
};

/* ── Skills Data ───────────────────────────── */
const SKILLS_BARS = [
  { name: 'Frontend', value: 85 },
  { name: 'Hardware', value: 20 },
  { name: 'Backend', value: 70 },
  { name: 'Algorithm', value: 30 },
  { name: 'DevOps', value: 40},
  { name: 'Design', value: 50 },
];

const SKILL_GROUPS = [
  { label: 'Frontend', items: ['HTML / CSS', 'JavaScript', 'React', 'TypeScript'] },
  { label: 'Backend', items: ['Node.js', 'Python', 'REST API'] },
  { label: 'Infra / Tools', items: ['Git / GitHub', 'Docker', 'Vercel', 'Cloudflare'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'Vue.js', 'Ruby'] },
];

/* ── Skills Section ────────────────────────── */
const Skills = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="section-inner">
        <p className="section-label">
          <span className="sl-accent">$</span> cat skills.log
        </p>
        <p className={`skills-desc fade-up ${inView ? 'in-view' : ''}`}>
          AIを活用しながらスキルを学んでいきました。広く浅くでありますが幅広い技術に触れてスキルアップを目指しました。
          今後は基礎だけでなく、応用的な深い部分も理解を進めていきたいと考えています。
        </p>

        <div className={`skills-bars fade-up ${inView ? 'in-view' : ''}`}
             style={{ transitionDelay: '0.15s' }}>
          {SKILLS_BARS.map((s, i) => (
            <div key={s.name} className="skill-bar-row">
              <span className="skill-bar-name">{s.name}</span>
              <div className="skill-bar-track">
                <div className="skill-bar-fill"
                     style={{
                       width: inView ? `${s.value}%` : '0%',
                       transitionDelay: `${0.15 + i * 0.1}s`,
                     }} />
              </div>
              <span className="skill-bar-val">{s.value}%</span>
            </div>
          ))}
        </div>

        <div className={`skills-groups fade-up ${inView ? 'in-view' : ''}`}
             style={{ transitionDelay: '0.35s' }}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label}>
              <h6 className="skill-group-label">{g.label}</h6>
              <div className="skill-chips">
                {g.items.map((item) => (
                  <span key={item} className="skill-chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Timeline Data ─────────────────────────── */
const TIMELINE_DATA = [
  { hash: 'e4b7d3c', year: '2025', title: '大学 入学', desc: '情報システムや数学を学ぶ。' },
  { hash: '2c8a91f', year: '2022', title: '高校入学 / ものづくりをはじめる', desc: '自主的に勉強し、簿記やプログラミングに取り組み、資格を取得。' },
  { hash: 'f8d4e2a', year: '2017', title: '日本に移住', desc: '小学校に通い、文化の違いに苦しみながらもがく。' },
  { hash: 'a3f2b1c', year: '2006', title: '誕生', desc: 'ベトナムにて生まれる。幼少期からゲームやマンガに親しむ。' },
];

/* ── Timeline Section ──────────────────────── */
const Timeline = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);

  return (
    <section className="section timeline-section" id="timeline" ref={ref}>
      <div className="section-inner">
        <p className="section-label">
          <span className="sl-accent">$</span> git log --oneline
        </p>
        <div className={`git-log fade-up ${inView ? 'in-view' : ''}`}>
          {TIMELINE_DATA.map((entry, idx) => (
            <div key={entry.hash} className="git-entry"
                 style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="git-graph">
                <div className="git-dot"></div>
                {idx < TIMELINE_DATA.length - 1 && <div className="git-connector"></div>}
              </div>
              <div className="git-content">
                <div className="git-meta">
                  <span className="git-hash">{entry.hash}</span>
                  <span className="git-year">{entry.year}</span>
                </div>
                <h4 className="git-title">{entry.title}</h4>
                <p className="git-desc">{entry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Footer ────────────────────────────────── */
const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-left">
        <span className="footer-prompt">$</span>
        Thank you for visiting.
        <span style={{ marginLeft: '16px', opacity: 0.5 }}>&copy; 2025 YUKI</span>
      </div>
      <div className="footer-links">
        <a href="https://github.com/CoderK-star" target="_blank" rel="noopener noreferrer"
           className="footer-link" title="GitHub"><IconGitHub /></a>
        <a href="mailto:your@email.com" className="footer-link" title="Email"><IconMail /></a>
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
           className="footer-link" title="X"><IconX /></a>
      </div>
    </div>
  </footer>
);

/* ── Scroll to Top Button ──────────────────── */
const ScrollTopBtn = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <button className={`scroll-top-btn ${visible ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="トップへ戻る">
      <IconArrowUp />
    </button>
  );
};

Object.assign(window, {
  useInView, Works, Skills, Timeline, Footer, ScrollTopBtn,
});
