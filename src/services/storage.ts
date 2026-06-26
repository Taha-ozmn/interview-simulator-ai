import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { AppSettings, InterviewSession } from '../types';

const HISTORY_KEY = '@interview_history';
const SETTINGS_KEY = '@interview_settings';
const API_KEY_STORE = 'openai_api_key';

const DEFAULT_SETTINGS: AppSettings = {
  language: 'tr',
  mode: 'text',
  questionCount: 5,
  voiceEnabled: true,
  autoReadQuestions: true,
};

export async function getSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {
    // fall through
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const { openAiApiKey, ...rest } = settings;
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(rest));
  if (openAiApiKey) {
    await SecureStore.setItemAsync(API_KEY_STORE, openAiApiKey);
  } else {
    await SecureStore.deleteItemAsync(API_KEY_STORE);
  }
}

export async function getApiKey(): Promise<string | undefined> {
  try {
    const key = await SecureStore.getItemAsync(API_KEY_STORE);
    return key ?? undefined;
  } catch {
    return undefined;
  }
}

export async function getHistory(): Promise<InterviewSession[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fall through
  }
  return [];
}

export async function saveSession(session: InterviewSession): Promise<void> {
  const history = await getHistory();
  history.unshift(session);
  const trimmed = history.slice(0, 50);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(HISTORY_KEY);
}
