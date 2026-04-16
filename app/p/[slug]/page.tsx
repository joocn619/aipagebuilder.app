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
  // TODO: Replace with Supabase fetch in production
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

// ─── Page renderers ─────────────────────────────────────────────────────────

function SaasPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080810;color:#fff;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        .nav{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(8,8,16,0.8);backdrop-filter:blur(16px);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;max-width:100%;}
        .logo{display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;}
        .logo-icon{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:13px;}
        .nav-links{display:flex;align-items:center;gap:24px;}
        .nav-link{font-size:14px;color:rgba(255,255,255,0.5);text-decoration:none;}
        .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 20px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;border:none;}
        .btn-primary{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;}
        .btn-ghost{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);}
        section{padding:80px 24px;}
        .container{max-width:1100px;margin:0 auto;}
        .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:999px;padding:4px 14px;font-size:12px;color:#a78bfa;letter-spacing:0.04em;margin-bottom:24px;}
        h1{font-size:clamp(2.2rem,5vw,4rem);font-weight:800;line-height:1.1;margin-bottom:20px;background:linear-gradient(135deg,#fff 0%,#a78bfa 50%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .hero-sub{font-size:18px;color:rgba(255,255,255,0.5);max-width:560px;line-height:1.7;margin-bottom:36px;}
        .hero-btns{display:flex;gap:12px;flex-wrap:wrap;}
        .hero-blob{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
        .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;}
        .grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;}
        .grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;}
        .feat-icon{font-size:28px;margin-bottom:14px;}
        .feat-title{font-size:16px;font-weight:600;margin-bottom:8px;}
        .feat-desc{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;}
        .section-label{font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(139,92,246,0.7);margin-bottom:12px;}
        h2{font-size:clamp(1.6rem,3vw,2.5rem);font-weight:700;margin-bottom:12px;}
        .sub{color:rgba(255,255,255,0.4);font-size:16px;margin-bottom:48px;}
        .stat{text-align:center;}
        .stat-val{font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .stat-label{font-size:13px;color:rgba(255,255,255,0.3);margin-top:4px;}
        .avatar-row{display:flex;}
        .avatar{width:32px;height:32px;border-radius:50%;border:2px solid #080810;margin-left:-8px;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;}
        .cta-box{background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(37,99,235,0.10));border:1px solid rgba(139,92,246,0.2);border-radius:24px;padding:64px 40px;text-align:center;}
        footer{border-top:1px solid rgba(255,255,255,0.05);padding:32px 24px;text-align:center;font-size:13px;color:rgba(255,255,255,0.2);}
      `}</style>

      {/* Navbar */}
      <nav className="nav">
        <div className="logo"><div className="logo-icon">✦</div> AIPageBuilder</div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#" className="nav-link">Docs</a>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <a href="#" className="btn btn-ghost" style={{padding:"7px 16px",fontSize:"13px"}}>Sign in</a>
          <a href="#" className="btn btn-primary" style={{padding:"7px 16px",fontSize:"13px"}}>Get started free</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{position:"relative",overflow:"hidden",minHeight:"90vh",display:"flex",alignItems:"center",background:"radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.25), transparent)"}}>
        <div style={{position:"absolute",width:"600px",height:"600px",top:"-200px",left:"-100px",background:"rgba(124,58,237,0.08)",borderRadius:"50%",filter:"blur(80px)",pointerEvents:"none"}} />
        <div style={{position:"absolute",width:"400px",height:"400px",top:"0",right:"0",background:"rgba(37,99,235,0.08)",borderRadius:"50%",filter:"blur(60px)",pointerEvents:"none"}} />
        <div className="container" style={{textAlign:"center",position:"relative",zIndex:1}}>
          <div className="badge">⚡ Powered by Claude AI · Now in Beta</div>
          <h1>Build Pages That<br />Convert — With AI</h1>
          <p className="hero-sub" style={{margin:"0 auto 36px"}}>
            Describe any landing page. AI builds it in 8 seconds — complete with copy, design, and conversion elements. No code, no designers needed.
          </p>
          <div className="hero-btns" style={{justifyContent:"center"}}>
            <a href="#" className="btn btn-primary" style={{padding:"14px 28px",fontSize:"15px"}}>Start Building Free →</a>
            <a href="#" className="btn btn-ghost" style={{padding:"14px 28px",fontSize:"15px"}}>Watch 2-min demo</a>
          </div>
          <div style={{marginTop:"24px",display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",fontSize:"13px",color:"rgba(255,255,255,0.3)"}}>
            <div className="avatar-row">
              {["AJ","SK","MR","TL"].map(i => <div key={i} className="avatar">{i}</div>)}
            </div>
            <span>Trusted by <strong style={{color:"rgba(255,255,255,0.6)"}}>2,400+</strong> marketers & founders</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{padding:"40px 24px",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"32px"}}>
            {[{v:"8s",l:"Avg build time"},{v:"94%",l:"Faster than coding"},{v:"3.2x",l:"More conversions"},{v:"12k+",l:"Pages created"}].map(s => (
              <div key={s.l} className="stat"><div className="stat-val">{s.v}</div><div className="stat-label">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <div className="section-label">Features</div>
            <h2>Everything you need to convert visitors</h2>
            <p className="sub" style={{marginBottom:"0"}}>Built for modern SaaS — fast, beautiful, and battle-tested.</p>
          </div>
          <div className="grid3">
            {[
              {icon:"🧠",title:"AI Page Generator",desc:"Describe any page — Claude AI builds it in 8 seconds with full layout, copy, and styling."},
              {icon:"✍️",title:"AI Copywriter",desc:"Headlines, CTAs, full sections — written in your brand voice, optimized for conversion."},
              {icon:"📊",title:"Heatmaps & Analytics",desc:"See exactly where users click. Built-in heatmaps, session recordings, and conversion tracking."},
              {icon:"🎨",title:"Drag & Drop Editor",desc:"Pixel-perfect control. Adjust every element — colors, fonts, spacing — without writing code."},
              {icon:"🚀",title:"One-Click Publish",desc:"Custom domain, SSL, global CDN. Your page live in under 30 seconds."},
              {icon:"🔗",title:"50+ Integrations",desc:"Zapier, HubSpot, Mailchimp, Slack — your page plugs into everything you already use."},
            ].map(f => (
              <div key={f.title} className="card" style={{transition:"transform 0.2s",cursor:"default"}}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <div className="cta-box">
            <div className="badge" style={{marginBottom:"20px"}}>No credit card required</div>
            <h2>Ready to 3x your conversion rate?</h2>
            <p style={{color:"rgba(255,255,255,0.4)",fontSize:"16px",margin:"12px auto 32px",maxWidth:"480px"}}>
              Join thousands of teams already using AIPageBuilder to ship landing pages in minutes, not weeks.
            </p>
            <a href="#" className="btn btn-primary" style={{padding:"14px 36px",fontSize:"16px"}}>Get started for free</a>
            <p style={{marginTop:"16px",fontSize:"12px",color:"rgba(255,255,255,0.2)"}}>14-day free trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </section>

      <footer>
        <div>© 2026 AIPageBuilder · Built with ✦ AIPageBuilder</div>
      </footer>
    </>
  );
}

function LaunchPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#050a15;color:#fff;font-family:Inter,system-ui,sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;-webkit-font-smoothing:antialiased;}
        .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(37,99,235,0.15);border:1px solid rgba(37,99,235,0.3);border-radius:999px;padding:4px 14px;font-size:12px;color:#60a5fa;letter-spacing:0.04em;margin-bottom:28px;}
        h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;line-height:1.1;margin-bottom:16px;text-align:center;background:linear-gradient(135deg,#fff 0%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sub{font-size:17px;color:rgba(255,255,255,0.4);text-align:center;max-width:480px;line-height:1.7;margin-bottom:40px;}
        .countdown{display:flex;gap:16px;margin-bottom:48px;}
        .count-box{display:flex;flex-direction:column;align-items:center;gap:6px;}
        .count-val{width:72px;height:72px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;font-family:monospace;color:#60a5fa;}
        .count-label{font-size:11px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;}
        .colon{font-size:28px;color:rgba(255,255,255,0.2);margin-top:-10px;}
        .notify-box{display:flex;gap:8px;max-width:420px;width:100%;margin-bottom:16px;}
        input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;color:#fff;font-size:14px;outline:none;}
        input::placeholder{color:rgba(255,255,255,0.2);}
        .btn{background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;border:none;border-radius:10px;padding:12px 22px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;}
        .feature-pills{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:32px;}
        .pill{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:999px;padding:6px 14px;font-size:12px;color:rgba(255,255,255,0.4);}
        .mockup{width:100%;max-width:640px;margin:48px auto 0;background:rgba(255,255,255,0.03);border:1px solid rgba(37,99,235,0.2);border-radius:20px;overflow:hidden;}
        .mockup-bar{background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.05);padding:12px 16px;display:flex;align-items:center;gap:6px;}
        .dot{width:10px;height:10px;border-radius:50%;}
        .mockup-content{padding:32px;display:flex;flex-direction:column;gap:10px;}
        footer{position:fixed;bottom:16px;font-size:12px;color:rgba(255,255,255,0.15);}
      `}</style>

      <div style={{position:"fixed",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.2), transparent)"}} />

      <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 24px",position:"relative",zIndex:1}}>
        <div className="badge">🚀 Launching in</div>
        <h1>Something Big<br />is Coming</h1>
        <p className="sub">We&apos;re building the next generation of AI-powered tools. Be the first in line when we launch.</p>

        <div className="countdown">
          {[{v:"12",l:"Days"},{v:"08",l:"Hours"},{v:"43",l:"Min"},{v:"27",l:"Sec"}].map((c,i) => (
            <div key={c.l} style={{display:"flex",alignItems:"center",gap:"16px"}}>
              <div className="count-box">
                <div className="count-val">{c.v}</div>
                <div className="count-label">{c.l}</div>
              </div>
              {i < 3 && <div className="colon">:</div>}
            </div>
          ))}
        </div>

        <div className="notify-box">
          <input type="email" placeholder="your@email.com" />
          <button className="btn">Notify Me</button>
        </div>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,0.2)"}}>No spam. Unsubscribe anytime. 1,240 people waiting.</p>

        <div className="mockup">
          <div className="mockup-bar">
            <div className="dot" style={{background:"#ff5f57"}}/>
            <div className="dot" style={{background:"#ffbd2e"}}/>
            <div className="dot" style={{background:"#28c840"}}/>
            <div style={{flex:1,height:"16px",background:"rgba(255,255,255,0.05)",borderRadius:"4px",margin:"0 8px"}}/>
          </div>
          <div className="mockup-content">
            {[80,65,90,50,70].map((w,i) => <div key={i} style={{height:"10px",width:`${w}%`,background:"rgba(255,255,255,0.06)",borderRadius:"4px"}}/>)}
            <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
              <div style={{height:"32px",width:"90px",background:"linear-gradient(135deg,rgba(37,99,235,0.5),rgba(14,165,233,0.4))",borderRadius:"8px"}}/>
              <div style={{height:"32px",width:"70px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"8px"}}/>
            </div>
          </div>
        </div>

        <div className="feature-pills" style={{maxWidth:"500px"}}>
          {["AI-powered","No code needed","Lightning fast","Built-in analytics","Free to start"].map(p => (
            <span key={p} className="pill">{p}</span>
          ))}
        </div>
      </div>

      <footer>© 2026 AIPageBuilder</footer>
    </>
  );
}

function PortfolioPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#0a0800;color:#fff;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        nav{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,0.05);background:rgba(10,8,0,0.85);backdrop-filter:blur(16px);padding:0 32px;height:60px;display:flex;align-items:center;justify-content:space-between;}
        .logo{font-weight:800;font-size:16px;letter-spacing:-0.02em;}
        .logo span{color:#f59e0b;}
        .nav-link{font-size:14px;color:rgba(255,255,255,0.4);text-decoration:none;margin-left:28px;}
        .hero{min-height:90vh;display:flex;align-items:center;padding:80px 32px;background:radial-gradient(ellipse 70% 50% at 60% 30%, rgba(245,158,11,0.08), transparent);}
        .container{max-width:1100px;margin:0 auto;width:100%;}
        .tag{display:inline-block;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);border-radius:4px;padding:3px 10px;font-size:11px;color:#f59e0b;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:20px;}
        h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:900;line-height:1.0;margin-bottom:24px;letter-spacing:-0.03em;}
        h1 em{font-style:normal;-webkit-text-stroke:1px rgba(255,255,255,0.3);-webkit-text-fill-color:transparent;}
        .hero-sub{font-size:17px;color:rgba(255,255,255,0.4);max-width:480px;line-height:1.7;margin-bottom:40px;}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;border:none;}
        .btn-amber{background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;}
        .btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);}
        section{padding:80px 32px;}
        h2{font-size:clamp(1.8rem,3vw,3rem);font-weight:800;margin-bottom:8px;letter-spacing:-0.02em;}
        .sub{color:rgba(255,255,255,0.3);font-size:15px;margin-bottom:48px;}
        .work-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;}
        .work-card{border-radius:16px;overflow:hidden;cursor:pointer;position:relative;}
        .work-img{height:220px;display:flex;align-items:center;justify-content:center;font-size:40px;}
        .work-info{padding:20px 0 8px;}
        .work-title{font-size:15px;font-weight:600;margin-bottom:4px;}
        .work-cat{font-size:12px;color:rgba(255,255,255,0.3);}
        .stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:32px;padding:48px 32px;border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);}
        .stat-val{font-size:2.8rem;font-weight:900;color:#f59e0b;letter-spacing:-0.02em;}
        .stat-lbl{font-size:12px;color:rgba(255,255,255,0.3);margin-top:4px;}
        .services{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;}
        .serv-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:24px;}
        .serv-icon{font-size:24px;margin-bottom:12px;}
        .serv-title{font-size:14px;font-weight:600;margin-bottom:6px;}
        .serv-desc{font-size:13px;color:rgba(255,255,255,0.3);line-height:1.5;}
        .cta-banner{background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(239,68,68,0.06));border:1px solid rgba(245,158,11,0.15);border-radius:20px;padding:56px 40px;text-align:center;}
        footer{border-top:1px solid rgba(255,255,255,0.04);padding:28px 32px;text-align:center;font-size:12px;color:rgba(255,255,255,0.15);}
      `}</style>

      <nav>
        <div className="logo">Creative<span>Co</span></div>
        <div>
          <a href="#work" className="nav-link">Work</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="#contact" className="btn btn-amber" style={{padding:"8px 18px",fontSize:"13px"}}>Hire Us</a>
      </nav>

      <div className="hero">
        <div className="container">
          <div className="tag">Award-winning agency · Est. 2019</div>
          <h1>We Build<br /><em>Brands</em> That<br />Stand Out.</h1>
          <p className="hero-sub">Strategic design, bold creative, digital excellence. We partner with ambitious brands to create unforgettable experiences.</p>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
            <a href="#work" className="btn btn-amber">View Our Work →</a>
            <a href="#contact" className="btn btn-ghost">Let&apos;s Talk</a>
          </div>
        </div>
      </div>

      <div className="stat-row container">
        {[{v:"40+",l:"Projects Delivered"},{v:"98%",l:"Client Satisfaction"},{v:"12",l:"Industries Served"},{v:"5★",l:"Average Rating"}].map(s => (
          <div key={s.l}><div className="stat-val">{s.v}</div><div className="stat-lbl">{s.l}</div></div>
        ))}
      </div>

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
            ].map(w => (
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

      <section id="services">
        <div className="container">
          <h2>What We Do</h2>
          <p className="sub">Full-service creative studio.</p>
          <div className="services">
            {[
              {icon:"🎨",t:"Brand Identity",d:"Logo, color systems, typography — a brand that lasts."},
              {icon:"💻",t:"Web Design",d:"Pixel-perfect websites that convert visitors into customers."},
              {icon:"📱",t:"UI/UX Design",d:"Intuitive interfaces for web and mobile products."},
              {icon:"📈",t:"Digital Marketing",d:"Campaigns that drive traffic, leads, and revenue."},
            ].map(s => (
              <div key={s.t} className="serv-card">
                <div className="serv-icon">{s.icon}</div>
                <div className="serv-title">{s.t}</div>
                <div className="serv-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Work Together?</h2>
            <p style={{color:"rgba(255,255,255,0.4)",marginTop:"12px",marginBottom:"32px",fontSize:"15px"}}>Tell us about your project. We respond within 24 hours.</p>
            <a href="mailto:hello@creativeco.com" className="btn btn-amber" style={{padding:"14px 32px",fontSize:"15px"}}>Start a Project →</a>
          </div>
        </div>
      </section>

      <footer>© 2026 CreativeCo · Built with AIPageBuilder</footer>
    </>
  );
}

function FunnelPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#050f05;color:#fff;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:60px 24px;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(16,185,129,0.12),transparent);}
        .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:40px;width:100%;max-width:480px;}
        .step-bar{display:flex;align-items:center;gap:0;margin-bottom:32px;}
        .step{flex:1;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;}
        .step.done{background:linear-gradient(90deg,#10b981,#34d399);}
        .step-dot{width:20px;height:20px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;}
        .step-dot.done{background:linear-gradient(135deg,#10b981,#34d399);color:#000;}
        .step-dot.active{background:rgba(16,185,129,0.2);border:2px solid #10b981;color:#10b981;}
        .step-dot.todo{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.3);}
        .badge{display:inline-block;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:4px;padding:3px 10px;font-size:11px;color:#34d399;margin-bottom:16px;letter-spacing:0.06em;text-transform:uppercase;}
        h1{font-size:clamp(1.6rem,4vw,2.4rem);font-weight:800;line-height:1.2;margin-bottom:12px;}
        h1 span{background:linear-gradient(135deg,#10b981,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sub{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;margin-bottom:28px;}
        label{display:block;font-size:12px;font-weight:500;color:rgba(255,255,255,0.5);margin-bottom:6px;margin-top:16px;}
        input,select{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:11px 14px;color:#fff;font-size:14px;outline:none;}
        input::placeholder,select::placeholder{color:rgba(255,255,255,0.2);}
        select option{background:#0a1a0a;}
        .btn-green{width:100%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-top:24px;}
        .trust{display:flex;justify-content:center;gap:20px;margin-top:20px;}
        .trust-item{display:flex;align-items:center;gap:5px;font-size:11px;color:rgba(255,255,255,0.3);}
        .benefits{max-width:480px;width:100%;margin-top:40px;}
        .benefit{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);}
        .check{width:20px;height:20px;background:rgba(16,185,129,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;color:#34d399;}
        .ben-text{font-size:14px;color:rgba(255,255,255,0.6);}
        .social-proof{margin-top:16px;padding:14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;font-size:13px;color:rgba(255,255,255,0.5);text-align:center;}
      `}</style>

      <div className="hero">
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
          {/* Progress */}
          <div style={{maxWidth:"480px",width:"100%",marginBottom:"24px"}}>
            <div className="step-bar">
              <div className="step-dot done">✓</div>
              <div className="step done"/>
              <div className="step-dot done">✓</div>
              <div className="step done" style={{width:"30%"}}/>
              <div className="step-dot active">3</div>
              <div className="step"/>
              <div className="step-dot todo">4</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:"rgba(255,255,255,0.2)",marginTop:"6px"}}>
              <span>Account</span><span>Details</span><span style={{color:"#34d399"}}>Trial</span><span>Confirm</span>
            </div>
          </div>

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
            <label>What will you use AIPageBuilder for?</label>
            <select disabled>
              <option>Landing pages for my SaaS</option>
              <option>Client projects (agency)</option>
              <option>Marketing campaigns</option>
            </select>

            <button className="btn-green">🚀 Start Free Trial Now →</button>

            <div className="trust">
              <div className="trust-item">🔒 SSL encrypted</div>
              <div className="trust-item">✓ No credit card</div>
              <div className="trust-item">↩ Cancel anytime</div>
            </div>
          </div>

          <div className="benefits">
            {[
              "Unlimited AI page generation for 14 days",
              "Heatmaps, analytics & session recordings",
              "Custom domain + SSL included",
              "50+ integrations (Zapier, HubSpot, Slack)",
              "Priority support via live chat",
            ].map(b => (
              <div key={b} className="benefit">
                <div className="check">✓</div>
                <div className="ben-text">{b}</div>
              </div>
            ))}
          </div>

          <div className="social-proof" style={{maxWidth:"480px",width:"100%"}}>
            ⭐⭐⭐⭐⭐ <strong style={{color:"rgba(255,255,255,0.7)"}}>4.9/5</strong> from 840 reviews · &quot;Best page builder I&apos;ve used&quot;
          </div>
        </div>
      </div>
    </>
  );
}

function PricingPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080810;color:#fff;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        nav{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(8,8,16,0.8);backdrop-filter:blur(16px);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;}
        .logo{font-weight:700;font-size:15px;display:flex;align-items:center;gap:8px;}
        .logo-icon{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#2563eb);}
        .btn{display:inline-flex;align-items:center;padding:8px 18px;border-radius:10px;font-size:13px;font-weight:600;text-decoration:none;cursor:pointer;border:none;}
        .btn-primary{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;}
        .btn-ghost{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);}
        section{padding:80px 24px;}
        .container{max-width:1100px;margin:0 auto;}
        h1{font-size:clamp(2rem,4vw,3rem);font-weight:800;text-align:center;margin-bottom:12px;background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sub{text-align:center;color:rgba(255,255,255,0.4);font-size:16px;margin-bottom:36px;}
        .toggle{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:48px;}
        .toggle-track{width:48px;height:26px;background:rgba(124,58,237,0.3);border-radius:99px;position:relative;cursor:pointer;border:1px solid rgba(124,58,237,0.4);}
        .toggle-thumb{width:20px;height:20px;background:#7c3aed;border-radius:50%;position:absolute;top:2px;left:24px;transition:left 0.2s;}
        .toggle-label{font-size:14px;color:rgba(255,255,255,0.5);}
        .save-badge{background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);border-radius:999px;padding:2px 10px;font-size:11px;color:#34d399;}
        .plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;align-items:start;}
        .plan{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:28px;position:relative;}
        .plan.popular{background:rgba(124,58,237,0.08);border-color:rgba(124,58,237,0.4);}
        .pop-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;border-radius:999px;padding:3px 14px;font-size:11px;font-weight:600;white-space:nowrap;}
        .plan-name{font-size:13px;font-weight:600;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;}
        .plan-price{font-size:3rem;font-weight:900;letter-spacing:-0.03em;margin-bottom:4px;}
        .plan-period{font-size:13px;color:rgba(255,255,255,0.3);}
        .plan-desc{font-size:13px;color:rgba(255,255,255,0.35);margin:12px 0 20px;}
        .plan-btn{width:100%;padding:11px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;border:none;margin-bottom:24px;}
        .plan-btn.primary{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;}
        .plan-btn.ghost{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);}
        .divider{height:1px;background:rgba(255,255,255,0.05);margin-bottom:20px;}
        .feat-item{display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:13px;color:rgba(255,255,255,0.6);}
        .feat-check{color:#34d399;font-size:12px;flex-shrink:0;}
        .feat-x{color:rgba(255,255,255,0.2);font-size:12px;flex-shrink:0;}
        .faq{max-width:680px;margin:0 auto;}
        .faq-item{border-bottom:1px solid rgba(255,255,255,0.06);padding:20px 0;}
        .faq-q{font-size:15px;font-weight:600;margin-bottom:8px;}
        .faq-a{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;}
        footer{border-top:1px solid rgba(255,255,255,0.05);padding:28px 24px;text-align:center;font-size:12px;color:rgba(255,255,255,0.15);}
      `}</style>

      <nav>
        <div className="logo"><div className="logo-icon"/><span>AIPageBuilder</span></div>
        <div style={{display:"flex",gap:"8px"}}>
          <a href="/p/saas-landing" className="btn btn-ghost">Back to Home</a>
          <a href="#" className="btn btn-primary">Get started free</a>
        </div>
      </nav>

      <section>
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p className="sub">Start free. Upgrade when you&apos;re ready. No hidden fees.</p>

          <div className="toggle">
            <span className="toggle-label">Monthly</span>
            <div className="toggle-track"><div className="toggle-thumb"/></div>
            <span className="toggle-label">Annual</span>
            <span className="save-badge">Save 20%</span>
          </div>

          <div className="plans">
            {[
              {name:"Free",price:"$0",period:"forever",desc:"Perfect to get started",btn:"ghost",btnText:"Start free",feats:[
                {t:"1 published page",y:true},{t:"5 AI credits/month",y:true},{t:"Basic analytics",y:true},
                {t:"PageForge subdomain",y:true},{t:"Custom domain",y:false},{t:"Heatmaps",y:false},
              ]},
              {name:"Pro",price:"$39",period:"/month",desc:"For serious marketers",btn:"primary",btnText:"Start 14-day trial",popular:true,feats:[
                {t:"50 pages",y:true},{t:"500 AI credits/month",y:true},{t:"Advanced analytics",y:true},
                {t:"Custom domain",y:true},{t:"Heatmaps + Recordings",y:true},{t:"A/B Testing",y:true},
              ]},
              {name:"Starter",price:"$19",period:"/month",desc:"For growing teams",btn:"ghost",btnText:"Start free trial",feats:[
                {t:"15 pages",y:true},{t:"100 AI credits/month",y:true},{t:"Standard analytics",y:true},
                {t:"Custom domain",y:true},{t:"Heatmaps",y:true},{t:"A/B Testing",y:false},
              ]},
              {name:"Unlimited",price:"$99",period:"/month",desc:"For agencies & teams",btn:"ghost",btnText:"Contact sales",feats:[
                {t:"Unlimited pages",y:true},{t:"Unlimited AI credits",y:true},{t:"All analytics",y:true},
                {t:"Custom domain",y:true},{t:"White label",y:true},{t:"API access",y:true},
              ]},
            ].map(p => (
              <div key={p.name} className={`plan${p.popular?" popular":""}`}>
                {p.popular && <div className="pop-badge">⚡ Most Popular</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{p.price}</div>
                <div className="plan-period">{p.period}</div>
                <div className="plan-desc">{p.desc}</div>
                <button className={`plan-btn ${p.btn}`}>{p.btnText}</button>
                <div className="divider"/>
                {p.feats.map(f => (
                  <div key={f.t} className="feat-item">
                    <span className={f.y?"feat-check":"feat-x"}>{f.y?"✓":"✕"}</span>
                    <span style={{color:f.y?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.25)"}}>{f.t}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{paddingTop:"20px"}}>
        <div className="container">
          <h2 style={{fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:700,textAlign:"center",marginBottom:"36px"}}>Frequently Asked Questions</h2>
          <div className="faq">
            {[
              {q:"Is the free plan really free?",a:"Yes, forever. No credit card required. You get 1 published page and 5 AI credits per month to build and publish."},
              {q:"Can I cancel anytime?",a:"Absolutely. Cancel with one click from your billing settings. No questions asked, no cancellation fees."},
              {q:"What are AI credits?",a:"Each time you use AI to generate a page, section, or copy, it uses 1 credit. Credits reset monthly."},
              {q:"Do you offer a free trial?",a:"Yes! Pro and Starter plans include a 14-day free trial with full access. No credit card needed to start."},
            ].map(f => (
              <div key={f.q} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>© 2026 AIPageBuilder · All rights reserved</footer>
    </>
  );
}

function ComingSoonPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080810;color:#fff;font-family:Inter,system-ui,sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px;-webkit-font-smoothing:antialiased;overflow:hidden;}
        .blob{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;}
        .logo-box{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 24px;}
        h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;line-height:1.1;margin-bottom:16px;background:linear-gradient(135deg,#fff 0%,#a78bfa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sub{font-size:16px;color:rgba(255,255,255,0.4);max-width:440px;line-height:1.7;margin:0 auto 40px;}
        .countdown{display:flex;gap:12px;justify-content:center;margin-bottom:44px;}
        .count-box{display:flex;flex-direction:column;align-items:center;gap:8px;}
        .count-val{width:64px;height:64px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;font-family:monospace;color:#a78bfa;}
        .count-label{font-size:10px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;}
        .colon{font-size:26px;color:rgba(255,255,255,0.15);margin-top:-16px;}
        .form{display:flex;gap:8px;max-width:400px;width:100%;margin:0 auto 16px;}
        input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;color:#fff;font-size:14px;outline:none;}
        input::placeholder{color:rgba(255,255,255,0.2);}
        .btn{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;border:none;border-radius:10px;padding:12px 20px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;}
        .social{display:flex;gap:16px;justify-content:center;margin-top:32px;}
        .social-icon{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:16px;text-decoration:none;}
        footer{position:fixed;bottom:16px;font-size:12px;color:rgba(255,255,255,0.15);}
      `}</style>

      <div className="blob" style={{width:"500px",height:"500px",top:"-150px",left:"-150px",background:"rgba(124,58,237,0.1)"}} />
      <div className="blob" style={{width:"400px",height:"400px",bottom:"-100px",right:"-100px",background:"rgba(37,99,235,0.08)"}} />

      <div className="logo-box">✦</div>
      <h1>Something Amazing<br />is Coming Soon</h1>
      <p className="sub">We&apos;re crafting something special. Join the waitlist to be first in line and get early access.</p>

      <div className="countdown">
        {[{v:"08",l:"Days"},{v:"14",l:"Hours"},{v:"32",l:"Min"},{v:"09",l:"Sec"}].map((c,i) => (
          <div key={c.l} style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div className="count-box">
              <div className="count-val">{c.v}</div>
              <div className="count-label">{c.l}</div>
            </div>
            {i < 3 && <div className="colon">:</div>}
          </div>
        ))}
      </div>

      <div className="form">
        <input type="email" placeholder="your@email.com" />
        <button className="btn">Notify Me</button>
      </div>
      <p style={{fontSize:"12px",color:"rgba(255,255,255,0.2)"}}>🔒 No spam · Unsubscribe anytime · 847 people waiting</p>

      <div className="social">
        {["𝕏","in","▲","f"].map(s => <a key={s} href="#" className="social-icon">{s}</a>)}
      </div>

      <footer>© 2026 AIPageBuilder · Built with ✦ AIPageBuilder</footer>
    </>
  );
}

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
