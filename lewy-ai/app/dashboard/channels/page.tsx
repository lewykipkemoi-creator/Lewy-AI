"use client";

import Link from "next/link";
import { useState } from "react";

const channels = [
  ["WhatsApp Business","◉","Customer messages, automated replies and media","green"],
  ["Gmail","✉","Email conversations, replies and follow-ups","red"],
  ["Instagram","◎","Instagram direct messages and lead capture","pink"],
  ["Facebook Messenger","f","Messenger conversations and customer enquiries","blue"],
  ["Telegram","➤","Telegram customer conversations","cyan"],
  ["Website Chat","⌁","Let website visitors chat with Lewy","purple"],
  ["Google Calendar","□","Appointments and automatic booking","yellow"],
];

export default function Channels() {
  const [selected, setSelected] = useState<string | null>(null);

  return <div className="page">
    <style jsx global>{`
      *{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:#f6f7fb;color:#111827}a{text-decoration:none;color:inherit}
      .page{min-height:100vh}.header{height:72px;background:#fff;border-bottom:1px solid #e7e9ef;display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:sticky;top:0;z-index:10}
      .headerLeft{display:flex;align-items:center;gap:14px}.back{font-size:12px;color:#667085}.title{font-size:17px;font-weight:800}.subtitle{font-size:11px;color:#8991a3;margin-top:3px}
      .content{max-width:1200px;margin:auto;padding:30px}.intro{background:linear-gradient(115deg,#10172b,#272b58);color:white;border-radius:20px;padding:26px;margin-bottom:22px}.intro h1{margin:6px 0;font-size:25px}.intro p{color:#b8bfd1;font-size:12px;max-width:650px;line-height:1.6}.tag{font-size:10px;color:#a78bfa;font-weight:800;text-transform:uppercase;letter-spacing:.1em}
      .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.channel{background:#fff;border:1px solid #e6e8ef;border-radius:17px;padding:20px;display:flex;gap:15px;align-items:center}.icon{width:50px;height:50px;border-radius:14px;background:#f1f3f8;display:grid;place-items:center;font-size:21px;font-weight:800;flex:none}.body{flex:1;min-width:0}.body strong{font-size:14px}.body p{font-size:11px;color:#7b8495;line-height:1.45;margin:5px 0}.button{border:0;border-radius:9px;padding:9px 12px;background:#111827;color:white;font-size:10px;font-weight:800;cursor:pointer;white-space:nowrap}.connected{background:#ecfdf3;color:#15803d}
      .modalBg{position:fixed;inset:0;background:#0008;display:grid;place-items:center;padding:18px;z-index:30}.modal{background:white;border-radius:19px;padding:25px;max-width:440px;width:100%;box-shadow:0 25px 80px #0004}.modal h2{margin:0 0 8px;font-size:19px}.modal p{font-size:12px;color:#697386;line-height:1.6}.actions{display:flex;gap:9px;justify-content:flex-end;margin-top:20px}.cancel{border:1px solid #ddd;background:white;padding:10px 14px;border-radius:9px;font-size:11px;font-weight:700}.connect{border:0;background:#7c3aed;color:white;padding:10px 14px;border-radius:9px;font-size:11px;font-weight:800}
      @media(max-width:700px){.header{padding:0 15px}.content{padding:18px 14px}.grid{grid-template-columns:1fr}.channel{align-items:flex-start}.channel .button{margin-left:auto}.intro h1{font-size:21px}}
      @media(max-width:430px){.channel{display:grid;grid-template-columns:44px 1fr}.icon{width:44px;height:44px}.channel .button{grid-column:2;justify-self:start}.title{font-size:15px}}
    `}</style>

    <header className="header">
      <div className="headerLeft"><Link href="/dashboard" className="back">← Dashboard</Link><div><div className="title">Channels & Integrations</div><div className="subtitle">Connect the places where your customers contact you</div></div></div>
      <Link href="/dashboard/settings" className="back">Settings</Link>
    </header>

    <main className="content">
      <section className="intro"><div className="tag">Lewy connections</div><h1>Bring every customer conversation into one place.</h1><p>Connect your business channels so Lewy can respond, qualify leads, follow up and help recover revenue.</p></section>

      <div className="grid">
        {channels.map(([name,icon,desc]) => (
          <div className="channel" key={name}>
            <div className="icon">{icon}</div>
            <div className="body"><strong>{name}</strong><p>{desc}</p></div>
            <button className="button" onClick={() => setSelected(name)}>Connect</button>
          </div>
        ))}
      </div>
    </main>

    {selected && <div className="modalBg">
      <div className="modal">
        <h2>Connect {selected}</h2>
        <p>This connection screen is ready for the channel integration. The next step is to authorize the account through the official provider and securely save the connection to your Lewy workspace.</p>
        <p><strong>Important:</strong> no real account credentials are requested on this prototype screen.</p>
        <div className="actions"><button className="cancel" onClick={() => setSelected(null)}>Cancel</button><button className="connect" onClick={() => setSelected(null)}>Continue connection</button></div>
      </div>
    </div>}
  </div>;
}
