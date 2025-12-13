import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '@/types';

const MODEL_NAME = 'gemini-2.5-flash';

export async function getPaperInsightsServer({
  abstract,
  question,
  history = [],
}: {
  abstract: string;
  question: string;
  history?: ChatMessage[];
}): Promise<string> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    console.error('Missing GOOGLE_GENAI_API_KEY');
    return 'Server is not configured with an API key. Please set GOOGLE_GENAI_API_KEY.';
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const context = `You are an expert academic research assistant.\nYou are helping a user understand a scientific paper based on its abstract.\n\nAbstract: "${abstract}"\n\nAnswer the user's question concisely and accurately based ONLY on the abstract provided.\nIf the answer is not in the abstract, state that clearly.\nKeep the tone professional but accessible.`;

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: context,
      },
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const response = await chat.sendMessage({ message: question });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Sorry, I encountered an error while analyzing the paper.';
  }
}
