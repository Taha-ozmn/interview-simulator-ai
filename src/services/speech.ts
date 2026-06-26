import * as Speech from 'expo-speech';
import { Language } from '../types';

const SPEECH_LANG_MAP: Record<Language, string> = {
  tr: 'tr-TR',
  en: 'en-US',
};

export function speakText(text: string, lang: Language): void {
  Speech.stop();
  Speech.speak(text, {
    language: SPEECH_LANG_MAP[lang],
    rate: 0.95,
    pitch: 1.0,
  });
}

export function stopSpeaking(): void {
  Speech.stop();
}
