"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Inbox,
  MessageSquare,
  Users,
  TrendingUp,
  CalendarDays,
  Settings,
  Menu,
  X,
  LogOut,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { createClient } from "../lib/supabase";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: Inbox },
  { href: "/dashboard/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/leads", label: "Leads", icon: TrendingUp },
  { href: "/dashboard/revenue", label: "Revenue", icon: TrendingUp },
  { href: "/dashboard/followups", label: "Follow-ups", icon: MessageSquare },
  { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export default function DashboardShell({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
        return;
      }

      setEmail(data.user.email || "");
    });
  }, [router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <div className="dashboard-root">
      <aside className={`dashboard-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <Link href="/" className="brand-link">
            <div className="brand-icon">
              <Sparkles size={18} />
            </div>
            <span>Lewy AI</span>
          </Link>

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        <div className="workspace">
          <div className="workspace-label">WORKSPACE</div>
          <div className="workspace-name">
            <span className="workspace-dot" />
            My Business
          </div>
        </div>

        <nav className="dashboard-nav">
          <div className="nav-section-title">MAIN</div>

          {navigation.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`dashboard-nav-link ${active ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {active && <ChevronRight size={15} className="active-arrow" />}
              </Link>
            );
          })}

          <div className="nav-section-title secondary-title">WORK</div>

          {navigation.slice(4).map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`dashboard-nav-link ${active ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {active && <ChevronRight size={15} className="active-arrow" />}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="account-card">
            <div className="account-avatar">
              {email ? email.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="account-info">
              <strong>Account</strong>
              <span>{email || "Signed in"}</span>
            </div>
          </div>

          <button className="logout-button" onClick={logout}>
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="topbar-title">
            <span>Workspace</span>
          </div>

          <Link href="/dashboard/settings" className="topbar-settings">
            <Settings size={19} />
          </Link>
        </header>

        <div className="dashboard-content">{children}</div>
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .dashboard-root {
          min-height: 100vh;
          background: #f7f8fc;
          color: #111827;
          display: flex;
          font-family: Arial, Helvetica, sans-serif;
        }

        .dashboard-sidebar {
          width: 250px;
          min-width: 250px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 20px 14px;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 50;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 8px 22px;
        }

        .brand-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #111827;
          font-size: 19px;
          font-weight: 800;
        }

        .brand-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: #111827;
          color: white;
        }

        .workspace {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 20px;
        }

        .workspace-label,
        .nav-section-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #9ca3af;
        }

        .workspace-name {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 7px;
          font-size: 13px;
          font-weight: 700;
        }

        .workspace-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
        }

        .dashboard-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .secondary-title {
          margin-top: 20px;
          margin-bottom: 3px;
        }

        .dashboard-nav-link {
          min-height: 42px;
          padding: 0 11px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 11px;
          color: #6b7280;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: 0.15s ease;
        }

        .dashboard-nav-link:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .dashboard-nav-link.active {
          background: #111827;
          color: #ffffff;
        }

        .active-arrow {
          margin-left: auto;
        }

        .sidebar-bottom {
          margin-top: auto;
        }

        .account-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 8px;
          border-top: 1px solid #e5e7eb;
          margin-bottom: 8px;
        }

        .account-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #e5e7eb;
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 13px;
        }

        .account-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .account-info strong {
          font-size: 12px;
        }

        .account-info span {
          font-size: 10px;
          color: #9ca3af;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 170px;
        }

        .logout-button {
          width: 100%;
          border: 0;
          background: transparent;
          color: #6b7280;
          padding: 10px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .logout-button:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .dashboard-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-height: 100vh;
        }

        .dashboard-topbar {
          height: 64px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .topbar-title span {
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
        }

        .topbar-settings {
          color: #6b7280;
          display: flex;
        }

        .mobile-menu,
        .mobile-close {
          display: none;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .dashboard-content {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px;
        }

        .page-heading {
          margin-bottom: 28px;
        }

        .page-heading h1 {
          margin: 0;
          font-size: 28px;
          line-height: 1.2;
          letter-spacing: -0.03em;
        }

        .page-heading p {
          margin: 8px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        .empty-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 40px 24px;
          text-align: center;
        }

        .empty-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: #f3f4f6;
          display: grid;
          place-items: center;
          margin: 0 auto 15px;
          color: #6b7280;
        }

        .empty-card h2 {
          margin: 0 0 7px;
          font-size: 18px;
        }

        .empty-card p {
          margin: 0 auto;
          color: #6b7280;
          font-size: 13px;
          line-height: 1.6;
          max-width: 520px;
        }

        .action-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          padding: 11px 16px;
          border-radius: 9px;
          background: #111827;
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }

        .action-link:hover {
          opacity: 0.9;
        }

        .mobile-backdrop {
          display: none;
        }

        @media (max-width: 800px) {
          .dashboard-sidebar {
            width: 270px;
            min-width: 270px;
            transform: translateX(-100%);
            transition: transform 0.2s ease;
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.12);
          }

          .dashboard-sidebar.mobile-open {
            transform: translateX(0);
          }

          .mobile-close,
          .mobile-menu {
            display: grid;
            place-items: center;
          }

          .mobile-close {
            color: #6b7280;
          }

          .mobile-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.35);
            border: 0;
            z-index: 40;
          }

          .dashboard-main {
            margin-left: 0;
            width: 100%;
          }

          .dashboard-topbar {
            padding: 0 16px;
          }

          .dashboard-content {
            padding: 22px 15px 35px;
          }

          .page-heading h1 {
            font-size: 24px;
          }
        }

        @media (max-width: 420px) {
          .dashboard-content {
            padding-left: 12px;
            padding-right: 12px;
          }

          .empty-card {
            padding: 32px 17px;
          }
        }
      `}</style>
    </div>
  );
}
