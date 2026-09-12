"use client";

import { useState } from "react";
import Link from "next/link";

type Channel = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  connected: boolean;
  category: string;
};

const initialChannels: Channel[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Receive and reply to customer messages through WhatsApp.",
    icon: "◉",
    color: "#25D366",
    connected: false,
    category: "Messaging",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Let Lewy read, classify and respond to customer emails.",
    icon: "✉",
    color: "#EA4335",
    connected: false,
    category: "Email",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Manage Instagram DMs and turn conversations into leads.",
    icon: "◎",
    color: "#E1306C",
    connected: false,
    category: "Social",
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    description: "Capture and respond to messages from your Facebook page.",
    icon: "f",
    color: "#1877F2",
    connected: false,
    category: "Social",
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Connect your Telegram business bot to Lewy.",
    icon: "➤",
    color: "#229ED9",
    connected: false,
    category: "Messaging",
  },
  {
    id: "website",
    name: "Website Chat",
    description: "Add Lewy directly to your business website.",
    icon: "</>",
    color: "#7C5CFC",
    connected: true,
    category: "Website",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Allow Lewy to check availability and book appointments.",
    icon: "31",
    color: "#4285F4",
    connected: false,
    category: "Productivity",
  },
];

export default function ChannelsPage() {
  const [channels, setChannels] = useState(initialChannels);
  const [selected, setSelected] = useState<Channel | null>(null);
  const [notice, setNotice] = useState("");

  function connectChannel(channel: Channel) {
    if (channel.id === "website") {
      setNotice("Website Chat is already connected.");
      return;
    }

    setSelected(channel);
    setNotice("");
  }

  function simulateConnection() {
    if (!selected) return;

    setChannels((current) =>
      current.map((channel) =>
        channel.id === selected.id
          ? { ...channel, connected: true }
          : channel
      )
    );

    setNotice(`${selected.name} has been connected in prototype mode.`);
    setSelected(null);
  }

  function disconnect(id: string) {
    setChannels((current) =>
      current.map((channel) =>
        channel.id === id ? { ...channel, connected: false } : channel
      )
    );

    setNotice("Channel disconnected.");
  }

  const connected = channels.filter((c) => c.connected).length;

  return (
    <main className="page">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">L</div>
          <div>
            <strong>Lewy AI</strong>
            <span>Revenue OS</span>
          </div>
        </div>

        <div className="workspace">
          <div className="workspace-avatar">B</div>
          <div>
            <strong>Business Workspace</strong>
            <span>Admin</span>
          </div>
          <span className="dots">•••</span>
        </div>

        <nav>
          <p className="nav-title">WORKSPACE</p>

          <Link href="/dashboard">
            <span>⌂</span> Overview
          </Link>

          <Link href="/dashboard/conversations">
            <span>▤</span> Conversations
          </Link>

          <Link href="/dashboard/customers">
            <span>♙</span> Customers
          </Link>

          <Link href="/dashboard/leads">
            <span>◇</span> Leads
          </Link>

          <Link href="/dashboard/revenue">
            <span>↗</span> Revenue
          </Link>

          <Link href="/dashboard/followups">
            <span>↻</span> Follow-ups
          </Link>

          <Link href="/dashboard/calendar">
            <span>□</span> Calendar
          </Link>

          <Link className="active" href="/dashboard/channels">
            <span>◈</span> Channels
          </Link>

          <Link href="/dashboard/settings">
            <span>⚙</span> Settings
          </Link>
        </nav>

        <div className="ai-card">
          <div className="ai-dot"></div>
          <div>
            <strong>Lewy AI is active</strong>
            <span>Monitoring connected channels</span>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => document.body.classList.toggle("menu-open")}
          >
            ☰
          </button>

          <div>
            <div className="eyebrow">SETTINGS / CHANNELS</div>
            <h1>Channels & Integrations</h1>
          </div>

          <div className="top-actions">
            <button className="icon-button">⌕</button>
            <button className="notification">♢<i></i></button>
            <div className="avatar">B</div>
          </div>
        </header>

        <div className="body">
          {notice && (
            <div className="notice">
              <span>✓</span>
              {notice}
              <button onClick={() => setNotice("")}>×</button>
            </div>
          )}

          <section className="hero">
            <div>
              <div className="hero-icon">◈</div>
              <div>
                <p className="hero-label">OMNICHANNEL INBOX</p>
                <h2>Connect your customer channels</h2>
                <p>
                  Bring your conversations into one place and let Lewy respond,
                  qualify leads and follow up automatically.
                </p>
              </div>
            </div>

            <div className="connection-summary">
              <strong>{connected}</strong>
              <span>of {channels.length} connected</span>
              <div className="progress">
                <div
                  style={{
                    width: `${(connected / channels.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <div className="section-heading">
            <div>
              <h2>Your channels</h2>
              <p>Connect the platforms where your customers contact you.</p>
            </div>
          </div>

          <div className="channels-grid">
            {channels.map((channel) => (
              <article className="channel-card" key={channel.id}>
                <div className="channel-top">
                  <div
                    className="channel-icon"
                    style={{ background: `${channel.color}18`, color: channel.color }}
                  >
                    {channel.icon}
                  </div>

                  {channel.connected ? (
                    <span className="connected">
                      <b></b> Connected
                    </span>
                  ) : (
                    <span className="not-connected">Not connected</span>
                  )}
                </div>

                <div className="channel-info">
                  <span className="category">{channel.category}</span>
                  <h3>{channel.name}</h3>
                  <p>{channel.description}</p>
                </div>

                <div className="card-bottom">
                  {channel.connected ? (
                    <>
                      <button
                        className="manage"
                        onClick={() => setNotice(`${channel.name} is connected and ready.`)}
                      >
                        Manage connection
                      </button>

                      {channel.id !== "website" && (
                        <button
                          className="disconnect"
                          onClick={() => disconnect(channel.id)}
                        >
                          Disconnect
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      className="connect"
                      onClick={() => connectChannel(channel)}
                    >
                      Connect {channel.name}
                      <span>→</span>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <section className="how-it-works">
            <div className="how-heading">
              <div>
                <p className="hero-label">HOW IT WORKS</p>
                <h2>One inbox. Every conversation.</h2>
                <p>
                  Once channels are connected, Lewy can work across them from
                  one unified customer timeline.
                </p>
              </div>
            </div>

            <div className="steps">
              <div>
                <span>01</span>
                <strong>Customer messages you</strong>
                <p>A lead sends a message through any connected channel.</p>
              </div>

              <div>
                <span>02</span>
                <strong>Lewy understands it</strong>
                <p>AI identifies intent, customer details and buying signals.</p>
              </div>

              <div>
                <span>03</span>
                <strong>Lewy takes action</strong>
                <p>Reply, qualify, follow up or book an appointment.</p>
              </div>

              <div>
                <span>04</span>
                <strong>You see the revenue</strong>
                <p>Track recovered leads and conversations from the dashboard.</p>
              </div>
            </div>
          </section>

          <div className="security">
            <span>⌁</span>
            <div>
              <strong>Your connections are controlled by you</strong>
              <p>
                Lewy will only perform actions that your business authorizes.
                Sensitive actions can require human approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>

            <div
              className="modal-icon"
              style={{
                color: selected.color,
                background: `${selected.color}18`,
              }}
            >
              {selected.icon}
            </div>

            <p className="hero-label">CONNECT CHANNEL</p>
            <h2>Connect {selected.name}</h2>

            <p className="modal-text">
              This is where the secure authorization flow for {selected.name}
              will live. In the production version, the business will authorize
              Lewy through the official provider connection.
            </p>

            <div className="permissions">
              <div><span>✓</span> Receive customer conversations</div>
              <div><span>✓</span> Send authorized replies</div>
              <div><span>✓</span> Create and update leads</div>
              <div><span>✓</span> Track conversation revenue</div>
            </div>

            <div className="prototype-warning">
              <strong>Prototype mode</strong>
              <span>
                No external account credentials are being requested yet.
                This button simulates a successful connection.
              </span>
            </div>

            <button className="modal-connect" onClick={simulateConnection}>
              Simulate secure connection →
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f7f8fc;
          color: #111827;
          display: flex;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .sidebar {
          width: 260px;
          background: #10121a;
          color: white;
          min-height: 100vh;
          padding: 22px 16px;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 4px 10px 26px;
        }

        .brand-mark {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #8b5cf6, #5b3cc4);
          font-size: 20px;
          font-weight: 800;
          box-shadow: 0 8px 24px rgba(124, 92, 252, .3);
        }

        .brand strong {
          display: block;
          font-size: 15px;
        }

        .brand span {
          display: block;
          color: #858a9d;
          font-size: 11px;
          margin-top: 2px;
        }

        .workspace {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px;
          border: 1px solid #292c37;
          background: #171a23;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .workspace-avatar,
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          background: #eee9ff;
          color: #6d4edb;
          font-weight: 800;
        }

        .workspace strong {
          display: block;
          font-size: 11px;
        }

        .workspace span {
          color: #7f8495;
          font-size: 10px;
        }

        .dots {
          margin-left: auto;
        }

        nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-title {
          font-size: 9px;
          letter-spacing: 1.5px;
          color: #666b7c;
          margin: 0 10px 9px;
        }

        nav a {
          text-decoration: none;
          color: #979cac;
          padding: 10px 12px;
          border-radius: 9px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: .2s;
        }

        nav a:hover,
        nav a.active {
          color: white;
          background: #252936;
        }

        nav a.active {
          box-shadow: inset 3px 0 #8b5cf6;
        }

        nav a span {
          width: 17px;
          text-align: center;
          font-size: 15px;
        }

        .ai-card {
          margin-top: auto;
          padding: 13px;
          border: 1px solid #292c37;
          border-radius: 12px;
          display: flex;
          gap: 10px;
          background: #151821;
        }

        .ai-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          margin-top: 4px;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, .1);
        }

        .ai-card strong {
          display: block;
          font-size: 10px;
        }

        .ai-card span {
          display: block;
          color: #74798a;
          font-size: 9px;
          margin-top: 4px;
        }

        .content {
          flex: 1;
          min-width: 0;
        }

        .topbar {
          height: 82px;
          padding: 0 34px;
          background: white;
          border-bottom: 1px solid #e9eaf0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .eyebrow,
        .hero-label {
          font-size: 9px;
          letter-spacing: 1.6px;
          font-weight: 800;
          color: #8a8fa0;
        }

        .topbar h1 {
          margin: 4px 0 0;
          font-size: 21px;
          letter-spacing: -.5px;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-button,
        .notification {
          border: 0;
          background: #f5f5f8;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          color: #666b79;
          cursor: pointer;
        }

        .notification {
          position: relative;
        }

        .notification i {
          position: absolute;
          width: 5px;
          height: 5px;
          background: #ef4444;
          border-radius: 50%;
          top: 8px;
          right: 8px;
        }

        .body {
          max-width: 1250px;
          margin: auto;
          padding: 30px 34px 50px;
        }

        .notice {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          background: #ecfdf3;
          color: #166534;
          border: 1px solid #bbf7d0;
          border-radius: 11px;
          margin-bottom: 18px;
          font-size: 12px;
        }

        .notice span {
          font-weight: 900;
        }

        .notice button {
          margin-left: auto;
          border: 0;
          background: transparent;
          cursor: pointer;
          font-size: 18px;
          color: #166534;
        }

        .hero {
          padding: 28px;
          border-radius: 18px;
          color: white;
          background: linear-gradient(120deg, #171322, #2a1d4b);
          display: flex;
          justify-content: space-between;
          gap: 25px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 15px 45px rgba(40, 25, 75, .14);
        }

        .hero > div:first-child {
          display: flex;
          gap: 17px;
        }

        .hero-icon {
          width: 47px;
          height: 47px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: rgba(139, 92, 246, .18);
          border: 1px solid rgba(167, 139, 250, .25);
          border-radius: 13px;
          color: #bda8ff;
          font-size: 20px;
        }

        .hero h2 {
          font-size: 23px;
          margin: 7px 0 7px;
          letter-spacing: -.6px;
        }

        .hero p:not(.hero-label) {
          margin: 0;
          color: #b7b1c6;
          font-size: 12px;
          line-height: 1.7;
          max-width: 610px;
        }

        .connection-summary {
          min-width: 170px;
          align-self: center;
        }

        .connection-summary strong {
          display: block;
          font-size: 28px;
        }

        .connection-summary span {
          color: #aaa4b8;
          font-size: 10px;
        }

        .progress {
          height: 5px;
          background: #423853;
          border-radius: 20px;
          overflow: hidden;
          margin-top: 10px;
        }

        .progress div {
          height: 100%;
          background: #a78bfa;
          border-radius: inherit;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          margin: 32px 0 15px;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 17px;
        }

        .section-heading p {
          color: #858a99;
          font-size: 11px;
          margin: 5px 0 0;
        }

        .channels-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
        }

        .channel-card {
          background: white;
          border: 1px solid #e9eaf0;
          border-radius: 15px;
          padding: 19px;
          min-width: 0;
          transition: transform .2s, box-shadow .2s;
        }

        .channel-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(25, 28, 40, .07);
        }

        .channel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .channel-icon {
          width: 43px;
          height: 43px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-weight: 900;
          font-size: 16px;
        }

        .connected,
        .not-connected {
          font-size: 9px;
          padding: 5px 8px;
          border-radius: 20px;
        }

        .connected {
          background: #ecfdf3;
          color: #15803d;
        }

        .connected b {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          margin-right: 4px;
        }

        .not-connected {
          background: #f4f4f6;
          color: #8a8e9b;
        }

        .channel-info {
          margin: 20px 0;
        }

        .category {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-weight: 800;
          color: #999daa;
        }

        .channel-info h3 {
          margin: 6px 0;
          font-size: 15px;
        }

        .channel-info p {
          color: #7e8391;
          font-size: 11px;
          line-height: 1.6;
          min-height: 36px;
          margin: 0;
        }

        .card-bottom {
          padding-top: 14px;
          border-top: 1px solid #f0f0f3;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .connect,
        .manage {
          flex: 1;
          border: 0;
          border-radius: 9px;
          padding: 10px 11px;
          background: #f1edff;
          color: #6946cf;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
        }

        .connect span {
          float: right;
          font-size: 14px;
        }

        .manage {
          background: #f5f5f7;
          color: #555a68;
          text-align: center;
        }

        .disconnect {
          border: 0;
          background: transparent;
          color: #ef4444;
          font-size: 9px;
          cursor: pointer;
        }

        .how-it-works {
          margin-top: 30px;
          background: white;
          border: 1px solid #e9eaf0;
          border-radius: 17px;
          padding: 25px;
        }

        .how-it-works h2 {
          margin: 6px 0;
          font-size: 18px;
        }

        .how-it-works p {
          color: #7d8290;
          font-size: 11px;
          line-height: 1.6;
          max-width: 650px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 24px;
        }

        .steps > div {
          border-top: 2px solid #eeeafc;
          padding-top: 13px;
        }

        .steps span {
          font-size: 9px;
          color: #7c5cfc;
          font-weight: 900;
        }

        .steps strong {
          display: block;
          font-size: 11px;
          margin-top: 8px;
        }

        .steps p {
          font-size: 10px;
          margin-top: 6px;
        }

        .security {
          display: flex;
          gap: 13px;
          margin-top: 16px;
          padding: 15px 18px;
          background: #f0fdf4;
          border: 1px solid #dcfce7;
          border-radius: 13px;
        }

        .security > span {
          color: #16a34a;
          font-size: 19px;
        }

        .security strong {
          font-size: 11px;
        }

        .security p {
          margin: 4px 0 0;
          color: #66806e;
          font-size: 10px;
        }

        .mobile-menu {
          display: none;
          border: 0;
          background: #f3f3f6;
          width: 35px;
          height: 35px;
          border-radius: 9px;
          font-size: 18px;
          cursor: pointer;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 11, 17, .62);
          backdrop-filter: blur(4px);
          z-index: 50;
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .modal {
          width: min(500px, 100%);
          background: white;
          border-radius: 19px;
          padding: 30px;
          position: relative;
          box-shadow: 0 30px 80px rgba(0, 0, 0, .25);
        }

        .close {
          position: absolute;
          top: 14px;
          right: 15px;
          border: 0;
          background: #f4f4f6;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
        }

        .modal-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 20px;
        }

        .modal h2 {
          margin: 7px 0;
          font-size: 22px;
        }

        .modal-text {
          color: #777c89;
          font-size: 12px;
          line-height: 1.7;
        }

        .permissions {
          display: grid;
          gap: 9px;
          padding: 15px;
          background: #f8f8fa;
          border-radius: 12px;
          margin: 18px 0;
        }

        .permissions div {
          font-size: 10px;
          color: #505563;
        }

        .permissions span {
          color: #16a34a;
          margin-right: 7px;
          font-weight: 900;
        }

        .prototype-warning {
          padding: 12px;
          background: #fff8eb;
          border: 1px solid #fde7bb;
          border-radius: 10px;
          margin-bottom: 16px;
        }

        .prototype-warning strong {
          display: block;
          color: #a16207;
          font-size: 10px;
        }

        .prototype-warning span {
          display: block;
          color: #8a7046;
          font-size: 9px;
          line-height: 1.5;
          margin-top: 3px;
        }

        .modal-connect {
          width: 100%;
          padding: 13px;
          border: 0;
          border-radius: 10px;
          background: #6d4edb;
          color: white;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        @media (max-width: 1050px) {
          .channels-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .steps {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 760px) {
          .sidebar {
            position: fixed;
            left: -280px;
            top: 0;
            bottom: 0;
            z-index: 100;
            transition: left .25s;
          }

          .page:global(.menu-open) .sidebar {
            left: 0;
          }

          .mobile-menu {
            display: block;
          }

          .topbar {
            height: auto;
            min-height: 75px;
            padding: 15px 18px;
            gap: 12px;
          }

          .topbar h1 {
            font-size: 17px;
          }

          .top-actions .icon-button {
            display: none;
          }

          .body {
            padding: 20px 16px 40px;
          }

          .hero {
            flex-direction: column;
            padding: 21px;
          }

          .connection-summary {
            min-width: 0;
          }

          .channels-grid {
            grid-template-columns: 1fr;
          }

          .steps {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .top-actions {
            gap: 5px;
          }

          .avatar {
            width: 30px;
            height: 30px;
          }

          .hero h2 {
            font-size: 19px;
          }

          .hero p:not(.hero-label) {
            font-size: 11px;
          }

          .how-it-works {
            padding: 20px;
          }

          .modal {
            padding: 23px;
          }
        }
      `}</style>
    </main>
  );
}
