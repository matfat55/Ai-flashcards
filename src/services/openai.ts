import OpenAI from 'openai';

export async function generateFlashcards(apiKey: string, topic: string) {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const prompt = `Create 10 flashcards about "${topic}". 
    Format as JSON array with objects containing "question" and "answer" properties.
    Keep questions concise and answers comprehensive but clear.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content received from OpenAI');

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
}