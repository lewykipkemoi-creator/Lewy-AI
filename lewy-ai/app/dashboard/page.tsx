"use client";

import Link from "next/link";
import {
  MessageSquare,
  Users,
  TrendingUp,
  CalendarDays,
  ArrowRight
} from "lucide-react";
import DashboardShell from "../../components/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Overview</h1>
        <p>Your business response center.</p>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-icon">
            <MessageSquare size={20} />
          </div>
          <div>
            <span>Conversations</span>
            <strong>0</strong>
            <small>No conversations yet</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">
            <Users size={20} />
          </div>
          <div>
            <span>Customers</span>
            <strong>0</strong>
            <small>No customers yet</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">
            <TrendingUp size={20} />
          </div>
          <div>
            <span>Leads</span>
            <strong>0</strong>
            <small>No leads yet</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon">
            <CalendarDays size={20} />
          </div>
          <div>
            <span>Appointments</span>
            <strong>0</strong>
            <small>No appointments yet</small>
          </div>
        </div>
      </div>

      <div className="welcome-card">
        <div>
          <h2>Your Lewy workspace is ready</h2>
          <p>
            Connect your business channels and Lewy will start bringing real
            customer conversations, leads and follow-ups into this workspace.
          </p>
        </div>

        <Link href="/dashboard/settings" className="action-link">
          Connect a channel
          <ArrowRight size={16} />
        </Link>
      </div>

      <style jsx>{`
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .overview-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 15px;
          padding: 20px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #f3f4f6;
          display: grid;
          place-items: center;
          color: #374151;
          flex-shrink: 0;
        }

        .overview-card span,
        .overview-card small {
          display: block;
        }

        .overview-card span {
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
        }

        .overview-card strong {
          display: block;
          font-size: 25px;
          margin: 5px 0 2px;
        }

        .overview-card small {
          color: #9ca3af;
          font-size: 10px;
        }

        .welcome-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .welcome-card h2 {
          margin: 0 0 7px;
          font-size: 18px;
        }

        .welcome-card p {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
          line-height: 1.6;
          max-width: 650px;
        }

        .action-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          border-radius: 9px;
          background: #111827;
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        .action-link:hover {
          opacity: 0.9;
        }

        @media (max-width: 1000px) {
          .overview-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .overview-grid {
            grid-template-columns: 1fr;
          }

          .welcome-card {
            flex-direction: column;
            align-items: stretch;
          }

          .action-link {
            width: 100%;
          }
        }
      `}</style>
    </DashboardShell>
  );
}
