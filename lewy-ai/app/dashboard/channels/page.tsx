"use client";

import Link from "next/link";
import { useState } from "react";

const channels = [
  { name: "WhatsApp Business", slug: "whatsapp", desc: "Connect your WhatsApp Business number" },
  { name: "Gmail", slug: "gmail", desc: "Connect your business Gmail inbox" },
  { name: "Instagram", slug: "instagram", desc: "Capture and respond to Instagram DMs" },
  { name: "Facebook Messenger", slug: "messenger", desc: "Manage Messenger conversations" },
  { name: "Telegram", slug: "telegram", desc: "Connect your Telegram business bot" },
  { name: "Website Chat", slug: "website", desc: "Add Lewy to your website" },
  { name: "Google Calendar", slug: "calendar", desc: "Allow Lewy to manage appointments" },
];

function ChannelLogo({ slug }: { slug: string }) {
  if (slug === "website") {
    return (
      <div className="websiteLogo">
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <img
      src={`/brand-icons/${slug}.svg`}
      alt=""
      width={42}
      height={42}
    />
  );
}

export default function ChannelsPage() {
  const [connected, setConnected] = useState<string[]>([]);

  function toggleConnection(name: string) {
    setConnected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <main className="page">
      <header className="header">
        <Link href="/dashboard" className="back">
          ← Dashboard
        </Link>

        <div className="heading">
          <span>CHANNELS</span>
          <h1>Connect your customer channels</h1>
          <p>
            Bring your conversations into one place so Lewy can respond,
            qualify leads and follow up automatically.
          </p>
        </div>
      </header>

      <section className="grid">
        {channels.map((channel) => {
          const isConnected = connected.includes(channel.name);

          return (
            <article className="card" key={channel.slug}>
              <div className="logoBox">
                <ChannelLogo slug={channel.slug} />
              </div>

              <h2>{channel.name}</h2>
              <p>{channel.desc}</p>

              {channel.slug === "calendar" ? (
                <Link href="/dashboard/calendar" className="button">
                  Set up calendar →
                </Link>
              ) : channel.slug === "website" ? (
                <Link href="/dashboard/settings" className="button">
                  Configure website →
                </Link>
              ) : (
                <button
                  type="button"
                  className={isConnected ? "button connected" : "button"}
                  onClick={() => toggleConnection(channel.name)}
                >
                  {isConnected ? "Connected ✓" : "Connect →"}
                </button>
              )}
            </article>
          );
        })}
      </section>

      <Link href="/dashboard" className="bottomLink">
        ← Return to dashboard
      </Link>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f7f8fc;
          color: #171827;
          padding: 35px;
          font-family: Arial, sans-serif;
        }

        .header {
          max-width: 1200px;
          margin: 0 auto;
        }

        .back {
          color: #7657ff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        .heading {
          margin: 42px 0 28px;
        }

        .heading span {
          color: #7657ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.6px;
        }

        .heading h1 {
          font-size: 34px;
          margin: 9px 0;
        }

        .heading p {
          max-width: 650px;
          color: #777b8d;
          line-height: 1.6;
          font-size: 14px;
        }

        .grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .card {
          background: white;
          border: 1px solid #e5e6ed;
          border-radius: 20px;
          padding: 25px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(20, 20, 40, 0.07);
        }

        .logoBox {
          width: 62px;
          height: 62px;
          border-radius: 16px;
          background: #f3f4f8;
          display: grid;
          place-items: center;
        }

        .logoBox img {
          width: 42px;
          height: 42px;
          display: block;
        }

        .websiteLogo {
          width: 42px;
          height: 34px;
          border-radius: 10px;
          background: #7657ff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .websiteLogo span {
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
        }

        .card h2 {
          font-size: 17px;
          margin: 20px 0 8px;
        }

        .card p {
          color: #777b8d;
          font-size: 12px;
          line-height: 1.5;
          min-height: 38px;
        }

        .button {
          width: 100%;
          display: block;
          border: 0;
          margin-top: 20px;
          padding: 12px;
          border-radius: 10px;
          background: #7657ff;
          color: white;
          text-decoration: none;
          text-align: center;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .connected {
          background: #19a96b;
        }

        .bottomLink {
          display: block;
          max-width: 1200px;
          margin: 25px auto 0;
          color: #7657ff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .page {
            padding: 20px;
          }

          .heading h1 {
            font-size: 27px;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
