import { Language } from '../types';

type TranslationKey =
  | 'appName'
  | 'tagline'
  | 'selectField'
  | 'selectDifficulty'
  | 'selectMode'
  | 'startInterview'
  | 'history'
  | 'settings'
  | 'question'
  | 'of'
  | 'yourAnswer'
  | 'submitAnswer'
  | 'nextQuestion'
  | 'finishInterview'
  | 'listening'
  | 'tapToSpeak'
  | 'speakQuestion'
  | 'results'
  | 'overallScore'
  | 'strengths'
  | 'improvements'
  | 'feedback'
  | 'tryAgain'
  | 'backHome'
  | 'noHistory'
  | 'language'
  | 'questionCount'
  | 'voiceSettings'
  | 'autoReadQuestions'
  | 'apiKey'
  | 'apiKeyHint'
  | 'save'
  | 'saved'
  | 'modeText'
  | 'modeVoice'
  | 'modeHybrid'
  | 'interviewComplete'
  | 'avgScore'
  | 'duration'
  | 'keywordCoverage'
  | 'permissionRequired'
  | 'micPermission'
  | 'emptyAnswer'
  | 'evaluating'
  | 'openSource'
  | 'voiceUnavailable'
  | 'voiceUnavailableHint';

const translations: Record<Language, Record<TranslationKey, string>> = {
  tr: {
    appName: 'Interview Simulator AI',
    tagline: 'Yapay zeka destekli mülakat pratiği',
    selectField: 'Alan Seçin',
    selectDifficulty: 'Seviye Seçin',
    selectMode: 'Mod Seçin',
    startInterview: 'Mülakata Başla',
    history: 'Geçmiş',
    settings: 'Ayarlar',
    question: 'Soru',
    of: '/',
    yourAnswer: 'Cevabınız',
    submitAnswer: 'Cevabı Gönder',
    nextQuestion: 'Sonraki Soru',
    finishInterview: 'Mülakatı Bitir',
    listening: 'Dinleniyor...',
    tapToSpeak: 'Konuşmak için dokunun',
    speakQuestion: 'Soruyu Oku',
    results: 'Sonuçlar',
    overallScore: 'Genel Puan',
    strengths: 'Güçlü Yönler',
    improvements: 'Gelişim Alanları',
    feedback: 'Geri Bildirim',
    tryAgain: 'Tekrar Dene',
    backHome: 'Ana Sayfa',
    noHistory: 'Henüz mülakat geçmişi yok',
    language: 'Dil',
    questionCount: 'Soru Sayısı',
    voiceSettings: 'Ses Ayarları',
    autoReadQuestions: 'Soruları Otomatik Oku',
    apiKey: 'OpenAI API Anahtarı (Opsiyonel)',
    apiKeyHint: 'AI destekli detaylı değerlendirme için',
    save: 'Kaydet',
    saved: 'Kaydedildi',
    modeText: 'Yazılı',
    modeVoice: 'Sesli',
    modeHybrid: 'Hibrit',
    interviewComplete: 'Mülakat Tamamlandı',
    avgScore: 'Ortalama Puan',
    duration: 'Süre',
    keywordCoverage: 'Anahtar Kelime Kapsamı',
    permissionRequired: 'İzin Gerekli',
    micPermission: 'Sesli mod için mikrofon izni gereklidir',
    emptyAnswer: 'Lütfen bir cevap girin',
    evaluating: 'Değerlendiriliyor...',
    openSource: 'Açık Kaynak',
    voiceUnavailable: 'Sesli mod bu ortamda kullanılamıyor',
    voiceUnavailableHint: 'Expo Go ile yazılı mod kullanın. Sesli mod için development build gerekir.',
  },
  en: {
    appName: 'Interview Simulator AI',
    tagline: 'AI-powered interview practice',
    selectField: 'Select Field',
    selectDifficulty: 'Select Level',
    selectMode: 'Select Mode',
    startInterview: 'Start Interview',
    history: 'History',
    settings: 'Settings',
    question: 'Question',
    of: 'of',
    yourAnswer: 'Your Answer',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question',
    finishInterview: 'Finish Interview',
    listening: 'Listening...',
    tapToSpeak: 'Tap to speak',
    speakQuestion: 'Read Question',
    results: 'Results',
    overallScore: 'Overall Score',
    strengths: 'Strengths',
    improvements: 'Areas to Improve',
    feedback: 'Feedback',
    tryAgain: 'Try Again',
    backHome: 'Back Home',
    noHistory: 'No interview history yet',
    language: 'Language',
    questionCount: 'Question Count',
    voiceSettings: 'Voice Settings',
    autoReadQuestions: 'Auto-read Questions',
    apiKey: 'OpenAI API Key (Optional)',
    apiKeyHint: 'For AI-powered detailed evaluation',
    save: 'Save',
    saved: 'Saved',
    modeText: 'Text',
    modeVoice: 'Voice',
    modeHybrid: 'Hybrid',
    interviewComplete: 'Interview Complete',
    avgScore: 'Average Score',
    duration: 'Duration',
    keywordCoverage: 'Keyword Coverage',
    permissionRequired: 'Permission Required',
    micPermission: 'Microphone permission required for voice mode',
    emptyAnswer: 'Please enter an answer',
    evaluating: 'Evaluating...',
    openSource: 'Open Source',
    voiceUnavailable: 'Voice mode is unavailable in this environment',
    voiceUnavailableHint: 'Use text mode in Expo Go. Voice mode requires a development build.',
  },
};

export function t(key: TranslationKey, lang: Language): string {
  return translations[lang][key];
}
