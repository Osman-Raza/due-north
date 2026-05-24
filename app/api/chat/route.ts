import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { userContextString } from "@/lib/mockUser";
import { productCatalogString } from "@/lib/scotiaProducts";

export const runtime = "nodejs";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
- Never reference US products (401k, IRA, FDIC).`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Missing 'messages' array" },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply = textBlock && textBlock.type === "text" ? textBlock.text : "";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "Chat failed" },
      { status: 500 }
    );
  }
}