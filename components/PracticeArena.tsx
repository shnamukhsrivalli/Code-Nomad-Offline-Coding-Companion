import React, { useState } from 'react';
import { PRACTICE_QUIZ } from '../constants';
import { CheckCircle, XCircle, BrainCircuit } from 'lucide-react';

const PracticeArena: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = PRACTICE_QUIZ[currentIndex];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedOption === question.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < PRACTICE_QUIZ.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // End of quiz
      alert(`Quiz complete! Score: ${score + (selectedOption === question.correctIndex ? 0 : 0)} / ${PRACTICE_QUIZ.length}`);
      // Reset
      setCurrentIndex(0);
      setSelectedOption(null);
      setShowResult(false);
      setScore(0);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className="w-full mb-8 flex justify-between items-center text-slate-400 text-sm font-mono">
        <span>Question {currentIndex + 1} / {PRACTICE_QUIZ.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <BrainCircuit className="text-brand-500" size={24} />
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            {question.language}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-8">
            {question.question.split('`').map((part, i) => 
                i % 2 === 1 
                ? <code key={i} className="bg-slate-800 px-1 rounded text-brand-400 font-mono text-lg">{part}</code>
                : part
            )}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let itemClass = "w-full p-4 rounded-xl border text-left transition-all ";
            
            if (showResult) {
               if (idx === question.correctIndex) {
                 itemClass += "bg-emerald-900/40 border-emerald-500 text-emerald-100";
               } else if (idx === selectedOption) {
                 itemClass += "bg-rose-900/40 border-rose-500 text-rose-100";
               } else {
                 itemClass += "bg-slate-800/50 border-slate-700 text-slate-400 opacity-50";
               }
            } else {
              if (selectedOption === idx) {
                itemClass += "bg-brand-900/30 border-brand-500 text-white";
              } else {
                itemClass += "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={itemClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && idx === question.correctIndex && <CheckCircle size={20} className="text-emerald-500"/>}
                  {showResult && idx === selectedOption && idx !== question.correctIndex && <XCircle size={20} className="text-rose-500"/>}
                </div>
              </button>
            )
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 text-sm">
            <span className="font-bold text-slate-100 block mb-1">Explanation:</span>
            {question.explanation}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-6 py-2 rounded-lg font-bold transition-all
                ${selectedOption !== null 
                  ? 'bg-brand-600 hover:bg-brand-500 text-white' 
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-slate-100 hover:bg-white text-slate-900 font-bold rounded-lg transition-colors"
            >
              {currentIndex === PRACTICE_QUIZ.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeArena;
