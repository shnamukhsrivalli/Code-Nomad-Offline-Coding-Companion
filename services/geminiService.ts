import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY; 
  if (!apiKey) {
    console.warn("API Key not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const geminiService = {
  explainError: async (errorMessage: string): Promise<string | null> => {
    const ai = getClient();
    if (!ai) return null;

    try {
      const prompt = `
      You are a senior developer assistant.
      Explain the following programming error concisely.
      1. What does it mean?
      2. Why did it happen?
      3. Provide a code example of how to fix it.
      
      Error Message:
      ${errorMessage}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Could not generate explanation.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return null;
    }
  },

  askQuestion: async (context: string, question: string): Promise<string | null> => {
    const ai = getClient();
    if (!ai) return null;

    try {
      const prompt = `
      Context: ${context}
      
      User Question: ${question}
      
      Answer briefly and accurately for a developer audience.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Could not generate answer.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return null;
    }
  }
};
