export async function chatCompletion(
  apiKey: string,
  messages: { role: string; content: string }[],
  systemMessage?: string
): Promise<string> {
  const allMessages = systemMessage
    ? [{ role: "system", content: systemMessage }, ...messages]
    : messages;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: allMessages,
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error: ${res.status} - ${err}`);
  }

  const data = await res.json();
  return data.choices[0]?.message?.content || "No response generated.";
}
