import React from 'react';
import { INTERVIEW_TOPICS } from '../constants';
import { Briefcase } from 'lucide-react';

const InterviewPrep: React.FC = () => {
  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="text-brand-500" />
            Interview Preparation
          </h2>
          <p className="text-slate-400 mt-2">
            Offline access to common algorithms, system design concepts, and behavioral questions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {INTERVIEW_TOPICS.map((topic) => (
            <div key={topic.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 block">
                {topic.category}
              </span>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{topic.title}</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm">
                {topic.content}
              </p>
            </div>
          ))}
          
          {/* Static placeholders to fill the UI for demo purposes */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 opacity-60">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                DSA
              </span>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Binary Search Tree</h3>
              <p className="text-slate-300 text-sm">
                Unlock more content by connecting to the internet once to sync the full library.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
