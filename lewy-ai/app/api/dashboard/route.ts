import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    activeConversations: 0,
    openLeads: 0,
    hotLeads: 0,
    overdueFollowUps: 0,
    revenueAtRisk: 0,
    revenueRecovered: 0
  });
}
