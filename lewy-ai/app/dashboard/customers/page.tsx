import { Users } from "lucide-react";
import DashboardShell from "../../../components/DashboardShell";

export default function CustomersPage() {
  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Customers</h1>
        <p>One place for the people who interact with your business.</p>
      </div>

      <div className="empty-card">
        <div className="empty-icon"><Users size={22} /></div>
        <h2>No customers yet</h2>
        <p>
          Customer profiles will be created automatically as real conversations
          come into your connected channels.
        </p>
      </div>
    </DashboardShell>
  );
}
