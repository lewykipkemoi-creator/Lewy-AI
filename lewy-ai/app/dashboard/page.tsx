"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { name: "Overview", href: "/dashboard", icon: "⌂" },
  { name: "Conversations", href: "/dashboard/conversations", icon: "◌" },
  { name: "Customers", href: "/dashboard/customers", icon: "♙" },
  { name: "Leads", href: "/dashboard/leads", icon: "◈" },
  { name: "Revenue", href: "/dashboard/revenue", icon: "↗" },
  { name: "Follow-ups", href: "/dashboard/followups", icon: "◷" },
  { name: "Calendar", href: "/dashboard/calendar", icon: "□" },
];

const conversations = [
  { name: "Brian Otieno", text: "I'm interested in the premium package...", channel: "WhatsApp", time: "2m", hot: true, avatar: "BO" },
  { name: "Mercy Wanjiku", text: "Can I book an appointment tomorrow?", channel: "Website", time: "8m", hot: true, avatar: "MW" },
  { name: "David Kamau", text: "Thanks, I'll get back to you.", channel: "Instagram", time: "21m", hot: false, avatar: "DK" },
  { name: "Sarah Njeri", text: "How much does the service cost?", channel: "Facebook", time: "34m", hot: true, avatar: "SN" },
];

const leads = [
  { name: "Brian Otieno", source: "WhatsApp", value: "KES 85,000", score: 96 },
  { name: "Mercy Wanjiku", source: "Website", value: "KES 42,000", score: 91 },
  { name: "Sarah Njeri", source: "Instagram", value: "KES 28,500", score: 84 },
  { name: "Daniel Kiptoo", source: "Facebook", value: "KES 19,000", score: 77 },
];

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="lew-dashboard">
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #f5f7fb; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #172033; }
        a { text-decoration: none; color: inherit; }

        .lew-dashboard { min-height: 100vh; display: flex; background: #f5f7fb; }

        .sidebar {
          width: 250px;
          min-height: 100vh;
          background: #101828;
          color: #98a2b3;
          padding: 22px 14px;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 50;
          display: flex;
          flex-direction: column;
        }

        .brand { display:flex; align-items:center; gap:11px; padding: 4px 12px 28px; color:white; font-size:21px; font-weight:800; letter-spacing:-.5px; }
        .brand-mark { width:34px; height:34px; border-radius:10px; display:grid; place-items:center; background:linear-gradient(135deg,#7c3aed,#a855f7); color:white; font-weight:900; box-shadow:0 8px 20px rgba(124,58,237,.3); }

        .workspace { margin:0 7px 24px; padding:11px; border:1px solid #253149; border-radius:12px; background:#172236; }
        .workspace-label { font-size:10px; text-transform:uppercase; letter-spacing:.08em; color:#667085; }
        .workspace-name { margin-top:4px; color:#f2f4f7; font-size:13px; font-weight:700; }

        .nav-label { font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:#667085; padding:0 12px 8px; }
        .nav { display:flex; flex-direction:column; gap:4px; }
        .nav-link { display:flex; align-items:center; gap:12px; padding:11px 12px; border-radius:10px; font-size:13px; font-weight:600; transition:.18s; }
        .nav-link:hover { background:#19243a; color:#fff; }
        .nav-link.active { background:linear-gradient(90deg,#7c3aed,#6d28d9); color:#fff; box-shadow:0 8px 20px rgba(109,40,217,.18); }
        .nav-icon { width:21px; text-align:center; font-size:17px; }

        .sidebar-bottom { margin-top:auto; }
        .ai-status { margin:12px 7px; padding:13px; border:1px solid #26344d; border-radius:13px; background:#151f32; }
        .ai-top { display:flex; align-items:center; gap:8px; color:#f2f4f7; font-size:12px; font-weight:700; }
        .pulse { width:8px; height:8px; background:#12b76a; border-radius:50%; box-shadow:0 0 0 4px rgba(18,183,106,.1); }
        .ai-status p { margin:7px 0 0; color:#667085; font-size:11px; line-height:1.5; }

        .main { margin-left:250px; width:calc(100% - 250px); min-width:0; }
        .topbar { height:72px; background:white; border-bottom:1px solid #eaecf0; display:flex; align-items:center; justify-content:space-between; padding:0 32px; position:sticky; top:0; z-index:30; }
        .top-left h1 { margin:0; font-size:19px; letter-spacing:-.4px; color:#101828; }
        .top-left p { margin:4px 0 0; font-size:12px; color:#667085; }
        .top-actions { display:flex; align-items:center; gap:12px; }
        .icon-btn { width:38px; height:38px; border:1px solid #eaecf0; background:white; border-radius:10px; display:grid; place-items:center; cursor:pointer; color:#667085; font-size:16px; }
        .avatar { width:36px; height:36px; border-radius:50%; background:#ede9fe; color:#6d28d9; display:grid; place-items:center; font-size:12px; font-weight:800; }

        .content { padding:28px 32px 45px; max-width:1500px; margin:auto; }
        .hero { display:grid; grid-template-columns:1.6fr 1fr; gap:18px; margin-bottom:20px; }
        .hero-card { border-radius:18px; padding:25px; color:white; background:linear-gradient(135deg,#171d3a 0%,#30206b 55%,#5b21b6 100%); min-height:195px; position:relative; overflow:hidden; }
        .hero-card:after { content:""; position:absolute; width:260px; height:260px; border:1px solid rgba(255,255,255,.08); border-radius:50%; right:-80px; top:-110px; box-shadow:0 0 0 35px rgba(255,255,255,.025),0 0 0 70px rgba(255,255,255,.02); }
        .eyebrow { font-size:11px; text-transform:uppercase; letter-spacing:.1em; opacity:.7; font-weight:700; }
        .risk-number { font-size:39px; line-height:1; font-weight:850; letter-spacing:-1.5px; margin:12px 0 8px; }
        .hero-desc { font-size:12px; color:#d0d5dd; max-width:420px; line-height:1.55; }
        .hero-bottom { display:flex; gap:12px; margin-top:19px; position:relative; z-index:2; }
        .hero-btn { border:0; border-radius:9px; padding:9px 13px; font-size:12px; font-weight:700; cursor:pointer; background:white; color:#4c1d95; }
        .hero-btn.secondary { background:rgba(255,255,255,.1); color:white; border:1px solid rgba(255,255,255,.15); }

        .recovered-card { background:white; border:1px solid #eaecf0; border-radius:18px; padding:22px; display:flex; flex-direction:column; justify-content:space-between; }
        .card-title { color:#667085; font-size:12px; font-weight:600; }
        .recovered-number { font-size:30px; font-weight:850; color:#101828; margin-top:10px; letter-spacing:-1px; }
        .positive { display:inline-flex; width:max-content; margin-top:8px; padding:5px 8px; border-radius:7px; background:#ecfdf3; color:#027a48; font-size:11px; font-weight:700; }
        .mini-bars { display:flex; align-items:end; gap:5px; height:45px; margin-top:14px; }
        .bar { flex:1; border-radius:4px 4px 0 0; background:#ddd6fe; }
        .bar.active { background:#7c3aed; }

        .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:15px; margin-bottom:20px; }
        .stat { background:white; border:1px solid #eaecf0; border-radius:15px; padding:18px; }
        .stat-top { display:flex; justify-content:space-between; align-items:center; }
        .stat-icon { width:34px; height:34px; border-radius:9px; display:grid; place-items:center; background:#f4f3ff; color:#6941c6; }
        .stat-value { font-size:24px; font-weight:820; color:#101828; margin-top:12px; letter-spacing:-.6px; }
        .stat-label { color:#667085; font-size:11px; margin-top:3px; }
        .trend { color:#039855; font-size:10px; font-weight:700; }

        .grid { display:grid; grid-template-columns:1.15fr .85fr; gap:18px; }
        .card { background:white; border:1px solid #eaecf0; border-radius:16px; overflow:hidden; }
        .card-head { padding:18px 20px; border-bottom:1px solid #f0f2f5; display:flex; align-items:center; justify-content:space-between; }
        .card-head h2 { margin:0; color:#101828; font-size:14px; }
        .card-head span { color:#667085; font-size:11px; }
        .view { color:#6941c6 !important; font-weight:700; cursor:pointer; }

        .conversation { display:flex; align-items:center; gap:12px; padding:14px 20px; border-bottom:1px solid #f2f4f7; }
        .conversation:last-child { border-bottom:0; }
        .person-avatar { width:35px; height:35px; border-radius:10px; display:grid; place-items:center; background:#f2f4f7; color:#344054; font-size:10px; font-weight:800; flex:none; }
        .conv-main { min-width:0; flex:1; }
        .conv-name { font-size:12px; font-weight:750; color:#101828; display:flex; align-items:center; gap:7px; }
        .hot { color:#f04438; font-size:9px; background:#fef3f2; padding:2px 5px; border-radius:5px; }
        .conv-text { color:#667085; font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:3px; }
        .conv-meta { text-align:right; color:#98a2b3; font-size:10px; }

        .lead-row { padding:14px 20px; border-bottom:1px solid #f2f4f7; }
        .lead-row:last-child { border-bottom:0; }
        .lead-top { display:flex; justify-content:space-between; align-items:center; }
        .lead-name { font-size:12px; font-weight:750; color:#101828; }
        .lead-value { font-size:11px; font-weight:750; color:#101828; }
        .lead-bottom { display:flex; align-items:center; gap:8px; margin-top:7px; }
        .source { color:#667085; font-size:10px; flex:1; }
        .score { font-size:10px; font-weight:800; color:#027a48; }
        .score-track { height:4px; flex:1; max-width:100px; background:#eaecf0; border-radius:20px; overflow:hidden; }
        .score-fill { height:100%; background:#12b76a; border-radius:20px; }

        .lower { display:grid; grid-template-columns:1fr 1fr 1fr; gap:18px; margin-top:18px; }
        .activity { padding:15px 20px; display:flex; gap:11px; border-bottom:1px solid #f2f4f7; }
        .activity:last-child { border-bottom:0; }
        .activity-dot { width:8px; height:8px; border-radius:50%; background:#7c3aed; margin-top:4px; flex:none; box-shadow:0 0 0 4px #f4f3ff; }
        .activity strong { display:block; font-size:11px; color:#344054; }
        .activity p { margin:3px 0 0; color:#667085; font-size:10px; line-height:1.4; }
        .activity time { margin-left:auto; color:#98a2b3; font-size:9px; white-space:nowrap; }

        .appointment { padding:14px 20px; display:flex; gap:12px; align-items:center; border-bottom:1px solid #f2f4f7; }
        .date-box { width:39px; height:42px; border-radius:9px; background:#f4f3ff; display:grid; place-items:center; text-align:center; color:#6941c6; }
        .date-box b { font-size:15px; line-height:1; }
        .date-box small { font-size:8px; text-transform:uppercase; }
        .appointment strong { display:block; font-size:11px; }
        .appointment span { color:#667085; font-size:10px; }

        .follow { padding:13px 20px; display:flex; align-items:center; gap:10px; border-bottom:1px solid #f2f4f7; }
        .follow-icon { width:28px; height:28px; border-radius:8px; background:#ecfdf3; color:#039855; display:grid; place-items:center; font-size:12px; }
        .follow-main { flex:1; }
        .follow-main strong { font-size:11px; display:block; }
        .follow-main span { color:#667085; font-size:9px; }
        .follow-time { font-size:9px; color:#98a2b3; }

        .mobile-menu { display:none; }
        .mobile-overlay { display:none; }

        @media(max-width:1100px) {
          .hero { grid-template-columns:1fr; }
          .stats { grid-template-columns:repeat(2,1fr); }
          .grid { grid-template-columns:1fr; }
          .lower { grid-template-columns:1fr 1fr; }
        }

        @media(max-width:760px) {
          .sidebar { transform:translateX(-100%); transition:.22s ease; box-shadow:15px 0 35px rgba(16,24,40,.18); }
          .sidebar.open { transform:translateX(0); }
          .main { margin-left:0; width:100%; }
          .topbar { padding:0 16px; height:64px; }
          .top-left h1 { font-size:16px; }
          .top-left p { display:none; }
          .mobile-menu { display:grid; width:36px; height:36px; border:1px solid #eaecf0; border-radius:9px; background:white; place-items:center; margin-right:9px; cursor:pointer; }
          .mobile-overlay { display:block; position:fixed; inset:0; background:rgba(16,24,40,.4); z-index:40; }
          .content { padding:18px 14px 30px; }
          .hero-card { padding:20px; }
          .risk-number { font-size:32px; }
          .stats { gap:10px; }
          .stat { padding:14px; }
          .stat-value { font-size:20px; }
          .lower { grid-template-columns:1fr; }
          .top-actions { gap:6px; }
        }

        @media(max-width:430px) {
          .stats { grid-template-columns:1fr 1fr; }
          .stat-value { font-size:18px; }
          .hero-bottom { flex-wrap:wrap; }
          .hero-btn { flex:1; }
          .recovered-number { font-size:27px; }
        }
      `}</style>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">L</div>
          Lewy AI
        </div>

        <div className="workspace">
          <div className="workspace-label">Workspace</div>
          <div className="workspace-name">My Business</div>
        </div>

        <div className="nav-label">Workspace</div>
        <nav className="nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${item.href === "/dashboard" ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="nav-label" style={{marginTop:22}}>Manage</div>
        <nav className="nav">
          <Link href="/dashboard/settings" className="nav-link"><span className="nav-icon">⚙</span> Settings</Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="ai-status">
            <div className="ai-top"><span className="pulse" /> Lewy AI is active</div>
            <p>Your AI assistant is monitoring conversations and following up with leads.</p>
          </div>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div style={{display:"flex",alignItems:"center"}}>
            <button className="mobile-menu" onClick={() => setMobileOpen(true)}>☰</button>
            <div className="top-left">
              <h1>Good afternoon 👋</h1>
              <p>Here's what is happening with your business today.</p>
            </div>
          </div>
          <div className="top-actions">
            <button className="icon-btn">⌕</button>
            <button className="icon-btn">♧</button>
            <div className="avatar">LK</div>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div className="hero-card">
              <div className="eyebrow">Revenue Leak Detector</div>
              <div className="risk-number">KES 174,500</div>
              <div className="hero-desc">Estimated revenue currently at risk from unanswered, unqualified, or forgotten leads.</div>
              <div className="hero-bottom">
                <Link href="/dashboard/leads" className="hero-btn">View at-risk leads →</Link>
                <Link href="/dashboard/conversations" className="hero-btn secondary">Open inbox</Link>
              </div>
            </div>

            <div className="recovered-card">
              <div>
                <div className="card-title">Revenue recovered this month</div>
                <div className="recovered-number">KES 386,200</div>
                <span className="positive">↑ 24.8% vs last month</span>
              </div>
              <div className="mini-bars">
                {[30,42,35,55,48,70,62,82,76,94].map((h,i) => <div key={i} className={`bar ${i > 6 ? "active" : ""}`} style={{height:`${h}%`}} />)}
              </div>
            </div>
          </section>

          <section className="stats">
            <div className="stat">
              <div className="stat-top"><span className="card-title">New leads</span><span className="stat-icon">◈</span></div>
              <div className="stat-value">128</div>
              <div className="stat-label"><span className="trend">↑ 18%</span> this month</div>
            </div>
            <div className="stat">
              <div className="stat-top"><span className="card-title">Open conversations</span><span className="stat-icon">◌</span></div>
              <div className="stat-value">43</div>
              <div className="stat-label"><span className="trend">↓ 12%</span> response backlog</div>
            </div>
            <div className="stat">
              <div className="stat-top"><span className="card-title">Conversion rate</span><span className="stat-icon">↗</span></div>
              <div className="stat-value">24.6%</div>
              <div className="stat-label"><span className="trend">↑ 4.2%</span> this month</div>
            </div>
            <div className="stat">
              <div className="stat-top"><span className="card-title">AI replies sent</span><span className="stat-icon">✦</span></div>
              <div className="stat-value">1,842</div>
              <div className="stat-label"><span className="trend">98.4%</span> successfully handled</div>
            </div>
          </section>

          <section className="grid">
            <div className="card">
              <div className="card-head">
                <div><h2>Recent conversations</h2><span>Latest customer activity</span></div>
                <Link className="view" href="/dashboard/conversations">View all</Link>
              </div>
              {conversations.map((c) => (
                <div className="conversation" key={c.name}>
                  <div className="person-avatar">{c.avatar}</div>
                  <div className="conv-main">
                    <div className="conv-name">{c.name} {c.hot && <span className="hot">HOT LEAD</span>}</div>
                    <div className="conv-text">{c.text}</div>
                  </div>
                  <div className="conv-meta"><div>{c.time}</div><div>{c.channel}</div></div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-head">
                <div><h2>Hot leads</h2><span>Highest conversion potential</span></div>
                <Link className="view" href="/dashboard/leads">View all</Link>
              </div>
              {leads.map((lead) => (
                <div className="lead-row" key={lead.name}>
                  <div className="lead-top"><span className="lead-name">{lead.name}</span><span className="lead-value">{lead.value}</span></div>
                  <div className="lead-bottom">
                    <span className="source">{lead.source}</span>
                    <span className="score">{lead.score}%</span>
                    <div className="score-track"><div className="score-fill" style={{width:`${lead.score}%`}} /></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="lower">
            <div className="card">
              <div className="card-head"><div><h2>Lewy AI activity</h2><span>What your AI is doing</span></div><Link className="view" href="/dashboard/conversations">Inbox</Link></div>
              <div className="activity"><span className="activity-dot"/><div><strong>Lead qualified automatically</strong><p>Brian Otieno was marked as a HOT lead.</p></div><time>2m</time></div>
              <div className="activity"><span className="activity-dot"/><div><strong>Follow-up sent</strong><p>Lewy followed up with 3 inactive leads.</p></div><time>14m</time></div>
              <div className="activity"><span className="activity-dot"/><div><strong>Appointment booked</strong><p>Mercy Wanjiku booked a consultation.</p></div><time>28m</time></div>
            </div>

            <div className="card">
              <div className="card-head"><div><h2>Upcoming appointments</h2><span>Next scheduled meetings</span></div><Link className="view" href="/dashboard/calendar">Calendar</Link></div>
              <div className="appointment"><div className="date-box"><b>14</b><small>Sep</small></div><div><strong>Product consultation</strong><span>Brian Otieno · 10:00 AM</span></div></div>
              <div className="appointment"><div className="date-box"><b>15</b><small>Sep</small></div><div><strong>Business strategy call</strong><span>Mercy Wanjiku · 2:30 PM</span></div></div>
              <div className="appointment"><div className="date-box"><b>16</b><small>Sep</small></div><div><strong>Demo & onboarding</strong><span>Daniel Kiptoo · 11:00 AM</span></div></div>
            </div>

            <div className="card">
              <div className="card-head"><div><h2>Follow-up queue</h2><span>Leads waiting for action</span></div><Link className="view" href="/dashboard/followups">View all</Link></div>
              <div className="follow"><div className="follow-icon">↗</div><div className="follow-main"><strong>Brian Otieno</strong><span>Send proposal</span></div><span className="follow-time">Now</span></div>
              <div className="follow"><div className="follow-icon">◌</div><div className="follow-main"><strong>Sarah Njeri</strong><span>Check interest</span></div><span className="follow-time">1h</span></div>
              <div className="follow"><div className="follow-icon">◌</div><div className="follow-main"><strong>Daniel Kiptoo</strong><span>Pricing follow-up</span></div><span className="follow-time">3h</span></div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
