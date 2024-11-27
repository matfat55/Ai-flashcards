import React, { useState } from 'react';
import { Brain, Loader2, PlayCircle } from 'lucide-react';
import { FlashcardView } from './components/FlashcardView';
import { ProviderSelect } from './components/ProviderSelect';
import { generateFlashcards } from './services/flashcard-generator';
import { demoFlashcards } from './data/demo-flashcards';
import type { FlashcardDeck, AIProvider } from './types';

function App() {
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [apiKey, setApiKey] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardDeck | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const deck = await generateFlashcards(provider, apiKey, topic);
      setFlashcards(deck);
    } catch (err) {
      setError('Failed to generate flashcards. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMore = async () => {
    if (!flashcards || !apiKey) return;
    
    setIsGeneratingMore(true);
    setError(null);

    try {
      const newDeck = await generateFlashcards(provider, apiKey, flashcards.topic);
      
      // Combine existing and new cards, removing duplicates
      const existingQuestions = new Set(flashcards.cards.map(card => card.question.toLowerCase()));
      const uniqueNewCards = newDeck.cards.filter(card => !existingQuestions.has(card.question.toLowerCase()));
      
      setFlashcards({
        ...flashcards,
        cards: [
          ...flashcards.cards,
          ...uniqueNewCards.map((card, index) => ({
            ...card,
            id: `new-${index}-${Date.now()}`, // Ensure unique IDs
          })),
        ],
      });
    } catch (err) {
      setError('Failed to generate additional flashcards. Please try again.');
    } finally {
      setIsGeneratingMore(false);
    }
  };

  const handleDemo = () => {
    setFlashcards(demoFlashcards);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Flashcard Creator</h1>
          </div>
          <p className="text-gray-600 text-center max-w-xl mb-6">
            Generate custom flashcards for any topic using AI. Choose your preferred AI provider, enter your API key, and start learning!
          </p>
          <button
            onClick={handleDemo}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            Try it out
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
          <ProviderSelect provider={provider} onChange={setProvider} />
          
          <div className="mb-6">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              {provider.charAt(0).toUpperCase() + provider.slice(1)} API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your API key..."
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., Ancient Rome, Quantum Physics, JavaScript Basics"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Flashcards'
            )}
          </button>

          {error && (
            <p className="mt-4 text-red-600 text-sm text-center">
              {error}
            </p>
          )}
        </form>

        {flashcards && (
          <FlashcardView 
            cards={flashcards.cards} 
            topic={flashcards.topic}
            onGenerateMore={handleGenerateMore}
            isGeneratingMore={isGeneratingMore}
          />
        )}
      </div>
    </div>
  );
}

export default App;