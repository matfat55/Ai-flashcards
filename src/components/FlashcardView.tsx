import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { Flashcard } from '../types';

interface FlashcardViewProps {
  cards: Flashcard[];
  topic: string;
  onGenerateMore?: () => Promise<void>;
  isGeneratingMore?: boolean;
}

export function FlashcardView({ cards, topic, onGenerateMore, isGeneratingMore }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  if (!cards.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {topic}
        </h2>
        {onGenerateMore && (
          <button
            onClick={onGenerateMore}
            disabled={isGeneratingMore}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Generate More
          </button>
        )}
      </div>
      
      <div className="relative h-[400px] w-full perspective-1000">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '')}
            className="absolute inset-0 cursor-pointer preserve-3d"
            onClick={() => setIsFlipped(!isFlipped)}
            animate={isFlipped ? 'back' : 'front'}
            variants={variants}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-lg p-8 flex items-center justify-center backface-hidden">
              <p className="text-xl text-center font-medium text-gray-700">
                {cards[currentIndex].question}
              </p>
            </div>
            <div className="absolute inset-0 w-full h-full bg-indigo-50 rounded-xl shadow-lg p-8 flex items-center justify-center backface-hidden"
                 style={{ transform: 'rotateY(180deg)' }}>
              <p className="text-xl text-center font-medium text-gray-700">
                {cards[currentIndex].answer}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        <span className="text-gray-600">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}