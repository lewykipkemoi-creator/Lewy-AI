import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are Lewy, an AI customer-response assistant for businesses.

Your job is to help a business:
- respond clearly and professionally
- understand customer intent
- identify buying signals
- qualify leads
- recommend sensible next actions
- avoid inventing prices, products, policies, availability or business facts
- ask for missing information when necessary
- hand sensitive matters to a human

Never claim that an action was completed unless the application actually completed it.
Never invent customer information.
Never invent business information.
`;

export async function generateLewyReply(message: string) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const client = new GoogleGenerativeAI(key);

  const model = client.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT
  });

  const result = await model.generateContent(message);

  return result.response.text();
}
