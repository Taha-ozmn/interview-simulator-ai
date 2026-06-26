import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../src/components/Card';
import { ScreenBackground } from '../src/components/ScreenBackground';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { FIELDS } from '../src/constants/fields';
import { t } from '../src/constants/i18n';
import { colors, spacing, typography, borderRadius } from '../src/constants/theme';
import { getHistory } from '../src/services/storage';
import { getScoreColor, useInterviewStore } from '../src/store/interviewStore';
import { InterviewSession } from '../src/types';

export default function HistoryScreen() {
  const router = useRouter();
  const { settings } = useInterviewStore();
  const lang = settings.language;
  const [history, setHistory] = useState<InterviewSession[]>([]);

  useFocusEffect(
    useCallback(() => {
      getHistory().then(setHistory);
    }, []),
  );

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={t('history', lang)} onBack={() => router.back()} />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {history.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <MaterialCommunityIcons name="history" size={48} color={colors.textMuted} />
              </View>
              <Text style={styles.emptyTitle}>{t('noHistory', lang)}</Text>
              <Text style={styles.emptyHint}>
                {lang === 'tr'
                  ? 'İlk mülakatını tamamladığında burada görünecek'
                  : 'Your completed interviews will appear here'}
              </Text>
            </View>
          ) : (
            history.map((session) => {
              const fieldInfo = FIELDS.find((f) => f.id === session.field);
              const date = new Date(session.completedAt);
              const scoreColor = getScoreColor(session.averageScore);

              return (
                <Card key={session.id} variant="glass" style={styles.sessionCard}>
                  <View style={styles.sessionHeader}>
                    <View
                      style={[
                        styles.fieldIcon,
                        { backgroundColor: `${fieldInfo?.color ?? colors.primary}20` },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={
                          (fieldInfo?.icon ??
                            'briefcase') as keyof typeof MaterialCommunityIcons.glyphMap
                        }
                        size={20}
                        color={fieldInfo?.color ?? colors.primary}
                      />
                    </View>
                    <View style={styles.sessionInfo}>
                      <Text style={styles.sessionField}>
                        {fieldInfo?.name[lang] ?? session.field}
                      </Text>
                      <Text style={styles.sessionDate}>
                        {date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                    <View style={[styles.scoreCircle, { borderColor: scoreColor, backgroundColor: `${scoreColor}15` }]}>
                      <Text style={[styles.scoreText, { color: scoreColor }]}>
                        {session.averageScore}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.sessionMeta}>
                    <MetaChip
                      icon="help-circle-outline"
                      text={`${session.answers.length} ${t('question', lang).toLowerCase()}`}
                    />
                    <MetaChip icon="signal" text={session.difficulty} />
                  </View>
                </Card>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

function MetaChip({
  icon,
  text,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.metaChip}>
      <MaterialCommunityIcons name={icon} size={12} color={colors.textMuted} />
      <Text style={styles.metaText}>{text}</Text>
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
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyHint: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  sessionCard: {
    marginBottom: spacing.sm,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  fieldIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionField: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  sessionDate: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 3,
    fontWeight: '500',
    letterSpacing: 0,
  },
  scoreCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    ...typography.body,
    fontWeight: '800',
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceSolid,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  metaText: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'capitalize',
    fontWeight: '600',
    letterSpacing: 0,
  },
});
