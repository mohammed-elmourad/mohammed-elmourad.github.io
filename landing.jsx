/* ============================================
   USEFUL AI — School-facing landing app
   ============================================ */

const { useState, useEffect, useRef } = React;

/* ---------- TWEAKABLE DEFAULTS ---------- */
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#C5F23B", "#0E120F", "#FF5436"],
  "heroVariant": "default",
  "showTicker": true,
  "ctaCopy": "Book a free session"
}/*EDITMODE-END*/;

const PALETTE_OPTIONS = [
  { key: "lime",   colors: ["#C5F23B", "#0E120F", "#FF5436"] },
  { key: "citrus", colors: ["#FF5436", "#0E120F", "#FFD83D"] },
  { key: "cobalt", colors: ["#2545FF", "#0E120F", "#FFD83D"] },
  { key: "mint",   colors: ["#B8E994", "#0E120F", "#F08A5D"] },
];

function paletteKeyFor(colorsArr) {
  if (!Array.isArray(colorsArr)) return "lime";
  const match = PALETTE_OPTIONS.find(p => JSON.stringify(p.colors).toLowerCase() === JSON.stringify(colorsArr).toLowerCase());
  return match ? match.key : "lime";
}

/* ---------- ICONS (minimal, geometric) ---------- */
const Icon = {
  Arrow: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowDown: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3 3 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Plus: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Star: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0l1.8 5.6h5.9l-4.8 3.5 1.8 5.6L8 11.2l-4.8 3.5 1.8-5.6L.3 5.6h5.9z"/>
    </svg>
  ),
};

