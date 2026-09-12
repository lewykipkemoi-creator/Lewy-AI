import { MessageSquare } from "lucide-react";
import DashboardShell from "../../../components/DashboardShell";

export default function FollowupsPage() {
  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Follow-ups</h1>
        <p>Never let a promising conversation go cold.</p>
      </div>

      <div className="empty-card">
        <div className="empty-icon"><MessageSquare size={22} /></div>
        <h2>No follow-ups scheduled</h2>
        <p>
          Follow-ups created by Lewy will appear here with their scheduled
          time, channel, customer and status.
        </p>
      </div>
    </DashboardShell>
  );
}
