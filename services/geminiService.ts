import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export const getPaperInsights = async (
  abstract: string,
  userQuestion: string,
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure process.env.API_KEY.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the prompt context
    const context = `You are an expert academic research assistant. 
    You are helping a user understand a scientific paper based on its abstract.
    
    Abstract: "${abstract}"
    
    Answer the user's question concisely and accurately based ONLY on the abstract provided. 
    If the answer is not in the abstract, state that clearly.
    Keep the tone professional but accessible.`;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: context,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message: userQuestion });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while analyzing the paper.";
  }
};
