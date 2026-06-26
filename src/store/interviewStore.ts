import { create } from 'zustand';
import {
  AppSettings,
  Difficulty,
  InterviewAnswer,
  InterviewField,
  InterviewMode,
  InterviewSession,
  Language,
  Question,
} from '../types';
import { getQuestionsForInterview } from '../data/questions';
import { evaluateAnswer } from '../services/evaluation';
import { getApiKey, getSettings, saveSession, saveSettings } from '../services/storage';

interface InterviewState {
  settings: AppSettings;
  isLoaded: boolean;

  field: InterviewField | null;
  difficulty: Difficulty;
  questions: Question[];
  currentIndex: number;
  answers: InterviewAnswer[];
  isEvaluating: boolean;
  sessionStartTime: number;
  questionStartTime: number;

  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  startInterview: (field: InterviewField, difficulty: Difficulty) => void;
  submitAnswer: (answer: string) => Promise<AnswerEvaluation | null>;
  nextQuestion: () => boolean;
  finishInterview: () => Promise<InterviewSession | null>;
  resetInterview: () => void;
}

type AnswerEvaluation = InterviewAnswer['evaluation'];

export const useInterviewStore = create<InterviewState>((set, get) => ({
  settings: {
    language: 'tr',
    mode: 'text',
    questionCount: 5,
    voiceEnabled: true,
    autoReadQuestions: true,
  },
  isLoaded: false,
  field: null,
  difficulty: 'mid',
  questions: [],
  currentIndex: 0,
  answers: [],
  isEvaluating: false,
  sessionStartTime: 0,
  questionStartTime: 0,

  loadSettings: async () => {
    const settings = await getSettings();
    const apiKey = await getApiKey();
    set({ settings: { ...settings, openAiApiKey: apiKey }, isLoaded: true });
  },

  updateSettings: async (partial) => {
    const current = get().settings;
    const updated = { ...current, ...partial };
    await saveSettings(updated);
    set({ settings: updated });
  },

  startInterview: (field, difficulty) => {
    const { settings } = get();
    const questions = getQuestionsForInterview(
      field,
      difficulty,
      settings.questionCount,
    );
    const now = Date.now();
    set({
      field,
      difficulty,
      questions,
      currentIndex: 0,
      answers: [],
      isEvaluating: false,
      sessionStartTime: now,
      questionStartTime: now,
    });
  },

  submitAnswer: async (answer) => {
    const { questions, currentIndex, settings, questionStartTime } = get();
    const question = questions[currentIndex];
    if (!question || !answer.trim()) return null;

    set({ isEvaluating: true });
    const apiKey = settings.openAiApiKey ?? (await getApiKey());
    const evaluation = await evaluateAnswer(
      question,
      answer,
      settings.language,
      apiKey,
    );
    const durationSeconds = Math.round((Date.now() - questionStartTime) / 1000);

    const interviewAnswer: InterviewAnswer = {
      questionId: question.id,
      questionText: question.text[settings.language],
      answer,
      evaluation,
      durationSeconds,
    };

    set((state) => ({
      answers: [...state.answers, interviewAnswer],
      isEvaluating: false,
    }));

    return evaluation;
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex + 1 >= questions.length) return false;
    set({
      currentIndex: currentIndex + 1,
      questionStartTime: Date.now(),
    });
    return true;
  },

  finishInterview: async () => {
    const { field, difficulty, settings, answers, sessionStartTime } = get();
    if (!field || answers.length === 0) return null;

    const averageScore = Math.round(
      answers.reduce((sum, a) => sum + a.evaluation.score, 0) / answers.length,
    );

    const session: InterviewSession = {
      id: Date.now().toString(),
      field,
      difficulty,
      mode: settings.mode,
      language: settings.language,
      startedAt: new Date(sessionStartTime).toISOString(),
      completedAt: new Date().toISOString(),
      answers,
      averageScore,
    };

    await saveSession(session);
    return session;
  },

  resetInterview: () => {
    set({
      field: null,
      questions: [],
      currentIndex: 0,
      answers: [],
      isEvaluating: false,
      sessionStartTime: 0,
      questionStartTime: 0,
    });
  },
}));

export function getScoreColor(score: number): string {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#6366F1';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
}

export function getScoreLabel(score: number, lang: Language): string {
  if (score >= 80) return lang === 'tr' ? 'Mükemmel' : 'Excellent';
  if (score >= 60) return lang === 'tr' ? 'İyi' : 'Good';
  if (score >= 40) return lang === 'tr' ? 'Orta' : 'Average';
  return lang === 'tr' ? 'Geliştirilmeli' : 'Needs Work';
}
