export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ToolCallLog {
  name: string;
  input: unknown;
  output: unknown;
}

export interface ChatResponse {
  reply: string;
  toolCalls: ToolCallLog[];
}
