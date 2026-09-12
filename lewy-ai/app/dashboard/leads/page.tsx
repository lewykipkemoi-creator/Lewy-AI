import { TrendingUp } from "lucide-react";
import DashboardShell from "../../../components/DashboardShell";

export default function LeadsPage() {
  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Leads</h1>
        <p>Track prospects and identify opportunities that need attention.</p>
      </div>

      <div className="empty-card">
        <div className="empty-icon"><TrendingUp size={22} /></div>
        <h2>No leads yet</h2>
        <p>
          Lewy will identify and organize leads from real customer
          conversations after your channels are connected.
        </p>
      </div>
    </DashboardShell>
  );
}
