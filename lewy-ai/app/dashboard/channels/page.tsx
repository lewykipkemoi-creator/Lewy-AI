"use client";

import Link from "next/link";
import { useState } from "react";

const channels = [
  ["WhatsApp Business","whatsapp","Connect your WhatsApp Business number"],
  ["Gmail","gmail","Connect your business Gmail inbox"],
  ["Instagram","instagram","Capture and respond to Instagram DMs"],
  ["Facebook Messenger","messenger","Manage Messenger conversations"],
  ["Telegram","telegram","Connect your Telegram business bot"],
  ["Website Chat","website","Add Lewy to your website"],
  ["Google Calendar","calendar","Allow Lewy to manage appointments"],
];

function Icon({type}:{type:string}) {
  if(type==="website") return <div className="webIcon">•••</div>;
  const src = `/brand-icons/${type}.svg`;
  return <img src={src} alt="" />;
}

export default function Channels() {
  const [connected,setConnected] = useState<string[]>([]);

  return <main className="page">
    <Link href="/dashboard" className="back">← Dashboard</Link>
    <div className="heading">
      <div><span>CHANNELS</span><h1>Connect your customer channels</h1><p>Bring your conversations into one place so Lewy can respond and follow up.</p></div>
    </div>

    <div className="grid">
      {channels.map(([name,type,desc]) => {
        const done = connected.includes(name);
        return <div className="card" key={name}>
          <div className="icon"><Icon type={type}/></div>
          <h2>{name}</h2>
          <p>{desc}</p>
          {name==="Google Calendar" ? (
            <Link className="button" href="/dashboard/calendar">Set up calendar →</Link>
          ) : name==="Website Chat" ? (
            <Link className="button" href="/dashboard/settings">Configure website →</Link>
          ) : (
            <Link
              className={done ? "button connected" : "button"}
              href={`/dashboard/channels/${type}`}
              onClick={() => setConnected(v => done ? v.filter(x=>x!==name) : [...v,name])}
            >
              {done ? "Connected ✓" : "Connect →"}
            </Link>
          )}
        </div>
      })}
    </div>

    <style jsx>{`
      .page{min-height:100vh;background:#f7f8fc;padding:35px;max-width:1250px;margin:auto;font-family:Arial;color:#171827}.back{color:#7657ff;text-decoration:none;font-weight:700;font-size:13px}.heading{margin:35px 0}.heading span{font-size:10px;letter-spacing:1.5px;color:#7657ff;font-weight:800}.heading h1{font-size:32px;margin:8px 0}.heading p{color:#777b8d}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.card{background:#fff;border:1px solid #e5e6ed;border-radius:20px;padding:25px}.icon{width:58px;height:58px;background:#f2f3f7;border-radius:16px;display:grid;place-items:center}.icon img{width:40px;height:40px}.webIcon{color:#7657ff;font-size:20px;font-weight:900}.card h2{font-size:17px;margin:20px 0 8px}.card p{color:#777b8d;font-size:12px;line-height:1.5;min-height:38px}.button{display:block;text-align:center;margin-top:20px;background:#7657ff;color:white;text-decoration:none;padding:12px;border-radius:10px;font-size:12px;font-weight:800}.connected{background:#19a96b}@media(max-width:850px){.grid{grid-template-columns:1fr 1fr}}@media(max-width:550px){.page{padding:20px}.grid{grid-template-columns:1fr}.heading h1{font-size:25px}}
    `}</style>
  </main>;
}
