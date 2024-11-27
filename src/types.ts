export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface FlashcardDeck {
  topic: string;
  cards: Flashcard[];
}

export type AIProvider = 'openai' | 'claude' | 'gemini';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
}