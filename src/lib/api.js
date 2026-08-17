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
 * @returns {Promise<string>} The generated clean text.
 */
export async function relevelText(text, targetLanguage, gradeLevel) {
  if (!API_KEY) {
    throw new Error("API Key is not configured. Please check your .env file.");
  }

  // Carefully engineered system prompt requested by the spec
  const systemPrompt = `You are an expert bilingual teacher. Translate the following text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. Preserve all facts and meaning. Do not add information that isn't in the original. Keep sentences short. Explain any necessary technical terms in simple language. Return ONLY the clean translated and simplified text. Do not include markdown formatting or conversational filler.`;

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

/**
 * Function to generate a completely new explanation, avoiding previous analogies.
 * 
 * @param {string} text - The original text passage.
 * @param {string} targetLanguage - The target language.
 * @param {number|string} gradeLevel - The target reading level grade (3-12).
 * @param {string[]} previousExplanations - Array of previously generated explanations to avoid.
 * @returns {Promise<string>} The generated clean text.
 */
export async function reexplainText(text, targetLanguage, gradeLevel, previousExplanations = []) {
  if (!API_KEY) {
    throw new Error("API Key is not configured. Please check your .env file.");
  }

  const historyText = previousExplanations.map((exp, i) => `Previous Explanation ${i + 1}:\n${exp}`).join("\n\n");

  const systemPrompt = `You are an expert bilingual teacher. The student did not fully understand the previous explanations. 
Translate the original text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. 
CRITICAL RULES:
1. You MUST use a completely NEW analogy, framing, or structure that was NOT used in any of the previous explanations. Do not just reword the previous explanations.
2. Preserve all facts and meaning from the original text.
3. Keep sentences short. Explain technical terms simply.
4. Return ONLY the clean text, no markdown formatting, conversational filler, or introductory phrases.`;

  const userPrompt = `Original Text:\n${text}\n\n${historyText ? `--- Previously Given Explanations (DO NOT USE THESE ANALOGIES) ---\n${historyText}` : ""}`;

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'featherless-model',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8, // Slightly higher temp for more creative analogies
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in reexplainText:", error);
    throw error;
  }
}
