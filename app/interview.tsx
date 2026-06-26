import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { ProgressBar } from '../src/components/ProgressBar';
import { VoiceButton } from '../src/components/VoiceButton';
import { ScoreRing } from '../src/components/ScoreRing';
import { ScreenBackground } from '../src/components/ScreenBackground';
import { t } from '../src/constants/i18n';
import { colors, spacing, typography, borderRadius } from '../src/constants/theme';
import { useVoiceInput } from '../src/hooks/useVoiceInput';
import { speakText, stopSpeaking } from '../src/services/speech';
import { useInterviewStore } from '../src/store/interviewStore';
import { AnswerEvaluation, InterviewMode } from '../src/types';

export default function InterviewScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const interviewMode = (mode as InterviewMode) || 'hybrid';

  const {
    settings,
    questions,
    currentIndex,
    isEvaluating,
    submitAnswer,
    nextQuestion,
    finishInterview,
    field,
  } = useInterviewStore();

  const lang = settings.language;
  const question = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;

  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastEvaluation, setLastEvaluation] = useState<AnswerEvaluation | null>(null);

  const { transcript, isListening, isAvailable, toggleListening } = useVoiceInput(lang);

  const showVoice = interviewMode === 'voice' || interviewMode === 'hybrid';
  const showText =
    interviewMode === 'text' ||
    interviewMode === 'hybrid' ||
    (interviewMode === 'voice' && !isAvailable);
  const voiceEnabled = showVoice && isAvailable;

  useEffect(() => {
    if (transcript && voiceEnabled) {
      setAnswer(transcript);
    }
  }, [transcript, voiceEnabled]);

  useEffect(() => {
    if (!question) return;
    setAnswer('');
    setShowFeedback(false);
    setLastEvaluation(null);

    if (settings.autoReadQuestions) {
      speakText(question.text[lang], lang);
    }

    return () => stopSpeaking();
  }, [question, lang, settings.autoReadQuestions]);

  useEffect(() => {
    if (!field || questions.length === 0) {
      router.replace('/');
    }
  }, [field, questions, router]);

  const handleSubmit = useCallback(async () => {
    if (!answer.trim()) {
      Alert.alert(t('emptyAnswer', lang));
      return;
    }

    if (isListening) {
      await toggleListening();
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const evaluation = await submitAnswer(answer);
    if (evaluation) {
      setLastEvaluation(evaluation);
      setShowFeedback(true);
      Haptics.notificationAsync(
        evaluation.score >= 60
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Warning,
      );
    }
  }, [answer, isListening, toggleListening, submitAnswer, lang]);

  const handleNext = useCallback(async () => {
    if (isLastQuestion) {
      const session = await finishInterview();
      if (session) {
        router.replace({
          pathname: '/results',
          params: { sessionId: session.id },
        });
      }
    } else {
      nextQuestion();
    }
  }, [isLastQuestion, finishInterview, nextQuestion, router]);

  if (!question) return null;

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topBar}>
          <Button
            title=""
            onPress={() => router.back()}
            variant="secondary"
            size="sm"
            icon={<MaterialCommunityIcons name="arrow-left" size={20} color={colors.text} />}
          />
          <View style={styles.progressPill}>
            <Text style={styles.progressText}>
              {currentIndex + 1} / {questions.length}
            </Text>
          </View>
          <Button
            title=""
            onPress={() => speakText(question.text[lang], lang)}
            variant="secondary"
            size="sm"
            icon={<MaterialCommunityIcons name="volume-high" size={18} color={colors.primaryLight} />}
          />
        </View>

        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Card variant="glass" style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <View style={styles.questionBadge}>
                <Text style={styles.questionBadgeText}>{question.type}</Text>
              </View>
              <MaterialCommunityIcons name="comment-question-outline" size={20} color={colors.textMuted} />
            </View>
            <Text style={styles.questionText}>{question.text[lang]}</Text>
          </Card>

          {showFeedback && lastEvaluation ? (
            <View style={styles.feedbackSection}>
              <ScoreRing score={lastEvaluation.score} label={t('overallScore', lang)} />
              <Card style={styles.feedbackCard}>
                <Text style={styles.feedbackText}>{lastEvaluation.feedback}</Text>
                <View style={styles.feedbackLists}>
                  <View style={styles.feedbackList}>
                    <Text style={styles.feedbackListTitle}>
                      <MaterialCommunityIcons name="thumb-up" size={14} color={colors.success} />{' '}
                      {t('strengths', lang)}
                    </Text>
                    {lastEvaluation.strengths.map((s, i) => (
                      <Text key={i} style={styles.feedbackItem}>• {s}</Text>
                    ))}
                  </View>
                  <View style={styles.feedbackList}>
                    <Text style={styles.feedbackListTitle}>
                      <MaterialCommunityIcons name="lightbulb-outline" size={14} color={colors.warning} />{' '}
                      {t('improvements', lang)}
                    </Text>
                    {lastEvaluation.improvements.map((s, i) => (
                      <Text key={i} style={styles.feedbackItem}>• {s}</Text>
                    ))}
                  </View>
                </View>
              </Card>
              <Button
                title={isLastQuestion ? t('finishInterview', lang) : t('nextQuestion', lang)}
                onPress={handleNext}
                size="lg"
                icon={
                  <MaterialCommunityIcons
                    name={isLastQuestion ? 'flag-checkered' : 'arrow-right'}
                    size={20}
                    color={colors.text}
                  />
                }
              />
            </View>
          ) : (
            <View style={styles.answerSection}>
              {showText && (
                <TextInput
                  style={styles.textInput}
                  placeholder={t('yourAnswer', lang)}
                  placeholderTextColor={colors.textMuted}
                  value={answer}
                  onChangeText={setAnswer}
                  multiline
                  textAlignVertical="top"
                />
              )}

              {showVoice && !isAvailable && (
                <Card style={styles.voiceUnavailableCard}>
                  <MaterialCommunityIcons name="microphone-off" size={20} color={colors.warning} />
                  <View style={styles.voiceUnavailableText}>
                    <Text style={styles.voiceUnavailableTitle}>
                      {t('voiceUnavailable', lang)}
                    </Text>
                    <Text style={styles.voiceUnavailableHint}>
                      {t('voiceUnavailableHint', lang)}
                    </Text>
                  </View>
                </Card>
              )}

              {voiceEnabled && (
                <View style={styles.voiceSection}>
                  <VoiceButton
                    isListening={isListening}
                    onPress={toggleListening}
                    disabled={isEvaluating}
                  />
                  <Text style={styles.voiceHint}>
                    {isListening ? t('listening', lang) : t('tapToSpeak', lang)}
                  </Text>
                </View>
              )}

              <Button
                title={isEvaluating ? t('evaluating', lang) : t('submitAnswer', lang)}
                onPress={handleSubmit}
                loading={isEvaluating}
                disabled={!answer.trim()}
                size="lg"
                style={styles.submitButton}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  progressPill: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  questionCard: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  questionBadge: {
    backgroundColor: `${colors.primary}22`,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  questionBadgeText: {
    ...typography.caption,
    color: colors.primaryLight,
    textTransform: 'capitalize',
  },
  questionText: {
    ...typography.h3,
    color: colors.text,
    lineHeight: 32,
    fontSize: 19,
  },
  answerSection: {
    gap: spacing.lg,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    minHeight: 160,
    color: colors.text,
    ...typography.body,
    lineHeight: 26,
  },
  voiceSection: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  voiceHint: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  voiceUnavailableCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: `${colors.warning}15`,
    borderColor: `${colors.warning}40`,
  },
  voiceUnavailableText: {
    flex: 1,
    gap: 4,
  },
  voiceUnavailableTitle: {
    ...typography.bodySmall,
    color: colors.warning,
    fontWeight: '600',
  },
  voiceUnavailableHint: {
    ...typography.caption,
    color: colors.textMuted,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  feedbackSection: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  feedbackCard: {
    width: '100%',
  },
  feedbackText: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.md,
  },
  feedbackLists: {
    gap: spacing.md,
  },
  feedbackList: {
    gap: 4,
  },
  feedbackListTitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  feedbackItem: {
    ...typography.bodySmall,
    color: colors.textMuted,
    paddingLeft: 4,
  },
});
