import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicClient, CLAUDE_MODEL } from "@/lib/anthropic";
import { TOOL_DEFINITIONS, executeTool } from "@/lib/tools";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import type { ChatMessage, ToolCallLog } from "@/lib/types";

export const runtime = "nodejs";

const MAX_TOOL_ROUNDS = 4;

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const history = body.messages;
  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json({ error: "messages must be a non-empty array." }, { status: 400 });
  }

  let client: Anthropic;
  try {
    client = getAnthropicClient();
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  const messages: Anthropic.MessageParam[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const toolCalls: ToolCallLog[] = [];

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await client.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        tools: TOOL_DEFINITIONS,
        messages,
      });

      if (response.stop_reason !== "tool_use") {
        const reply = response.content
          .filter((block): block is Anthropic.TextBlock => block.type === "text")
          .map((block) => block.text)
          .join("\n");
        return NextResponse.json({ reply, toolCalls } satisfies { reply: string; toolCalls: ToolCallLog[] });
      }

      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        let output: unknown;
        let isError = false;
        try {
          output = await executeTool(block.name, block.input);
        } catch (err: any) {
          output = { error: err.message ?? String(err) };
          isError = true;
        }
        toolCalls.push({ name: block.name, input: block.input, output });
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(output),
          is_error: isError,
        });
      }
      messages.push({ role: "user", content: toolResults });
    }

    return NextResponse.json(
      { error: "Too many tool-use rounds without a final answer." },
      { status: 500 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unknown error." }, { status: 500 });
  }
}
