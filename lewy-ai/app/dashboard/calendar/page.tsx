import { CalendarDays } from "lucide-react";
import DashboardShell from "../../../components/DashboardShell";

export default function CalendarPage() {
  return (
    <DashboardShell>
      <div className="page-heading">
        <h1>Calendar</h1>
        <p>Manage appointments generated from customer conversations.</p>
      </div>

      <div className="empty-card">
        <div className="empty-icon"><CalendarDays size={22} /></div>
        <h2>Calendar not connected</h2>
        <p>
          Connect Google Calendar from settings to let Lewy check availability
          and help customers book appointments.
        </p>
      </div>
    </DashboardShell>
  );
}
