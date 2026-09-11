"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bot,
  CalendarDays,
  ChevronRight,
  Inbox,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import { createClient } from "../../lib/supabase";

export default function DashboardPage() {
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email ?? "");
      setLoading(false);
    }

    load();
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main style={{
        minHeight:"100vh",
        background:"#07090d",
        color:"#fff",
        display:"grid",
        placeItems:"center",
        fontFamily:"system-ui"
      }}>
        Loading workspace...
      </main>
    );
  }

  const items = [
    [Inbox,"Overview"],
    [MessageSquare,"Conversations"],
    [Users,"Customers"],
    [TrendingUp,"Leads"],
    [CalendarDays,"Calendar"],
    [Settings,"Settings"]
  ];

  return (
    <main className="dash">
      <style jsx>{`
        .dash{min-height:100vh;background:#07090d;color:#f5f7fa;display:flex;font-family:Inter,system-ui,sans-serif}
        .side{width:230px;border-right:1px solid #181b22;padding:20px 13px;flex-shrink:0}
        .logo{display:flex;align-items:center;gap:9px;font-size:20px;font-weight:800;margin:3px 9px 30px}
        .logo span{color:#8b5cf6}
        .mark{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(135deg,#8b5cf6,#6366f1)}
        .nav{display:flex;align-items:center;gap:10px;padding:11px;border-radius:8px;color:#777f8c;font-size:13px;margin:3px 0}
        .nav.active{color:#fff;background:#151125}
        .account{border-top:1px solid #181b22;margin-top:30px;padding:18px 10px;color:#6f7682;font-size:11px}
        .logout{border:0;background:none;color:#858c99;display:flex;align-items:center;gap:8px;padding:10px 0;font-size:12px}
        .main{flex:1;padding:30px;min-width:0}
        .top{display:flex;justify-content:space-between;align-items:flex-start}
        h1{font-size:28px;margin:0 0 7px}
        .sub{color:#737b87;font-size:13px}
        .empty{margin-top:32px;border:1px dashed #292d37;border-radius:16px;padding:65px 25px;text-align:center;background:#0a0d12}
        .empty-icon{width:54px;height:54px;display:grid;place-items:center;margin:0 auto 17px;border-radius:14px;background:#151125;color:#a78bfa}
        .empty h2{font-size:20px;margin:0 0 9px}
        .empty p{max-width:510px;margin:auto;color:#737b87;line-height:1.65;font-size:13px}
        .connect{display:flex;justify-content:center;gap:10px;margin-top:25px;flex-wrap:wrap}
        .btn{display:inline-flex;align-items:center;gap:8px;border-radius:9px;padding:11px 15px;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;font-weight:800;font-size:13px}
        .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px}
        .card{border:1px solid #1b1e26;background:#0c0f14;border-radius:12px;padding:18px}
        .label{color:#666e7b;font-size:10px}
        .value{font-size:23px;font-weight:800;margin-top:10px}
        @media(max-width:800px){.side{width:65px}.side .logo span:not(.mark),.side .nav span,.side .account{display:none}.main{padding:20px}.cards{grid-template-columns:1fr 1fr}}
      `}</style>

      <aside className="side">
        <Link href="/" className="logo">
          <span className="mark"><Sparkles size={16}/></span>
          <span>lewy<span>AI</span></span>
        </Link>

        {items.map(([Icon,label],i) => {
          const Component = Icon as typeof Inbox;
          return (
            <div className={`nav ${i===0 ? "active" : ""}`} key={String(label)}>
              <Component size={17}/>
              <span>{String(label)}</span>
            </div>
          );
        })}

        <div className="account">
          <div style={{marginBottom:12,overflow:"hidden",textOverflow:"ellipsis"}}>{email}</div>
          <button className="logout" onClick={logout}>
            <LogOut size={15}/> Sign out
          </button>
        </div>
      </aside>

      <div className="main">
        <div className="top">
          <div>
            <h1>Overview</h1>
            <div className="sub">Your real business activity will appear here.</div>
          </div>
        </div>

        <div className="cards">
          {[
            ["ACTIVE CONVERSATIONS","—"],
            ["OPEN LEADS","—"],
            ["FOLLOW-UPS","—"],
            ["REVENUE RECOVERED","—"]
          ].map(([label,value]) => (
            <div className="card" key={label}>
              <div className="label">{label}</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>

        <div className="empty">
          <div className="empty-icon"><Bot size={26}/></div>
          <h2>Your workspace is ready</h2>
          <p>
            Lewy has no fabricated customers, leads or revenue. Connect your
            business channels and real activity will populate this workspace.
          </p>

          <div className="connect">
            <Link href="/" className="btn">
              Connect a channel <ChevronRight size={15}/>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
