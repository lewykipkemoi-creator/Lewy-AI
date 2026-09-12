"use client";

import Link from "next/link";
import { useState } from "react";

const data = {
  conversations: {
    title: "Conversations",
    subtitle: "Manage every customer conversation in one place.",
  },
  customers: {
    title: "Customers",
    subtitle: "Your unified customer database.",
  },
  leads: {
    title: "Leads",
    subtitle: "Track and prioritize opportunities before they go cold.",
  },
  revenue: {
    title: "Revenue",
    subtitle: "See recovered revenue and opportunities at risk.",
  },
  followups: {
    title: "Follow-ups",
    subtitle: "Automated and scheduled customer follow-ups.",
  },
  calendar: {
    title: "Calendar",
    subtitle: "Appointments and upcoming meetings.",
  },
  settings: {
    title: "Settings",
    subtitle: "Configure your Lewy AI workspace.",
  },
};

const customers = [
  ["Brian Otieno","brian@example.com","WhatsApp","KES 45,000"],
  ["Mercy Wanjiku","mercy@example.com","Website","KES 32,500"],
  ["Kevin Kiptoo","kevin@example.com","Instagram","KES 18,000"],
  ["Aisha Hassan","aisha@example.com","Facebook","KES 12,000"],
  ["Sarah Kimani","sarah@example.com","Gmail","KES 8,500"],
];

const leads = [
  ["Brian Otieno","HOT","KES 45,000","WhatsApp"],
  ["Mercy Wanjiku","HOT","KES 32,500","Website"],
  ["Kevin Kiptoo","WARM","KES 18,000","Instagram"],
  ["Aisha Hassan","WARM","KES 12,000","Facebook"],
  ["Daniel Mwangi","COLD","KES 7,500","Gmail"],
];

const conversations = [
  ["Brian Otieno","Is the package still available?","WhatsApp","2 min ago"],
  ["Mercy Wanjiku","I would like to book an appointment.","Website","8 min ago"],
  ["Kevin Kiptoo","How much does the premium plan cost?","Instagram","24 min ago"],
  ["Aisha Hassan","Can someone help me choose a package?","Facebook","42 min ago"],
  ["Sarah Kimani","I need to reschedule my appointment.","Gmail","1 hr ago"],
];

