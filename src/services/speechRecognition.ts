import Constants from 'expo-constants';
import { Language } from '../types';

const SPEECH_LANG_MAP: Record<Language, string> = {
  tr: 'tr-TR',
  en: 'en-US',
};

type SpeechRecognitionNativeModule = {
  requestPermissionsAsync: () => Promise<{ granted: boolean }>;
  start: (options: {
    lang: string;
    interimResults?: boolean;
    continuous?: boolean;
  }) => Promise<void>;
  stop: () => Promise<void>;
  addListener: (
    eventName: string,
    listener: (event: { results?: { transcript?: string }[] }) => void,
  ) => { remove: () => void };
};

type SpeechRecognitionPackage = {
  ExpoSpeechRecognitionModule: SpeechRecognitionNativeModule;
};

let cachedModule: SpeechRecognitionNativeModule | null | undefined;

function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo';
}

function loadNativeModule(): SpeechRecognitionNativeModule | null {
  if (cachedModule !== undefined) {
    return cachedModule;
  }

  if (isExpoGo()) {
    cachedModule = null;
    return null;
  }

  try {
    const pkg = require('expo-speech-recognition') as SpeechRecognitionPackage;
    cachedModule = pkg.ExpoSpeechRecognitionModule;
  } catch {
    cachedModule = null;
  }

  return cachedModule;
}

export function isSpeechRecognitionAvailable(): boolean {
  if (isExpoGo()) return false;
  return loadNativeModule() !== null;
}

export async function requestSpeechPermissions(): Promise<boolean> {
  const module = loadNativeModule();
  if (!module) return false;
  const result = await module.requestPermissionsAsync();
  return result.granted;
}

export async function startListening(lang: Language): Promise<boolean> {
  const module = loadNativeModule();
  if (!module) return false;

  await module.start({
    lang: SPEECH_LANG_MAP[lang],
    interimResults: true,
    continuous: true,
  });
  return true;
}

export async function stopListening(): Promise<void> {
  const module = loadNativeModule();
  if (!module) return;
  await module.stop();
}

export function subscribeSpeechRecognitionEvents(handlers: {
  onStart?: () => void;
  onEnd?: () => void;
  onResult?: (transcript: string) => void;
  onError?: () => void;
}): () => void {
  const module = loadNativeModule();
  if (!module) return () => undefined;

  const subscriptions = [
    handlers.onStart
      ? module.addListener('start', handlers.onStart)
      : null,
    handlers.onEnd ? module.addListener('end', handlers.onEnd) : null,
    handlers.onResult
      ? module.addListener('result', (event) => {
          const text = event.results?.[0]?.transcript ?? '';
          if (text) handlers.onResult?.(text);
        })
      : null,
    handlers.onError
      ? module.addListener('error', handlers.onError)
      : null,
  ].filter(Boolean) as { remove: () => void }[];

  return () => {
    subscriptions.forEach((subscription) => subscription.remove());
  };
}
