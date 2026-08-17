/**
 * Centralized API configuration for Re-Level.
 * Handles LLM interaction (e.g., Featherless AI, OpenAI) and keeps the provider swappable.
 */

// We use Vite's import.meta.env to access environment variables.
const API_KEY = import.meta.env.VITE_LLM_API_KEY;
// Default to Featherless AI base URL if not explicitly provided
const BASE_URL = import.meta.env.VITE_LLM_BASE_URL || 'https://api.featherless.ai/v1';

/**
 * Main function to request a re-leveled explanation from the LLM.
 * 
 * @param {string} originalText - The text to be re-leveled.
 * @param {string} language - The target language (e.g., "Spanish").
 * @param {number} gradeLevel - The target reading level grade (3-12).
 * @param {string} mode - "relevel" or "explain_differently"
 * @returns {Promise<string>} The generated text.
 */
export async function generateRelevel(originalText, language, gradeLevel, mode = "relevel") {
  if (!API_KEY) {
    throw new Error("API Key is not configured. Please check your .env file.");
  }

  // Define prompts based on mode
  let systemPrompt = `You are an expert reading intervention specialist.`;
  let userPrompt = `Re-level this text to a Grade ${gradeLevel} reading level and translate it to ${language}.\n\nText: ${originalText}`;

  if (mode === "explain_differently") {
    userPrompt = `Please explain the following text in a completely different way, using a new analogy. Target a Grade ${gradeLevel} reading level in ${language}.\n\nText: ${originalText}`;
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
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in generateRelevel:", error);
    throw error;
  }
}