export default function Section({params}:{params:{section:string}}) {
  const [message,setMessage] = useState("");
  const section = params.section as keyof typeof data;
  const info = data[section] || data.conversations;

  if (section === "settings") {
    return <Settings />;
  }

  if (section === "conversations") {
    return <Page title={info.title} subtitle={info.subtitle}>
      <div className="toolbar">
        <input placeholder="Search conversations..." />
        <button onClick={()=>alert("New conversation started.")}>+ New conversation</button>
      </div>
      <div className="table">
        {conversations.map((c,i)=>
          <div className="row" key={i}>
            <div className="person"><div className="avatar2">{c[0][0]}</div><div><b>{c[0]}</b><small>{c[1]}</small></div></div>
            <span>{c[2]}</span><small>{c[3]}</small>
            <button onClick={()=>setMessage(`Opening conversation with ${c[0]}`)}>Open</button>
          </div>
        )}
      </div>
      {message && <Notice text={message}/>}
    </Page>;
  }

  if (section === "customers") {
    return <Page title={info.title} subtitle={info.subtitle}>
      <div className="toolbar">
        <input placeholder="Search customers..." />
        <button onClick={()=>alert("Customer creation form is ready for the next database connection.")}>+ Add customer</button>
      </div>
      <div className="table">
        {customers.map((c,i)=>
          <div className="row" key={i}>
            <div className="person"><div className="avatar2">{c[0][0]}</div><div><b>{c[0]}</b><small>{c[1]}</small></div></div>
            <span>{c[2]}</span><strong>{c[3]}</strong>
            <button onClick={()=>setMessage(`Viewing ${c[0]}`)}>View</button>
          </div>
        )}
      </div>
      {message && <Notice text={message}/>}
    </Page>;
  }

  if (section === "leads") {
    return <Page title={info.title} subtitle={info.subtitle}>
      <div className="stats">
        <Box label="Total leads" value="48"/>
        <Box label="Hot leads" value="12"/>
        <Box label="Warm leads" value="21"/>
        <Box label="Pipeline value" value="KES 245K"/>
      </div>
      <div className="table">
        {leads.map((l,i)=>
          <div className="row" key={i}>
            <div className="person"><div className="avatar2">{l[0][0]}</div><div><b>{l[0]}</b><small>{l[3]}</small></div></div>
            <span className={l[1]==="HOT"?"hot":""}>{l[1]}</span>
            <strong>{l[2]}</strong>
            <button onClick={()=>alert(`Lead opened: ${l[0]}`)}>Open</button>
          </div>
        )}
      </div>
    </Page>;
  }

  if (section === "revenue") {
    return <Page title={info.title} subtitle={info.subtitle}>
      <div className="stats">
        <Box label="Revenue recovered" value="KES 184,500"/>
        <Box label="Revenue at risk" value="KES 92,000"/>
        <Box label="Won this month" value="KES 318,000"/>
        <Box label="Conversion rate" value="24.8%"/>
      </div>
      <div className="panel">
        <h2>Revenue performance</h2>
        <p>Sample prototype analytics. Real values will come from your conversations, leads and payments.</p>
        <div className="chart">
          {[45,62,51,78,68,90,73,96,84,100].map((x,i)=><i key={i} style={{height:`${x}%`}} />)}
        </div>
      </div>
    </Page>;
  }

  if (section === "followups") {
    return <Page title={info.title} subtitle={info.subtitle}>
      <div className="toolbar">
        <span>12 follow-ups scheduled today</span>
        <button onClick={()=>alert("Follow-up scheduler opened.")}>+ Schedule follow-up</button>
      </div>
      {["Brian Otieno","Sarah Kimani","Daniel Mwangi","Mary Njeri","John Kamau"].map((name,i)=>
        <div className="followCard" key={name}>
          <div><b>{name}</b><p>{["Follow up on quote","Check appointment","Send product details","Ask about purchase decision","Follow up on enquiry"][i]}</p></div>
          <span>Today • {["10:30","11:00","13:30","15:00","16:30"][i]}</span>
          <button onClick={()=>alert(`Follow-up sent to ${name}.`)}>Send now</button>
        </div>
      )}
    </Page>;
  }

  return <Page title={info.title} subtitle={info.subtitle}>
    <div className="stats">
      <Box label="Today's appointments" value="6"/>
      <Box label="Upcoming" value="14"/>
      <Box label="Completed" value="28"/>
      <Box label="No-shows" value="2"/>
    </div>
    <div className="panel">
      <h2>Upcoming appointments</h2>
      {["10:00 — Brian Otieno","11:30 — Mercy Wanjiku","14:00 — Kevin Kiptoo","16:00 — Sarah Kimani"].map(x=>
        <div className="appointment" key={x}><b>{x}</b><button onClick={()=>alert("Appointment opened.")}>View</button></div>
      )}
    </div>
  </Page>;
}

function Settings() {
  const [saved,setSaved]=useState(false);
  return <Page title="Settings" subtitle="Configure your Lewy AI workspace.">
    <div className="settings">
      <h2>Business profile</h2>
      <label>Business name<input defaultValue="My Business"/></label>
      <label>Business email<input defaultValue="hello@mybusiness.com"/></label>
      <label>Business description<textarea defaultValue="We help customers find the right products and services."/></label>
      <button onClick={()=>setSaved(true)}>Save changes</button>
      {saved && <Notice text="Settings saved successfully."/>}
    </div>
    <div className="settings">
      <h2>AI assistant</h2>
      <div className="toggle"><div><b>Lewy AI</b><p>Automatically respond to customer enquiries.</p></div><strong>ON</strong></div>
      <div className="toggle"><div><b>Lead qualification</b><p>Identify HOT, WARM and COLD opportunities.</p></div><strong>ON</strong></div>
      <div className="toggle"><div><b>Automatic follow-ups</b><p>Follow up with customers who have not responded.</p></div><strong>ON</strong></div>
    </div>
  </Page>
}

