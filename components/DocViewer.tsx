import React, { useState, useMemo } from 'react';
import { OFFLINE_DOCS } from '../constants';
import { Search, Hash } from 'lucide-react';
import { DocItem } from '../types';

const DocViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

  const filteredDocs = useMemo(() => {
    if (!searchTerm) return OFFLINE_DOCS;
    const lower = searchTerm.toLowerCase();
    return OFFLINE_DOCS.filter(doc => 
      doc.title.toLowerCase().includes(lower) ||
      doc.keywords.some(k => k.toLowerCase().includes(lower))
    );
  }, [searchTerm]);

  const getLangBadgeStyle = (lang: string) => {
    switch (lang) {
      case 'python': return 'bg-yellow-900/30 text-yellow-500';
      case 'javascript': return 'bg-yellow-400/20 text-yellow-300'; // JS often yellow too, or can be blue
      case 'c': return 'bg-slate-700 text-slate-300';
      case 'cpp': return 'bg-blue-900/40 text-blue-400';
      case 'java': return 'bg-orange-900/30 text-orange-400';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-950">
      {/* Search & List */}
      <div className={`${selectedDoc ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 border-r border-slate-800 h-full`}>
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 mb-4">Documentation</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search docs (e.g. vector, pointer)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredDocs.map(doc => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`p-4 border-b border-slate-900 cursor-pointer hover:bg-slate-900 transition-colors
                ${selectedDoc?.id === doc.id ? 'bg-slate-900 border-l-4 border-l-brand-500' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-200">{doc.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${getLangBadgeStyle(doc.language)}`}>
                  {doc.language}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">{doc.category}</p>
            </div>
          ))}
          {filteredDocs.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No documentation found.
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`${!selectedDoc ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-2/3 h-full bg-slate-950`}>
        {selectedDoc ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 md:bg-transparent">
              <button 
                onClick={() => setSelectedDoc(null)}
                className="md:hidden text-slate-400 hover:text-white mr-4"
              >
                &larr; Back
              </button>
              <span className="font-mono text-sm text-brand-500">#{selectedDoc.id}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              <div className="prose prose-invert max-w-none">
                 <pre className="whitespace-pre-wrap font-sans text-slate-300">
                   {/* Simulating Markdown rendering by manually parsing just for bold and code blocks in a simple way for the demo */}
                   {selectedDoc.content.split('```').map((part, i) => {
                     if (i % 2 === 1) {
                       // Code block
                       return (
                         <div key={i} className="my-4 bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-sm text-emerald-400 overflow-x-auto">
                           {part.trim()}
                         </div>
                       )
                     }
                     return <span key={i}>{part}</span>
                   })}
                 </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
            <Hash size={48} className="mb-4 opacity-50" />
            <p>Select a topic to view documentation offline.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocViewer;
