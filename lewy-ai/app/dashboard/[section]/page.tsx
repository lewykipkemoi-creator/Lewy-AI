"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const data: Record<string, {title:string;subtitle:string;items:string[]}> = {
  conversations: {
    title:"Conversations",
    subtitle:"Manage every customer conversation from one inbox.",
    items:["Brian Otieno · WhatsApp · HOT LEAD","Mercy Wanjiku · Website · Appointment request","David Kamau · Instagram · Follow-up needed","Sarah Njeri · Facebook · Pricing question"]
  },
  customers: {
    title:"Customers",
    subtitle:"Every customer and their conversation history in one place.",
    items:["Brian Otieno · brian@example.com · 4 conversations","Mercy Wanjiku · mercy@example.com · 7 conversations","David Kamau · david@example.com · 3 conversations","Sarah Njeri · sarah@example.com · 5 conversations"]
  },
  leads: {
    title:"Leads",
    subtitle:"Track, qualify and convert your highest-value opportunities.",
    items:["Brian Otieno · HOT · KES 85,000 · 96% score","Mercy Wanjiku · HOT · KES 42,000 · 91% score","Sarah Njeri · HOT · KES 28,500 · 84% score","Daniel Kiptoo · WARM · KES 19,000 · 77% score"]
  },
  revenue: {
    title:"Revenue",
    subtitle:"Understand how Lewy is protecting and recovering revenue.",
    items:["KES 174,500 · Revenue currently at risk","KES 386,200 · Revenue recovered this month","KES 1,240,000 · Pipeline value","24.6% · Lead conversion rate"]
  },
  followups: {
    title:"Follow-ups",
    subtitle:"Never forget a lead again. Lewy keeps conversations moving.",
    items:["Brian Otieno · Send proposal · Now","Sarah Njeri · Check interest · In 1 hour","Daniel Kiptoo · Pricing follow-up · In 3 hours","Mercy Wanjiku · Post-appointment follow-up · Tomorrow"]
  },
  calendar: {
    title:"Calendar",
    subtitle:"Appointments booked through your customer conversations.",
    items:["14 Sep · Product consultation · Brian Otieno · 10:00 AM","15 Sep · Business strategy call · Mercy Wanjiku · 2:30 PM","16 Sep · Demo & onboarding · Daniel Kiptoo · 11:00 AM"]
  },
  settings: {
    title:"Settings",
    subtitle:"Configure your Lewy AI workspace.",
    items:["Business profile","AI assistant behaviour","Connected channels","Team members & permissions","Notifications"]
  }
};

const nav = [
  ["⌂","Overview","/dashboard"],
  ["◌","Conversations","/dashboard/conversations"],
  ["♙","Customers","/dashboard/customers"],
  ["◈","Leads","/dashboard/leads"],
  ["↗","Revenue","/dashboard/revenue"],
  ["◷","Follow-ups","/dashboard/followups"],
  ["□","Calendar","/dashboard/calendar"],
  ["⚙","Settings","/dashboard/settings"]
];

