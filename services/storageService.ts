import { CodeSnippet } from '../types';

const STORAGE_KEYS = {
  SNIPPETS: 'codenomad_snippets',
  THEME: 'codenomad_theme',
};

export const storageService = {
  // Snippets
  saveSnippet: (snippet: CodeSnippet): void => {
    const snippets = storageService.getSnippets();
    // Check if exists update, else add
    const index = snippets.findIndex(s => s.id === snippet.id);
    if (index >= 0) {
      snippets[index] = snippet;
    } else {
      snippets.push(snippet);
    }
    localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets));
  },

  getSnippets: (): CodeSnippet[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SNIPPETS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load snippets", e);
      return [];
    }
  },

  deleteSnippet: (id: string): void => {
    const snippets = storageService.getSnippets();
    const filtered = snippets.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(filtered));
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'dark';
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};
