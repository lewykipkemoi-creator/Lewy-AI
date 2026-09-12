"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  ["Overview", "/dashboard", "⌂"],
  ["Conversations", "/dashboard/conversations", "◌"],
  ["Customers", "/dashboard/customers", "◉"],
  ["Leads", "/dashboard/leads", "◇"],
  ["Products & Media", "/dashboard/products", "▣"],
  ["Revenue", "/dashboard/revenue", "↗"],
  ["Follow-ups", "/dashboard/followups", "↻"],
  ["Calendar", "/dashboard/calendar", "□"],
  ["Channels", "/dashboard/channels", "⌁"],
  ["Settings", "/dashboard/settings", "⚙"],
];

const channels = [
  { name: "WhatsApp Business", icon: "◉", desc: "Customer messages and automated replies", color: "green" },
  { name: "Gmail", icon: "✉", desc: "Read, reply and follow up with email leads", color: "red" },
  { name: "Instagram", icon: "◎", desc: "Manage Instagram direct messages", color: "pink" },
  { name: "Facebook Messenger", icon: "f", desc: "Capture and respond to Messenger leads", color: "blue" },
  { name: "Telegram", icon: "➤", desc: "Connect Telegram conversations to Lewy", color: "cyan" },
  { name: "Website Chat", icon: "⌁", desc: "Let visitors talk to Lewy on your website", color: "purple", connected: true },
  { name: "Google Calendar", icon: "□", desc: "Let Lewy book and manage appointments", color: "yellow" },
];

