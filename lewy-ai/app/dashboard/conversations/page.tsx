import { MessageSquare } from "lucide-react";
import DashboardShell from "../../../components/DashboardShell";

export default function ConversationsPage() {
  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Conversations</h1>
        <p>Manage customer conversations across your connected channels.</p>
      </div>

      <div className="empty-card">
        <div className="empty-icon"><MessageSquare size={22} /></div>
        <h2>No conversations yet</h2>
        <p>
          Once a channel is connected and customers start contacting your
          business, their conversations will appear here.
        </p>
      </div>
    </DashboardShell>
  );
}
