import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Code, Copy, Check } from 'lucide-react';
import { storageService } from '../services/storageService';
import { CodeSnippet } from '../types';

const SnippetVault: React.FC = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('python');

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = () => {
    setSnippets(storageService.getSnippets().sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleSave = () => {
    if (!title || !code) return;
    const newSnippet: CodeSnippet = {
      id: Date.now().toString(),
      title,
      code,
      language: lang as any,
      tags: [],
      createdAt: Date.now()
    };
    storageService.saveSnippet(newSnippet);
    loadSnippets();
    resetForm();
  };

  const handleDelete = (id: string) => {
    storageService.deleteSnippet(id);
    loadSnippets();
  };

  const resetForm = () => {
    setTitle('');
    setCode('');
    setIsFormOpen(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-950">
      {/* Sidebar List */}
      <div className={`w-full md:w-1/3 border-r border-slate-800 flex flex-col h-full ${isFormOpen ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-100">Snippet Vault</h2>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="p-2 bg-brand-600 hover:bg-brand-500 rounded-lg text-white transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {snippets.length === 0 ? (
            <div className="text-center text-slate-500 mt-10 p-4">
              <Code className="mx-auto mb-2 opacity-50" size={32} />
              <p>No snippets yet.</p>
              <p className="text-sm">Save offline code blocks here.</p>
            </div>
          ) : (
            snippets.map(snippet => (
              <div key={snippet.id} className="p-3 bg-slate-900 rounded border border-slate-800 group relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-200 truncate pr-6">{snippet.title}</h3>
                  <button 
                    onClick={() => handleDelete(snippet.id)}
                    className="text-slate-600 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded uppercase font-mono">
                    {snippet.language}
                  </span>
                  <span className="text-xs text-slate-600">
                    {new Date(snippet.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(snippet.code, snippet.id)}
                  className="absolute top-10 right-3 text-slate-500 hover:text-brand-400"
                >
                  {copiedId === snippet.id ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <div className="mt-2 bg-slate-950 p-2 rounded text-xs font-mono text-slate-400 overflow-hidden h-16 relative">
                  {snippet.code}
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-950 to-transparent"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editor/Form */}
      <div className={`w-full md:w-2/3 h-full p-6 flex-col ${!isFormOpen ? 'hidden md:flex justify-center items-center text-slate-500' : 'flex'}`}>
        {!isFormOpen ? (
          <>
            <div className="md:block hidden">
              <Code size={64} className="opacity-20 mb-4 mx-auto" />
              <p>Select "Plus" to add a new offline snippet.</p>
            </div>
            {/* Mobile placeholder when no form */}
             <div className="md:hidden text-center mt-20">
               <p>Tap + to create snippet</p>
             </div>
          </>
        ) : (
          <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-100">New Snippet</h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-200">Cancel</button>
            </div>
            
            <div className="space-y-4 flex-1 flex flex-col">
              <input
                type="text"
                placeholder="Snippet Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 p-3 rounded border border-slate-700 focus:border-brand-500 focus:outline-none"
              />
              
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 p-3 rounded border border-slate-700 focus:border-brand-500 focus:outline-none"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="other">Other</option>
              </select>

              <textarea
                placeholder="Paste code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full bg-slate-900 text-slate-100 p-4 font-mono text-sm rounded border border-slate-700 focus:border-brand-500 focus:outline-none resize-none"
              ></textarea>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded shadow-lg"
              >
                Save Snippet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnippetVault;
