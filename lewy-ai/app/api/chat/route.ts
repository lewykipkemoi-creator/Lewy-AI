import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { message, businessName = "your business", context = "" } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Gemini is not configured. Add GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: `You are Lewy, an AI customer-response assistant for ${businessName}.
Your job is to help the business respond quickly, naturally and accurately.
Never invent prices, policies, stock, appointments or promises. If information is missing, say that a human should confirm it.
Be concise and friendly. If a lead shows buying intent, suggest the next useful step.
Business context: ${context || "No additional business context has been provided."}`
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    return Response.json({ reply: text });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Lewy could not process that message." }, { status: 500 });
  }
}
