import React, { useState } from 'react';
import { AlertCircle, Zap, WifiOff, CheckCircle2 } from 'lucide-react';
import { OFFLINE_ERROR_RULES } from '../constants';
import { geminiService } from '../services/geminiService';

interface ErrorExplainerProps {
  isOnline: boolean;
}

const ErrorExplainer: React.FC<ErrorExplainerProps> = ({ isOnline }) => {
  const [inputError, setInputError] = useState('');
  const [result, setResult] = useState<{ title: string; explanation: string; fix: string, source: 'offline' | 'ai' } | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeError = async () => {
    if (!inputError.trim()) return;
    setLoading(true);
    setResult(null);

    // 1. Try Offline Rules First (Fastest)
    const offlineMatch = OFFLINE_ERROR_RULES.find(rule => rule.pattern.test(inputError));

    if (offlineMatch) {
      setResult({
        title: offlineMatch.title,
        explanation: offlineMatch.explanation,
        fix: offlineMatch.fix,
        source: 'offline'
      });
      setLoading(false);
      return;
    }

    // 2. If no offline match and Online, use Gemini
    if (isOnline) {
      const aiResponse = await geminiService.explainError(inputError);
      if (aiResponse) {
        setResult({
          title: "AI Analysis",
          explanation: aiResponse, // This will be raw text, simple render
          fix: "See explanation above.",
          source: 'ai'
        });
        setLoading(false);
        return;
      }
    }

    // 3. Fallback
    setResult({
      title: "Unknown Error",
      explanation: "This error pattern isn't in our offline database yet, and we couldn't reach the AI service.",
      fix: "Try checking your syntax or connectivity.",
      source: 'offline'
    });
    setLoading(false);
  };

  return (
    <div className="h-full p-6 max-w-4xl mx-auto flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <AlertCircle className="text-rose-500" />
          Error Explainer
        </h2>
        <p className="text-slate-400 mt-2">
          Paste your stack trace or error message below. We'll analyze it using {isOnline ? "hybrid AI & local rules" : "local pattern matching"}.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="relative">
          <textarea
            className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 font-mono text-sm focus:outline-none focus:border-brand-500 resize-none"
            placeholder="e.g., IndexError: list index out of range"
            value={inputError}
            onChange={(e) => setInputError(e.target.value)}
          />
          <div className="absolute bottom-4 right-4">
            <button
              onClick={analyzeError}
              disabled={loading || !inputError}
              className={`px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-all
                ${loading || !inputError 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/20'}`}
            >
              {loading ? 'Analyzing...' : (
                <>
                  <Zap size={18} /> Analyze Fix
                </>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-fade-in">
            <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-slate-100 text-lg">{result.title}</h3>
              <div className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${result.source === 'ai' ? 'bg-purple-900/30 text-purple-400' : 'bg-emerald-900/30 text-emerald-400'}`}>
                {result.source === 'ai' ? <Zap size={12}/> : <WifiOff size={12} />}
                {result.source === 'ai' ? 'AI Generated' : 'Offline Rule'}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Explanation</h4>
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">{result.explanation}</div>
              </div>
              {result.source === 'offline' && (
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <h4 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Suggested Fix
                  </h4>
                  <p className="text-slate-300 font-mono text-sm">{result.fix}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorExplainer;
