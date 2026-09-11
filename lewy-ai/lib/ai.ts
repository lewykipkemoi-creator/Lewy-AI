export type AIProvider = "gemini" | "openai";

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIProviderAdapter {
  reply(input: {
    message: string;
    businessName?: string;
    context?: string;
    history?: AIMessage[];
  }): Promise<string>;
}

/*
 * Provider abstraction:
 * The app currently calls /api/chat -> Gemini.
 * When OpenAI is added later, implement the same interface and switch
 * the provider in one place instead of changing the rest of the app.
 */
export const aiConfig = {
  provider: (process.env.AI_PROVIDER || "gemini") as AIProvider
};
