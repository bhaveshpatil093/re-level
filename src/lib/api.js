/**
 * Centralized API configuration for Re-Level.
 * Handles LLM interaction via the Featherless AI wrapper.
 */
import { callFeatherlessModel } from './featherless';

// We use the robust Llama-3 model available on Featherless
const DEFAULT_MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';

/**
 * Core function to translate and re-level text.
 * 
 * @param {string} text - The original text passage.
 * @param {string} targetLanguage - The target language (e.g., "Spanish").
 * @param {number|string} gradeLevel - The target reading level grade (3-12).
 * @returns {Promise<string>} The generated clean text.
 */
export async function relevelText(text, targetLanguage, gradeLevel) {
  const systemPrompt = `You are an expert bilingual teacher. Translate the following text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. Preserve all facts and meaning. Do not add information that isn't in the original. Keep sentences short. Explain any necessary technical terms in simple language. Return ONLY the clean translated and simplified text. Do not include markdown formatting or conversational filler.`;

  return await callFeatherlessModel(DEFAULT_MODEL, systemPrompt, text, {
    temperature: 0.7,
    max_tokens: 800
  });
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
  const historyText = previousExplanations.map((exp, i) => `Previous Explanation ${i + 1}:\n${exp}`).join("\n\n");

  const systemPrompt = `You are an expert bilingual teacher. The student did not fully understand the previous explanations. 
Translate the original text into ${targetLanguage}, and rewrite it so a ${gradeLevel} reading-level student can fully understand it. 
CRITICAL RULES:
1. You MUST use a completely NEW analogy, framing, or structure that was NOT used in any of the previous explanations. Do not just reword the previous explanations.
2. Preserve all facts and meaning from the original text.
3. Keep sentences short. Explain technical terms simply.
4. Return ONLY the clean text, no markdown formatting, conversational filler, or introductory phrases.`;

  const userPrompt = `Original Text:\n${text}\n\n${historyText ? `--- Previously Given Explanations (DO NOT USE THESE ANALOGIES) ---\n${historyText}` : ""}`;

  return await callFeatherlessModel(DEFAULT_MODEL, systemPrompt, userPrompt, {
    temperature: 0.8,
    max_tokens: 800
  });
}
