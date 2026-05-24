import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { userContextString } from "@/lib/mockUser";
import { productCatalogString } from "@/lib/scotiaProducts";

export const runtime = "nodejs";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Scotia Due North, an AI feature inside the Scotiabank mobile app that helps young Canadians (18-34) fact-check financial advice they encounter on TikTok, Reddit, Instagram, group chats, and other social media.

USER CONTEXT (always use this in your response):
${userContextString}

AVAILABLE SCOTIA PRODUCTS (recommend only from this list):
${productCatalogString}

Your job is to take a piece of financial advice (provided as text and/or a screenshot image) and respond with a STRICT JSON object in this exact shape:

{
  "verdict": "legit" | "mostly_legit" | "misleading" | "false",
  "summary": "One short sentence summarizing your verdict.",
  "explanation": "2-3 sentences explaining what's true/false about the claim, IN PLAIN ENGLISH. No jargon. Address the user by name (Maya). Use her real numbers (income, account balances, unused contribution room) to make it personal.",
  "whyItMatters": "1-2 sentences tying the advice to Maya's specific situation. Use her real numbers.",
  "recommendations": [
    {
      "productId": "id from the catalog above",
      "productName": "exact product name",
      "reason": "Why this product fits Maya's situation and the topic of the advice. One short sentence."
    }
  ]
}

RULES:
- If given an image, read the financial advice shown in the image and fact-check that content.
- Maximum 2 recommendations.
- Be direct and honest. If advice is bad, say so. If it's actually solid, say so.
- Never give personalized investment advice yourself — only fact-check the content and surface relevant Scotia products. The licensed human advisor will give real advice.
- Use Canadian context only (TFSA, RRSP, FHSA, CDIC, CIRO — not 401(k), IRA, FDIC).
- Output ONLY the JSON object. No markdown, no code fences, no preamble.`;

export async function POST(request: Request) {
  try {
    const { advice, image } = await request.json();

    if (!advice && !image) {
      return NextResponse.json(
        { error: "Provide 'advice' text or 'image' data" },
        { status: 400 }
      );
    }

    const userContent: any[] = [];

    if (image && typeof image === "string" && image.startsWith("data:image/")) {
      const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
      if (match) {
        userContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: match[1],
            data: match[2],
          },
        });
      }
    }

    const textPrompt = image
      ? `The user uploaded this screenshot showing financial advice from social media. Read what's in the image carefully and fact-check the advice. ${advice ? `Additional context they typed: "${advice}"` : ""}`
      : `Here is the financial advice I just saw. Please fact-check it for me:\n\n"${advice}"`;

    userContent.push({ type: "text", text: textPrompt });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const rawText = textBlock && textBlock.type === "text" ? textBlock.text : "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Analyze API error:", err);
    return NextResponse.json(
      { error: err.message || "Analysis failed" },
      { status: 500 }
    );
  }
}