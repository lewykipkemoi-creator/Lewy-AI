"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, Bot, CalendarDays, CheckCircle2,
  ChevronRight, Clock3, Facebook, Gauge, Globe2, Instagram, Mail,
  Menu, MessageCircle, Plus, Search, Send, Settings, Sparkles,
  TrendingUp, Users, X
} from "lucide-react";

type Conversation = {
  id: number;
  name: string;
  channel: string;
  preview: string;
  time: string;
  score: number;
  status: "Hot" | "Warm" | "Cold";
  unread?: boolean;
};

const initialConversations: Conversation[] = [
  { id: 1, name: "Brian Kiptoo", channel: "WhatsApp", preview: "How much is the premium package?", time: "2m", score: 94, status: "Hot", unread: true },
  { id: 2, name: "Mary Wanjiku", channel: "Instagram", preview: "Can I book for Saturday?", time: "11m", score: 86, status: "Hot", unread: true },
  { id: 3, name: "David Mwangi", channel: "Website", preview: "Do you offer delivery?", time: "24m", score: 68, status: "Warm" },
  { id: 4, name: "Sarah Cherotich", channel: "Gmail", preview: "Thanks, I will get back to you.", time: "1h", score: 52, status: "Warm" },
  { id: 5, name: "Kevin Rotich", channel: "Facebook", preview: "Just comparing your prices.", time: "2h", score: 21, status: "Cold" }
];

const channels = [
  { name: "WhatsApp", icon: MessageCircle, color: "green", desc: "Business conversations" },
  { name: "Gmail", icon: Mail, color: "red", desc: "Email conversations" },
  { name: "Instagram", icon: Instagram, color: "pink", desc: "Instagram DMs" },
  { name: "Facebook", icon: Facebook, color: "blue", desc: "Messenger" },
  { name: "Telegram", icon: Send, color: "cyan", desc: "Telegram chats" },
  { name: "Website", icon: Globe2, color: "violet", desc: "Website widget" },
  { name: "Calendar", icon: CalendarDays, color: "amber", desc: "Google Calendar" }
];

