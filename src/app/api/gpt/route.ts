import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { userDetails } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userDetails,
      },
    ],
    max_tokens: 2048,
  });
  console.log(response.usage)
  const completion = response.choices[0].message.content;

  return new Response(JSON.stringify({ completion }), {
    headers: { "Content-Type": "application/json" },
  });
}