function Page({title,subtitle,children}:{title:string,subtitle:string,children:React.ReactNode}) {
  return <div className="page">
    <header><Link href="/dashboard">← Dashboard</Link><div><h1>{title}</h1><p>{subtitle}</p></div></header>
    <main>{children}</main>
    <style jsx>{`
      *{box-sizing:border-box}.page{min-height:100vh;background:#f6f7fb;color:#172033;font-family:Arial,sans-serif}
      header{height:120px;background:white;border-bottom:1px solid #eaecf0;padding:22px 5%;display:flex;flex-direction:column;gap:13px}
      header a{color:#6d5dfc;text-decoration:none;font-size:12px}h1{margin:0 0 5px;font-size:27px}p{margin:0;color:#667085;font-size:13px}
      main{padding:30px 5%;max-width:1250px;margin:auto}.toolbar{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:18px}
      input,textarea{border:1px solid #d0d5dd;border-radius:8px;padding:11px;font:inherit;background:white;width:100%;max-width:420px}
      textarea{min-height:100px;resize:vertical}.toolbar input{max-width:320px}
      button{border:0;border-radius:8px;background:#6d5dfc;color:white;padding:10px 14px;cursor:pointer;font-size:12px}
      .table,.panel,.settings{background:white;border:1px solid #eaecf0;border-radius:13px;padding:18px;margin-bottom:18px}
      .row{min-height:70px;border-bottom:1px solid #f2f4f7;display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:15px;align-items:center}
      .row:last-child{border-bottom:0}.person{display:flex;gap:10px;align-items:center}.avatar2{width:36px;height:36px;border-radius:50%;background:#eeeaff;color:#5b4de0;display:grid;place-items:center;font-weight:bold}
      small{display:block;color:#98a2b3;font-size:10px;margin-top:4px}.hot{color:#f04438;font-weight:bold}
      .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:18px}.stats>div{background:white;border:1px solid #eaecf0;border-radius:13px;padding:20px}
      .stats small{font-size:11px}.stats strong{display:block;font-size:24px;margin-top:7px}
      h2{font-size:15px;margin-top:0}.chart{height:220px;display:flex;align-items:end;gap:10px;margin-top:25px}.chart i{flex:1;background:#8b7dff;border-radius:5px 5px 0 0}
      .followCard,.appointment,.toggle{background:white;border:1px solid #eaecf0;border-radius:12px;padding:17px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:15px}.followCard p{margin-top:5px}
      .settings{max-width:700px}.settings label{display:block;font-size:11px;font-weight:bold;margin:15px 0}.settings label input,.settings label textarea{display:block;margin-top:6px;max-width:none}.toggle strong{color:#12b76a;font-size:11px}
      .notice{position:fixed;right:20px;bottom:20px;background:#101828;color:white;padding:14px 18px;border-radius:10px;font-size:12px}
      @media(max-width:800px){main{padding:20px 14px}.stats{grid-template-columns:1fr 1fr}.row{grid-template-columns:1fr auto}.row>span,.row>small{display:none}}
      @media(max-width:500px){.stats{grid-template-columns:1fr 1fr}.toolbar{align-items:stretch;flex-direction:column}.toolbar input{max-width:none}.followCard{align-items:flex-start;flex-direction:column}h1{font-size:23px}}
    `}</style>
  </div>
}

function Box({label,value}:{label:string,value:string}) {
  return <div><small>{label}</small><strong>{value}</strong></div>
}

function Notice({text}:{text:string}) {
  return <div className="notice">✓ {text}</div>
}