export default function Dashboard() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "customer", text: "Hi, I'm interested in your premium package. How much is it?" },
    { from: "lewy", text: "Hi Brian 👋 Thanks for reaching out. I can help with that. What kind of service are you looking for?" }
  ]);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selected = conversations.find(c => c.id === selectedId) ?? conversations[0];

  const hotCount = useMemo(() => conversations.filter(c => c.status === "Hot").length, [conversations]);

  async function sendMessage() {
    const clean = message.trim();
    if (!clean || sending) return;
    setMessage("");
    setMessages(prev => [...prev, { from: "customer", text: clean }]);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: clean,
          businessName: "Lewy Demo Business",
          context: "A demo business using Lewy AI. Ask for missing information rather than inventing it."
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages(prev => [...prev, { from: "lewy", text: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { from: "lewy", text: e instanceof Error ? e.message : "Something went wrong." }]);
    } finally {
      setSending(false);
    }
  }

  function connect(name: string) {
    setNotice(`${name} connection flow is ready for the next integration step.`);
    setTimeout(() => setNotice(""), 3500);
  }

  function selectConversation(id: number) {
    setSelectedId(id);
    setSidebarOpen(false);
    setMessages([
      { from: "customer", text: conversations.find(c => c.id === id)?.preview || "Hello!" },
      { from: "lewy", text: "Hi! I'm Lewy. I can help this business respond quickly and keep the conversation moving." }
    ]);
  }

  return (
    <main className="shell">
      {notice && <div className="toast"><CheckCircle2 size={17}/> {notice}</div>}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brandMark"><Sparkles size={19}/></div>
          <div><strong>lewy</strong><span>AI revenue assistant</span></div>
        </div>

        <nav>
          <a className="active"><Gauge size={18}/> Overview</a>
          <a><MessageCircle size={18}/> Conversations <b>{hotCount}</b></a>
          <a><Users size={18}/> Customers</a>
          <a><TrendingUp size={18}/> Revenue</a>
          <a><Clock3 size={18}/> Follow-ups</a>
          <a><CalendarDays size={18}/> Calendar</a>
          <a><Settings size={18}/> Settings</a>
        </nav>

        <div className="sidebarBottom">
          <div className="ai-status"><span></span><div><strong>Lewy is online</strong><small>AI automation active</small></div></div>
          <div className="plan"><span>Growth plan</span><strong>14 days left</strong></div>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <button className="mobileMenu" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu size={20}/></button>
          <div>
            <h1>Good afternoon, Business Owner</h1>
            <p>Here’s what Lewy is doing for your business today.</p>
          </div>
          <div className="topActions">
            <button className="iconBtn"><Bell size={19}/><i></i></button>
            <div className="avatar">BO</div>
          </div>
        </header>

        <div className="content">
          <div className="stats">
            <Stat title="Revenue protected" value="KES 384,500" change="+18.4%" icon={TrendingUp}/>
            <Stat title="Leads captured" value="247" change="+32 today" icon={Users}/>
            <Stat title="AI conversations" value="891" change="74% resolved" icon={Bot}/>
            <Stat title="Response time" value="38 sec" change="↓ 81% faster" icon={Clock3}/>
          </div>

          <div className="grid2">
            <section className="panel">
              <div className="panelHead"><div><h2>Revenue at risk</h2><p>Customers that may be lost without action.</p></div><button className="textBtn">View all <ArrowUpRight size={15}/></button></div>
              <div className="risk"><div className="riskNumber">KES 184,000</div><div className="riskMeta"><span>23 leads need attention</span><span className="riskDot">●</span><span>AI can recover 17</span></div><div className="riskBar"><span></span></div></div>
              <div className="riskList">
                <Risk name="Brian Kiptoo" issue="Asked for pricing · 3 min ago" score="94"/>
                <Risk name="Mary Wanjiku" issue="Wants to book · 11 min ago" score="86"/>
                <Risk name="David Mwangi" issue="Waiting for delivery answer · 24 min ago" score="68"/>
              </div>
            </section>

            <section className="panel">
              <div className="panelHead"><div><h2>Follow-up queue</h2><p>Lewy is keeping your leads warm.</p></div><button className="textBtn">Manage <ArrowUpRight size={15}/></button></div>
              <div className="queue">
                <Queue name="John K." text="Proposal sent yesterday" time="In 42 min" hot/>
                <Queue name="Amina W." text="Asked for a callback" time="In 2 hrs" hot/>
                <Queue name="Peter T." text="Price inquiry" time="Tomorrow" />
                <Queue name="Mercy C." text="No response after quote" time="In 2 days" />
              </div>
            </section>
          </div>

          <section className="panel inbox">
            <div className="inboxHead">
              <div><h2>Live conversations</h2><p>Lewy sees every customer message in one place.</p></div>
              <div className="inboxTools"><div className="search"><Search size={16}/><input placeholder="Search conversations"/></div><button className="filter">All channels</button></div>
            </div>
            <div className="conversationLayout">
              <div className="conversationList">
                {conversations.map(c => (
                  <button key={c.id} className={`conversation ${selectedId === c.id ? "selected" : ""}`} onClick={() => selectConversation(c.id)}>
                    <div className="personAvatar">{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div className="conversationInfo"><div className="row"><strong>{c.name}</strong><span>{c.time}</span></div><div className="row"><p>{c.preview}</p><Score score={c.score}/></div><small>{c.channel}</small></div>
                  </button>
                ))}
              </div>
              <div className="chat">
                <div className="chatHead"><div><strong>{selected.name}</strong><span><span className="onlineDot"></span> {selected.channel} · Lead score {selected.score}</span></div><button className="iconBtn"><X size={18}/></button></div>
                <div className="chatMessages">
                  {messages.map((m, i) => <div key={i} className={`bubbleWrap ${m.from === "customer" ? "customer" : "lewy"}`}><div className={`bubble ${m.from}`}>{m.from === "lewy" && <span className="lewyLabel"><Sparkles size={12}/> Lewy</span>}{m.text}</div></div>)}
                  {sending && <div className="bubbleWrap lewy"><div className="bubble lewy typing">Lewy is thinking<span>...</span></div></div>}
                </div>
                <div className="composer"><input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message to test Lewy..." /><button onClick={sendMessage} disabled={sending}><Send size={17}/></button></div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panelHead"><div><h2>Connect your channels</h2><p>Bring every customer conversation into Lewy.</p></div></div>
            <div className="channels">
              {channels.map(({name, icon: Icon, color, desc}) => <div className="channel" key={name}><div className={`channelIcon ${color}`}><Icon size={19}/></div><div><strong>{name}</strong><small>{desc}</small></div><button onClick={() => connect(name)}><Plus size={15}/> Connect</button></div>)}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Stat({title, value, change, icon: Icon}: {title:string,value:string,change:string,icon:React.ElementType}) {
  return <div className="stat"><div className="statTop"><span>{title}</span><div className="statIcon"><Icon size={17}/></div></div><strong>{value}</strong><small>{change}</small></div>;
}
function Score({score}:{score:number}) { return <span className={`score ${score>80?"hot":score>50?"warm":"cold"}`}>{score}</span>; }
function Risk({name,issue,score}:{name:string,issue:string,score:string}) { return <div className="riskItem"><div className="miniAvatar">{name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div><div><strong>{name}</strong><small>{issue}</small></div><Score score={Number(score)}/><ChevronRight size={16}/></div>; }
function Queue({name,text,time,hot}:{name:string,text:string,time:string,hot?:boolean}) { return <div className="queueItem"><div className={`queueIcon ${hot?"hotIcon":""}`}>{hot?<Activity size={16}/>:<Clock3 size={16}/>}</div><div><strong>{name}</strong><small>{text}</small></div><span>{time}</span></div>; }
