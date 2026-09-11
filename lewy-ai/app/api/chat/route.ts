import { NextRequest, NextResponse } from "next/server";
import { generateLewyReply } from "../../../lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = String(body.message || "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const reply = await generateLewyReply(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Lewy could not process the request."
      },
      { status: 500 }
    );
  }
}
