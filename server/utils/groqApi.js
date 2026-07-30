const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You expand a developer's natural-language project search into a broad set of related search terms, so a keyword search can find conceptually related repositories even when they don't share exact wording.

Respond with ONLY valid JSON, no markdown, no explanation, in exactly this shape:
{
  "language": "<a programming language name if explicitly mentioned, or null>",
  "keywords": ["<8-15 lowercase single or hyphenated words/phrases covering the query's core concept, synonyms, related sub-domains, and common project types in this space>"],
  "skillLevel": "<beginner|intermediate|advanced|null>",
  "summary": "<a short, friendly one-sentence restatement of what they're looking for>"
}

Guidance for "keywords":
- Include the literal query terms AND closely related synonyms/sub-domains.
- Example: "portfolio" -> ["portfolio", "personal-website", "personal-site", "resume", "cv", "showcase", "developer-portfolio", "portfolio-website", "personal-page", "portfolio-template"]
- Example: "AI" -> ["ai", "artificial-intelligence", "machine-learning", "ml", "deep-learning", "nlp", "computer-vision", "chatbot", "neural-network", "llm", "data-science", "recommendation-system"]
- Example: "business" -> ["business", "crm", "erp", "inventory-management", "ecommerce", "business-dashboard", "accounting", "invoicing", "analytics-dashboard", "saas", "business-website"]
- Only set "language" if a specific programming language is explicitly named in the query — do not guess one.
- Infer "beginner" skill level only from explicit phrases like "good first issue", "beginner friendly", "new to open source" — most queries should leave this null.`;

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
      temperature: 0.3,
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