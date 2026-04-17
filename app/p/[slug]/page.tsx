import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageData = {
  id: string;
  slug: string;
  title: string;
  type: "saas" | "launch" | "portfolio" | "funnel" | "pricing" | "coming-soon";
  blocks: unknown[];
  globalStyles: Record<string, unknown>;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: string;
  customCss?: string;
  customJs?: string;
};

const DEMO_PAGES: Record<string, PageData> = {
  "saas-landing": {
    id: "1", slug: "saas-landing", title: "SaaS Landing Page", type: "saas",
    blocks: [], globalStyles: {},
    metaTitle: "AIPageBuilder — Build Pages with AI in Seconds",
    metaDescription: "Create high-converting landing pages with AI. No code needed.",
  },
  "product-launch": {
    id: "2", slug: "product-launch", title: "Product Launch", type: "launch",
    blocks: [], globalStyles: {},
    metaTitle: "Something Big is Launching Soon",
    metaDescription: "We're launching a new product. Be the first to know.",
  },
  "agency-portfolio": {
    id: "3", slug: "agency-portfolio", title: "Agency Portfolio", type: "portfolio",
    blocks: [], globalStyles: {},
    metaTitle: "Creative Agency — We Build Brands",
    metaDescription: "Award-winning agency specializing in digital design and brand strategy.",
  },
  "free-trial": {
    id: "4", slug: "free-trial", title: "Free Trial Funnel", type: "funnel",
    blocks: [], globalStyles: {},
    metaTitle: "Start Your Free 14-Day Trial",
    metaDescription: "No credit card required. Cancel any time.",
  },
  "pricing": {
    id: "5", slug: "pricing", title: "Pricing Page", type: "pricing",
    blocks: [], globalStyles: {},
    metaTitle: "Simple, Transparent Pricing — AIPageBuilder",
    metaDescription: "Choose the plan that works for your business.",
  },
  "coming-soon": {
    id: "6", slug: "coming-soon", title: "Coming Soon", type: "coming-soon",
    blocks: [], globalStyles: {},
    metaTitle: "Something Amazing is Coming",
    noIndex: true,
  },
};

async function getPage(slug: string): Promise<PageData | null> {
  return DEMO_PAGES[slug] ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPage(params.slug);
  if (!page) return { title: "Page Not Found" };
  const robots: string[] = [];
  if (page.noIndex) robots.push("noindex");
  if (page.noFollow) robots.push("nofollow");
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || "",
    openGraph: {
      title: page.ogTitle || page.metaTitle || page.title,
      description: page.ogDescription || page.metaDescription || "",
      images: page.ogImage ? [{ url: page.ogImage }] : [],
    },
    alternates: { canonical: page.canonicalUrl },
    robots: robots.length > 0 ? robots.join(", ") : undefined,
  };
}

