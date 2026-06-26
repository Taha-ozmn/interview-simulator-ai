export type InterviewField =
  | 'software'
  | 'frontend'
  | 'backend'
  | 'data-science'
  | 'devops'
  | 'product'
  | 'design'
  | 'marketing'
  | 'finance'
  | 'hr'
  | 'general';

export type Difficulty = 'junior' | 'mid' | 'senior';

export type InterviewMode = 'text' | 'voice' | 'hybrid';

export type Language = 'tr' | 'en';

export type QuestionType = 'technical' | 'behavioral' | 'situational' | 'general';

export interface Question {
  id: string;
  field: InterviewField;
  difficulty: Difficulty;
  type: QuestionType;
  text: { tr: string; en: string };
  keywords: { tr: string[]; en: string[] };
  tips: { tr: string; en: string };
}

export interface AnswerEvaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
  keywordCoverage: number;
}

export interface InterviewAnswer {
  questionId: string;
  questionText: string;
  answer: string;
  evaluation: AnswerEvaluation;
  durationSeconds: number;
}

export interface InterviewSession {
  id: string;
  field: InterviewField;
  difficulty: Difficulty;
  mode: InterviewMode;
  language: Language;
  startedAt: string;
  completedAt: string;
  answers: InterviewAnswer[];
  averageScore: number;
}

export interface AppSettings {
  language: Language;
  mode: InterviewMode;
  questionCount: number;
  voiceEnabled: boolean;
  autoReadQuestions: boolean;
  openAiApiKey?: string;
}

export interface FieldInfo {
  id: InterviewField;
  icon: string;
  color: string;
  name: { tr: string; en: string };
  description: { tr: string; en: string };
}
