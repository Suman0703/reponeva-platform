const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You convert a developer's natural-language repo search into structured filters. Respond with ONLY valid JSON, no markdown, no explanation, in exactly this shape:
{
  "language": "<a programming language name, or null>",
  "topics": ["<lowercase github-topic-style keywords>"],
  "skillLevel": "<beginner|intermediate|advanced|null>",
  "summary": "<a short, friendly one-sentence restatement of what they're looking for>"
}
Infer "beginner" skill level from phrases like "good first issue", "beginner friendly", "new to open source". Keep topics to at most 4 relevant, general terms (e.g. "machine-learning", "cli", "api").`;

export async function interpretSearchQuery(query) {
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: query },
      ],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error("Groq API raw error response:", JSON.stringify(body));
    throw new Error(`Groq request failed (${res.status}): ${body.error?.message || body.message || JSON.stringify(body)}`);
  }

  const data = await res.json();
  const rawContent = data.choices[0].message.content;

  try {
    return JSON.parse(rawContent);
  } catch {
    const cleaned = rawContent.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
}