/* ---------- REVEAL ON SCROLL ---------- */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- NAV ---------- */
function Nav({ active = "schools" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <a href="index.html" className="brand">
          <span className="brand-mark">U</span>
          Useful AI
        </a>
        <nav className="nav-links">
          <a href="index.html" className={"nav-link" + (active === "schools" ? " active" : "")}>For Schools</a>
          <a href="sponsors.html" className={"nav-link" + (active === "sponsors" ? " active" : "")}>For Sponsors</a>
          <a href="#book" className="nav-link hide-mobile">Book</a>
          <a href="#book" className="btn btn-primary btn-sm" style={{marginLeft: 8}}>
            Book a session <Icon.Arrow size={12} />
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero({ variant, ctaCopy }) {
  const variants = {
    default: {
      eyebrow: "An in-school program · Sydney · 2026",
      headline: <>The AI program your students will <em className="hi">actually</em> use.</>,
      lede: "A practical, in-person seminar series teaching high schoolers how to use AI tools the way university students and working professionals already do — for thinking, writing, study, and shipping real work.",
    },
    blunt: {
      eyebrow: "An in-school program · Sydney · 2026",
      headline: <>Your students are <em className="hi">already</em> using AI. Teach them how to do it well.</>,
      lede: "Most schools are reactive — they ban it, restrict it, or quietly hope teachers will sort it out. Useful AI is what comes after that.",
    },
    "study-skill": {
      eyebrow: "An in-school program · Sydney · 2026",
      headline: <>AI as a <em className="hi">study skill</em>, not a science-fair topic.</>,
      lede: "Note-taking. Essay structure. Research. Past generations were taught how to think on paper. Your students need the same, but for the tools they're already opening at 11pm.",
    },
  };
  const v = variants[variant] || variants.default;

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              {v.eyebrow}
            </div>
            <h1 className="hero-title display">{v.headline}</h1>
            <p className="hero-lede">{v.lede}</p>
            <div className="hero-cta">
              <a href="#book" className="btn btn-acid">
                {ctaCopy}
                <span className="btn-arrow"><Icon.Arrow size={11} /></span>
              </a>
              <a href="#how" className="btn btn-ghost">
                See how it works
              </a>
            </div>
            <div className="hero-meta">
              <span className="hero-meta-item"><Icon.Check size={13} /> Free to your school</span>
              <span className="hero-meta-item"><Icon.Check size={13} /> Designed for Years 9–12</span>
              <span className="hero-meta-item"><Icon.Check size={13} /> Runs in-person at your campus</span>
            </div>
          </div>

          <aside className="hero-card">
            <div className="hero-card-tag">
              <span className="dot" /> Live program
            </div>
            <div className="hero-card-spec">
              <div className="spec-row">
                <span className="spec-k">Format</span>
                <span className="spec-v">3 × 1hr sessions</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Year groups</span>
                <span className="spec-v">Years 9–12</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Cohort size</span>
                <span className="spec-v">Up to 120 students</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Delivered</span>
                <span className="spec-v">In-person, at your school</span>
              </div>
              <div className="spec-row">
                <span className="spec-k">Cost to school</span>
                <span className="spec-v big">$0</span>
              </div>
            </div>
            <p className="hero-card-note">Sponsor-funded. Adaptable to your timetable, year levels, and house structure.</p>
          </aside>
        </div>
      </div>
      <BigTickerMark />
    </section>
  );
}

/* Big background type behind hero */
function BigTickerMark() {
  return (
    <div className="hero-bg-type" aria-hidden="true">
      USEFUL
    </div>
  );
}

/* ---------- TICKER ---------- */
function Ticker() {
  const items = [
    "How I structure essays with AI",
    "Fact-checking what it tells you",
    "Studying for exams faster",
    "Reading dense papers",
    "Not getting caught lying to it",
    "Using it for code & maths",
    "Translating teacher feedback",
    "Building a research workflow",
    "When NOT to use it",
    "Prompting like you mean it",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-star"><Icon.Star size={11} /></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- PROBLEM SECTION ---------- */
function Problem() {
  return (
    <section className="problem">
      <div className="wrap">
        <div className="problem-grid">
          <div className="problem-left reveal">
            <span className="eyebrow">01 · The situation</span>
            <h2 className="display problem-title">
              They're using it. Most of them <span className="strike">poorly.</span>
            </h2>
          </div>
          <div className="problem-right reveal">
            <p className="problem-lead">
              The students who'll graduate over the next two years are using AI tools every week — and almost none of them have been taught how. They copy-paste assignments, trust hallucinations, or give up halfway through a prompt that didn't work.
            </p>
            <p className="problem-lead">
              The fix is not another lecture on "AI ethics." It's the workflows university students and working professionals already use — taught directly, in person, in a way that respects how students actually study.
            </p>
            <div className="problem-stats">
              <Stat n="78%" label="of Australian high schoolers have used generative AI for schoolwork" />
              <Stat n="3 in 10" label="schools have any AI-specific student instruction" />
              <Stat n="2026" label="ATAR cohorts entering university with no formal AI study skills" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div className="stat">
      <div className="stat-n display">{n}</div>
      <div className="stat-l">{label}</div>
    </div>
  );
}

/* ---------- WHAT WE TEACH ---------- */
function WhatWeTeach() {
  const topics = [
    {
      tag: "01",
      title: "The 80% workflows",
      body: "The handful of patterns that get students 80% of the value — research scaffolding, draft-iterate-edit loops, structured study notes. Not exhaustive — useful.",
      accent: "acid",
    },
    {
      tag: "02",
      title: "Trust, but verify",
      body: "How to spot a hallucination, when to push back on a model, and the questions that surface bad answers before they end up in an assignment.",
      accent: "coral",
    },
    {
      tag: "03",
      title: "Studying with leverage",
      body: "Using AI for active recall, breaking down dense readings, generating practice questions for the syllabus you're actually sitting — not the average one.",
      accent: "ink",
    },
    {
      tag: "04",
      title: "Writing without cheating",
      body: "Where the line is. How to use AI to think more clearly without outsourcing the thinking. Practical examples drawn from real assessment tasks.",
      accent: "acid",
    },
    {
      tag: "05",
      title: "Tools beyond ChatGPT",
      body: "Quick orientation to Claude, Gemini, Notebook LM, Perplexity, and a few specific student-useful tools — what each is genuinely good for.",
      accent: "coral",
    },
    {
      tag: "06",
      title: "What it can't do",
      body: "The honest limits. Where the technology breaks, where it lies, and the kinds of work it's worth doing yourself even when the option exists.",
      accent: "ink",
    },
  ];
  return (
    <section id="how" className="teach">
      <div className="wrap">
        <div className="teach-head reveal">
          <span className="eyebrow">02 · What we teach</span>
          <h2 className="display teach-title">
            Six concepts. Three hours.<br/>
            <span className="hi">Zero theory for theory's sake.</span>
          </h2>
          <p className="teach-sub">
            The seminar is designed around what a competent uni student or junior knowledge worker actually does on a Tuesday afternoon — translated for Year 10 through 12.
          </p>
        </div>
        <div className="teach-grid">
          {topics.map((t) => (
            <article key={t.tag} className={"teach-card reveal accent-" + t.accent}>
              <div className="teach-card-tag mono">{t.tag}</div>
              <h3 className="teach-card-title display">{t.title}</h3>
              <p className="teach-card-body">{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PULL QUOTE ---------- */
function PullQuote() {
  return (
    <section className="quote-band">
      <div className="wrap">
        <div className="quote-inner reveal">
          <span className="quote-mark">"</span>
          <p className="quote-text display">
            The students who win the next two years aren't the ones who memorise more. They're the ones who learn to <span className="hi-block">use these tools deliberately</span> before everyone else figures it out.
          </p>
          <span className="quote-attrib mono">— working note, founder</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- FORMAT ---------- */
function Format() {
  return (
    <section className="format">
      <div className="wrap">
        <div className="format-head reveal">
          <span className="eyebrow">03 · Format</span>
          <h2 className="display format-title">
            A default shape. <span className="hi">Adapts to yours.</span>
          </h2>
        </div>
        <div className="format-grid">
          <div className="format-card reveal">
            <div className="format-card-head">
              <span className="mono">Default</span>
              <span className="pill"><span className="dot" /> Most common</span>
            </div>
            <div className="format-body">
              <Row k="Sessions" v="3 × 60 min" />
              <Row k="Spacing" v="Across 2–3 weeks" />
              <Row k="Year levels" v="Years 10, 11, 12" />
              <Row k="Cohort" v="Up to 120 students per run" />
              <Row k="Setting" v="Auditorium or large classroom" />
              <Row k="Tech needed" v="Projector. Wi-Fi. Devices optional." />
            </div>
          </div>
          <div className="format-card reveal alt">
            <div className="format-card-head">
              <span className="mono">Adaptable</span>
              <span className="pill"><span className="dot" /> If your day looks different</span>
            </div>
            <div className="format-body">
              <Row k="Single keynote" v="One 60–90 min plenary" />
              <Row k="Year-level intensives" v="Half-day, single cohort" />
              <Row k="Teacher PD bolt-on" v="45 min staff session" />
              <Row k="Co-curricular" v="Lunchtime sessions, 4 weeks" />
              <Row k="Hybrid delivery" v="In-person + recorded follow-up" />
              <Row k="House structure" v="Vertical mixed-year groupings" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }) {
  return (
    <div className="format-row">
      <span className="format-k">{k}</span>
      <span className="format-v">{v}</span>
    </div>
  );
}

/* ---------- WHY FREE ---------- */
function WhyFree() {
  return (
    <section className="why-free">
      <div className="wrap">
        <div className="wf-card reveal">
          <div className="wf-left">
            <span className="eyebrow" style={{color: "var(--acid)"}}>04 · Why it's free</span>
            <h2 className="display wf-title">
              Schools host. Sponsors fund. <span className="hi-light">Students get the program.</span>
            </h2>
            <p className="wf-body">
              Useful AI is sponsor-funded. A partner brand whose offering is genuinely relevant to high schoolers — a university running future-student engagement, a financial institution, an EdTech tool, a graduate recruiter — covers the program cost. Your school pays nothing. We retain editorial control over what students actually learn.
            </p>
            <div className="wf-cta-row">
              <a href="sponsors.html" className="btn btn-acid">
                For potential sponsors
                <span className="btn-arrow"><Icon.Arrow size={11} /></span>
              </a>
              <a href="#faq" className="wf-link">How partnerships are structured →</a>
            </div>
          </div>
          <div className="wf-right">
            <div className="wf-stat-block">
              <div className="wf-stat-n display">$0</div>
              <div className="wf-stat-l mono">Cost to host school</div>
            </div>
            <div className="wf-stat-block">
              <div className="wf-stat-n display">1</div>
              <div className="wf-stat-l mono">Lead sponsor per cohort</div>
            </div>
            <div className="wf-stat-block">
              <div className="wf-stat-n display">100%</div>
              <div className="wf-stat-l mono">Editorial independence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOUNDER NOTE ---------- */
function FounderNote() {
  return (
    <section className="founder">
      <div className="wrap-tight">
        <div className="founder-inner reveal">
          <span className="eyebrow">05 · A note from the founder</span>
          <p className="founder-text display">
            I'm a Sydney uni student. I use these tools every day for my own coursework, and I've watched a lot of friends — younger and older — either become much better at school because of AI or much worse.
          </p>
          <p className="founder-text display">
            What's missing in most schools isn't a policy. It's <span className="hi">someone close enough in age</span> to actually show students the workflow. That's what Useful AI is.
          </p>
          <div className="founder-sig">
            <div className="founder-avatar">
              <span className="founder-avatar-placeholder mono">PHOTO</span>
            </div>
            <div>
              <div className="founder-name display">Founder, Useful AI</div>
              <div className="mono founder-role">University of Sydney · Founder & seminar lead</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "Is this really free?",
      a: "Yes. Useful AI is sponsor-funded. A partner brand covers program delivery costs. The host school is never invoiced and there is no student fee. We are transparent with school leadership about who the lead sponsor is for each cohort before any session is delivered.",
    },
    {
      q: "What does the sponsor get? Are students sold to?",
      a: "Sponsors receive credible reach into a hard-to-target demographic plus measurable engagement reporting. Students are never sold a product during a session. Sponsor visibility is limited to a short, clearly-labelled segment and program materials. Schools approve sponsor association in writing before delivery.",
    },
    {
      q: "Who actually delivers the sessions?",
      a: "Sessions are delivered in person by the program founder — a current Sydney university student close in age to your senior cohort. That proximity is deliberate. It's why students engage with the material instead of tuning out.",
    },
    {
      q: "What if our school has a strict no-AI policy?",
      a: "We've designed the program to be useful regardless of where your AI policy currently sits. Many of the strongest sessions focus on critical evaluation, hallucination detection, and where students should not use these tools — content that aligns directly with a restrictive policy stance.",
    },
    {
      q: "Can you adapt to our timetable / year levels / co-curricular structure?",
      a: "Yes. The 3-session, 60-minute format is a default, not a requirement. Single keynotes, year-level intensives, lunchtime co-curricular runs, and teacher PD bolt-ons are all available. We adapt to your structure, not the other way around.",
    },
    {
      q: "What happens after the seminar?",
      a: "Students receive a short follow-up resource — a one-page reference for the workflows covered. Teachers receive a separate brief summarising what was covered, so classroom expectations stay aligned with what students were taught.",
    },
  ];
  return (
    <section id="faq" className="faq">
      <div className="wrap">
        <div className="faq-head reveal">
          <span className="eyebrow">06 · Frequently asked</span>
          <h2 className="display faq-title">The questions schools<br/><span className="hi">ask first.</span></h2>
        </div>
        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className="faq-item open reveal">
              <div className="faq-q">
                <span className="faq-q-text">{item.q}</span>
              </div>
              <div className="faq-a-wrap">
                <p className="faq-a">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BOOKING ---------- */
function Booking({ ctaCopy }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    school: "",
    name: "",
    role: "",
    email: "",
    yearLevels: [],
    format: "default",
    timing: "",
    notes: "",
  });

  const toggleYear = (y) => {
    setForm((f) => ({
      ...f,
      yearLevels: f.yearLevels.includes(y)
        ? f.yearLevels.filter((x) => x !== y)
        : [...f.yearLevels, y],
    }));
  };

  const canNext1 = form.school && form.name && form.email;
  const canSubmit = form.yearLevels.length > 0;

  return (
    <section id="book" className="book">
      <div className="wrap">
        <div className="book-inner">
          <div className="book-left reveal">
            <span className="eyebrow" style={{color: "var(--acid)"}}>07 · Get started</span>
            <h2 className="display book-title">
              Book a free<br/>session for<br/>your school.
            </h2>
            <p className="book-lede">
              Tell us a little about your school and what you're thinking. We'll come back within two working days with a proposed date and a 15-minute call to walk through the program with your senior leadership.
            </p>
            <div className="book-promises">
              <div className="book-promise">
                <span className="bp-icon"><Icon.Check size={12} /></span>
                <span>No invoicing. No tied-in sponsor. No student data.</span>
              </div>
              <div className="book-promise">
                <span className="bp-icon"><Icon.Check size={12} /></span>
                <span>Reply within 2 working days, every time.</span>
              </div>
              <div className="book-promise">
                <span className="bp-icon"><Icon.Check size={12} /></span>
                <span>You approve the sponsor before we deliver.</span>
              </div>
            </div>
            <div className="book-direct mono">
              Prefer email? &nbsp;
              <a href="mailto:hello@usefulai.au" className="book-email">hello@usefulai.au</a>
            </div>
          </div>

          <form className="book-form reveal" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <div className="book-form-head">
              <span className="mono">Step {step} of 2</span>
              <div className="book-progress">
                <span className={"book-prog-pip" + (step >= 1 ? " active" : "")} />
                <span className={"book-prog-pip" + (step >= 2 ? " active" : "")} />
              </div>
            </div>

            {step === 1 && (
              <div className="book-step">
                <h3 className="book-step-title display">About your school</h3>
                <Field label="School name">
                  <input
                    type="text"
                    placeholder="e.g. Sydney Grammar School"
                    value={form.school}
                    onChange={(e) => setForm({...form, school: e.target.value})}
                  />
                </Field>
                <div className="book-row">
                  <Field label="Your name">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                  </Field>
                  <Field label="Your role">
                    <input
                      type="text"
                      placeholder="e.g. Head of Senior School"
                      value={form.role}
                      onChange={(e) => setForm({...form, role: e.target.value})}
                    />
                  </Field>
                </div>
                <Field label="Email">
                  <input
                    type="email"
                    placeholder="you@school.edu.au"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </Field>
                <div className="book-actions">
                  <button
                    type="button"
                    disabled={!canNext1}
                    className="btn btn-primary"
                    onClick={() => setStep(2)}
                  >
                    Next: program details
                    <span className="btn-arrow"><Icon.Arrow size={11} /></span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="book-step">
                <h3 className="book-step-title display">Program preferences</h3>
                <Field label="Year levels (select any)">
                  <div className="chip-row">
                    {["Year 9", "Year 10", "Year 11", "Year 12"].map((y) => (
                      <button
                        type="button"
                        key={y}
                        className={"chip-btn" + (form.yearLevels.includes(y) ? " selected" : "")}
                        onClick={() => toggleYear(y)}
                      >
                        {form.yearLevels.includes(y) && <Icon.Check size={11} />}
                        {y}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Preferred format">
                  <div className="chip-row">
                    {[
                      {id: "default", label: "Default · 3 × 1hr"},
                      {id: "keynote", label: "Single keynote"},
                      {id: "intensive", label: "Year-level intensive"},
                      {id: "unsure", label: "Not sure yet"},
                    ].map((f) => (
                      <button
                        type="button"
                        key={f.id}
                        className={"chip-btn" + (form.format === f.id ? " selected" : "")}
                        onClick={() => setForm({...form, format: f.id})}
                      >
                        {form.format === f.id && <Icon.Check size={11} />}
                        {f.label}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Rough timing">
                  <select
                    value={form.timing}
                    onChange={(e) => setForm({...form, timing: e.target.value})}
                  >
                    <option value="">Select a term…</option>
                    <option value="t2-2026">Term 2, 2026</option>
                    <option value="t3-2026">Term 3, 2026</option>
                    <option value="t4-2026">Term 4, 2026</option>
                    <option value="t1-2027">Term 1, 2027</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </Field>
                <Field label="Anything we should know (optional)">
                  <textarea
                    rows="3"
                    placeholder="House structure, prior AI initiatives, specific concerns…"
                    value={form.notes}
                    onChange={(e) => setForm({...form, notes: e.target.value})}
                  />
                </Field>
                <div className="book-actions split">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="btn btn-acid"
                  >
                    Send enquiry
                    <span className="btn-arrow"><Icon.Arrow size={11} /></span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="book-step book-done">
                <div className="book-done-mark">
                  <Icon.Check size={28} />
                </div>
                <h3 className="book-step-title display">Got it. We'll be in touch.</h3>
                <p className="book-done-text">
                  Thanks, {form.name.split(" ")[0] || "there"}. We've received your enquiry for {form.school || "your school"} and will reply within two working days with proposed dates and a short briefing call.
                </p>
                <button type="button" className="btn btn-primary" onClick={() => { setStep(1); setForm({school: "", name: "", role: "", email: "", yearLevels: [], format: "default", timing: "", notes: ""}); }}>
                  Submit another
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label mono">{label}</span>
      {children}
    </label>
  );
}

/* ---------- FOOTER ---------- */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{color: "var(--paper)"}}>
              <span className="brand-mark">U</span>
              Useful AI
            </div>
            <p style={{marginTop: 16, fontSize: 14, color: "color-mix(in oklab, var(--paper) 65%, transparent)", maxWidth: 340}}>
              An in-person AI study-skills program for Australian high schools. Free to host. Sponsor-funded.
            </p>
          </div>
          <div>
            <h4>Program</h4>
            <ul>
              <li><a href="#how">What we teach</a></li>
              <li><a href="#book">Book a session</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Partners</h4>
            <ul>
              <li><a href="sponsors.html">For sponsors</a></li>
              <li><a href="mailto:partnerships@usefulai.au">Partnerships</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@usefulai.au">hello@usefulai.au</a></li>
              <li><span>Sydney, Australia</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Useful AI · A working pilot</span>
          <span>v1.0 · Sydney</span>
        </div>
      </div>
      <div className="footer-massive">USEFUL · AI · USEFUL · AI</div>
    </footer>
  );
}

/* ---------- APP ROOT ---------- */
function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  useReveal();

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", paletteKeyFor(t.palette));
  }, [t.palette]);

  return (
    <>
      <Nav active="schools" />
      <Hero variant={t.heroVariant} ctaCopy={t.ctaCopy} />
      {t.showTicker && <Ticker />}
      <Problem />
      <WhatWeTeach />
      <PullQuote />
      <Format />
      <WhyFree />
      <FounderNote />
      <FAQ />
      <Booking ctaCopy={t.ctaCopy} />
      <SiteFooter />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Accent palette"
            value={t.palette}
            options={PALETTE_OPTIONS.map(p => p.colors)}
            onChange={(v) => setTweak('palette', v)}
          />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakRadio
            label="Copy variant"
            value={t.heroVariant}
            options={['default', 'blunt', 'study-skill']}
            onChange={(v) => setTweak('heroVariant', v)}
          />
          <TweakText
            label="CTA copy"
            value={t.ctaCopy}
            onChange={(v) => setTweak('ctaCopy', v)}
          />
        </TweakSection>
        <TweakSection label="Display">
          <TweakToggle
            label="Scrolling ticker"
            value={t.showTicker}
            onChange={(v) => setTweak('showTicker', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
