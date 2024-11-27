import React from 'react';
import { Brain, Bot, Stars } from 'lucide-react';
import type { AIProvider } from '../types';

interface ProviderSelectProps {
  provider: AIProvider;
  onChange: (provider: AIProvider) => void;
}

export function ProviderSelect({ provider, onChange }: ProviderSelectProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <button
        onClick={() => onChange('openai')}
        className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors
          ${provider === 'openai' 
            ? 'border-indigo-600 bg-indigo-50' 
            : 'border-gray-200 hover:border-indigo-300'}`}
      >
        <Brain className="w-6 h-6 text-indigo-600" />
        <span className="font-medium">OpenAI</span>
      </button>
      
      <button
        onClick={() => onChange('claude')}
        className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors
          ${provider === 'claude' 
            ? 'border-indigo-600 bg-indigo-50' 
            : 'border-gray-200 hover:border-indigo-300'}`}
      >
        <Bot className="w-6 h-6 text-indigo-600" />
        <span className="font-medium">Claude</span>
      </button>
      
      <button
        onClick={() => onChange('gemini')}
        className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors
          ${provider === 'gemini' 
            ? 'border-indigo-600 bg-indigo-50' 
            : 'border-gray-200 hover:border-indigo-300'}`}
      >
        <Stars className="w-6 h-6 text-indigo-600" />
        <span className="font-medium">Gemini</span>
      </button>
    </div>
  );
}