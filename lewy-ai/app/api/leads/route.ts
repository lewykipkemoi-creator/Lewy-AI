import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ leads: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(
    {
      message: "Lead endpoint ready for persistent database integration.",
      received: body
    },
    { status: 201 }
  );
}
