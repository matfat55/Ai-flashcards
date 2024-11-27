import { generateWithOpenAI } from './ai-providers/openai';
import { generateWithClaude } from './ai-providers/claude';
import { generateWithGemini } from './ai-providers/gemini';
import type { AIProvider, FlashcardDeck } from '../types';

export async function generateFlashcards(provider: AIProvider, apiKey: string, topic: string): Promise<FlashcardDeck> {
  let cards;
  
  switch (provider) {
    case 'openai':
      cards = await generateWithOpenAI(apiKey, topic);
      break;
    case 'claude':
      cards = await generateWithClaude(apiKey, topic);
      break;
    case 'gemini':
      cards = await generateWithGemini(apiKey, topic);
      break;
    default:
      throw new Error('Invalid AI provider');
  }

  return {
    topic,
    cards: cards.map((card: any, index: number) => ({
      id: `${index}`,
      question: card.question,
      answer: card.answer,
    })),
  };
}