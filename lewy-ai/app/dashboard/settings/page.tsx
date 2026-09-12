"use client";

import { useState } from "react";
import { MessageCircle, Mail, Instagram, Facebook, Send } from "lucide-react";
import DashboardShell from "../../../components/DashboardShell";

const channels = [
  { name: "WhatsApp", icon: MessageCircle },
  { name: "Gmail", icon: Mail },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook Messenger", icon: Facebook },
  { name: "Telegram", icon: Send }
];

export default function SettingsPage() {
  const [message, setMessage] = useState("");

  function connect(name: string) {
    setMessage(
      `${name} connection is not active yet. The integration will be connected here when its credentials and webhook setup are available.`
    );
  }

  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Settings</h1>
        <p>Configure your Lewy workspace and customer channels.</p>
      </div>

      <section className="settings-section">
        <h2>Customer channels</h2>
        <p className="section-description">
          Connect the places where customers contact your business.
        </p>

        <div className="channel-list">
          {channels.map((channel) => {
            const Icon = channel.icon;

            return (
              <div className="channel-row" key={channel.name}>
                <div className="channel-info">
                  <div className="channel-icon">
                    <Icon size={19} />
                  </div>

                  <div>
                    <strong>{channel.name}</strong>
                    <span>Not connected</span>
                  </div>
                </div>

                <button
                  className="connect-button"
                  onClick={() => connect(channel.name)}
                >
                  Connect
                </button>
              </div>
            );
          })}
        </div>

        {message && <div className="notice">{message}</div>}
      </section>

      <section className="settings-section">
        <h2>Workspace</h2>
        <p className="section-description">
          Workspace configuration will be stored in your Lewy account.
        </p>

        <div className="workspace-placeholder">
          <strong>Business profile</strong>
          <span>
            Business name, description, timezone and AI instructions will be
            configured here.
          </span>
        </div>
      </section>

      <style jsx>{`
        .settings-section {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 22px;
          margin-bottom: 18px;
        }

        .settings-section h2 {
          margin: 0;
          font-size: 17px;
        }

        .section-description {
          color: #6b7280;
          font-size: 13px;
          margin: 7px 0 18px;
        }

        .channel-list {
          display: flex;
          flex-direction: column;
        }

        .channel-row {
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border-top: 1px solid #f0f0f0;
        }

        .channel-info {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .channel-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #f3f4f6;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .channel-info strong,
        .channel-info span {
          display: block;
        }

        .channel-info strong {
          font-size: 13px;
        }

        .channel-info span {
          margin-top: 3px;
          color: #9ca3af;
          font-size: 11px;
        }

        .connect-button {
          border: 1px solid #d1d5db;
          background: white;
          color: #111827;
          padding: 9px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .connect-button:hover {
          background: #f9fafb;
        }

        .notice {
          margin-top: 15px;
          padding: 12px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 9px;
          color: #6b7280;
          font-size: 12px;
          line-height: 1.5;
        }

        .workspace-placeholder {
          border: 1px dashed #d1d5db;
          border-radius: 11px;
          padding: 17px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .workspace-placeholder strong {
          font-size: 13px;
        }

        .workspace-placeholder span {
          color: #9ca3af;
          font-size: 12px;
        }

        @media (max-width: 500px) {
          .settings-section {
            padding: 16px;
          }

          .channel-row {
            min-height: 64px;
          }

          .connect-button {
            padding: 8px 11px;
          }
        }
      `}</style>
    </DashboardShell>
  );
}
