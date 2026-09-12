"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  TrendingUp,
  CalendarDays,
  Clock3,
  Settings,
  Menu,
  X,
  LogOut,
  Sparkles,
  ArrowRight,
  Plus
} from "lucide-react";
import { createClient } from "../../lib/supabase";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email || "");
      setLoading(false);
    });
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-box">
          <Sparkles size={25} />
          <span>Loading Lewy...</span>
        </div>

        <style jsx>{`
          .loading {
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #f6f7fb;
            font-family: Arial, sans-serif;
          }

          .loading-box {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #111827;
            font-weight: 700;
          }
        `}</style>
      </div>
    );
  }

  const nav = [
    ["Overview", "/dashboard", LayoutDashboard],
    ["Conversations", "/dashboard/conversations", MessageSquare],
    ["Customers", "/dashboard/customers", Users],
    ["Leads", "/dashboard/leads", TrendingUp],
    ["Follow-ups", "/dashboard/followups", Clock3],
    ["Calendar", "/dashboard/calendar", CalendarDays],
    ["Settings", "/dashboard/settings", Settings]
  ];

  return (
    <div className="app">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="logo-area">
          <Link href="/" className="logo">
            <span className="logo-icon">
              <Sparkles size={18} />
            </span>
            <span>Lewy AI</span>
          </Link>

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <div className="workspace">
          <span className="workspace-label">WORKSPACE</span>
          <div className="workspace-name">
            <span className="online" />
            My Business
          </div>
        </div>

        <nav>
          <span className="nav-title">MENU</span>

          {nav.map(([label, href, Icon]) => {
            const IconComponent = Icon as typeof LayoutDashboard;
            const active = href === "/dashboard";

            return (
              <Link
                href={href as string}
                key={label as string}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <IconComponent size={18} />
                <span>{label as string}</span>
              </Link>
            );
          })}
        </nav>

        <div className="account">
          <div className="avatar">
            {email.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="account-text">
            <strong>My account</strong>
            <span>{email}</span>
          </div>

          <button onClick={logout} title="Sign out">
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}

      <main className="main">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="top-title">
            <span>Dashboard</span>
          </div>

          <Link href="/dashboard/settings" className="settings-button">
            <Settings size={19} />
          </Link>
        </header>

        <section className="content">
          <div className="heading">
            <div>
              <span className="eyebrow">YOUR WORKSPACE</span>
              <h1>Overview</h1>
              <p>
                See what is happening with your customer conversations.
              </p>
            </div>

            <Link href="/dashboard/settings" className="connect">
              <Plus size={17} />
              Connect channel
            </Link>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-icon">
                <MessageSquare size={20} />
              </div>
              <div>
                <span>Conversations</span>
                <strong>0</strong>
                <small>No conversations yet</small>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon">
                <Users size={20} />
              </div>
              <div>
                <span>Customers</span>
                <strong>0</strong>
                <small>No customers yet</small>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon">
                <TrendingUp size={20} />
              </div>
              <div>
                <span>Leads</span>
                <strong>0</strong>
                <small>No leads yet</small>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon">
                <CalendarDays size={20} />
              </div>
              <div>
                <span>Appointments</span>
                <strong>0</strong>
                <small>No appointments yet</small>
              </div>
            </div>
          </div>

          <div className="main-card">
            <div className="card-header">
              <div>
                <h2>Get started with Lewy</h2>
                <p>
                  Connect the channels your customers use to contact your
                  business.
                </p>
              </div>

              <Sparkles size={24} />
            </div>

            <div className="steps">
              <div className="step">
                <div className="number">1</div>
                <div>
                  <strong>Connect a customer channel</strong>
                  <p>
                    Bring WhatsApp, Gmail and other conversations into Lewy.
                  </p>
                </div>
                <Link href="/dashboard/settings">
                  Set up <ArrowRight size={15} />
                </Link>
              </div>

              <div className="step">
                <div className="number">2</div>
                <div>
                  <strong>Tell Lewy about your business</strong>
                  <p>
                    Add your business information, products and instructions.
                  </p>
                </div>
                <Link href="/dashboard/settings">
                  Configure <ArrowRight size={15} />
                </Link>
              </div>

              <div className="step">
                <div className="number">3</div>
                <div>
                  <strong>Start recovering missed opportunities</strong>
                  <p>
                    Lewy can identify leads, respond and follow up with
                    customers.
                  </p>
                </div>
                <span className="coming">Ready after setup</span>
              </div>
            </div>
          </div>

          <div className="bottom-grid">
            <div className="small-card">
              <MessageSquare size={21} />
              <h3>Conversations</h3>
              <p>
                Your unified customer inbox will appear here once a channel
                is connected.
              </p>
              <Link href="/dashboard/conversations">
                Open conversations <ArrowRight size={15} />
              </Link>
            </div>

            <div className="small-card">
              <TrendingUp size={21} />
              <h3>Revenue at risk</h3>
              <p>
                Lewy will calculate opportunities from your real customer
                conversations. No artificial numbers are shown.
              </p>
              <Link href="/dashboard/revenue">
                View revenue <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          background: #f6f7fb;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
        }

        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 250px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          padding: 20px 14px;
          display: flex;
          flex-direction: column;
          z-index: 100;
        }

        .logo-area {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px 7px 25px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #111827;
          font-size: 19px;
          font-weight: 800;
        }

        .logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #111827;
          color: white;
          display: grid;
          place-items: center;
        }

        .close-menu {
          display: none;
        }

        .workspace {
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 11px;
          padding: 12px;
          margin-bottom: 22px;
        }

        .workspace-label,
        .nav-title {
          display: block;
          font-size: 10px;
          font-weight: 800;
          color: #9ca3af;
          letter-spacing: 0.08em;
        }

        .workspace-name {
          margin-top: 7px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
        }

        .online {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
        }

        nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-title {
          margin: 0 10px 8px;
        }

        .nav-link {
          min-height: 43px;
          border-radius: 9px;
          padding: 0 11px;
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          color: #6b7280;
          font-size: 13px;
          font-weight: 600;
        }

        .nav-link:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .nav-link.active {
          background: #111827;
          color: #ffffff;
        }

        .account {
          margin-top: auto;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #e5e7eb;
          display: grid;
          place-items: center;
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .account-text {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .account-text strong {
          font-size: 12px;
        }

        .account-text span {
          font-size: 10px;
          color: #9ca3af;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .account button,
        .settings-button,
        .menu-button {
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .account button {
          color: #6b7280;
        }

        .main {
          margin-left: 250px;
          min-height: 100vh;
        }

        .topbar {
          height: 64px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
        }

        .top-title {
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
        }

        .settings-button {
          color: #6b7280;
          display: flex;
        }

        .menu-button {
          display: none;
        }

        .content {
          max-width: 1350px;
          margin: 0 auto;
          padding: 32px;
        }

        .heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 25px;
        }

        .eyebrow {
          color: #9ca3af;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        h1 {
          margin: 5px 0 7px;
          font-size: 30px;
          letter-spacing: -0.04em;
        }

        .heading p {
          margin: 0;
          color: #6b7280;
          font-size: 14px;
        }

        .connect {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #111827;
          color: white;
          text-decoration: none;
          border-radius: 9px;
          padding: 11px 15px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 18px;
        }

        .stat {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 19px;
          display: flex;
          gap: 13px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #f3f4f6;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .stat span,
        .stat small {
          display: block;
        }

        .stat span {
          font-size: 11px;
          color: #6b7280;
          font-weight: 600;
        }

        .stat strong {
          display: block;
          font-size: 25px;
          margin: 4px 0 2px;
        }

        .stat small {
          color: #9ca3af;
          font-size: 10px;
        }

        .main-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 18px;
        }

        .card-header {
          padding: 23px 25px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .card-header h2 {
          margin: 0 0 6px;
          font-size: 18px;
        }

        .card-header p {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
        }

        .card-header > svg {
          color: #6b7280;
          flex-shrink: 0;
        }

        .steps {
          display: flex;
          flex-direction: column;
        }

        .step {
          display: grid;
          grid-template-columns: 34px 1fr auto;
          align-items: center;
          gap: 13px;
          padding: 18px 25px;
          border-bottom: 1px solid #f0f0f0;
        }

        .step:last-child {
          border-bottom: 0;
        }

        .number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3f4f6;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 800;
        }

        .step strong {
          display: block;
          font-size: 13px;
        }

        .step p {
          margin: 4px 0 0;
          color: #9ca3af;
          font-size: 11px;
          line-height: 1.5;
        }

        .step a {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #111827;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
        }

        .coming {
          color: #9ca3af;
          font-size: 10px;
          white-space: nowrap;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .small-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 15px;
          padding: 22px;
        }

        .small-card > svg {
          color: #374151;
        }

        .small-card h3 {
          margin: 13px 0 6px;
          font-size: 15px;
        }

        .small-card p {
          margin: 0 0 15px;
          color: #6b7280;
          font-size: 12px;
          line-height: 1.6;
        }

        .small-card a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #111827;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
        }

        .overlay {
          display: none;
        }

        @media (max-width: 1000px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 750px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.2s ease;
            width: 275px;
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.12);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .close-menu {
            display: grid;
            place-items: center;
            border: 0;
            background: transparent;
            color: #6b7280;
          }

          .overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.35);
            border: 0;
            z-index: 90;
          }

          .main {
            margin-left: 0;
          }

          .menu-button {
            display: grid;
            place-items: center;
            color: #111827;
          }

          .topbar {
            padding: 0 16px;
          }

          .content {
            padding: 22px 15px 35px;
          }

          .heading {
            align-items: stretch;
            flex-direction: column;
          }

          .connect {
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .stats,
          .bottom-grid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 25px;
          }

          .step {
            grid-template-columns: 32px 1fr;
            padding: 16px;
          }

          .step a,
          .coming {
            grid-column: 2;
            justify-self: start;
            margin-top: 4px;
          }

          .card-header {
            padding: 20px 17px;
          }
        }

        @media (max-width: 400px) {
          .content {
            padding-left: 12px;
            padding-right: 12px;
          }

          .stat {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
