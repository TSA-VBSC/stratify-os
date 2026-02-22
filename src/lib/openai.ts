import { supabase } from "@/integrations/supabase/client";

export async function chatCompletion(
  messages: { role: string; content: string }[],
  systemMessage?: string
): Promise<string> {
  const { data, error } = await supabase.functions.invoke("chat", {
    body: { messages, systemMessage },
  });

  if (error) throw new Error(error.message || "AI request failed");
  if (data?.error) throw new Error(data.error);
  return data?.content || "No response generated.";
}
