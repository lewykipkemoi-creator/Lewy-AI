"use client";

import Link from "next/link";

const channels = [
  ["WhatsApp Business","whatsapp","Customer messages and automated replies"],
  ["Gmail","gmail","Email conversations and follow-ups"],
  ["Instagram","instagram","Instagram DMs and lead capture"],
  ["Facebook Messenger","messenger","Messenger conversations"],
];

const nav = [
  ["Overview","/dashboard"],
  ["Conversations","/dashboard/conversations"],
  ["Customers","/dashboard/customers"],
  ["Leads","/dashboard/leads"],
  ["Products & Media","/dashboard/products"],
  ["Revenue","/dashboard/revenue"],
  ["Follow-ups","/dashboard/follow-ups"],
  ["Calendar","/dashboard/calendar"],
  ["Channels","/dashboard/channels"],
  ["Settings","/dashboard/settings"],
];

function BrandIcon({type}:{type:string}) {
  const src =
    type === "whatsapp" ? "/brand-icons/whatsapp.svg" :
    type === "gmail" ? "/brand-icons/gmail.svg" :
    type === "instagram" ? "/brand-icons/instagram.svg" :
    type === "messenger" ? "/brand-icons/messenger.svg" : "";

  return <img src={src} alt="" className="brandIcon" />;
}

