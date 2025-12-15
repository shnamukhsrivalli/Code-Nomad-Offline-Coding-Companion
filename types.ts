// Domain Models

export interface DocItem {
  id: string;
  language: 'python' | 'javascript' | 'c' | 'cpp' | 'java';
  title: string;
  category: string;
  content: string; // Markdown-like content
  keywords: string[];
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: 'python' | 'javascript' | 'html' | 'css' | 'c' | 'cpp' | 'java' | 'other';
  code: string;
  tags: string[];
  createdAt: number;
}

export interface QuizQuestion {
  id: string;
  language: 'python' | 'javascript' | 'c' | 'cpp' | 'java';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ErrorRule {
  pattern: RegExp;
  title: string;
  explanation: string;
  fix: string;
}

export interface InterviewTopic {
  id: string;
  title: string;
  category: 'DSA' | 'Behavioral' | 'System Design';
  content: string;
}

export type ViewState = 'dashboard' | 'docs' | 'error-solver' | 'snippets' | 'practice' | 'interview';

export interface AppState {
  currentView: ViewState;
  isOnline: boolean;
  theme: 'dark' | 'light';
}