export default function Dashboard() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="app">
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin:0; font-family: Inter, Arial, sans-serif; background:#f6f7fb; color:#111827; }
        a { text-decoration:none; color:inherit; }
        .app { min-height:100vh; display:flex; }
        .sidebar { width:260px; background:#0b1020; color:white; padding:22px 15px; position:fixed; inset:0 auto 0 0; z-index:50; }
        .brand { display:flex; align-items:center; gap:11px; padding:4px 10px 25px; }
        .brandMark { width:39px; height:39px; border-radius:12px; display:grid; place-items:center; background:linear-gradient(135deg,#7c3aed,#2563eb); font-weight:900; font-size:19px; }
        .brandName { font-size:20px; font-weight:800; }
        .brandSub { color:#8891a7; font-size:10px; margin-top:2px; }
        .workspace { background:#151c30; border:1px solid #27304a; border-radius:13px; padding:12px; margin-bottom:18px; }
        .workspace small { color:#8791aa; font-size:10px; }
        .workspace strong { display:block; margin-top:4px; font-size:13px; }
        .navTitle { color:#66718a; font-size:10px; font-weight:800; letter-spacing:.12em; margin:17px 10px 8px; text-transform:uppercase; }
        .nav { display:flex; flex-direction:column; gap:3px; }
        .nav a { display:flex; align-items:center; gap:11px; padding:10px 11px; border-radius:9px; color:#aeb6c9; font-size:13px; transition:.15s; }
        .nav a:hover { background:#151d32; color:white; }
        .nav a.active { background:linear-gradient(90deg,#222b47,#182139); color:white; box-shadow:inset 3px 0 #8b5cf6; }
        .navIcon { width:20px; text-align:center; font-size:15px; }
        .main { margin-left:260px; width:calc(100% - 260px); min-width:0; }
        .top { height:72px; background:white; border-bottom:1px solid #e8eaf0; display:flex; align-items:center; justify-content:space-between; padding:0 30px; position:sticky; top:0; z-index:30; }
        .mobileBtn { display:none; border:0; background:#f0f1f5; width:39px; height:39px; border-radius:10px; font-size:20px; }
        .welcome small { color:#8991a3; }
        .welcome strong { display:block; margin-top:3px; font-size:16px; }
        .topRight { display:flex; align-items:center; gap:16px; }
        .status { display:flex; align-items:center; gap:7px; color:#667085; font-size:12px; }
        .dot { width:8px; height:8px; border-radius:50%; background:#22c55e; }
        .avatar { width:37px; height:37px; border-radius:50%; background:#111827; color:white; display:grid; place-items:center; font-size:12px; font-weight:800; }
        .content { padding:30px; max-width:1500px; margin:auto; }
        .hero { border-radius:22px; padding:28px; color:white; background:linear-gradient(115deg,#11182c,#202d52 60%,#35246c); display:flex; justify-content:space-between; gap:20px; overflow:hidden; position:relative; }
        .hero:after { content:""; width:280px; height:280px; border-radius:50%; background:#7c3aed; opacity:.15; position:absolute; right:-100px; top:-130px; }
        .eyebrow { color:#a78bfa; font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
        .hero h1 { margin:9px 0 8px; font-size:29px; }
        .hero p { margin:0; color:#b7bfd2; max-width:600px; line-height:1.6; font-size:13px; }
        .heroBtn { margin-top:19px; display:inline-block; background:#8b5cf6; color:white; padding:11px 16px; border-radius:10px; font-weight:700; font-size:12px; }
        .heroMetric { min-width:210px; padding:18px; border:1px solid #39445f; background:#ffffff09; border-radius:15px; position:relative; z-index:2; }
        .heroMetric small { color:#9ca8bf; }
        .heroMetric strong { display:block; font-size:27px; margin:7px 0; }
        .up { color:#4ade80; font-size:12px; }
        .sectionHead { display:flex; align-items:center; justify-content:space-between; margin:29px 0 14px; }
        .sectionHead h2 { margin:0; font-size:17px; }
        .sectionHead span { color:#8a91a1; font-size:11px; }
        .cards { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .card { background:white; border:1px solid #e7e9ef; border-radius:16px; padding:18px; }
        .cardLabel { color:#7b8495; font-size:11px; }
        .cardValue { font-size:25px; font-weight:800; margin:8px 0 5px; }
        .cardChange { color:#16a34a; font-size:11px; }
        .lower { display:grid; grid-template-columns:1.4fr 1fr; gap:16px; }
        .panel { background:white; border:1px solid #e7e9ef; border-radius:17px; padding:20px; }
        .panelTitle { font-weight:800; font-size:14px; margin-bottom:17px; }
        .conversation { display:flex; gap:11px; padding:12px 0; border-top:1px solid #f0f1f5; }
        .person { width:36px; height:36px; border-radius:11px; background:#eef0ff; display:grid; place-items:center; font-size:12px; font-weight:800; flex:none; }
        .convMain { flex:1; min-width:0; }
        .convMain strong { font-size:12px; }
        .convMain p { margin:4px 0 0; color:#737b8c; font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .badge { padding:4px 7px; border-radius:20px; background:#ecfdf3; color:#15803d; font-size:9px; font-weight:700; }
        .quick { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .quick a { border:1px solid #eceef3; padding:14px; border-radius:12px; font-size:11px; font-weight:700; }
        .quick a:hover { border-color:#c4b5fd; background:#faf9ff; }
        .mobileOverlay { display:none; }
        @media(max-width:900px) {
          .sidebar { transform:translateX(-100%); transition:.2s; }
          .sidebar.open { transform:translateX(0); }
          .main { margin-left:0; width:100%; }
          .mobileBtn { display:block; }
          .top { padding:0 15px; }
          .topRight .status { display:none; }
          .content { padding:17px 14px 30px; }
          .cards { grid-template-columns:1fr 1fr; }
          .lower { grid-template-columns:1fr; }
          .hero { flex-direction:column; }
          .heroMetric { min-width:0; }
          .mobileOverlay { display:block; position:fixed; inset:0; background:#0008; z-index:40; }
        }
        @media(max-width:500px) {
          .cards { grid-template-columns:1fr; }
          .hero h1 { font-size:23px; }
          .welcome small { display:none; }
          .welcome strong { font-size:14px; }
        }
      `}</style>

      {menu && <div className="mobileOverlay" onClick={() => setMenu(false)} />}

      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <div className="brand">
          <div className="brandMark">L</div>
          <div><div className="brandName">Lewy AI</div><div className="brandSub">REVENUE & RESPONSE OS</div></div>
        </div>

        <div className="workspace">
          <small>WORKSPACE</small>
          <strong>My Business</strong>
        </div>

        <div className="navTitle">Workspace</div>
        <nav className="nav">
          {nav.map(([label, href, icon], i) => (
            <Link key={label} href={href} className={i === 0 ? "active" : ""} onClick={() => setMenu(false)}>
              <span className="navIcon">{icon}</span>{label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="top">
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <button className="mobileBtn" onClick={() => setMenu(true)}>☰</button>
            <div className="welcome"><small>AI CUSTOMER & REVENUE OPERATIONS</small><strong>Good afternoon 👋</strong></div>
          </div>
          <div className="topRight">
            <div className="status"><span className="dot" /> Lewy is active</div>
            <div className="avatar">LY</div>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div style={{position:"relative",zIndex:2}}>
              <div className="eyebrow">Revenue Leak Detector</div>
              <h1>Never lose a customer because you replied too late.</h1>
              <p>Lewy watches your customer conversations, finds missed opportunities, qualifies leads and follows up automatically.</p>
              <Link className="heroBtn" href="/dashboard/channels">Connect your channels →</Link>
            </div>
            <div className="heroMetric">
              <small>Revenue currently at risk</small>
              <strong>KES 0</strong>
              <div className="up">✓ No unresolved revenue leaks</div>
            </div>
          </section>

          <div className="sectionHead"><h2>Business overview</h2><span>Live workspace</span></div>

          <div className="cards">
            <div className="card"><div className="cardLabel">Conversations</div><div className="cardValue">0</div><div className="cardChange">Connect a channel to begin</div></div>
            <div className="card"><div className="cardLabel">New leads</div><div className="cardValue">0</div><div className="cardChange">No leads yet</div></div>
            <div className="card"><div className="cardLabel">Revenue recovered</div><div className="cardValue">KES 0</div><div className="cardChange">Waiting for activity</div></div>
            <div className="card"><div className="cardLabel">AI response rate</div><div className="cardValue">—</div><div className="cardChange">Connect your first channel</div></div>
          </div>

          <div className="sectionHead"><h2>Connect Lewy to your business</h2><span>Start here</span></div>

          <div className="lower">
            <div className="panel">
              <div className="panelTitle">Channels & integrations</div>
              {channels.slice(0,4).map(c => (
                <div className="conversation" key={c.name}>
                  <div className="person">{c.icon}</div>
                  <div className="convMain"><strong>{c.name}</strong><p>{c.desc}</p></div>
                  <Link href="/dashboard/channels" className="badge">{c.connected ? "Manage" : "Connect"}</Link>
                </div>
              ))}
              <Link href="/dashboard/channels" style={{display:"block",marginTop:12,textAlign:"center",padding:11,borderRadius:9,background:"#f5f3ff",color:"#6d28d9",fontSize:11,fontWeight:800}}>View all channels →</Link>
            </div>

            <div className="panel">
              <div className="panelTitle">Quick setup</div>
              <div className="quick">
                <Link href="/dashboard/channels">⌁<br/><span style={{display:"block",marginTop:7}}>Connect channels</span></Link>
                <Link href="/dashboard/products">▣<br/><span style={{display:"block",marginTop:7}}>Add products</span></Link>
                <Link href="/dashboard/calendar">□<br/><span style={{display:"block",marginTop:7}}>Set calendar</span></Link>
                <Link href="/dashboard/settings">⚙<br/><span style={{display:"block",marginTop:7}}>Business settings</span></Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
