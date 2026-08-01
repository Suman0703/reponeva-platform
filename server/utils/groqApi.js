const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You convert a developer's project search into GitHub search queries, so a live GitHub repository search returns genuinely relevant projects.

Respond with ONLY valid JSON, no markdown, no explanation, in exactly this shape:
{
  "language": "<a programming language name if explicitly mentioned, or null>",
  "searchQueries": ["<2-4 distinct GitHub-style search strings, each a short combination of 2-4 words that GitHub's repository search would match well>"],
  "keywords": ["<8-15 lowercase related terms for ranking results afterward, covering synonyms and sub-domains>"],
  "skillLevel": "<beginner|intermediate|advanced|null>",
  "summary": "<a short, friendly one-sentence restatement of what they're looking for>"
}

Guidance:
- "searchQueries" should be things a real person might actually search on GitHub itself. Combine the core intent with relevant tech, e.g. for "React Tailwind Portfolio": ["react tailwind portfolio", "developer portfolio react", "portfolio website tailwind"].
- For a broad topic like "Web Development", include both the general term and well-known project types built with it: ["web development", "ecommerce website", "learning management system", "blog platform", "admin dashboard"].
- For "AI" or "Machine Learning": ["machine learning chatbot", "computer vision", "nlp project", "recommendation system", "deep learning"].
- For a specific named project idea like "Campus Management System" or "Hospital Management System", use the exact phrase as the first query, plus close variants: ["campus management system", "college management system", "student management system"].
- "keywords" is a wider, looser list used only for scoring/ranking afterward — not sent to GitHub directly.
- Only set "language" if a specific programming language is explicitly named.`;

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