function buildTrackingScript(pageId: string): string {
  return `(function(){var p="${pageId}",s=(function(){var k="pf_sid",v=sessionStorage.getItem(k);if(!v){v=Math.random().toString(36).slice(2)+Date.now().toString(36);sessionStorage.setItem(k,v);}return v;})(),d=window.innerWidth>=1024?"desktop":window.innerWidth>=768?"tablet":"mobile",t=Date.now();fetch("/api/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({page_id:p,event_type:"view",session_id:s,device:d,referrer:document.referrer.substring(0,500)})}).catch(function(){});})();`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED BASE CSS
// ─────────────────────────────────────────────────────────────────────────────
const BASE_CSS = `*{box-sizing:border-box;margin:0;padding:0;}body{-webkit-font-smoothing:antialiased;font-family:Inter,system-ui,sans-serif;}`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. SAAS PAGE
// Sections: Nav → Hero → Stats → Features → How It Works → Testimonials → Pricing → CTA → Footer
// ─────────────────────────────────────────────────────────────────────────────
function SaasPage() {
  return (
    <>
      <style>{`
        ${BASE_CSS}
        body{background:#080810;color:#fff;}
        .nav{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(8,8,16,0.85);backdrop-filter:blur(16px);padding:0 5vw;height:64px;display:flex;align-items:center;justify-content:space-between;}
        .logo{display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;text-decoration:none;color:#fff;}
        .logo-icon{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:14px;}
        .nav-links{display:flex;gap:28px;}
        .nav-link{font-size:14px;color:rgba(255,255,255,0.45);text-decoration:none;transition:color .15s;}
        .nav-link:hover{color:#fff;}
        .btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;border:none;transition:all .15s;}
        .btn-primary{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;}
        .btn-primary:hover{opacity:.88;}
        .btn-ghost{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);}
        .btn-ghost:hover{background:rgba(255,255,255,0.1);}
        section{padding:96px 5vw;}
        .container{max-width:1120px;margin:0 auto;}
        /* Hero */
        .hero{position:relative;overflow:hidden;padding:112px 5vw 96px;text-align:center;background:radial-gradient(ellipse 80% 60% at 50% -10%,rgba(139,92,246,0.22),transparent);}
        .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.28);border-radius:999px;padding:5px 16px;font-size:12px;color:#a78bfa;letter-spacing:.04em;margin-bottom:28px;}
        .badge-dot{width:7px;height:7px;border-radius:50%;background:#a78bfa;animation:pulse 2s infinite;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        h1{font-size:clamp(2.4rem,5.5vw,4.2rem);font-weight:900;line-height:1.08;letter-spacing:-.03em;margin-bottom:22px;background:linear-gradient(135deg,#fff 0%,#c4b5fd 50%,#93c5fd 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .hero-sub{font-size:18px;color:rgba(255,255,255,0.45);max-width:580px;line-height:1.72;margin:0 auto 40px;}
        .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
        .hero-btns .btn{padding:14px 30px;font-size:15px;}
        .avatar-row{display:flex;align-items:center;gap:12px;justify-content:center;margin-top:28px;font-size:13px;color:rgba(255,255,255,0.3);}
        .avatars{display:flex;}
        .av{width:32px;height:32px;border-radius:50%;border:2px solid #080810;margin-left:-8px;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;}
        /* Stats */
        .stats-strip{border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);padding:48px 5vw;}
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:36px;text-align:center;}
        .stat-val{font-size:2.6rem;font-weight:900;background:linear-gradient(135deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.02em;}
        .stat-lbl{font-size:12px;color:rgba(255,255,255,0.3);margin-top:5px;}
        /* Features */
        .section-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(139,92,246,0.7);margin-bottom:12px;}
        h2{font-size:clamp(1.7rem,3vw,2.6rem);font-weight:800;letter-spacing:-.025em;margin-bottom:14px;}
        .section-sub{color:rgba(255,255,255,0.38);font-size:16px;margin-bottom:56px;max-width:520px;}
        .grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;}
        .card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:28px;transition:border-color .2s,transform .2s;}
        .card:hover{border-color:rgba(139,92,246,0.3);transform:translateY(-3px);}
        .feat-icon{font-size:28px;margin-bottom:14px;}
        .feat-title{font-size:15px;font-weight:600;margin-bottom:8px;}
        .feat-desc{font-size:13px;color:rgba(255,255,255,0.38);line-height:1.65;}
        /* How It Works */
        .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:36px;position:relative;}
        .step-card{text-align:center;}
        .step-num{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(37,99,235,0.15));border:1px solid rgba(139,92,246,0.25);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#a78bfa;margin:0 auto 20px;}
        .step-title{font-size:16px;font-weight:700;margin-bottom:8px;}
        .step-desc{font-size:13px;color:rgba(255,255,255,0.38);line-height:1.65;max-width:240px;margin:0 auto;}
        /* Testimonials */
        .testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;}
        .testi-card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:28px;}
        .stars{color:#f59e0b;font-size:13px;margin-bottom:14px;}
        .testi-text{font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:20px;}
        .testi-author{display:flex;align-items:center;gap:12px;}
        .testi-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;}
        .testi-name{font-size:13px;font-weight:600;}
        .testi-role{font-size:11px;color:rgba(255,255,255,0.3);}
        /* Pricing */
        .plans-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;align-items:start;}
        .plan-card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:28px;position:relative;}
        .plan-card.popular{background:rgba(124,58,237,0.08);border-color:rgba(124,58,237,0.4);}
        .pop-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;border-radius:999px;padding:3px 14px;font-size:11px;font-weight:600;white-space:nowrap;}
        .plan-name{font-size:12px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;}
        .plan-price{font-size:2.8rem;font-weight:900;letter-spacing:-.03em;margin-bottom:4px;}
        .plan-period{font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:16px;}
        .plan-btn{width:100%;padding:11px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;border:none;margin-bottom:20px;transition:all .15s;}
        .plan-btn.pri{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;}
        .plan-btn.gho{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);}
        .plan-feat{display:flex;align-items:center;gap:9px;margin-bottom:9px;font-size:13px;color:rgba(255,255,255,0.6);}
        .plan-feat .ck{color:#34d399;font-size:11px;}
        /* CTA */
        .cta-box{background:linear-gradient(135deg,rgba(124,58,237,0.14),rgba(37,99,235,0.09));border:1px solid rgba(139,92,246,0.2);border-radius:24px;padding:72px 40px;text-align:center;}
        .cta-box h2{margin-bottom:12px;}
        .cta-box p{color:rgba(255,255,255,0.38);font-size:16px;max-width:480px;margin:0 auto 36px;line-height:1.65;}
        footer{border-top:1px solid rgba(255,255,255,0.05);padding:32px 5vw;text-align:center;font-size:12px;color:rgba(255,255,255,0.18);}
      `}</style>

      {/* ── Nav ── */}
      <nav className="nav">
        <a href="#" className="logo"><div className="logo-icon">✦</div>AIPageBuilder</a>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <a href="#" className="btn btn-ghost" style={{padding:"7px 16px"}}>Sign in</a>
          <a href="#" className="btn btn-primary" style={{padding:"7px 16px"}}>Get started free</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="hero">
        <div style={{position:"absolute",width:"600px",height:"600px",top:"-200px",left:"-100px",background:"rgba(124,58,237,0.07)",borderRadius:"50%",filter:"blur(80px)"}} />
        <div style={{position:"absolute",width:"400px",height:"400px",top:"0",right:"0",background:"rgba(37,99,235,0.07)",borderRadius:"50%",filter:"blur(60px)"}} />
        <div style={{position:"relative",zIndex:1}}>
          <div className="badge"><span className="badge-dot"/>Powered by Claude AI · Now in Beta</div>
          <h1>Build Landing Pages<br />That Convert — With AI</h1>
          <p className="hero-sub">Describe any page. AI builds it in 8 seconds — complete layout, copy, and conversion elements. No code, no designers, no waiting.</p>
          <div className="hero-btns">
            <a href="#" className="btn btn-primary">Start Building Free →</a>
            <a href="#how-it-works" className="btn btn-ghost">See How It Works</a>
          </div>
          <div className="avatar-row">
            <div className="avatars">{["AJ","SK","MR","TL","KP"].map(i=><div key={i} className="av">{i}</div>)}</div>
            <span>Trusted by <strong style={{color:"rgba(255,255,255,0.65)"}}>2,400+</strong> marketers & founders</span>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            {[{v:"8s",l:"Avg. page build time"},{v:"94%",l:"Faster than manual"},{v:"3.2×",l:"Higher conversion rate"},{v:"12k+",l:"Pages published"}].map(s=>(
              <div key={s.l}><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <div className="section-label">Features</div>
            <h2>Everything to convert visitors</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>Built for modern SaaS teams — fast, beautiful, and battle-tested by 2,400+ users.</p>
          </div>
          <div className="grid3">
            {[
              {icon:"🧠",title:"AI Page Generator",desc:"Describe any page — AI builds the full layout, copy, and styling in under 10 seconds."},
              {icon:"✍️",title:"AI Copywriter",desc:"Headlines, CTAs, full sections — written in your brand voice and optimized for conversion."},
              {icon:"🔥",title:"Click Heatmaps",desc:"See exactly where visitors click, filtered by device. Know what to fix before you A/B test."},
              {icon:"📹",title:"Session Recordings",desc:"Watch real visitor sessions with canvas playback. Find every scroll-stop and rage-click."},
              {icon:"🎯",title:"Popup Builder",desc:"Exit-intent, scroll, time-delay — 6 popup types with 5 trigger options. Full conversion control."},
              {icon:"📊",title:"Analytics Dashboard",desc:"Page views, bounce rate, conversions — beautiful charts with date range and CSV export."},
              {icon:"🔍",title:"SEO Tools",desc:"SERP preview, SEO score 0–100, JSON-LD schema, auto sitemap.xml — everything built in."},
              {icon:"⚡",title:"12 Extensions",desc:"Sticky bars, countdown timers, spin wheels, sales notifications — one toggle to activate."},
              {icon:"🖼️",title:"Screenshot → Layout",desc:"Upload any design mockup — AI converts it to fully editable blocks instantly."},
            ].map(f=>(
              <div key={f.title} className="card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" style={{background:"rgba(255,255,255,0.01)",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"60px"}}>
            <div className="section-label">How It Works</div>
            <h2>From idea to live page in minutes</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>Three steps. No code. No waiting on designers.</p>
          </div>
          <div className="steps">
            {[
              {n:"01",icon:"💬",title:"Describe your page",desc:"Tell the AI your industry, goal, and tone. Full page generated in under 10 seconds — layout, copy, everything."},
              {n:"02",icon:"🎨",title:"Customize visually",desc:"Drag, drop, and edit inline. 20+ block types, 50+ templates. Adjust colors, fonts, and spacing without code."},
              {n:"03",icon:"🚀",title:"Publish & optimize",desc:"Go live in one click. Heatmaps, session recordings, and A/B tests start collecting data automatically."},
            ].map((s)=>(
              <div key={s.n} className="step-card">
                <div className="step-num">{s.icon}</div>
                <div style={{fontSize:"10px",fontWeight:700,color:"rgba(139,92,246,0.5)",letterSpacing:".1em",marginBottom:"8px"}}>{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <div className="section-label">Testimonials</div>
            <h2>Loved by 2,400+ teams</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>Real results from real users — not cherry-picked.</p>
          </div>
          <div className="testi-grid">
            {[
              {av:"SK",name:"Sarah K.",role:"Agency Owner",text:"Replaced Hotjar, ClickFunnels, and OptinMonster. Saved $400/month. Our clients get better results than before."},
              {av:"MT",name:"Marcus T.",role:"Performance Marketer",text:"The AI generator is legitimately impressive. Describe a page, it builds it. My campaign output tripled in 3 weeks."},
              {av:"PR",name:"Priya R.",role:"Freelance Designer",text:"Screenshot to layout changed my workflow. Design in Figma, upload, get editable blocks. Deliver in hours not days."},
              {av:"JL",name:"James L.",role:"SaaS Founder",text:"Session recording showed exactly why we weren't converting. Fixed the CTA. Rate went from 3.2% to 8.7%."},
              {av:"AM",name:"Ana M.",role:"E-commerce Consultant",text:"Exit-intent popup set up in 5 minutes. First week: 67 new email subscribers. Pays for itself every single month."},
              {av:"DC",name:"David C.",role:"Growth Lead",text:"Heatmaps + recordings in one dashboard. Used to pay $99 just for Hotjar. Now I get that plus everything for $39."},
            ].map(t=>(
              <div key={t.name} className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testi-author">
                  <div className="testi-av">{t.av}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{background:"rgba(255,255,255,0.01)",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <div className="section-label">Pricing</div>
            <h2>Start free. Scale when ready.</h2>
            <p className="section-sub" style={{margin:"0 auto"}}>No hidden fees. Cancel anytime.</p>
          </div>
          <div className="plans-grid">
            {[
              {name:"Free",price:"$0",period:"forever",btn:"gho",btnText:"Get started",feats:["1 published page","5 AI credits/month","Basic analytics","PageForge subdomain"]},
              {name:"Pro",price:"$39",period:"/month",btn:"pri",btnText:"Start 14-day trial",popular:true,feats:["50 pages","500 AI credits/month","Heatmaps + Recordings","A/B Testing","Custom domain","All extensions"]},
              {name:"Starter",price:"$19",period:"/month",btn:"gho",btnText:"Start free trial",feats:["15 pages","100 AI credits/month","Standard analytics","Custom domain","Lead capture"]},
              {name:"Unlimited",price:"$99",period:"/month",btn:"gho",btnText:"Contact sales",feats:["Unlimited pages","Unlimited AI credits","White label","API access","Priority support"]},
            ].map(p=>(
              <div key={p.name} className={`plan-card${p.popular?" popular":""}`}>
                {p.popular&&<div className="pop-badge">⚡ Most Popular</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price}</div>
                <div className="plan-period">{p.period}</div>
                <button className={`plan-btn ${p.btn}`}>{p.btnText}</button>
                {p.feats.map(f=><div key={f} className="plan-feat"><span className="ck">✓</span>{f}</div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <div className="container">
          <div className="cta-box">
            <div className="badge" style={{marginBottom:"20px"}}>No credit card required</div>
            <h2>Ready to 3× your conversion rate?</h2>
            <p>Join thousands of teams building high-converting pages in minutes, not weeks.</p>
            <a href="#" className="btn btn-primary" style={{padding:"14px 40px",fontSize:"16px"}}>Get started for free →</a>
            <p style={{marginTop:"16px",fontSize:"12px",color:"rgba(255,255,255,0.2)"}}>14-day free trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </section>

      <footer>© 2026 AIPageBuilder · Built with ✦ AIPageBuilder</footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. LAUNCH PAGE
// Sections: Hero/Countdown → What You'll Get → Founder Note → Email Capture → Social Proof → Footer
// ─────────────────────────────────────────────────────────────────────────────
function LaunchPage() {
  return (
    <>
      <style>{`
        ${BASE_CSS}
        body{background:#050a15;color:#fff;min-height:100vh;}
        .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(37,99,235,0.12);border:1px solid rgba(37,99,235,0.28);border-radius:999px;padding:5px 16px;font-size:12px;color:#60a5fa;letter-spacing:.04em;margin-bottom:28px;}
        h1{font-size:clamp(2.2rem,5.5vw,3.8rem);font-weight:900;line-height:1.08;margin-bottom:18px;text-align:center;letter-spacing:-.03em;background:linear-gradient(135deg,#fff 0%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sub{font-size:17px;color:rgba(255,255,255,0.4);text-align:center;max-width:500px;line-height:1.7;margin:0 auto 44px;}
        /* Countdown */
        .countdown{display:flex;gap:12px;margin-bottom:52px;justify-content:center;}
        .count-box{display:flex;flex-direction:column;align-items:center;gap:8px;}
        .count-val{width:76px;height:76px;background:rgba(255,255,255,0.04);border:1px solid rgba(37,99,235,0.2);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:900;font-family:monospace;color:#60a5fa;}
        .count-lbl{font-size:10px;color:rgba(255,255,255,0.28);text-transform:uppercase;letter-spacing:.1em;}
        .colon{font-size:28px;color:rgba(255,255,255,0.15);margin-top:-14px;}
        /* Email */
        .email-box{display:flex;gap:8px;max-width:440px;width:100%;margin:0 auto 12px;}
        input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:13px 16px;color:#fff;font-size:14px;outline:none;}
        input::placeholder{color:rgba(255,255,255,0.2);}
        .btn{background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;border:none;border-radius:10px;padding:13px 24px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;}
        /* What's Coming */
        section{padding:80px 5vw;}
        .container{max-width:1100px;margin:0 auto;}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(96,165,250,0.7);margin-bottom:12px;text-align:center;}
        h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;letter-spacing:-.025em;text-align:center;margin-bottom:14px;}
        .feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;}
        .feat-card{background:rgba(255,255,255,0.025);border:1px solid rgba(37,99,235,0.15);border-radius:18px;padding:28px;}
        .feat-icon{font-size:28px;margin-bottom:14px;}
        .feat-title{font-size:15px;font-weight:600;margin-bottom:8px;}
        .feat-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.65;}
        /* Founder */
        .founder-card{max-width:680px;margin:0 auto;background:rgba(255,255,255,0.02);border:1px solid rgba(37,99,235,0.15);border-radius:20px;padding:40px;}
        .founder-quote{font-size:16px;color:rgba(255,255,255,0.6);line-height:1.75;font-style:italic;margin-bottom:24px;}
        .founder-av{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#0ea5e9);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;}
        /* Social Proof */
        .proof-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;}
        .proof-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:22px;}
        .proof-text{font-size:13px;color:rgba(255,255,255,0.55);line-height:1.65;margin-bottom:14px;}
        .proof-author{font-size:12px;color:rgba(255,255,255,0.28);}
        /* Pills */
        .pills{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:28px;}
        .pill{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:999px;padding:6px 14px;font-size:12px;color:rgba(255,255,255,0.4);}
        footer{border-top:1px solid rgba(255,255,255,0.05);padding:28px 5vw;text-align:center;font-size:12px;color:rgba(255,255,255,0.18);}
      `}</style>

      <div style={{position:"fixed",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 60% 40% at 50% 0%,rgba(37,99,235,0.18),transparent)"}} />

      {/* ── Hero + Countdown ── */}
      <section style={{paddingTop:"100px",textAlign:"center",position:"relative",zIndex:1}}>
        <div className="badge">🚀 Launching in</div>
        <h1>Something Big<br />is Coming</h1>
        <p className="sub">We&apos;re building the next generation of AI-powered tools. Be the first in line when we launch.</p>

        <div className="countdown">
          {[{v:"12",l:"Days"},{v:"08",l:"Hours"},{v:"43",l:"Min"},{v:"27",l:"Sec"}].map((c,i)=>(
            <div key={c.l} style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <div className="count-box"><div className="count-val">{c.v}</div><div className="count-lbl">{c.l}</div></div>
              {i<3&&<div className="colon">:</div>}
            </div>
          ))}
        </div>

        <div className="email-box">
          <input type="email" placeholder="your@email.com" />
          <button className="btn">Notify Me</button>
        </div>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.2)",marginBottom:"16px"}}>No spam. Unsubscribe anytime. <strong style={{color:"rgba(255,255,255,0.4)"}}>1,240 people</strong> waiting.</p>

        <div className="pills">
          {["AI-powered","No code needed","Lightning fast","Built-in analytics","Free to start","14-day trial"].map(p=>(
            <span key={p} className="pill">{p}</span>
          ))}
        </div>
      </section>

      {/* ── What You'll Get ── */}
      <section style={{position:"relative",zIndex:1}}>
        <div className="container">
          <div className="section-label">What&apos;s Included</div>
          <h2 style={{marginBottom:"12px"}}>Everything you need to launch fast</h2>
          <p style={{textAlign:"center",color:"rgba(255,255,255,0.35)",fontSize:"15px",marginBottom:"48px"}}>Day-one access to every feature — no waiting for updates.</p>
          <div className="feat-grid">
            {[
              {icon:"🧠",title:"AI Page Builder",desc:"Describe a page in plain English. Full layout, copy, and design generated in seconds."},
              {icon:"🔥",title:"Heatmaps & Analytics",desc:"Know exactly which sections convert and which lose visitors — in real time."},
              {icon:"🎯",title:"Popup & Lead Capture",desc:"Smart exit-intent, scroll, and time-delay popups to capture every lead."},
              {icon:"🚀",title:"One-Click Publish",desc:"Custom domain, SSL, and global CDN. Your page live in under 30 seconds."},
              {icon:"🔗",title:"50+ Integrations",desc:"Zapier, HubSpot, Mailchimp, Slack — your stack plugs in instantly."},
              {icon:"📱",title:"Mobile Optimized",desc:"Every page is pixel-perfect on mobile, tablet, and desktop out of the box."},
            ].map(f=>(
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Note ── */}
      <section style={{position:"relative",zIndex:1}}>
        <div className="container">
          <div className="section-label">From the Founder</div>
          <h2 style={{marginBottom:"40px"}}>Why we&apos;re building this</h2>
          <div className="founder-card">
            <p className="founder-quote">&ldquo;We spent months paying $400+/month for separate tools — Hotjar, ClickFunnels, OptinMonster. The data was siloed, the workflows were broken, and the results were mediocre. So we built the tool we wished existed: one platform where AI writes the page, analytics tells you what&apos;s working, and optimization tools let you act on it — all for less than one of those tools.&rdquo;</p>
            <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <div className="founder-av">AJ</div>
              <div>
                <div style={{fontSize:"14px",fontWeight:600}}>Alex Johnson</div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,0.3)"}}>Founder, AIPageBuilder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section style={{position:"relative",zIndex:1}}>
        <div className="container">
          <div className="section-label">Early Feedback</div>
          <h2 style={{marginBottom:"40px"}}>What beta testers are saying</h2>
          <div className="proof-grid">
            {[
              {text:"\"The AI page generator actually works. I described a SaaS pricing page and it nailed the layout in 8 seconds. I just tweaked the copy.\"",author:"— Beta tester, SaaS founder"},
              {text:"\"Finally a heatmap + landing page builder combo. I used to pay $99 for Hotjar alone. This does more for less.\"",author:"— Beta tester, performance marketer"},
              {text:"\"The screenshot-to-layout feature is insane. I uploaded a Figma mockup and got editable blocks back. Game changer.\"",author:"— Beta tester, freelance designer"},
            ].map((p,i)=>(
              <div key={i} className="proof-card">
                <p className="proof-text">{p.text}</p>
                <div className="proof-author">{p.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>© 2026 AIPageBuilder · Built with ✦ AIPageBuilder</footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PORTFOLIO PAGE
// Sections: Nav → Hero → Stats → Work Grid → Process → Services → Testimonials → CTA → Footer
// ─────────────────────────────────────────────────────────────────────────────
function PortfolioPage() {
  return (
    <>
      <style>{`
        ${BASE_CSS}
        body{background:#090800;color:#fff;}
        nav{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(9,8,0,0.88);backdrop-filter:blur(16px);padding:0 5vw;height:64px;display:flex;align-items:center;justify-content:space-between;}
        .logo{font-weight:900;font-size:16px;letter-spacing:-.02em;text-decoration:none;color:#fff;}
        .logo span{color:#f59e0b;}
        .nav-links{display:flex;gap:28px;}
        .nav-link{font-size:14px;color:rgba(255,255,255,0.4);text-decoration:none;}
        .nav-link:hover{color:#fff;}
        .btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;border:none;transition:all .15s;}
        .btn-amber{background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;}
        .btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);}
        .hero{min-height:88vh;display:flex;align-items:center;padding:80px 5vw;background:radial-gradient(ellipse 70% 50% at 60% 30%,rgba(245,158,11,0.07),transparent);}
        .container{max-width:1120px;margin:0 auto;width:100%;}
        .tag{display:inline-block;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:4px;padding:3px 10px;font-size:11px;color:#f59e0b;letter-spacing:.08em;text-transform:uppercase;margin-bottom:20px;}
        h1{font-size:clamp(2.8rem,6vw,5.2rem);font-weight:900;line-height:1.0;margin-bottom:24px;letter-spacing:-.03em;}
        h1 em{font-style:normal;-webkit-text-stroke:1px rgba(255,255,255,0.28);-webkit-text-fill-color:transparent;}
        .hero-sub{font-size:17px;color:rgba(255,255,255,0.38);max-width:480px;line-height:1.72;margin-bottom:40px;}
        section{padding:88px 5vw;}
        h2{font-size:clamp(1.9rem,3.5vw,3rem);font-weight:900;letter-spacing:-.025em;margin-bottom:8px;}
        .sub{color:rgba(255,255,255,0.3);font-size:14px;margin-bottom:48px;}
        /* Stats */
        .stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:32px;padding:52px 5vw;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);}
        .stat-val{font-size:2.8rem;font-weight:900;color:#f59e0b;letter-spacing:-.02em;}
        .stat-lbl{font-size:12px;color:rgba(255,255,255,0.28);margin-top:5px;}
        /* Work */
        .work-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;}
        .work-card{border-radius:18px;overflow:hidden;cursor:pointer;}
        .work-img{height:220px;display:flex;align-items:center;justify-content:center;font-size:44px;}
        .work-info{padding:18px 0 8px;}
        .work-title{font-size:15px;font-weight:700;margin-bottom:4px;}
        .work-cat{font-size:12px;color:rgba(255,255,255,0.3);}
        /* Process */
        .process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px;}
        .proc-card{position:relative;padding-top:12px;}
        .proc-num{font-size:3rem;font-weight:900;color:rgba(245,158,11,0.12);position:absolute;top:-8px;left:0;line-height:1;}
        .proc-title{font-size:15px;font-weight:700;margin-bottom:8px;position:relative;}
        .proc-desc{font-size:13px;color:rgba(255,255,255,0.35);line-height:1.65;}
        /* Services */
        .serv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;}
        .serv-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;transition:border-color .2s;}
        .serv-card:hover{border-color:rgba(245,158,11,0.3);}
        .serv-icon{font-size:24px;margin-bottom:12px;}
        .serv-title{font-size:14px;font-weight:700;margin-bottom:6px;}
        .serv-desc{font-size:13px;color:rgba(255,255,255,0.3);line-height:1.55;}
        /* Testimonials */
        .testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;}
        .testi-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:28px;}
        .stars{color:#f59e0b;font-size:12px;margin-bottom:14px;}
        .testi-text{font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:20px;}
        .testi-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#000;flex-shrink:0;}
        .testi-name{font-size:13px;font-weight:600;}
        .testi-role{font-size:11px;color:rgba(255,255,255,0.28);}
        /* CTA */
        .cta-banner{background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(239,68,68,0.05));border:1px solid rgba(245,158,11,0.15);border-radius:22px;padding:64px 40px;text-align:center;}
        footer{border-top:1px solid rgba(255,255,255,0.04);padding:28px 5vw;text-align:center;font-size:12px;color:rgba(255,255,255,0.15);}
      `}</style>

      {/* ── Nav ── */}
      <nav>
        <a href="#" className="logo">Creative<span>Co</span></a>
        <div className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#process" className="nav-link">Process</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="#contact" className="btn btn-amber" style={{padding:"8px 18px"}}>Hire Us</a>
      </nav>

      {/* ── Hero ── */}
      <div className="hero">
        <div className="container">
          <div className="tag">Award-winning agency · Est. 2019</div>
          <h1>We Build<br /><em>Brands</em> That<br />Stand Out.</h1>
          <p className="hero-sub">Strategic design, bold creative, digital excellence. We partner with ambitious brands to create unforgettable experiences that drive growth.</p>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
            <a href="#work" className="btn btn-amber">View Our Work →</a>
            <a href="#contact" className="btn btn-ghost">Let&apos;s Talk</a>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stat-row container">
        {[{v:"40+",l:"Projects Delivered"},{v:"98%",l:"Client Satisfaction"},{v:"12",l:"Industries Served"},{v:"5★",l:"Avg. Rating"}].map(s=>(
          <div key={s.l}><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div>
        ))}
      </div>

      {/* ── Work ── */}
      <section id="work">
        <div className="container">
          <h2>Selected Work</h2>
          <p className="sub">Recent projects we&apos;re proud of.</p>
          <div className="work-grid">
            {[
              {emoji:"🏔️",title:"NordVPN Rebrand",cat:"Brand Identity",bg:"linear-gradient(135deg,#1e3a5f,#0a1628)"},
              {emoji:"🛍️",title:"Shopify Campaign",cat:"Digital Marketing",bg:"linear-gradient(135deg,#1a1a2e,#16213e)"},
              {emoji:"🎵",title:"Soundly App",cat:"UI/UX Design",bg:"linear-gradient(135deg,#2d1b69,#11014a)"},
              {emoji:"🌿",title:"GreenEarth Co.",cat:"Brand + Web",bg:"linear-gradient(135deg,#0a2c1a,#061a10)"},
              {emoji:"🏦",title:"FinTrack Dashboard",cat:"Web Design",bg:"linear-gradient(135deg,#1a2a4a,#0d1a30)"},
              {emoji:"🎮",title:"GameLoft Rebrand",cat:"Brand Identity",bg:"linear-gradient(135deg,#2a0a3a,#1a0526)"},
            ].map(w=>(
              <div key={w.title} className="work-card">
                <div className="work-img" style={{background:w.bg}}>{w.emoji}</div>
                <div className="work-info">
                  <div className="work-title">{w.title}</div>
                  <div className="work-cat">{w.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" style={{borderTop:"1px solid rgba(255,255,255,0.04)",background:"rgba(255,255,255,0.01)"}}>
        <div className="container">
          <h2>How We Work</h2>
          <p className="sub">A proven process. No surprises.</p>
          <div className="process-grid">
            {[
              {n:"01",title:"Discovery",desc:"We learn your brand, audience, and goals. One kickoff call — we deliver a full creative brief."},
              {n:"02",title:"Strategy",desc:"We map out the creative direction and content strategy before a single pixel is placed."},
              {n:"03",title:"Design",desc:"Three concepts delivered in two weeks. We iterate until it&apos;s exactly right."},
              {n:"04",title:"Launch",desc:"Full handoff — files, brand guide, code. We launch, you own everything."},
            ].map(p=>(
              <div key={p.n} className="proc-card">
                <div className="proc-num">{p.n}</div>
                <div className="proc-title">{p.title}</div>
                <div className="proc-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services">
        <div className="container">
          <h2>What We Do</h2>
          <p className="sub">Full-service creative studio.</p>
          <div className="serv-grid">
            {[
              {icon:"🎨",t:"Brand Identity",d:"Logo, color systems, typography — a brand that lasts 10 years."},
              {icon:"💻",t:"Web Design",d:"Pixel-perfect websites that turn visitors into customers."},
              {icon:"📱",t:"UI/UX Design",d:"Intuitive interfaces for web and mobile products."},
              {icon:"📈",t:"Digital Marketing",d:"Campaigns that drive traffic, qualified leads, and revenue."},
              {icon:"📸",t:"Content & Photo",d:"Brand photography, video, and content that stops the scroll."},
              {icon:"📣",t:"Social Media",d:"Strategy, design, and scheduling — your brand always on."},
            ].map(s=>(
              <div key={s.t} className="serv-card">
                <div className="serv-icon">{s.icon}</div>
                <div className="serv-title">{s.t}</div>
                <div className="serv-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{borderTop:"1px solid rgba(255,255,255,0.04)",background:"rgba(255,255,255,0.01)"}}>
        <div className="container">
          <h2>What Clients Say</h2>
          <p className="sub">Words from the brands we&apos;ve helped grow.</p>
          <div className="testi-grid">
            {[
              {av:"NK",name:"Nina K.",role:"CMO, NordVPN",text:"\"CreativeCo transformed our visual identity. The rebrand drove a 40% increase in brand recognition scores within 3 months.\""},
              {av:"RT",name:"Ryan T.",role:"Founder, Soundly",text:"\"They understood our product vision immediately. The UI they delivered cut our onboarding drop-off by 60%. Exceptional work.\""},
              {av:"ML",name:"Maria L.",role:"CEO, GreenEarth Co.",text:"\"Professional, fast, and genuinely creative. Our website now converts 2.8× better than before the redesign. Worth every penny.\""},
            ].map(t=>(
              <div key={t.name} className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="testi-text">{t.text}</p>
                <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                  <div className="testi-av">{t.av}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Work Together?</h2>
            <p style={{color:"rgba(255,255,255,0.38)",marginTop:"12px",marginBottom:"32px",fontSize:"15px",maxWidth:"480px",margin:"12px auto 32px"}}>Tell us about your project. We respond within 24 hours and provide a free creative brief.</p>
            <a href="mailto:hello@creativeco.com" className="btn btn-amber" style={{padding:"14px 36px",fontSize:"15px"}}>Start a Project →</a>
            <p style={{marginTop:"14px",fontSize:"12px",color:"rgba(255,255,255,0.2)"}}>Free consultation · Response within 24h · No commitment</p>
          </div>
        </div>
      </section>

      <footer>© 2026 CreativeCo · Built with ✦ AIPageBuilder</footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. FUNNEL PAGE
// Sections: Progress Bar → Hero Form → Benefits → Testimonials → FAQ → Trust Footer
// ─────────────────────────────────────────────────────────────────────────────
function FunnelPage() {
  return (
    <>
      <style>{`
        ${BASE_CSS}
        body{background:#040e04;color:#fff;}
        .page{min-height:100vh;padding:48px 5vw 64px;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(16,185,129,0.1),transparent);}
        .container{max-width:540px;margin:0 auto;}
        /* Progress */
        .progress-wrap{margin-bottom:28px;}
        .step-bar{display:flex;align-items:center;gap:0;}
        .step-seg{flex:1;height:3px;background:rgba(255,255,255,0.08);border-radius:2px;}
        .step-seg.done{background:linear-gradient(90deg,#10b981,#34d399);}
        .step-dot{width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;}
        .step-dot.done{background:linear-gradient(135deg,#10b981,#34d399);color:#000;}
        .step-dot.active{background:rgba(16,185,129,0.15);border:2px solid #10b981;color:#10b981;}
        .step-dot.todo{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.25);}
        .step-labels{display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,0.2);margin-top:7px;}
        /* Form card */
        .card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);border-radius:22px;padding:40px;}
        .badge{display:inline-block;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:4px;padding:3px 10px;font-size:11px;color:#34d399;margin-bottom:16px;letter-spacing:.06em;text-transform:uppercase;}
        h1{font-size:clamp(1.7rem,4vw,2.4rem);font-weight:900;line-height:1.2;margin-bottom:10px;letter-spacing:-.025em;}
        h1 span{background:linear-gradient(135deg,#10b981,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sub{font-size:14px;color:rgba(255,255,255,0.38);line-height:1.65;margin-bottom:28px;}
        label{display:block;font-size:12px;font-weight:600;color:rgba(255,255,255,0.45);margin-bottom:6px;margin-top:16px;}
        input,select{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 14px;color:#fff;font-size:14px;outline:none;}
        input::placeholder{color:rgba(255,255,255,0.2);}
        select option{background:#0a1a0a;}
        .btn-green{width:100%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;border-radius:12px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;margin-top:24px;letter-spacing:-.01em;}
        .trust-row{display:flex;justify-content:center;gap:20px;margin-top:18px;}
        .trust-item{display:flex;align-items:center;gap:5px;font-size:11px;color:rgba(255,255,255,0.28);}
        /* Benefits */
        section{padding:0 0 48px;}
        .benefits{margin-top:36px;}
        .benefit{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);}
        .check{width:22px;height:22px;background:rgba(16,185,129,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;color:#34d399;margin-top:1px;}
        .ben-title{font-size:14px;font-weight:600;margin-bottom:2px;}
        .ben-desc{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.5;}
        /* Testimonials */
        .testi-grid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:28px;}
        .testi-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;}
        .stars{color:#f59e0b;font-size:12px;margin-bottom:10px;}
        .testi-text{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65;margin-bottom:14px;}
        .testi-name{font-size:12px;font-weight:600;}
        .testi-role{font-size:11px;color:rgba(255,255,255,0.25);}
        /* FAQ */
        .faq-item{border-bottom:1px solid rgba(255,255,255,0.05);padding:18px 0;}
        .faq-q{font-size:14px;font-weight:600;margin-bottom:7px;}
        .faq-a{font-size:13px;color:rgba(255,255,255,0.38);line-height:1.65;}
        /* Rating */
        .rating-bar{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:18px;text-align:center;margin-top:28px;}
        footer{padding-top:24px;text-align:center;font-size:11px;color:rgba(255,255,255,0.15);}
      `}</style>

      <div className="page">
        <div className="container">

          {/* ── Progress ── */}
          <div className="progress-wrap">
            <div className="step-bar">
              <div className="step-dot done">✓</div>
              <div className="step-seg done"/>
              <div className="step-dot done">✓</div>
              <div className="step-seg done" style={{maxWidth:"30%"}}/>
              <div className="step-dot active">3</div>
              <div className="step-seg"/>
              <div className="step-dot todo">4</div>
            </div>
            <div className="step-labels"><span>Account</span><span>Details</span><span style={{color:"#34d399"}}>Trial</span><span>Confirm</span></div>
          </div>

          {/* ── Form ── */}
          <div className="card">
            <div className="badge">✓ Step 3 of 4</div>
            <h1>Start Your <span>Free 14-Day</span> Trial</h1>
            <p className="sub">No credit card required. Full access to all Pro features. Cancel anytime in one click.</p>

            <label>Full Name</label>
            <input type="text" placeholder="Alex Johnson" readOnly />
            <label>Work Email</label>
            <input type="email" placeholder="alex@company.com" readOnly />
            <label>Company Size</label>
            <select disabled>
              <option>Just me (solo founder)</option>
              <option>2–10 employees</option>
              <option>11–50 employees</option>
            </select>
            <label>Primary use case</label>
            <select disabled>
              <option>Landing pages for my SaaS</option>
              <option>Client projects (agency)</option>
              <option>Marketing campaigns</option>
            </select>

            <button className="btn-green">🚀 Start Free Trial Now →</button>
            <div className="trust-row">
              <div className="trust-item">🔒 SSL encrypted</div>
              <div className="trust-item">✓ No credit card</div>
              <div className="trust-item">↩ Cancel anytime</div>
            </div>
          </div>

          {/* ── Benefits ── */}
          <div className="benefits">
            {[
              {title:"Unlimited AI page generation for 14 days",desc:"Build as many pages as you want with Claude AI. No limits during your trial."},
              {title:"Heatmaps, analytics & session recordings",desc:"See exactly how visitors interact with every page you create."},
              {title:"Custom domain + SSL included",desc:"Publish to your own domain with a free SSL certificate from day one."},
              {title:"50+ integrations (Zapier, HubSpot, Slack)",desc:"Connect to your existing stack without any manual work."},
              {title:"Priority support via live chat",desc:"Real humans. Response under 2 hours, 7 days a week."},
            ].map(b=>(
              <div key={b.title} className="benefit">
                <div className="check">✓</div>
                <div><div className="ben-title">{b.title}</div><div className="ben-desc">{b.desc}</div></div>
              </div>
            ))}
          </div>

          {/* ── Mini Testimonials ── */}
          <div style={{marginTop:"40px"}}>
            <div style={{fontSize:"11px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(16,185,129,0.6)",marginBottom:"16px"}}>What Others Say</div>
            <div className="testi-grid">
              {[
                {text:"\"Set up in 10 minutes. Had my first page live same day. Conversion rate went up 40% in the first week.\"",name:"Sarah K.",role:"Agency Owner"},
                {text:"\"The AI generator saved us 8+ hours per page. At $39/month it pays for itself on the first client.\"",name:"Marcus T.",role:"Performance Marketer"},
              ].map(t=>(
                <div key={t.name} className="testi-card">
                  <div className="stars">★★★★★</div>
                  <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
                  <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                    <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"linear-gradient(135deg,#10b981,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:700,flexShrink:0}}>{t.name.split(" ").map(w=>w[0]).join("")}</div>
                    <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div style={{marginTop:"40px"}}>
            <div style={{fontSize:"11px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(16,185,129,0.6)",marginBottom:"16px"}}>Common Questions</div>
            {[
              {q:"What happens after 14 days?",a:"You'll be asked to choose a plan. If you don't, you drop to the free tier automatically — no charge."},
              {q:"Can I really cancel anytime?",a:"Yes. One click in your settings. No forms, no calls, no cancellation fees."},
              {q:"Is my data secure?",a:"Yes. SSL encryption, SOC 2 compliant infrastructure, and daily backups. Your data is never sold."},
            ].map(f=>(
              <div key={f.q} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>

          <div className="rating-bar">
            ⭐⭐⭐⭐⭐ <strong style={{color:"rgba(255,255,255,0.7)"}}>4.9/5</strong> from 840 reviews · &ldquo;Best page builder I&apos;ve used&rdquo;
          </div>

          <footer>© 2026 AIPageBuilder · Secure checkout · Privacy protected</footer>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. PRICING PAGE
// Sections: Nav → Header → Toggle → Plans → Comparison → Testimonials → FAQ → CTA → Footer
// ─────────────────────────────────────────────────────────────────────────────
function PricingPage() {
  return (
    <>
      <style>{`
        ${BASE_CSS}
        body{background:#080810;color:#fff;}
        nav{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(8,8,16,0.85);backdrop-filter:blur(16px);padding:0 5vw;height:64px;display:flex;align-items:center;justify-content:space-between;}
        .logo{font-weight:700;font-size:15px;display:flex;align-items:center;gap:8px;text-decoration:none;color:#fff;}
        .logo-icon{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#2563eb);}
        .btn{display:inline-flex;align-items:center;padding:8px 18px;border-radius:10px;font-size:13px;font-weight:600;text-decoration:none;cursor:pointer;border:none;transition:all .15s;}
        .btn-primary{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;}
        .btn-ghost{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);}
        section{padding:80px 5vw;}
        .container{max-width:1120px;margin:0 auto;}
        h1{font-size:clamp(2rem,4.5vw,3.2rem);font-weight:900;text-align:center;margin-bottom:12px;letter-spacing:-.03em;background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;text-align:center;margin-bottom:12px;letter-spacing:-.025em;}
        .sub{text-align:center;color:rgba(255,255,255,0.38);font-size:16px;margin-bottom:36px;}
        /* Toggle */
        .toggle{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:52px;}
        .toggle-track{width:48px;height:26px;background:rgba(124,58,237,0.25);border-radius:99px;position:relative;cursor:pointer;border:1px solid rgba(124,58,237,0.35);}
        .toggle-thumb{width:20px;height:20px;background:#7c3aed;border-radius:50%;position:absolute;top:2px;left:24px;}
        .toggle-lbl{font-size:14px;color:rgba(255,255,255,0.45);}
        .save{background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.25);border-radius:999px;padding:2px 10px;font-size:11px;color:#34d399;}
        /* Plans */
        .plans-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;align-items:start;}
        .plan{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:22px;padding:28px;position:relative;}
        .plan.popular{background:rgba(124,58,237,0.07);border-color:rgba(124,58,237,0.4);}
        .pop-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;border-radius:999px;padding:3px 14px;font-size:11px;font-weight:600;white-space:nowrap;}
        .plan-name{font-size:11px;font-weight:700;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;}
        .plan-price{font-size:3rem;font-weight:900;letter-spacing:-.03em;margin-bottom:4px;}
        .plan-period{font-size:12px;color:rgba(255,255,255,0.28);margin-bottom:8px;}
        .plan-desc{font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:20px;}
        .plan-btn{width:100%;padding:11px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;border:none;margin-bottom:20px;transition:all .15s;}
        .plan-btn.pri{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;}
        .plan-btn.gho{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.65);}
        .divider{height:1px;background:rgba(255,255,255,0.05);margin-bottom:18px;}
        .feat{display:flex;align-items:center;gap:9px;margin-bottom:9px;font-size:13px;}
        .ck{color:#34d399;font-size:11px;flex-shrink:0;}
        .xx{color:rgba(255,255,255,0.18);font-size:11px;flex-shrink:0;}
        /* Compare */
        .compare-table{width:100%;border-collapse:collapse;font-size:13px;}
        .compare-table th{padding:10px 16px;text-align:left;color:rgba(255,255,255,0.35);font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid rgba(255,255,255,0.06);}
        .compare-table th:not(:first-child){text-align:center;}
        .compare-table td{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);color:rgba(255,255,255,0.65);}
        .compare-table td:not(:first-child){text-align:center;}
        .compare-table tr:last-child td{border-bottom:none;}
        .hi{color:#34d399;}
        .no{color:rgba(255,255,255,0.18);}
        /* Testimonials */
        .testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;}
        .testi-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:26px;}
        .stars{color:#f59e0b;font-size:12px;margin-bottom:12px;}
        .testi-text{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:18px;}
        .testi-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;}
        .testi-name{font-size:13px;font-weight:600;}
        .testi-role{font-size:11px;color:rgba(255,255,255,0.28);}
        /* FAQ */
        .faq-wrap{max-width:700px;margin:0 auto;}
        .faq-item{border-bottom:1px solid rgba(255,255,255,0.05);padding:22px 0;}
        .faq-q{font-size:15px;font-weight:600;margin-bottom:8px;}
        .faq-a{font-size:14px;color:rgba(255,255,255,0.38);line-height:1.65;}
        /* CTA */
        .cta-box{background:linear-gradient(135deg,rgba(124,58,237,0.12),rgba(37,99,235,0.08));border:1px solid rgba(139,92,246,0.2);border-radius:24px;padding:64px 40px;text-align:center;}
        footer{border-top:1px solid rgba(255,255,255,0.04);padding:28px 5vw;text-align:center;font-size:12px;color:rgba(255,255,255,0.15);}
      `}</style>

      {/* ── Nav ── */}
      <nav>
        <a href="/p/saas-landing" className="logo"><div className="logo-icon"/><span>AIPageBuilder</span></a>
        <div style={{display:"flex",gap:"8px"}}>
          <a href="/p/saas-landing" className="btn btn-ghost">← Back</a>
          <a href="#" className="btn btn-primary">Get started free</a>
        </div>
      </nav>

      {/* ── Header ── */}
      <section>
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p className="sub">Start free. Upgrade when you&apos;re ready. No hidden fees, no surprises.</p>

          <div className="toggle">
            <span className="toggle-lbl">Monthly</span>
            <div className="toggle-track"><div className="toggle-thumb"/></div>
            <span className="toggle-lbl">Annual</span>
            <span className="save">Save 20%</span>
          </div>

          {/* ── Plans ── */}
          <div className="plans-grid">
            {[
              {name:"Free",price:"$0",period:"forever",desc:"Perfect to get started",btn:"gho",btnText:"Start free",feats:[
                {t:"1 published page",y:true},{t:"5 AI credits/month",y:true},{t:"Basic analytics",y:true},{t:"PageForge subdomain",y:true},{t:"Custom domain",y:false},{t:"Heatmaps",y:false},
              ]},
              {name:"Starter",price:"$19",period:"/month",desc:"For solopreneurs",btn:"gho",btnText:"Start free trial",feats:[
                {t:"15 pages",y:true},{t:"100 AI credits/month",y:true},{t:"Standard analytics",y:true},{t:"Custom domain",y:true},{t:"Lead capture",y:true},{t:"Heatmaps",y:false},
              ]},
              {name:"Pro",price:"$39",period:"/month",desc:"Most popular",btn:"pri",btnText:"Start 14-day trial",popular:true,feats:[
                {t:"50 pages",y:true},{t:"500 AI credits/month",y:true},{t:"Advanced analytics",y:true},{t:"Custom domain",y:true},{t:"Heatmaps + Recordings",y:true},{t:"A/B Testing",y:true},
              ]},
              {name:"Unlimited",price:"$99",period:"/month",desc:"For agencies & teams",btn:"gho",btnText:"Contact sales",feats:[
                {t:"Unlimited pages",y:true},{t:"Unlimited AI credits",y:true},{t:"All analytics",y:true},{t:"White label",y:true},{t:"API access",y:true},{t:"Unlimited team seats",y:true},
              ]},
            ].map(p=>(
              <div key={p.name} className={`plan${p.popular?" popular":""}`}>
                {p.popular&&<div className="pop-badge">⚡ Most Popular</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price}</div>
                <div className="plan-period">{p.period}</div>
                <div className="plan-desc">{p.desc}</div>
                <button className={`plan-btn ${p.btn}`}>{p.btnText}</button>
                <div className="divider"/>
                {p.feats.map(f=>(
                  <div key={f.t} className="feat">
                    <span className={f.y?"ck":"xx"}>{f.y?"✓":"✕"}</span>
                    <span style={{color:f.y?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.22)"}}>{f.t}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section style={{paddingTop:"20px",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <div className="container">
          <h2 style={{marginBottom:"8px"}}>Compare All Features</h2>
          <p className="sub">Full breakdown of what&apos;s included in each plan.</p>
          <div style={{overflowX:"auto"}}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{width:"40%"}}>Feature</th>
                  <th>Free</th><th>Starter</th><th style={{color:"#a78bfa"}}>Pro</th><th>Unlimited</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Published pages","1","15","50","∞"],
                  ["AI credits/month","5","100","500","∞"],
                  ["Custom domain","✕","✓","✓","✓"],
                  ["Analytics","Basic","Standard","Advanced","Advanced"],
                  ["Heatmaps","✕","✕","✓","✓"],
                  ["Session recordings","✕","✕","✓","✓"],
                  ["A/B Testing","✕","✕","✓","✓"],
                  ["Popup builder","✕","✕","✓","✓"],
                  ["White label","✕","✕","✕","✓"],
                  ["API access","✕","✕","✕","✓"],
                  ["Team seats","1","1","5","∞"],
                  ["Support","Email","Email","Priority","Dedicated"],
                ].map(row=>(
                  <tr key={row[0]}>
                    <td style={{fontWeight:500,color:"rgba(255,255,255,0.7)"}}>{row[0]}</td>
                    {row.slice(1).map((v,i)=>(
                      <td key={i} className={v==="✓"?"hi":v==="✕"?"no":""}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section>
        <div className="container">
          <h2 style={{marginBottom:"12px"}}>Trusted by 2,400+ teams</h2>
          <p className="sub">Real users. Real results.</p>
          <div className="testi-grid">
            {[
              {av:"SK",name:"Sarah K.",role:"Agency Owner",text:"Replaced Hotjar, ClickFunnels, and OptinMonster. Saved $400/mo. At $39, it's the easiest ROI I've ever seen."},
              {av:"MT",name:"Marcus T.",role:"Performance Marketer",text:"Switched from Pro to Unlimited for the white-label. My clients think it's my custom platform. Worth every penny."},
              {av:"JL",name:"James L.",role:"SaaS Founder",text:"Started on Free to test it. Upgraded to Pro within a week. The heatmaps alone paid for the subscription."},
              {av:"AM",name:"Ana M.",role:"E-commerce Consultant",text:"The Starter plan is incredible value. 15 pages + analytics is more than enough for most of my clients."},
            ].map(t=>(
              <div key={t.name} className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
                <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <div className="testi-av">{t.av}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{paddingTop:"20px",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <div className="container">
          <h2 style={{marginBottom:"40px"}}>Frequently Asked Questions</h2>
          <div className="faq-wrap">
            {[
              {q:"Is the free plan really free forever?",a:"Yes. No credit card required. You get 1 published page and 5 AI credits per month — permanently free, no expiry."},
              {q:"Can I cancel anytime?",a:"Absolutely. Cancel with one click from your billing settings. No questions asked, no cancellation fees, instant."},
              {q:"What are AI credits?",a:"Each AI generation (page, section, or copy) uses 1 credit. Credits reset every month on your billing date."},
              {q:"Do I get a free trial on paid plans?",a:"Yes — both Starter and Pro include a 14-day free trial. No credit card needed to start. Downgrade anytime."},
              {q:"Can I switch plans later?",a:"Yes. Upgrade or downgrade at any time. Upgrades are prorated. Downgrades take effect at the next billing cycle."},
              {q:"What happens to my pages if I downgrade?",a:"Your pages stay. If you go over the new plan's page limit, existing pages stay published but you can't publish new ones until you upgrade."},
            ].map(f=>(
              <div key={f.q} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <div className="container">
          <div className="cta-box">
            <h2>Start building for free today</h2>
            <p style={{color:"rgba(255,255,255,0.38)",fontSize:"16px",margin:"12px auto 36px",maxWidth:"480px",lineHeight:"1.65"}}>
              No credit card required. 14-day Pro trial. Cancel anytime.
            </p>
            <a href="#" className="btn btn-primary" style={{padding:"14px 40px",fontSize:"16px"}}>Get started free →</a>
          </div>
        </div>
      </section>

      <footer>© 2026 AIPageBuilder · All rights reserved</footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. COMING SOON PAGE
// Sections: Hero/Countdown → What's Coming → Email Capture → Social Proof → Social Links → Footer
// ─────────────────────────────────────────────────────────────────────────────
function ComingSoonPage() {
  return (
    <>
      <style>{`
        ${BASE_CSS}
        body{background:#080810;color:#fff;min-height:100vh;}
        .blob{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;}
        /* Hero */
        .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 5vw;position:relative;z-index:1;}
        .logo-box{width:60px;height:60px;border-radius:18px;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 28px;}
        h1{font-size:clamp(2.2rem,5.5vw,3.8rem);font-weight:900;line-height:1.08;margin-bottom:18px;letter-spacing:-.03em;background:linear-gradient(135deg,#fff 0%,#a78bfa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sub{font-size:16px;color:rgba(255,255,255,0.38);max-width:480px;line-height:1.72;margin:0 auto 44px;}
        /* Countdown */
        .countdown{display:flex;gap:12px;justify-content:center;margin-bottom:48px;}
        .count-box{display:flex;flex-direction:column;align-items:center;gap:8px;}
        .count-val{width:68px;height:68px;background:rgba(255,255,255,0.04);border:1px solid rgba(139,92,246,0.2);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;font-family:monospace;color:#a78bfa;}
        .count-lbl{font-size:10px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:.1em;}
        .colon{font-size:26px;color:rgba(255,255,255,0.15);margin-top:-14px;}
        /* Email */
        .form{display:flex;gap:8px;max-width:420px;width:100%;margin:0 auto 12px;}
        input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:13px 16px;color:#fff;font-size:14px;outline:none;}
        input::placeholder{color:rgba(255,255,255,0.2);}
        .btn{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;border:none;border-radius:10px;padding:13px 22px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;}
        /* What's Coming */
        section{padding:80px 5vw;position:relative;z-index:1;}
        .container{max-width:1080px;margin:0 auto;}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(139,92,246,0.6);margin-bottom:12px;text-align:center;}
        h2{font-size:clamp(1.7rem,3vw,2.4rem);font-weight:800;text-align:center;margin-bottom:12px;letter-spacing:-.025em;}
        .feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;}
        .feat-card{background:rgba(255,255,255,0.02);border:1px solid rgba(139,92,246,0.12);border-radius:18px;padding:26px;}
        .feat-icon{font-size:26px;margin-bottom:12px;}
        .feat-title{font-size:14px;font-weight:700;margin-bottom:7px;}
        .feat-desc{font-size:13px;color:rgba(255,255,255,0.35);line-height:1.65;}
        /* Social Proof */
        .proof-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;}
        .proof-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:20px;}
        .proof-text{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.65;margin-bottom:12px;}
        .proof-author{font-size:11px;color:rgba(255,255,255,0.22);}
        /* Social */
        .social{display:flex;gap:14px;justify-content:center;margin-top:40px;}
        .social-icon{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:15px;text-decoration:none;transition:background .15s;}
        .social-icon:hover{background:rgba(255,255,255,0.08);}
        footer{border-top:1px solid rgba(255,255,255,0.04);padding:28px 5vw;text-align:center;font-size:12px;color:rgba(255,255,255,0.15);position:relative;z-index:1;}
      `}</style>

      <div className="blob" style={{width:"500px",height:"500px",top:"-150px",left:"-150px",background:"rgba(124,58,237,0.1)"}} />
      <div className="blob" style={{width:"400px",height:"400px",bottom:"-100px",right:"-100px",background:"rgba(37,99,235,0.08)"}} />

      {/* ── Hero / Countdown ── */}
      <div className="hero">
        <div className="logo-box">✦</div>
        <h1>Something Amazing<br />is Coming Soon</h1>
        <p className="sub">We&apos;re crafting the next generation of AI-powered page building. Join the waitlist — early members get 3 months free.</p>

        <div className="countdown">
          {[{v:"08",l:"Days"},{v:"14",l:"Hours"},{v:"32",l:"Min"},{v:"09",l:"Sec"}].map((c,i)=>(
            <div key={c.l} style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <div className="count-box"><div className="count-val">{c.v}</div><div className="count-lbl">{c.l}</div></div>
              {i<3&&<div className="colon">:</div>}
            </div>
          ))}
        </div>

        <div className="form">
          <input type="email" placeholder="your@email.com" />
          <button className="btn">Join Waitlist</button>
        </div>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.2)"}}>🔒 No spam · Unsubscribe anytime · <strong style={{color:"rgba(255,255,255,0.4)"}}>847 people</strong> on the waitlist</p>

        <div className="social">
          {["𝕏","in","▲","f"].map(s=><a key={s} href="#" className="social-icon">{s}</a>)}
        </div>
      </div>

      {/* ── What's Coming ── */}
      <section style={{borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <div className="container">
          <div className="section-label">What&apos;s Coming</div>
          <h2 style={{marginBottom:"12px"}}>Features in the first release</h2>
          <p style={{textAlign:"center",color:"rgba(255,255,255,0.32)",fontSize:"15px",marginBottom:"44px"}}>Everything you need to build, publish, and optimize — day one.</p>
          <div className="feat-grid">
            {[
              {icon:"🧠",title:"AI Page Generator",desc:"Describe any page in plain English. Full layout, copy, and styling generated in under 10 seconds."},
              {icon:"🔥",title:"Click Heatmaps",desc:"See where every visitor clicks. Filter by device, date, and traffic source."},
              {icon:"📹",title:"Session Recordings",desc:"Watch real visitor sessions — find every drop-off, every rage-click, every confusion."},
              {icon:"🎯",title:"Popup Builder",desc:"Exit-intent, scroll, and time-delay popups with 6 types and 5 smart trigger options."},
              {icon:"🔗",title:"50+ Integrations",desc:"Zapier, HubSpot, Mailchimp, Slack, Notion — connect everything you already use."},
              {icon:"📊",title:"Analytics Dashboard",desc:"Views, bounce rate, conversions — all in one beautiful dashboard with CSV export."},
            ].map(f=>(
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof / Early Access ── */}
      <section style={{borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <div className="container">
          <div className="section-label">Early Access</div>
          <h2 style={{marginBottom:"12px"}}>What beta testers say</h2>
          <p style={{textAlign:"center",color:"rgba(255,255,255,0.32)",fontSize:"15px",marginBottom:"40px"}}>Real feedback from our private beta.</p>
          <div className="proof-grid">
            {[
              {text:"\"The AI page generator actually works. I described a SaaS pricing page and it nailed the layout in 8 seconds. I just tweaked the copy.\"",author:"— Beta tester, SaaS founder"},
              {text:"\"Finally a heatmap + landing page builder combo. I used to pay $99 for Hotjar alone. This does 10× more.\"",author:"— Beta tester, growth marketer"},
              {text:"\"The screenshot-to-layout feature is insane. Figma → editable blocks in seconds.\"",author:"— Beta tester, freelance designer"},
            ].map((p,i)=>(
              <div key={i} className="proof-card">
                <p className="proof-text">{p.text}</p>
                <div className="proof-author">{p.author}</div>
              </div>
            ))}
          </div>

          {/* Second email capture */}
          <div style={{textAlign:"center",marginTop:"56px"}}>
            <p style={{fontSize:"18px",fontWeight:700,marginBottom:"20px"}}>Don&apos;t miss launch day</p>
            <div className="form" style={{maxWidth:"400px"}}>
              <input type="email" placeholder="your@email.com" />
              <button className="btn">Notify Me</button>
            </div>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,0.2)",marginTop:"10px"}}>Early members get 3 months free on any paid plan.</p>
          </div>
        </div>
      </section>

      <footer>© 2026 AIPageBuilder · Built with ✦ AIPageBuilder</footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const PAGE_COMPONENTS: Record<PageData["type"], () => React.JSX.Element> = {
  saas: SaasPage,
  launch: LaunchPage,
  portfolio: PortfolioPage,
  funnel: FunnelPage,
  pricing: PricingPage,
  "coming-soon": ComingSoonPage,
};

export default async function PublishedPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  if (!page) notFound();

  const PageComponent = PAGE_COMPONENTS[page.type];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {page.customCss && <style>{page.customCss}</style>}
        {page.structuredData && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: page.structuredData }} />
        )}
      </head>
      <body>
        <PageComponent />
        {page.customJs && <script dangerouslySetInnerHTML={{ __html: page.customJs }} />}
        <script dangerouslySetInnerHTML={{ __html: buildTrackingScript(page.id) }} />
      </body>
    </html>
  );
}
