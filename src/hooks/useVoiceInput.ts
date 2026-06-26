import { useCallback, useEffect, useState } from 'react';
import { Language } from '../types';
import {
  isSpeechRecognitionAvailable,
  requestSpeechPermissions,
  startListening,
  stopListening,
  subscribeSpeechRecognitionEvents,
} from '../services/speechRecognition';

export function useVoiceInput(lang: Language) {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isAvailable] = useState(() => isSpeechRecognitionAvailable());

  useEffect(() => {
    if (!isAvailable) return undefined;

    return subscribeSpeechRecognitionEvents({
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      onResult: (text) => {
        setTranscript((prev) => (prev ? `${prev} ${text}` : text));
      },
      onError: () => setIsListening(false),
    });
  }, [isAvailable]);

  const checkPermission = useCallback(async () => {
    if (!isAvailable) {
      setHasPermission(false);
      return false;
    }
    const granted = await requestSpeechPermissions();
    setHasPermission(granted);
    return granted;
  }, [isAvailable]);

  useEffect(() => {
    if (isAvailable) {
      checkPermission();
    }
  }, [isAvailable, checkPermission]);

  const toggleListening = useCallback(async () => {
    if (!isAvailable) return false;

    if (isListening) {
      await stopListening();
      return true;
    }

    const granted = hasPermission ?? (await checkPermission());
    if (!granted) return false;

    setTranscript('');
    return startListening(lang);
  }, [isAvailable, isListening, hasPermission, checkPermission, lang]);

  const clearTranscript = useCallback(() => setTranscript(''), []);

  return {
    transcript,
    isListening,
    hasPermission,
    isAvailable,
    toggleListening,
    clearTranscript,
    setTranscript,
  };
}
