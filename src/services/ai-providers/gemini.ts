import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateWithGemini(apiKey: string, topic: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const result = await model.generateContent(
    `Create 10 flashcards about "${topic}". Format as JSON array with objects containing "question" and "answer" properties.`
  );
  const response = await result.response;
  const content = response.text();
  
  if (!content) throw new Error('No content received from Gemini');

  return JSON.parse(content);
}