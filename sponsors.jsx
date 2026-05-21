/* ============================================
   USEFUL AI — Sponsors page
   ============================================ */

const { useState, useEffect } = React;

const SDEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#C5F23B", "#0E120F", "#FF5436"]
}/*EDITMODE-END*/;

const S_PALETTE_OPTIONS = [
  { key: "lime",   colors: ["#C5F23B", "#0E120F", "#FF5436"] },
  { key: "citrus", colors: ["#FF5436", "#0E120F", "#FFD83D"] },
  { key: "cobalt", colors: ["#2545FF", "#0E120F", "#FFD83D"] },
  { key: "mint",   colors: ["#B8E994", "#0E120F", "#F08A5D"] },
];

function sPaletteKeyFor(colorsArr) {
  if (!Array.isArray(colorsArr)) return "lime";
  const match = S_PALETTE_OPTIONS.find(p => JSON.stringify(p.colors).toLowerCase() === JSON.stringify(colorsArr).toLowerCase());
  return match ? match.key : "lime";
}

/* ---------- Local Icon set ---------- */
const SIcon = {
  Arrow: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3 3 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ---------- Reveal on scroll ---------- */
function useSReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Nav (reuses shared.css) ---------- */
function SNav() {
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
          <a href="index.html" className="nav-link">For Schools</a>
          <a href="sponsors.html" className="nav-link active">For Sponsors</a>
          <a href="#talk" className="nav-link hide-mobile">Contact</a>
          <a href="#talk" className="btn btn-acid btn-sm" style={{marginLeft: 8}}>
            Partner with us <SIcon.Arrow size={12} />
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function SHero() {
  return (
    <section className="s-hero">
      <div className="hero-bg-type" aria-hidden="true">SPONSOR</div>
      <div className="wrap">
        <div className="s-hero-grid">
          <div className="s-hero-main">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              For brands · Education partnership · Sydney
            </div>
            <h1 className="display s-hero-title">
              Credible reach into the <span className="hi">hardest</span> demographic to advertise to.
            </h1>
            <p className="s-hero-lede">
              Australian high schoolers don't watch your ads, skip your podcasts, and trust their friends over your brand. Useful AI puts your name on the program that helps them get better at school — delivered in person, on campus, by someone close to them in age.
            </p>
            <div className="s-hero-cta">
              <a href="#talk" className="btn btn-acid">
                Start a conversation
                <span className="btn-arrow"><SIcon.Arrow size={11} /></span>
              </a>
              <a href="#tiers" className="btn btn-ghost">
                See partnership shapes
              </a>
            </div>
          </div>

          <aside className="s-hero-side">
            <div className="s-hero-side-head">Snapshot · 2026</div>
            <div className="s-hero-side-q display">
              One <span className="hi">lead sponsor</span> per cohort. Editorial independence guaranteed.
            </div>
            <div className="s-hero-side-row">
              <span className="s-hero-side-k">Format</span>
              <span className="s-hero-side-v">In-person · multi-session</span>
            </div>
            <div className="s-hero-side-row">
              <span className="s-hero-side-k">Audience</span>
              <span className="s-hero-side-v">Years 9–12, Sydney</span>
            </div>
            <div className="s-hero-side-row">
              <span className="s-hero-side-k">Partnership</span>
              <span className="s-hero-side-v">$10k – $100k+</span>
            </div>
            <div className="s-hero-side-row">
              <span className="s-hero-side-k">First cohort</span>
              <span className="s-hero-side-v">Term 3, 2026</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee break ---------- */
function SBreak() {
  const items = ["FUTURE STUDENTS", "FINANCIAL LITERACY", "EARLY TALENT", "PRODUCT TRIAL", "BRAND TRUST", "CATEGORY ENTRY"];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="s-break">
      <div className="s-break-track">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span>{item}</span>
            <span className="dot-sep">●</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- Reach ---------- */
function Reach() {
  return (
    <section className="reach">
      <div className="wrap">
        <div className="reach-head reveal">
          <span className="eyebrow">01 · Who you're reaching</span>
          <h2 className="display reach-title">
            A demographic that does not <span className="hi">respond</span> to advertising.
          </h2>
          <p className="reach-sub">
            Useful AI delivers extended, attentive contact time inside a context students actively engage with — a school-endorsed program that helps them with the work they're already doing.
          </p>
        </div>
        <div className="reach-grid">
          <div className="reach-card highlight reveal">
            <div className="big">60+</div>
            <div className="lbl">Minutes of attentive in-person contact, per student, per session.</div>
          </div>
          <div className="reach-card reveal">
            <div className="big">14–18</div>
            <div className="lbl">Age range. The window where brand preference solidifies.</div>
          </div>
          <div className="reach-card reveal">
            <div className="big">3×</div>
            <div className="lbl">Sessions across the term — depth, not a one-shot impression.</div>
          </div>
          <div className="reach-card dark reveal">
            <div className="big">~120</div>
            <div className="lbl">Senior students per host school cohort, on average.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Value (what sponsors get) ---------- */
function SValue() {
  const items = [
    {
      n: "01",
      title: "Named program endorsement",
      body: "Your brand is identified as the program partner across all student-facing and school-facing materials, with placement reviewed by host school leadership.",
    },
    {
      n: "02",
      title: "Genuine in-room time",
      body: "A clearly-labelled sponsor segment in each session — not a sales pitch, a contextually relevant introduction to your offering. Approved by host schools in writing.",
    },
    {
      n: "03",
      title: "Engagement reporting",
      body: "Verified attendance numbers, session-level feedback surveys, and qualitative read-outs from delivered cohorts. Real data you can take back to the team.",
    },
    {
      n: "04",
      title: "Co-branded resources",
      body: "Student takeaway materials and teacher briefs carry your logo and a single, tasteful call-to-action that fits the educational context.",
    },
    {
      n: "05",
      title: "Right of first refusal",
      body: "Lead sponsors have first option to renew on the next cohort delivered in the same school network — protecting category exclusivity in your space.",
    },
    {
      n: "06",
      title: "Press & comms support",
      body: "Joint case study, optional media moment with the host school, and approval rights over all public mentions of your involvement.",
    },
  ];
  return (
    <section className="value">
      <div className="wrap">
        <div className="value-head reveal">
          <span className="eyebrow">02 · What you get</span>
          <h2 className="display value-title">
            Reach that's <span className="strike">an impression</span> earned, not measured.
          </h2>
        </div>
        <div className="value-grid">
          {items.map((i) => (
            <article key={i.n} className="value-card reveal">
              <span className="value-card-num mono">{i.n}</span>
              <h3 className="value-card-title">{i.title}</h3>
              <p className="value-card-body">{i.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Categories we work with ---------- */
function Categories() {
  const cats = [
    {
      n: "Universities",
      ex: "Future-student engagement, particularly competitive faculties with declining domestic enrolments.",
    },
    {
      n: "Banks & Insurers",
      ex: "Financial literacy alignment, early-life brand preference, parent-channel co-marketing.",
    },
    {
      n: "Tech & Telco",
      ex: "Future graduate pipeline, product trial, category education for emerging tools.",
    },
    {
      n: "Professional Services",
      ex: "Cadet & internship pipeline, brand awareness at the point of subject selection.",
    },
    {
      n: "EdTech Tools",
      ex: "Student trial of genuinely useful platforms — assessed and approved before inclusion.",
    },
  ];
  return (
    <section className="cat">
      <div className="wrap">
        <div className="cat-head reveal">
          <span className="eyebrow">03 · Sponsor categories</span>
          <h2 className="display cat-title">
            We work with brands whose offering is <span className="hi">genuinely useful</span> to students.
          </h2>
        </div>
        <div className="cat-grid">
          {cats.map((c, i) => (
            <div key={c.n} className="cat-card reveal">
              <div className="cat-card-num">0{i+1}</div>
              <div className="cat-card-name">{c.n}</div>
              <div className="cat-card-ex">{c.ex}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Partnership tiers ---------- */
function Tiers() {
  const tiers = [
    {
      name: "Single cohort",
      headline: "Pilot one school. See what it does.",
      amt: "$10k",
      unit: "/ cohort",
      blurb: "One school, one delivered seminar series, full reporting. The sponsor-side equivalent of running a placement test.",
      rows: [
        { on: true, t: "1 host school · ~120 students" },
        { on: true, t: "Program endorsement on all materials" },
        { on: true, t: "Sponsor segment in each session" },
        { on: true, t: "Engagement report + feedback data" },
        { on: false, t: "Co-branded student resources" },
        { on: false, t: "Joint case study & comms support" },
      ],
      cta: "Talk pilot",
    },
    {
      name: "Term cohort",
      headline: "A term. Multiple schools. Real volume.",
      amt: "$35k",
      unit: "/ term",
      blurb: "Three to four host schools across a single school term, with engagement data aggregated into one read-out.",
      rows: [
        { on: true, t: "3–4 host schools · 400+ students" },
        { on: true, t: "Program endorsement on all materials" },
        { on: true, t: "Sponsor segment in each session" },
        { on: true, t: "Term-level engagement report" },
        { on: true, t: "Co-branded student resources" },
        { on: false, t: "Right of first refusal on renewal" },
      ],
      featured: true,
      flag: "Most popular",
      cta: "Talk term",
    },
    {
      name: "Lead partner",
      headline: "Own the program. For a year.",
      amt: "$100k+",
      unit: "/ year",
      blurb: "Annual lead-partner status with category exclusivity, joint comms, and a custom delivery roadmap.",
      rows: [
        { on: true, t: "Annual partnership · 1,500+ students" },
        { on: true, t: "Lead-partner naming on all assets" },
        { on: true, t: "Sponsor segment + branded sessions" },
        { on: true, t: "Quarterly engagement reporting" },
        { on: true, t: "Co-branded resources at every layer" },
        { on: true, t: "Right of first refusal + category lock" },
      ],
      cta: "Talk annual",
    },
  ];
  return (
    <section id="tiers" className="tiers">
      <div className="wrap">
        <div className="tiers-head reveal">
          <span className="eyebrow">04 · Partnership shapes</span>
          <h2 className="display tiers-title">
            Pick the shape that <span className="hi">matches the bet.</span>
          </h2>
        </div>
        <div className="tiers-grid">
          {tiers.map((t) => (
            <div key={t.name} className={"tier reveal" + (t.featured ? " featured" : "")}>
              {t.flag && <span className="tier-flag">{t.flag}</span>}
              <span className="tier-name mono">{t.name}</span>
              <h3 className="tier-headline">{t.headline}</h3>
              <p className="tier-blurb">{t.blurb}</p>
              <div className="tier-price">
                <span className="tier-price-amt">{t.amt}</span>
                <span className="tier-price-unit">{t.unit}</span>
              </div>
              <div className="tier-list">
                {t.rows.map((r, i) => (
                  <div key={i} className={"tier-row" + (r.on ? "" : " muted")}>
                    <SIcon.Check size={14} />
                    <span>{r.t}</span>
                  </div>
                ))}
              </div>
              <div className="tier-cta">
                <a href="#talk" className={t.featured ? "btn btn-acid" : "btn btn-primary"}>
                  {t.cta}
                  <span className="btn-arrow"><SIcon.Arrow size={11} /></span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  return (
    <section className="process">
      <div className="wrap">
        <div className="process-head reveal">
          <span className="eyebrow">05 · How it actually works</span>
          <h2 className="display process-title">From intro call to delivered cohort in <span className="hi" style={{background:"var(--acid)", color:"var(--ink)", padding:"0 0.1em", borderRadius:6, display:"inline-block", fontStyle:"normal"}}>6 weeks.</span></h2>
        </div>
        <div className="process-steps">
          {[
            { t: "Intro call", d: "30 minutes. We walk through your brand objectives, target audience, and category alignment. No deck required from your side." },
            { t: "Brief & match", d: "We propose two or three host schools that fit your audience and confirm sponsor association in writing with each school's leadership." },
            { t: "Session design", d: "Standard curriculum is locked. Sponsor segment is designed collaboratively, reviewed by host school, and approved before delivery." },
            { t: "Deliver & report", d: "Sessions run on campus. You receive an engagement read-out, feedback survey results, and a deliverable summary within 10 days." },
          ].map((s, i) => (
            <div key={i} className="process-step reveal">
              <div className="process-step-n">{String(i+1).padStart(2,"0")}</div>
              <h3 className="process-step-t">{s.t}</h3>
              <p className="process-step-d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact form ---------- */
function SContact() {
  const [form, setForm] = useState({ company: "", name: "", role: "", email: "", interest: "term", notes: "" });
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); setDone(true); };
  const canSubmit = form.company && form.name && form.email;

  return (
    <section id="talk" className="s-contact">
      <div className="wrap">
        <div className="s-contact-inner">
          <div className="s-contact-left reveal">
            <span className="eyebrow" style={{color: "var(--acid)"}}>06 · Start a conversation</span>
            <h2 className="display s-contact-title">
              Tell us what<br/>you're <span className="hi">trying to do.</span>
            </h2>
            <p className="s-contact-lede">
              Not a procurement form. A note that lands on the founder's inbox. We respond within two working days with an honest read on whether the match is right — and what shape it could take.
            </p>
            <div className="s-contact-direct">
              Skip the form · &nbsp;<a href="mailto:partnerships@usefulai.au">partnerships@usefulai.au</a>
            </div>
          </div>

          <form className="s-form reveal" onSubmit={submit}>
            {!done ? (
              <>
                <h3 className="s-form-title">Partnership enquiry</h3>
                <Field label="Company">
                  <input type="text" placeholder="e.g. Macquarie Bank" value={form.company}
                    onChange={(e) => setForm({...form, company: e.target.value})} />
                </Field>
                <div className="book-row">
                  <Field label="Your name">
                    <input type="text" placeholder="Full name" value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})} />
                  </Field>
                  <Field label="Your role">
                    <input type="text" placeholder="e.g. Head of Brand" value={form.role}
                      onChange={(e) => setForm({...form, role: e.target.value})} />
                  </Field>
                </div>
                <Field label="Work email">
                  <input type="email" placeholder="you@company.com" value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})} />
                </Field>
                <Field label="Likely partnership shape">
                  <div className="chip-row">
                    {[
                      { id: "single", label: "Single cohort pilot" },
                      { id: "term", label: "Term cohort" },
                      { id: "annual", label: "Annual lead" },
                      { id: "unsure", label: "Not sure yet" },
                    ].map((o) => (
                      <button key={o.id} type="button"
                        className={"chip-btn" + (form.interest === o.id ? " selected" : "")}
                        onClick={() => setForm({...form, interest: o.id})}>
                        {form.interest === o.id && <SIcon.Check size={11} />}
                        {o.label}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Anything we should know (optional)">
                  <textarea rows="3" placeholder="Target audience, brand objective, timing constraints…"
                    value={form.notes}
                    onChange={(e) => setForm({...form, notes: e.target.value})} />
                </Field>
                <button type="submit" disabled={!canSubmit} className="btn btn-acid" style={{justifyContent: "center"}}>
                  Send enquiry
                  <span className="btn-arrow"><SIcon.Arrow size={11} /></span>
                </button>
              </>
            ) : (
              <div className="s-form-done">
                <div className="s-form-done-mark"><SIcon.Check size={24} /></div>
                <h3 className="s-form-title">Got it. We'll be in touch.</h3>
                <p style={{color: "var(--ink-2)", fontSize: 15, lineHeight: 1.55, marginBottom: 20}}>
                  Thanks, {form.name.split(" ")[0]}. Expect a reply within two working days.
                </p>
                <button type="button" className="btn btn-primary" onClick={() => { setDone(false); setForm({ company: "", name: "", role: "", email: "", interest: "term", notes: "" }); }}>
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

/* ---------- Footer ---------- */
function SFooter() {
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
              An in-person AI study-skills program for Australian high schools. Sponsor-funded. Free to host.
            </p>
          </div>
          <div>
            <h4>Program</h4>
            <ul>
              <li><a href="index.html#how">What we teach</a></li>
              <li><a href="index.html#book">Book a session</a></li>
              <li><a href="index.html#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Partners</h4>
            <ul>
              <li><a href="sponsors.html">For sponsors</a></li>
              <li><a href="#tiers">Partnership shapes</a></li>
              <li><a href="#talk">Start a conversation</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:partnerships@usefulai.au">partnerships@usefulai.au</a></li>
              <li><span>Sydney, Australia</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Useful AI · A working pilot</span>
          <span>v1.0 · Sydney</span>
        </div>
      </div>
      <div className="footer-massive">SPONSOR · USEFUL · AI</div>
    </footer>
  );
}

/* ---------- App root ---------- */
function SApp() {
  const [t, setTweak] = useTweaks(SDEFAULTS);
  useSReveal();

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", sPaletteKeyFor(t.palette));
  }, [t.palette]);

  return (
    <>
      <SNav />
      <SHero />
      <SBreak />
      <Reach />
      <SValue />
      <Categories />
      <Tiers />
      <Process />
      <SContact />
      <SFooter />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Accent palette"
            value={t.palette}
            options={S_PALETTE_OPTIONS.map(p => p.colors)}
            onChange={(v) => setTweak('palette', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SApp />);