export default function SectionPage() {
  const params = useParams();
  const section = String(params.section || "conversations");
  const current = data[section] || data.conversations;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="dashboard-page">
      <style jsx global>{`
        * { box-sizing:border-box; }
        body { margin:0; background:#f5f7fb; font-family:Inter,system-ui,sans-serif; color:#172033; }
        a { text-decoration:none; }

        .side {
          position:fixed;
          inset:0 auto 0 0;
          width:250px;
          background:#101828;
          color:#98a2b3;
          padding:22px 14px;
          z-index:60;
          transition:transform .22s ease;
        }

        .brand {
          color:white;
          font-size:21px;
          font-weight:800;
          padding:4px 12px 30px;
          display:flex;
          gap:10px;
          align-items:center;
        }

        .mark {
          width:34px;
          height:34px;
          border-radius:10px;
          background:linear-gradient(135deg,#7c3aed,#a855f7);
          display:grid;
          place-items:center;
          color:white;
          font-weight:900;
        }

        .links {
          display:flex;
          flex-direction:column;
          gap:4px;
        }

        .link {
          padding:11px 12px;
          border-radius:10px;
          font-size:13px;
          font-weight:600;
          color:#98a2b3;
          transition:.18s;
        }

        .link:hover,
        .link.active {
          background:#25194d;
          color:white;
        }

        .body {
          margin-left:250px;
          min-height:100vh;
        }

        .header {
          height:72px;
          background:white;
          border-bottom:1px solid #eaecf0;
          padding:0 32px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          position:sticky;
          top:0;
          z-index:30;
        }

        .header-left {
          display:flex;
          align-items:center;
          min-width:0;
          flex:1;
        }

        .mobile-menu {
          display:none;
          width:38px;
          height:38px;
          border:1px solid #eaecf0;
          border-radius:9px;
          background:white;
          color:#344054;
          cursor:pointer;
          place-items:center;
          margin-right:10px;
          font-size:18px;
          flex:none;
        }

        .header-title {
          min-width:0;
        }

        .header h1 {
          font-size:19px;
          margin:0;
          color:#101828;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .header p {
          font-size:12px;
          color:#667085;
          margin:4px 0 0;
        }

        .user {
          width:36px;
          height:36px;
          border-radius:50%;
          background:#ede9fe;
          color:#6d28d9;
          display:grid;
          place-items:center;
          font-size:11px;
          font-weight:800;
          flex:none;
        }

        .content {
          padding:30px 32px;
          max-width:1200px;
        }

        .intro {
          margin-bottom:22px;
        }

        .intro h2 {
          font-size:25px;
          margin:0;
          color:#101828;
          letter-spacing:-.7px;
        }

        .intro p {
          font-size:13px;
          color:#667085;
          margin:7px 0;
        }

        .metrics {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:15px;
          margin-bottom:18px;
        }

        .metric {
          background:white;
          border:1px solid #eaecf0;
          border-radius:15px;
          padding:19px;
        }

        .metric b {
          font-size:24px;
          color:#101828;
        }

        .metric span {
          display:block;
          font-size:11px;
          color:#667085;
          margin-top:4px;
        }

        .panel {
          background:white;
          border:1px solid #eaecf0;
          border-radius:16px;
          overflow:hidden;
        }

        .panelhead {
          padding:18px 20px;
          border-bottom:1px solid #f0f2f5;
          font-size:13px;
          font-weight:750;
          color:#101828;
        }

        .item {
          padding:18px 20px;
          border-bottom:1px solid #f2f4f7;
          display:flex;
          align-items:center;
          gap:15px;
        }

        .item:last-child {
          border-bottom:0;
        }

        .itemdot {
          width:35px;
          height:35px;
          border-radius:10px;
          background:#f4f3ff;
          color:#6941c6;
          display:grid;
          place-items:center;
          font-weight:800;
          flex:none;
        }

        .itemtext {
          font-size:12px;
          font-weight:650;
          color:#344054;
          flex:1;
        }

        .action {
          border:0;
          background:#f4f3ff;
          color:#6941c6;
          padding:8px 11px;
          border-radius:8px;
          font-size:10px;
          font-weight:750;
          cursor:pointer;
        }

        .mobile-overlay {
          display:none;
        }

        @media(max-width:760px) {
          .side {
            transform:translateX(-100%);
            box-shadow:15px 0 35px rgba(16,24,40,.18);
          }

          .side.open {
            transform:translateX(0);
          }

          .mobile-overlay {
            display:block;
            position:fixed;
            inset:0;
            background:rgba(16,24,40,.42);
            z-index:50;
          }

          .body {
            margin-left:0;
          }

          .header {
            height:66px;
            padding:0 12px;
            gap:8px;
          }

          .mobile-menu {
            display:grid;
          }

          .header-title {
            min-width:0;
          }

          .header h1 {
            font-size:15px;
          }

          .header p {
            display:none;
          }

          .content {
            padding:20px 14px 30px;
          }

          .intro h2 {
            font-size:22px;
          }

          .metrics {
            grid-template-columns:1fr;
          }

          .item {
            padding:15px;
          }

          .itemtext {
            font-size:11px;
          }
        }

        @media(max-width:380px) {
          .header {
            padding:0 9px;
          }

          .mobile-menu {
            width:35px;
            height:35px;
            margin-right:7px;
          }

          .header h1 {
            font-size:14px;
          }
        }
      `}</style>

      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`side ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="mark">L</div>
          Lewy AI
        </div>

        <div className="links">
          {nav.map(([icon,name,href]) => (
            <Link
              key={href}
              className={`link ${section === href.split("/").pop() || (section === "conversations" && href === "/dashboard/conversations") ? "active" : ""}`}
              href={href}
              onClick={() => setMobileOpen(false)}
            >
              {icon} &nbsp; {name}
            </Link>
          ))}
        </div>
      </aside>

      <section className="body">
        <header className="header">
          <div className="header-left">
            <button
              className="mobile-menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              ☰
            </button>

            <div className="header-title">
              <h1>{current.title}</h1>
              <p>Lewy AI business workspace</p>
            </div>
          </div>

          <div className="user">LK</div>
        </header>

        <div className="content">
          <div className="intro">
            <h2>{current.title}</h2>
            <p>{current.subtitle}</p>
          </div>

          <div className="metrics">
            <div className="metric">
              <b>128</b>
              <span>Active leads</span>
            </div>

            <div className="metric">
              <b>KES 386K</b>
              <span>Revenue recovered</span>
            </div>

            <div className="metric">
              <b>98.4%</b>
              <span>AI handling success</span>
            </div>
          </div>

          <div className="panel">
            <div className="panelhead">
              Workspace activity
            </div>

            {current.items.map((item,i) => (
              <div className="item" key={item}>
                <div className="itemdot">{i+1}</div>
                <div className="itemtext">{item}</div>
                <button
                  className="action"
                  onClick={() => alert("This action is ready for the real backend connection.")}
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
