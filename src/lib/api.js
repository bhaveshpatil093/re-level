/**
 * Centralized API configuration for Re-Level.
 * Handles LLM interaction (e.g., Featherless AI, OpenAI) and keeps the provider swappable.
 */

// We use Vite's import.meta.env to access environment variables.
const API_KEY = import.meta.env.VITE_LLM_API_KEY;
// Default to Featherless AI base URL if not explicitly provided
const BASE_URL = import.meta.env.VITE_LLM_BASE_URL || 'https://api.featherless.ai/v1';

/**
 * Core function to translate and re-level text.
 * 
 * @param {string} text - The original text passage.
 * @param {string} targetLanguage - The target language (e.g., "Spanish").
 * @param {number|string} gradeLevel - The target reading level grade (3-12).
 * @param {string} mode - "relevel" or "explain_differently"
 * @returns {Promise<string>} The generated clean text.
 */
export async function relevelText(text, targetLanguage, gradeLevel, mode = "relevel") {
  if (!API_KEY) {
    throw new Error("API Key is not configured. Please check your .env file.");
  }

  // Carefully engineered system prompt requested by the spec
  let systemPrompt = `You are an expert bilingual teacher. Translate the following text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. Preserve all facts and meaning. Do not add information that isn't in the original. Keep sentences short. Explain any necessary technical terms in simple language. Return ONLY the clean translated and simplified text. Do not include markdown formatting or conversational filler.`;
  
  if (mode === "explain_differently") {
    systemPrompt = `You are an expert bilingual teacher. The student needs a different explanation. Translate the following text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. You MUST use a completely NEW analogy or framing that wasn't used previously. Preserve all facts. Keep sentences short. Return ONLY the clean text, no markdown formatting.`;
  }

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'featherless-model', // Swappable model name
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in relevelText:", error);
    throw error;
  }
}
