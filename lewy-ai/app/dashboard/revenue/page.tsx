import { TrendingUp } from "lucide-react";
import DashboardShell from "../../../components/DashboardShell";

export default function RevenuePage() {
  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Revenue</h1>
        <p>See the revenue your response process protects and recovers.</p>
      </div>

      <div className="empty-card">
        <div className="empty-icon"><TrendingUp size={22} /></div>
        <h2>Revenue tracking starts with real leads</h2>
        <p>
          Lewy will calculate revenue opportunities from actual leads and
          conversations. No demo revenue is shown here.
        </p>
      </div>
    </DashboardShell>
  );
}
