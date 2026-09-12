"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  ["Overview", "/dashboard", "⌂"],
  ["Conversations", "/dashboard/conversations", "◉"],
  ["Customers", "/dashboard/customers", "♙"],
  ["Leads", "/dashboard/leads", "◆"],
  ["Revenue", "/dashboard/revenue", "₵"],
  ["Follow-ups", "/dashboard/followups", "↻"],
  ["Calendar", "/dashboard/calendar", "▣"],
  ["Settings", "/dashboard/settings", "⚙"],
];

export default function Dashboard() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
      {open && (
        <div className="backdrop" onClick={() => setOpen(false)} />
      )}

      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="brand">
          <div className="logo">L</div>
          <div>
            <strong>Lewy AI</strong>
            <small>Business OS</small>
          </div>
          <button className="close" onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="workspace">
          <span>WORKSPACE</span>
          <strong>My Business</strong>
        </div>

        <nav>
          {nav.map(([name, href, icon]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={
                pathname === href ||
                (href !== "/dashboard" && pathname.startsWith(href))
                  ? "active"
                  : ""
              }
            >
              <span>{icon}</span>
              {name}
            </Link>
          ))}
        </nav>

        <div className="sidebarBottom">
          <div className="aiBox">
            <b>✦ Lewy AI</b>
            <p>Your AI assistant is ready to help recover lost opportunities.</p>
            <Link href="/dashboard/settings">Configure AI →</Link>
          </div>

          <Link href="/" className="homeLink">← Back to website</Link>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu" onClick={() => setOpen(true)}>☰</button>
          <div>
            <strong>Dashboard</strong>
            <span>Overview of your business</span>
          </div>

          <div className="topActions">
            <button onClick={() => alert("No new notifications.")}>🔔</button>
            <Link href="/dashboard/settings" className="avatar">L</Link>
          </div>
        </header>

        <section className="content">
          <div className="welcome">
            <div>
              <span className="eyebrow">BUSINESS OVERVIEW</span>
              <h1>Good afternoon 👋</h1>
              <p>Here is what is happening with your customers today.</p>
            </div>
            <Link className="primary" href="/dashboard/conversations">
              Open Inbox →
            </Link>
          </div>

          <div className="stats">
            <Stat title="Revenue recovered" value="KES 184,500" change="+18.4%" />
            <Stat title="Active leads" value="24" change="+6 this week" />
            <Stat title="Unread conversations" value="8" change="3 HOT leads" />
            <Stat title="Follow-ups due" value="12" change="Today" />
          </div>

          <div className="grid">
            <section className="card large">
              <div className="cardHead">
                <div>
                  <h2>Revenue at risk</h2>
                  <p>Customers who may be lost because of delayed responses.</p>
                </div>
                <Link href="/dashboard/leads">View leads →</Link>
              </div>

              <div className="risk">
                <div className="riskNumber">KES 92,000</div>
                <span className="danger">▲ 12.8%</span>
              </div>

              <div className="bars">
                <i style={{height:"35%"}} />
                <i style={{height:"48%"}} />
                <i style={{height:"42%"}} />
                <i style={{height:"68%"}} />
                <i style={{height:"55%"}} />
                <i style={{height:"82%"}} />
                <i style={{height:"70%"}} />
                <i style={{height:"95%"}} />
              </div>
              <div className="barLabels">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
                <span>Fri</span><span>Sat</span><span>Sun</span><span>Today</span>
              </div>
            </section>

            <section className="card">
              <div className="cardHead">
                <div>
                  <h2>Hot leads</h2>
                  <p>Highest-value opportunities</p>
                </div>
                <Link href="/dashboard/leads">All →</Link>
              </div>

              <Lead name="Brian Otieno" detail="Website • KES 45,000" />
              <Lead name="Mercy Wanjiku" detail="WhatsApp • KES 32,500" />
              <Lead name="Kevin Kiptoo" detail="Instagram • KES 18,000" />
              <Lead name="Aisha Hassan" detail="Facebook • KES 12,000" />
            </section>
          </div>

          <div className="grid">
            <section className="card">
              <div className="cardHead">
                <div>
                  <h2>Recent conversations</h2>
                  <p>Latest customer activity</p>
                </div>
                <Link href="/dashboard/conversations">Inbox →</Link>
              </div>

              <Conversation name="Brian Otieno" text="Is the package still available?" time="2m" hot />
              <Conversation name="Mercy Wanjiku" text="I would like to book an appointment." time="8m" />
              <Conversation name="Kevin Kiptoo" text="How much does the premium plan cost?" time="24m" />
            </section>

            <section className="card">
              <div className="cardHead">
                <div>
                  <h2>Today's follow-ups</h2>
                  <p>Don't let opportunities go cold.</p>
                </div>
                <Link href="/dashboard/followups">View all →</Link>
              </div>

              <Follow name="Brian Otieno" action="Follow up on quote" />
              <Follow name="Sarah Kimani" action="Check appointment" />
              <Follow name="Daniel Mwangi" action="Send product details" />
            </section>
          </div>
        </section>
      </main>

      <style jsx>{`
        *{box-sizing:border-box}
        .app{min-height:100vh;background:#f6f7fb;color:#172033;display:flex;font-family:Arial,sans-serif}
        .sidebar{width:250px;background:#101828;color:#fff;min-height:100vh;position:fixed;left:0;top:0;bottom:0;padding:22px 14px;display:flex;flex-direction:column;z-index:20}
        .brand{display:flex;align-items:center;gap:10px;padding:4px 8px 24px}
        .logo{width:38px;height:38px;border-radius:11px;background:#6d5dfc;display:grid;place-items:center;font-size:20px;font-weight:800}
        .brand strong{display:block;font-size:17px}.brand small{color:#98a2b3;font-size:11px}
        .close{display:none;margin-left:auto;background:none;border:0;color:white;font-size:25px}
        .workspace{border:1px solid #26334a;border-radius:10px;padding:11px;margin-bottom:18px}
        .workspace span{font-size:9px;color:#98a2b3;display:block;margin-bottom:5px}
        .workspace strong{font-size:13px}
        nav{display:flex;flex-direction:column;gap:4px}
        nav a{color:#98a2b3;text-decoration:none;padding:12px;border-radius:9px;font-size:13px;display:flex;align-items:center;gap:12px}
        nav a span{width:18px;text-align:center}
        nav a:hover,nav a.active{background:#1d2939;color:#fff}
        nav a.active{box-shadow:inset 3px 0 #7c6cff}
        .sidebarBottom{margin-top:auto}
        .aiBox{background:#192337;border:1px solid #26334a;border-radius:12px;padding:14px;font-size:12px}
        .aiBox b{color:#c5bfff}.aiBox p{color:#98a2b3;line-height:1.5}.aiBox a{color:#b9b2ff;text-decoration:none}
        .homeLink{display:block;color:#98a2b3;text-decoration:none;font-size:12px;padding:15px 5px}
        .main{margin-left:250px;width:calc(100% - 250px)}
        .topbar{height:70px;background:white;border-bottom:1px solid #eaecf0;display:flex;align-items:center;padding:0 28px;justify-content:space-between}
        .topbar strong{display:block;font-size:14px}.topbar span{font-size:11px;color:#98a2b3}
        .topActions{display:flex;align-items:center;gap:12px}.topActions button{border:0;background:#f2f4f7;border-radius:8px;padding:9px;cursor:pointer}
        .avatar{width:34px;height:34px;border-radius:50%;background:#6d5dfc;color:white;text-decoration:none;display:grid;place-items:center;font-weight:bold}
        .menu{display:none}
        .content{padding:30px;max-width:1400px;margin:auto}
        .welcome{display:flex;justify-content:space-between;align-items:end;margin-bottom:26px}
        .eyebrow{font-size:10px;color:#6d5dfc;font-weight:bold;letter-spacing:1px}
        h1{font-size:28px;margin:7px 0}.welcome p,.card p{color:#667085;font-size:13px;margin:0}
        .primary{background:#6d5dfc;color:white;text-decoration:none;padding:12px 16px;border-radius:9px;font-size:13px;font-weight:bold}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:18px}
        .card,.stats>div{background:white;border:1px solid #eaecf0;border-radius:13px}
        .stat{padding:18px}.stat small{color:#667085;font-size:11px}.stat h3{font-size:24px;margin:8px 0}.stat span{font-size:10px;color:#12b76a}
        .grid{display:grid;grid-template-columns:1.45fr 1fr;gap:18px;margin-bottom:18px}
        .card{padding:20px;min-width:0}
        .cardHead{display:flex;justify-content:space-between;gap:15px;align-items:start;margin-bottom:20px}
        h2{font-size:15px;margin:0 0 5px}.cardHead a{color:#6d5dfc;text-decoration:none;font-size:11px;white-space:nowrap}
        .risk{display:flex;align-items:center;gap:12px}.riskNumber{font-size:30px;font-weight:800}.danger{color:#f04438;font-size:11px}
        .bars{height:125px;display:flex;align-items:end;gap:8px;margin-top:20px}.bars i{flex:1;background:#8b7dff;border-radius:4px 4px 0 0;display:block;min-width:5px}
        .barLabels{display:flex;justify-content:space-between;color:#98a2b3;font-size:9px;margin-top:6px}
        .lead,.conversation,.follow{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-top:1px solid #f2f4f7}
        .lead b,.conversation b,.follow b{font-size:12px}.lead small,.conversation small,.follow small{display:block;color:#98a2b3;font-size:10px;margin-top:4px}
        .badge{font-size:9px;background:#fee4e2;color:#b42318;border-radius:20px;padding:5px 7px}
        .dot{width:7px;height:7px;background:#12b76a;border-radius:50%;display:inline-block;margin-right:6px}
        @media(max-width:900px){.stats{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:1fr}}
        @media(max-width:700px){.sidebar{transform:translateX(-105%);transition:.2s;width:270px}.sidebar.show{transform:translateX(0)}.close{display:block}.main{margin-left:0;width:100%}.menu{display:block;border:0;background:none;font-size:22px;margin-right:12px}.topbar{padding:0 16px}.topbar>div:first-of-type{margin-right:auto}.content{padding:20px 14px}.welcome{align-items:start;gap:18px;flex-direction:column}.welcome h1{font-size:23px}.stats{grid-template-columns:1fr 1fr;gap:10px}.stat{padding:14px}.stat h3{font-size:20px}.card{padding:16px}.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:19}}
      `}</style>
    </div>
  );
}

function Stat({title,value,change}:{title:string,value:string,change:string}) {
  return <div className="stat"><small>{title}</small><h3>{value}</h3><span>↑ {change}</span></div>
}

function Lead({name,detail}:{name:string,detail:string}) {
  return <div className="lead"><div><b>{name}</b><small>{detail}</small></div><span className="badge">HOT</span></div>
}

function Conversation({name,text,time,hot}:{name:string,text:string,time:string,hot?:boolean}) {
  return <div className="conversation"><div><b>{hot && <span className="dot"/>}{name}</b><small>{text}</small></div><small>{time}</small></div>
}

function Follow({name,action}:{name:string,action:string}) {
  return <div className="follow"><div><b>{name}</b><small>{action}</small></div><button onClick={()=>alert("Follow-up marked as completed.")}>✓</button></div>
}
