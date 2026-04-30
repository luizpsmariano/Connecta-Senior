import { GoogleGenerativeAI } from "@google/generative-ai";

// Cache for insights to avoid redundant API calls
const insightsCache: Record<string, string> = {};

export async function getActivitySmartInsight(activityTitle: string, activityDescription: string): Promise<string> {
  const cacheKey = `${activityTitle}-${activityDescription}`;
  if (insightsCache[cacheKey]) return insightsCache[cacheKey];

  if (!process.env.GEMINI_API_KEY) {
    return "Participe para se conectar com amigos e manter sua saúde em dia!";
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Você é um assistente atencioso para idosos. 
    Dada a atividade "${activityTitle}" com descrição "${activityDescription}", 
    crie uma frase curta (máximo 15 palavras) e motivadora explicando por que um idoso se beneficiaria de participar. 
    Seja carinhoso e use uma linguagem fácil.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    insightsCache[cacheKey] = text;
    return text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Uma ótima oportunidade para fazer novas amizades e aprender coisas interessantes!";
  }
}
