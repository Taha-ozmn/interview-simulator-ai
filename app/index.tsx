import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { FieldCard } from '../src/components/FieldCard';
import { Button } from '../src/components/Button';
import { ScreenBackground } from '../src/components/ScreenBackground';
import { SectionHeader } from '../src/components/SectionHeader';
import { FIELDS, DIFFICULTY_LABELS } from '../src/constants/fields';
import { t } from '../src/constants/i18n';
import { colors, spacing, typography, borderRadius, shadows } from '../src/constants/theme';
import { useInterviewStore } from '../src/store/interviewStore';
import { Difficulty, InterviewField, InterviewMode, FieldInfo } from '../src/types';

export default function HomeScreen() {
  const router = useRouter();
  const { settings, isLoaded, loadSettings, startInterview } = useInterviewStore();
  const lang = settings.language;

  const [selectedField, setSelectedField] = useState<InterviewField | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mid');
  const [selectedMode, setSelectedMode] = useState<InterviewMode>(settings.mode);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleStart = () => {
    if (!selectedField) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    startInterview(selectedField, selectedDifficulty);
    router.push({
      pathname: '/interview',
      params: { mode: selectedMode },
    });
  };

  const difficulties: Difficulty[] = ['junior', 'mid', 'senior'];
  const modes: { id: InterviewMode; icon: string; label: string }[] = [
    { id: 'text', icon: 'keyboard-outline', label: t('modeText', lang) },
    { id: 'voice', icon: 'microphone-outline', label: t('modeVoice', lang) },
    { id: 'hybrid', icon: 'headphones', label: t('modeHybrid', lang) },
  ];

  if (!isLoaded) return null;

  const fieldRows: FieldInfo[][] = [];
  for (let i = 0; i < FIELDS.length; i += 2) {
    fieldRows.push(FIELDS.slice(i, i + 2));
  }

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.logoBadge}>
                <MaterialCommunityIcons name="brain" size={22} color={colors.primaryLight} />
              </View>
              <View>
                <Text style={styles.appName}>{t('appName', lang)}</Text>
                <Text style={styles.tagline}>{t('tagline', lang)}</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => router.push('/history')}
                style={styles.iconButton}
              >
                <MaterialCommunityIcons name="history" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/settings')}
                style={styles.iconButton}
              >
                <MaterialCommunityIcons name="cog-outline" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          <LinearGradient
            colors={[`${colors.primary}30`, `${colors.accent}15`, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <Text style={styles.heroLabel}>AI INTERVIEW COACH</Text>
            <Text style={styles.heroTitle}>
              {lang === 'tr' ? 'Bir sonraki mülakatına hazır ol' : 'Get ready for your next interview'}
            </Text>
            <View style={styles.heroStats}>
              <HeroStat icon="briefcase-outline" value="11" label={lang === 'tr' ? 'Alan' : 'Fields'} />
              <View style={styles.heroDivider} />
              <HeroStat icon="chart-timeline-variant" value="30+" label={lang === 'tr' ? 'Soru' : 'Questions'} />
              <View style={styles.heroDivider} />
              <HeroStat icon="star-four-points" value="AI" label={lang === 'tr' ? 'Puanlama' : 'Scoring'} />
            </View>
          </LinearGradient>

          <SectionHeader title={t('selectField', lang)} />

          <View style={styles.fieldGrid}>
            {fieldRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.fieldRow}>
                {row.map((field) => (
                  <FieldCard
                    key={field.id}
                    field={field}
                    selected={selectedField === field.id}
                    language={lang}
                    compact
                    onPress={() => {
                      Haptics.selectionAsync();
                      setSelectedField(field.id);
                    }}
                  />
                ))}
                {row.length === 1 && <View style={styles.fieldSpacer} />}
              </View>
            ))}
          </View>

          <SectionHeader title={t('selectDifficulty', lang)} />
          <View style={styles.chipRow}>
            {difficulties.map((d) => (
              <TouchableOpacity
                key={d}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedDifficulty(d);
                }}
                style={[styles.chip, selectedDifficulty === d && styles.chipSelected]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedDifficulty === d && styles.chipTextSelected,
                  ]}
                >
                  {DIFFICULTY_LABELS[d][lang]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <SectionHeader title={t('selectMode', lang)} />
          <View style={styles.modeRow}>
            {modes.map((m) => (
              <TouchableOpacity
                key={m.id}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedMode(m.id);
                }}
                style={[styles.modeCard, selectedMode === m.id && styles.modeCardSelected]}
              >
                <View style={[styles.modeIconWrap, selectedMode === m.id && styles.modeIconWrapActive]}>
                  <MaterialCommunityIcons
                    name={m.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                    size={22}
                    color={selectedMode === m.id ? colors.primaryLight : colors.textMuted}
                  />
                </View>
                <Text
                  style={[
                    styles.modeLabel,
                    selectedMode === m.id && styles.modeLabelSelected,
                  ]}
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title={t('startInterview', lang)}
            onPress={handleStart}
            disabled={!selectedField}
            size="lg"
            style={styles.startButton}
            icon={
              <MaterialCommunityIcons name="play" size={20} color={colors.text} />
            }
          />

          <View style={styles.footer}>
            <MaterialCommunityIcons name="open-source-initiative" size={14} color={colors.textMuted} />
            <Text style={styles.footerText}>{t('openSource', lang)} · MIT</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

function HeroStat({
  icon,
  value,
  label,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.heroStat}>
      <MaterialCommunityIcons name={icon} size={16} color={colors.accent} />
      <Text style={styles.heroStatValue}>{value}</Text>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    ...typography.h3,
    color: colors.text,
    fontSize: 17,
  },
  tagline: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
    letterSpacing: 0,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  heroLabel: {
    ...typography.label,
    color: colors.primaryLight,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.text,
    fontSize: 22,
    marginBottom: spacing.lg,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  heroStatValue: {
    ...typography.h3,
    color: colors.text,
    fontSize: 16,
  },
  heroStatLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0,
  },
  heroDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.border,
  },
  fieldGrid: {
    gap: spacing.sm,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  fieldSpacer: {
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  chipSelected: {
    borderColor: colors.borderActive,
    backgroundColor: `${colors.primary}18`,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: colors.primaryLight,
  },
  modeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modeCard: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  modeCardSelected: {
    borderColor: colors.borderActive,
    backgroundColor: `${colors.primary}12`,
  },
  modeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSolid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeIconWrapActive: {
    backgroundColor: `${colors.primary}25`,
  },
  modeLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0,
  },
  modeLabelSelected: {
    color: colors.primaryLight,
  },
  startButton: {
    marginTop: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.xl,
    opacity: 0.7,
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0,
  },
});