export default function Dashboard() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <Link href="/" className="logo">Lewy<span>AI</span></Link>

        <div className="workspace">
          <div className="workspaceDot">L</div>
          <div>
            <b>My Business</b>
            <small>Workspace</small>
          </div>
        </div>

        <nav>
          {nav.map(([name,href]) => (
            <Link
              key={href}
              href={href}
              className={href === "/dashboard" ? "nav active" : "nav"}
            >
              <span className="navDot" />
              {name}
            </Link>
          ))}
        </nav>

        <div className="sidebarBottom">
          <div className="aiStatus">
            <span className="online" />
            <div>
              <b>Lewy AI</b>
              <small>AI is active</small>
            </div>
          </div>
          <Link href="/" className="backHome">← Back to home</Link>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <small>Dashboard</small>
            <h1>Good to see you 👋</h1>
          </div>
          <div className="topActions">
            <Link href="/dashboard/channels" className="outlineBtn">
              Connect channels
            </Link>
            <Link href="/dashboard/products" className="primaryBtn">
              Add product
            </Link>
          </div>
        </header>

        <section className="hero">
          <div>
            <span className="eyebrow">REVENUE LEAK DETECTOR</span>
            <h2>Never lose a customer because you replied too late.</h2>
            <p>Lewy watches your customer conversations, identifies missed opportunities and automatically follows up.</p>
            <Link href="/dashboard/channels" className="heroBtn">
              Connect your channels →
            </Link>
          </div>
          <div className="heroNumber">
            <small>Revenue at risk</small>
            <strong>KES 84,500</strong>
            <span>12 opportunities detected</span>
          </div>
        </section>

        <div className="metrics">
          <div className="metric"><small>Revenue recovered</small><b>KES 126,400</b><span>↑ 18.4%</span></div>
          <div className="metric"><small>Open conversations</small><b>38</b><span>12 need attention</span></div>
          <div className="metric"><small>Hot leads</small><b>17</b><span>↑ 5 today</span></div>
          <div className="metric"><small>Appointments</small><b>9</b><span>This week</span></div>
        </div>

        <div className="grid">
          <section className="card">
            <div className="cardHead">
              <div><h3>Your channels</h3><p>Connect where your customers message you.</p></div>
              <Link href="/dashboard/channels">View all →</Link>
            </div>

            <div className="channelList">
              {channels.map(([name,type,desc]) => (
                <Link href="/dashboard/channels" className="channel" key={name}>
                  <div className="icon"><BrandIcon type={type}/></div>
                  <div><b>{name}</b><small>{desc}</small></div>
                  <span>›</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="card">
            <div className="cardHead">
              <div><h3>Quick setup</h3><p>Get your workspace ready.</p></div>
            </div>

            <div className="setup">
              <Link href="/dashboard/channels"><b>Connect channels</b><span>→</span><small>WhatsApp, Gmail, Instagram and more</small></Link>
              <Link href="/dashboard/products"><b>Add products & media</b><span>→</span><small>Give Lewy your business knowledge</small></Link>
              <Link href="/dashboard/calendar"><b>Set up your calendar</b><span>→</span><small>Let Lewy book appointments</small></Link>
              <Link href="/dashboard/settings"><b>Business settings</b><span>→</span><small>Configure your workspace</small></Link>
            </div>
          </section>
        </div>

        <section className="card activity">
          <div className="cardHead">
            <div><h3>Recent activity</h3><p>What Lewy is doing for your business.</p></div>
            <Link href="/dashboard/conversations">Open inbox →</Link>
          </div>
          <div className="activityRow"><span className="activityIcon">AI</span><div><b>Lewy followed up with a lead</b><small>WhatsApp · 4 minutes ago</small></div><strong>HOT</strong></div>
          <div className="activityRow"><span className="activityIcon">AI</span><div><b>New customer enquiry detected</b><small>Gmail · 18 minutes ago</small></div><strong>NEW</strong></div>
          <div className="activityRow"><span className="activityIcon">AI</span><div><b>Appointment booked automatically</b><small>Website · 42 minutes ago</small></div><strong>DONE</strong></div>
        </section>
      </section>

      <style jsx>{`
        *{box-sizing:border-box}
        .shell{min-height:100vh;background:#f7f8fc;color:#151827;display:flex;font-family:Arial,sans-serif}
        .sidebar{width:250px;background:#10111a;color:#fff;padding:24px 16px;display:flex;flex-direction:column;position:fixed;inset:0 auto 0 0}
        .logo{font-size:27px;font-weight:900;color:white;text-decoration:none;padding:0 10px 24px}
        .logo span{color:#7657ff}
        .workspace{display:flex;gap:10px;align-items:center;padding:12px;background:#1a1b27;border:1px solid #292b39;border-radius:14px;margin-bottom:22px}
        .workspaceDot{width:36px;height:36px;border-radius:10px;background:#7657ff;display:grid;place-items:center;font-weight:800}
        .workspace b,.workspace small{display:block}.workspace small{color:#8e91a2;font-size:11px;margin-top:3px}
        nav{display:grid;gap:4px}.nav{color:#9ea1b2;text-decoration:none;padding:12px;border-radius:10px;font-size:14px;display:flex;gap:10px;align-items:center}.nav:hover,.nav.active{background:#20212e;color:#fff}
        .navDot{width:7px;height:7px;border-radius:50%;background:#626577}
        .active .navDot{background:#7657ff}
        .sidebarBottom{margin-top:auto}.aiStatus{display:flex;gap:10px;padding:14px;background:#191a25;border-radius:12px}.aiStatus b,.aiStatus small{display:block}.aiStatus small{font-size:11px;color:#8e91a2;margin-top:3px}.online{width:9px;height:9px;background:#30d98a;border-radius:50%;margin-top:5px}.backHome{display:block;color:#858898;text-decoration:none;font-size:12px;margin:18px 8px}
        .content{margin-left:250px;width:calc(100% - 250px);padding:30px;max-width:1500px}
        .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}.topbar small{color:#858898}.topbar h1{margin:5px 0 0;font-size:27px}.topActions{display:flex;gap:10px}.outlineBtn,.primaryBtn,.heroBtn{padding:11px 16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px}.outlineBtn{border:1px solid #dddfea;color:#25283a;background:white}.primaryBtn,.heroBtn{background:#7657ff;color:white}
        .hero{background:linear-gradient(135deg,#17182a,#262044);color:white;border-radius:22px;padding:32px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.eyebrow{font-size:10px;letter-spacing:1.5px;color:#a99aff;font-weight:800}.hero h2{font-size:30px;max-width:650px;margin:12px 0}.hero p{color:#b8b9c7;max-width:650px;line-height:1.6}.heroBtn{display:inline-block;margin-top:10px}.heroNumber{text-align:right}.heroNumber small,.heroNumber span{display:block;color:#aaaabd}.heroNumber strong{font-size:34px;display:block;margin:8px 0}
        .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}.metric,.card{background:white;border:1px solid #e7e8ef;border-radius:18px}.metric{padding:20px}.metric small,.metric b,.metric span{display:block}.metric small{color:#858898;font-size:12px}.metric b{font-size:23px;margin:8px 0}.metric span{font-size:11px;color:#26a86c}
        .grid{display:grid;grid-template-columns:1.2fr .8fr;gap:18px}.card{padding:22px}.cardHead{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px}.cardHead h3{margin:0;font-size:17px}.cardHead p{margin:5px 0;color:#858898;font-size:12px}.cardHead a{color:#7657ff;text-decoration:none;font-size:12px;font-weight:700}
        .channel{display:flex;align-items:center;gap:13px;text-decoration:none;color:#161827;padding:13px 4px;border-top:1px solid #eeeef3}.channel small{display:block;color:#858898;font-size:11px;margin-top:4px}.channel>span{margin-left:auto;color:#aaa}.icon{width:42px;height:42px;background:#f4f4f8;border-radius:12px;display:grid;place-items:center}.brandIcon{width:29px;height:29px}
        .setup{display:grid;gap:8px}.setup a{position:relative;padding:13px;background:#f7f7fa;border-radius:12px;text-decoration:none;color:#171827}.setup b{font-size:13px}.setup span{float:right;color:#7657ff}.setup small{display:block;color:#858898;font-size:10px;margin-top:4px}
        .activity{margin-top:18px}.activityRow{display:flex;align-items:center;gap:12px;padding:13px 0;border-top:1px solid #eeeef3}.activityRow small{display:block;color:#858898;font-size:11px;margin-top:4px}.activityRow strong{margin-left:auto;font-size:10px;color:#7657ff}.activityIcon{width:34px;height:34px;border-radius:10px;background:#eeeaff;color:#7657ff;display:grid;place-items:center;font-size:10px;font-weight:800}
        @media(max-width:900px){.sidebar{display:none}.content{margin:0;width:100%;padding:18px}.metrics{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:1fr}.hero{display:block}.heroNumber{text-align:left;margin-top:25px}.topbar{display:block}.topActions{margin-top:15px}.topActions a{flex:1;text-align:center}}
        @media(max-width:520px){.metrics{grid-template-columns:1fr 1fr}.metric{padding:14px}.metric b{font-size:18px}.hero{padding:22px}.hero h2{font-size:24px}.topActions{display:grid;grid-template-columns:1fr 1fr}}
      `}</style>
    </main>
  );
}
