/**
 * Featherless AI API Wrapper
 * Implements an OpenAI-compatible interface with timeout and rate limit handling.
 */

const API_KEY = import.meta.env.VITE_FEATHERLESS_API_KEY;
const BASE_URL = 'https://api.featherless.ai/v1';

export class FeatherlessAPIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'FeatherlessAPIError';
    this.status = status;
    this.code = code;
  }
}

/**
 * Calls a model from the Featherless AI catalog.
 * 
 * @param {string} modelName - The model identifier (e.g., 'meta-llama/Meta-Llama-3-8B-Instruct')
 * @param {string} systemPrompt - The system instructions
 * @param {string} userPrompt - The user's input
 * @param {Object} options - Optional configuration (temperature, max_tokens, timeoutMs, onFallback)
 * @returns {Promise<{content: string, modelUsed: string}>} The generated completion text and the model that served it
 */
export async function callFeatherlessModel(modelName, systemPrompt, userPrompt, options = {}) {
  if (!API_KEY) {
    throw new Error("Featherless API Key is missing. Please add VITE_FEATHERLESS_API_KEY to your .env file.");
  }

  const {
    temperature = 0.7,
    max_tokens = 800,
    timeoutMs = 8000, // Reduced to 8 seconds for faster fallback
    onFallback
  } = options;

  const attemptFetch = async (targetModel) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature,
          max_tokens,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          throw new FeatherlessAPIError("Rate limit exceeded.", response.status, 'RATE_LIMIT');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new FeatherlessAPIError(
          errorData.error?.message || `API Error: ${response.statusText}`, 
          response.status, 
          errorData.error?.code || 'UNKNOWN'
        );
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new FeatherlessAPIError("The request timed out.", 408, 'TIMEOUT');
      }
      throw error;
    }
  };

  try {
    // Attempt primary model
    const content = await attemptFetch(modelName);
    return { content, modelUsed: modelName };
  } catch (error) {
    console.warn(`Primary model ${modelName} failed. Initiating fallback chain. Error:`, error);
    
    const BACKUP_MODEL = modelName.includes('Mistral') 
      ? 'meta-llama/Meta-Llama-3-8B-Instruct' 
      : 'mistralai/Mistral-7B-Instruct-v0.2';
      
    if (onFallback) {
      onFallback(BACKUP_MODEL);
    }
    
    try {
      // Attempt backup model
      const fallbackContent = await attemptFetch(BACKUP_MODEL);
      return { content: fallbackContent, modelUsed: BACKUP_MODEL };
    } catch (fallbackError) {
      console.error("Backup model also failed:", fallbackError);
      throw fallbackError;
    }
  }
}
