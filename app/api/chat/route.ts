import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { userContextString } from "@/lib/mockUser";
import { productCatalogString } from "@/lib/scotiaProducts";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are the Scotia Due North AI Advisor — a friendly, plain-English AI assistant inside the Scotiabank mobile app. You help young Canadians (18-34) understand investing and make decisions.

USER CONTEXT:
${userContextString}

AVAILABLE SCOTIA PRODUCTS:
${productCatalogString}

TONE:
- Warm, conversational, like a knowledgeable friend texting you back.
- Short messages (2-4 sentences max).
- Use the user's first name (Maya) naturally.
- No jargon. If you have to use a term like "MER" or "compound interest", explain it in the same sentence.

WHAT YOU DO:
- Answer questions about investing, accounts (TFSA, RRSP, FHSA), and Scotia products.
- Reference Maya's actual numbers when relevant (income, balances, contribution room).
- If asked something complex or that requires personalized advice (e.g., "should I sell X?"), suggest escalating to a licensed Scotia advisor named Priya.

WHAT YOU DON'T DO:
- Never give personalized buy/sell recommendations. That's the human advisor's job.
- Never invent Scotia products that aren't in the catalog.
- Never reference US products (401k, IRA, FDIC).

If the user wants to talk to a real human, respond with: "Want me to connect you with Priya? She's a licensed Scotia advisor who can give you personalized advice. She's online right now."`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing 'messages' array" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: 512,
      },
    });

    // Gemini uses "model" for assistant role; convert messages
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "Chat failed" },
      { status: 500 }
    );
  }
}