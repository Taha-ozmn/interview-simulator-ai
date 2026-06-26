import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { ScoreRing } from '../src/components/ScoreRing';
import { ScreenBackground } from '../src/components/ScreenBackground';
import { FIELDS } from '../src/constants/fields';
import { t } from '../src/constants/i18n';
import { colors, spacing, typography, borderRadius } from '../src/constants/theme';
import { getHistory } from '../src/services/storage';
import { getScoreColor, getScoreLabel, useInterviewStore } from '../src/store/interviewStore';
import { InterviewSession } from '../src/types';

export default function ResultsScreen() {
  const router = useRouter();
  const { settings, resetInterview } = useInterviewStore();
  const lang = settings.language;
  const [session, setSession] = useState<InterviewSession | null>(null);

  useEffect(() => {
    (async () => {
      const history = await getHistory();
      if (history.length > 0) {
        setSession(history[0]);
      }
    })();
  }, []);

  const fieldInfo = session ? FIELDS.find((f) => f.id === session.field) : null;
  const totalDuration = session
    ? session.answers.reduce((sum, a) => sum + a.durationSeconds, 0)
    : 0;

  const handleHome = () => {
    resetInterview();
    router.replace('/');
  };

  if (!session) return null;

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={[`${colors.warning}25`, 'transparent']}
            style={styles.celebrationBanner}
          >
            <View style={styles.trophyWrap}>
              <MaterialCommunityIcons name="trophy" size={36} color={colors.warning} />
            </View>
            <Text style={styles.title}>{t('interviewComplete', lang)}</Text>
            {fieldInfo && (
              <Text style={styles.subtitle}>{fieldInfo.name[lang]}</Text>
            )}
          </LinearGradient>

          <ScoreRing
            score={session.averageScore}
            size={150}
            label={`${t('avgScore', lang)} — ${getScoreLabel(session.averageScore, lang)}`}
          />

          <View style={styles.statsRow}>
            <StatItem
              icon="help-circle-outline"
              value={String(session.answers.length)}
              label={t('question', lang)}
            />
            <View style={styles.statDivider} />
            <StatItem
              icon="clock-outline"
              value={`${Math.floor(totalDuration / 60)}:${String(totalDuration % 60).padStart(2, '0')}`}
              label={t('duration', lang)}
            />
          </View>

          <Text style={styles.sectionTitle}>{t('results', lang)}</Text>
          {session.answers.map((answer, index) => (
            <Card key={answer.questionId} variant="glass" style={styles.answerCard}>
              <View style={styles.answerHeader}>
                <View style={styles.answerNumberWrap}>
                  <Text style={styles.answerNumber}>Q{index + 1}</Text>
                </View>
                <View
                  style={[
                    styles.scoreBadge,
                    { backgroundColor: `${getScoreColor(answer.evaluation.score)}20` },
                  ]}
                >
                  <Text
                    style={[styles.scoreBadgeText, { color: getScoreColor(answer.evaluation.score) }]}
                  >
                    {answer.evaluation.score}%
                  </Text>
                </View>
              </View>
              <Text style={styles.answerQuestion} numberOfLines={2}>
                {answer.questionText}
              </Text>
              <Text style={styles.answerFeedback} numberOfLines={2}>
                {answer.evaluation.feedback}
              </Text>
            </Card>
          ))}

          <View style={styles.actions}>
            <Button
              title={t('tryAgain', lang)}
              onPress={handleHome}
              variant="outline"
              size="lg"
              style={styles.actionButton}
            />
            <Button
              title={t('backHome', lang)}
              onPress={handleHome}
              size="lg"
              style={styles.actionButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  celebrationBanner: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  trophyWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${colors.warning}18`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    width: '100%',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    ...typography.h2,
    color: colors.text,
    fontSize: 22,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0,
  },
  statDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  answerCard: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  answerNumberWrap: {
    backgroundColor: colors.surfaceSolid,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  answerNumber: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  scoreBadgeText: {
    ...typography.caption,
    fontWeight: '800',
    letterSpacing: 0,
  },
  answerQuestion: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 22,
  },
  answerFeedback: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 18,
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  actionButton: {
    width: '100%',
  },
});
