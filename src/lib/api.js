/**
 * Centralized API configuration for Re-Level.
 * Handles LLM interaction via the Featherless AI wrapper.
 */
import { callFeatherlessModel } from './featherless';

// We use the robust Llama-3 model available on Featherless for the initial generation
const DEFAULT_MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';

// Curated list of open models to cycle through for "Explain it a different way"
const REEXPLAIN_MODELS = [
  'mistralai/Mistral-7B-Instruct-v0.2',            // Smaller, faster model
  'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO',   // Known for creative analogies and strong instruction following
  'microsoft/Phi-3-mini-4k-instruct',              // Fast, highly logical
  'meta-llama/Meta-Llama-3-8B-Instruct'            // General strong model
];

/**
 * Core function to translate and re-level text.
 * 
 * @param {string} text - The original text passage.
 * @param {string} targetLanguage - The target language (e.g., "Spanish").
 * @param {number|string} gradeLevel - The target reading level grade (3-12).
 * @param {Function} [onFallback] - Optional callback fired if a model fallback occurs.
 * @returns {Promise<{text: string, model: string}>} The generated clean text and model used.
 */
export async function relevelText(text, targetLanguage, gradeLevel, onFallback) {
  const systemPrompt = `You are an expert bilingual teacher. Translate the following text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. Preserve all facts and meaning. Do not add information that isn't in the original. Keep sentences short. Explain any necessary technical terms in simple language. Return ONLY the clean translated and simplified text. Do not include markdown formatting or conversational filler.`;

  const { content: responseText, modelUsed } = await callFeatherlessModel(DEFAULT_MODEL, systemPrompt, text, {
    temperature: 0.7,
    max_tokens: 800,
    onFallback
  });
  
  return { text: responseText, model: modelUsed };
}

/**
 * Function to generate a completely new explanation, avoiding previous analogies.
 * 
 * @param {string} text - The original text passage.
 * @param {string} targetLanguage - The target language.
 * @param {number|string} gradeLevel - The target reading level grade (3-12).
 * @param {Array<{text: string, model: string}>} previousExplanations - Array of previously generated explanations to avoid.
 * @param {number} attemptCount - The number of times the user has requested a new explanation.
 * @param {Function} [onFallback] - Optional callback fired if a model fallback occurs.
 * @returns {Promise<{text: string, model: string}>} The generated clean text and model used.
 */
export async function reexplainText(text, targetLanguage, gradeLevel, previousExplanations = [], attemptCount = 0, onFallback) {
  const historyText = previousExplanations.map((exp, i) => {
    const content = typeof exp === 'string' ? exp : exp.text;
    return `Previous Explanation ${i + 1}:\n${content}`;
  }).join("\n\n");

  const systemPrompt = `You are an expert bilingual teacher. The student did not fully understand the previous explanations. 
Translate the original text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. 
CRITICAL RULES:
1. You MUST use a completely NEW analogy, framing, or structure that was NOT used in any of the previous explanations. Do not just reword the previous explanations.
2. Preserve all facts and meaning from the original text.
3. Keep sentences short. Explain technical terms simply.
4. Return ONLY the clean text, no markdown formatting, conversational filler, or introductory phrases.`;

  const userPrompt = `Original Text:\n${text}\n\n${historyText ? `--- Previously Given Explanations (DO NOT USE THESE ANALOGIES) ---\n${historyText}` : ""}`;

  const modelToUse = REEXPLAIN_MODELS[attemptCount % REEXPLAIN_MODELS.length];

  const { content: responseText, modelUsed } = await callFeatherlessModel(modelToUse, systemPrompt, userPrompt, {
    temperature: 0.8,
    max_tokens: 800,
    onFallback
  });
  
  return { text: responseText, model: modelUsed };
}

/**
 * Generate 2 quick reading comprehension questions based on the text.
 * 
 * @param {string} text - The original text passage.
 * @returns {Promise<Array>} Array of question objects.
 */
export async function generateDiagnosticQuestions(text) {
  const systemPrompt = `You are an expert reading comprehension teacher. Based on the provided text, generate exactly 2 short multiple-choice questions to test the student's understanding. 
Output ONLY a valid JSON array of objects. Do not include markdown formatting or conversational filler.
Format:
[
  {
    "question": "What is the main idea of the text?",
    "options": ["A", "B", "C"],
    "correctIndex": 0
  }
]`;

  const { content: responseText } = await callFeatherlessModel('mistralai/Mistral-7B-Instruct-v0.2', systemPrompt, text, {
    temperature: 0.3,
    max_tokens: 300
  });

  try {
    let cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Failed to parse diagnostic questions JSON:", error);
    console.log("Raw output was:", responseText);
    throw new Error("Failed to generate valid diagnostic questions.");
  }
}
