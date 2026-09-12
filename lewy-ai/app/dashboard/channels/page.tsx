"use client";

import Link from "next/link";
import { useState } from "react";

const channels = [
  ["WhatsApp Business","whatsapp","Customer messages, automated replies and media"],
  ["Gmail","gmail","Email conversations, replies and follow-ups"],
  ["Instagram","instagram","Instagram direct messages and lead capture"],
  ["Facebook Messenger","messenger","Messenger conversations and customer enquiries"],
  ["Telegram","telegram","Telegram customer conversations"],
  ["Website Chat","website","Let website visitors chat with Lewy"],
  ["Google Calendar","calendar","Appointments and automatic booking"],
];

export default 
function BrandIcon({ type }: { type: string }) {
  if (type === "whatsapp") return <svg viewBox="0 0 48 48" aria-label="WhatsApp"><circle cx="24" cy="24" r="21" fill="#25D366"/><path fill="#fff" d="M34.5 13.7A14.8 14.8 0 0 0 24 9.3c-8.2 0-14.8 6.6-14.8 14.8 0 2.6.7 5.1 1.9 7.3L9 39l7.8-2c2.1 1.1 4.5 1.7 7 1.7h.1c8.1 0 14.7-6.6 14.7-14.8 0-3.9-1.5-7.5-4.1-10.2Zm-10.5 22.5h-.1c-2.2 0-4.4-.6-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5a12.2 12.2 0 0 1-1.9-6.5c0-6.8 5.6-12.3 12.4-12.3 3.3 0 6.4 1.3 8.7 3.6a12.2 12.2 0 0 1 3.6 8.7c0 6.8-5.5 12.3-12.2 12.3Zm6.7-9.2c-.4-.2-2.5-1.2-2.9-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.8-.7-3.4-2.2-1.3-1.2-2.2-2.6-2.4-3-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2.1-.5 0-.7l-1.3-3.1c-.2-.5-.5-.4-.8-.4h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.8 5.2.8.4 1.5.6 2 .8.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.7.3-.8.3-1.5.2-1.7-.2-.2-.5-.3-.9-.5Z"/></svg>;
  if (type === "gmail") return <svg viewBox="0 0 48 48" aria-label="Gmail"><path fill="#EA4335" d="M6 12.5 24 27l18-14.5V36c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V12.5Z"/><path fill="#fff" d="M6 12.5 24 27l18-14.5v5.8L24 32.5 6 18.3v-5.8Z"/><path fill="#4285F4" d="M6 12.5 12 17v19H10c-2.2 0-4-1.8-4-4V12.5Z"/><path fill="#34A853" d="M42 12.5 36 17v19h2c2.2 0 4-1.8 4-4V12.5Z"/></svg>;
  if (type === "instagram") return <svg viewBox="0 0 48 48" aria-label="Instagram"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#FFDC80"/><stop offset=".35" stopColor="#F56040"/><stop offset=".7" stopColor="#C13584"/><stop offset="1" stopColor="#405DE6"/></linearGradient></defs><rect x="5" y="5" width="38" height="38" rx="11" fill="url(#ig)"/><rect x="14" y="14" width="20" height="20" rx="6" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="24" cy="24" r="5" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="32.5" cy="15.8" r="2" fill="#fff"/></svg>;
  if (type === "messenger") return <svg viewBox="0 0 48 48" aria-label="Messenger"><path fill="#0084FF" d="M24 5C13.5 5 5 12.9 5 22.7c0 5.6 2.9 10.6 7.5 13.9V43l6.9-3.8c1.5.4 3 .6 4.6.6 10.5 0 19-7.9 19-17.1S34.5 5 24 5Z"/><path fill="#fff" d="m13.5 27.5 8.1-8.6 4.1 3.2 8.4-4.5-8.1 8.7-4-3.2-8.5 4.4Z"/></svg>;
  if (type === "telegram") return <svg viewBox="0 0 48 48" aria-label="Telegram"><circle cx="24" cy="24" r="21" fill="#229ED9"/><path fill="#fff" d="m35.6 13.3-25 9.7c-1.7.7-1.7 1.6-.3 2l6.4 2 2.5 7.7c.3.9.2 1.3 1.1 1.3.7 0 1-.3 1.4-.7l3.1-3 6.5 4.8c1.2.7 2.1.3 2.4-1.1l4.1-19.6c.5-1.7-.6-2.5-2.2-2.1ZM19 26.5l13.2-8.3c.7-.4 1.3-.2.8.3l-10.8 9.8-.4 4.5-2.8-6.3Z"/></svg>;
  if (type === "calendar") return <svg viewBox="0 0 48 48" aria-label="Google Calendar"><rect x="7" y="9" width="34" height="34" rx="5" fill="#fff" stroke="#4285F4" strokeWidth="3"/><path fill="#4285F4" d="M7 15h34v7H7z"/><path fill="#34A853" d="M24 22h17v21H24z"/><path fill="#fff" d="M24 27h10v11H24z"/><path fill="#EA4335" d="M12 5h6v10h-6z"/><path fill="#FBBC04" d="M30 5h6v10h-6z"/></svg>;
  return <svg viewBox="0 0 48 48" aria-label="Website chat"><rect x="6" y="8" width="36" height="28" rx="9" fill="#7C3AED"/><path fill="#fff" d="M14 38v-8h8l-8 8Z"/><circle cx="16" cy="22" r="2.5" fill="#fff"/><circle cx="24" cy="22" r="2.5" fill="#fff"/><circle cx="32" cy="22" r="2.5" fill="#fff"/></svg>;
}
function Channels() {
  const [selected, setSelected] = useState<string | null>(null);

  return <div className="page">
    <style jsx global>{`
      *{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:#f6f7fb;color:#111827}a{text-decoration:none;color:inherit}
      .page{min-height:100vh}.header{height:72px;background:#fff;border-bottom:1px solid #e7e9ef;display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:sticky;top:0;z-index:10}
      .headerLeft{display:flex;align-items:center;gap:14px}.back{font-size:12px;color:#667085}.title{font-size:17px;font-weight:800}.subtitle{font-size:11px;color:#8991a3;margin-top:3px}
      .content{max-width:1200px;margin:auto;padding:30px}.intro{background:linear-gradient(115deg,#10172b,#272b58);color:white;border-radius:20px;padding:26px;margin-bottom:22px}.intro h1{margin:6px 0;font-size:25px}.intro p{color:#b8bfd1;font-size:12px;max-width:650px;line-height:1.6}.tag{font-size:10px;color:#a78bfa;font-weight:800;text-transform:uppercase;letter-spacing:.1em}
      .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.channel{background:#fff;border:1px solid #e6e8ef;border-radius:17px;padding:20px;display:flex;gap:15px;align-items:center}.icon{width:50px;height:50px;border-radius:14px;background:#f1f3f8;display:grid;place-items:center;flex:none}.icon svg{width:38px;height:38px;display:block}.body{flex:1;min-width:0}.body strong{font-size:14px}.body p{font-size:11px;color:#7b8495;line-height:1.45;margin:5px 0}.button{border:0;border-radius:9px;padding:9px 12px;background:#111827;color:white;font-size:10px;font-weight:800;cursor:pointer;white-space:nowrap}.connected{background:#ecfdf3;color:#15803d}
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
            <div className="icon"><BrandIcon type={icon} /></div>
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
