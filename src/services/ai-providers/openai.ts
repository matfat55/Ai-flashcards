import OpenAI from 'openai';

export async function generateWithOpenAI(apiKey: string, topic: string) {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create({
    messages: [{ 
      role: "user", 
      content: `Create 10 flashcards about "${topic}". Format as JSON array with objects containing "question" and "answer" properties.` 
    }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error('No content received from OpenAI');

  return JSON.parse(content);
}