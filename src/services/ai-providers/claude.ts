import Anthropic from '@anthropic-ai/sdk';

export async function generateWithClaude(apiKey: string, topic: string) {
  const anthropic = new Anthropic({ apiKey });

  const message = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Create 10 flashcards about "${topic}". Format as JSON array with objects containing "question" and "answer" properties.`
    }]
  });

  const content = message.content[0].text;
  if (!content) throw new Error('No content received from Claude');

  return JSON.parse(content);
}