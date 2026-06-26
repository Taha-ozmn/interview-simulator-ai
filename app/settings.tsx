import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { ScreenBackground } from '../src/components/ScreenBackground';
import { ScreenHeader } from '../src/components/ScreenHeader';
import { SectionHeader } from '../src/components/SectionHeader';
import { t } from '../src/constants/i18n';
import { colors, spacing, typography, borderRadius } from '../src/constants/theme';
import { useInterviewStore } from '../src/store/interviewStore';
import { InterviewMode, Language } from '../src/types';

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, loadSettings, updateSettings } = useInterviewStore();
  const lang = settings.language;

  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings().then(() => {
      if (settings.openAiApiKey) {
        setApiKey(settings.openAiApiKey);
      }
    });
  }, [loadSettings]);

  const handleSave = async () => {
    await updateSettings({
      openAiApiKey: apiKey || undefined,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLanguageChange = async (newLang: Language) => {
    Haptics.selectionAsync();
    await updateSettings({ language: newLang });
  };

  const handleModeChange = async (mode: InterviewMode) => {
    Haptics.selectionAsync();
    await updateSettings({ mode });
  };

  const handleQuestionCount = async (count: number) => {
    Haptics.selectionAsync();
    await updateSettings({ questionCount: count });
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={t('settings', lang)} onBack={() => router.back()} />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <SectionHeader title={t('language', lang)} />
        <View style={styles.row}>
          {(['tr', 'en'] as Language[]).map((l) => (
            <TouchableOpacity
              key={l}
              onPress={() => handleLanguageChange(l)}
              style={[styles.langChip, settings.language === l && styles.langChipActive]}
            >
              <Text
                style={[
                  styles.langText,
                  settings.language === l && styles.langTextActive,
                ]}
              >
                {l === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title={t('questionCount', lang)} />
        <View style={styles.row}>
          {[3, 5, 7, 10].map((count) => (
            <TouchableOpacity
              key={count}
              onPress={() => handleQuestionCount(count)}
              style={[
                styles.countChip,
                settings.questionCount === count && styles.countChipActive,
              ]}
            >
              <Text
                style={[
                  styles.countText,
                  settings.questionCount === count && styles.countTextActive,
                ]}
              >
                {count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title={t('selectMode', lang)} />
        <View style={styles.row}>
          {(['text', 'voice', 'hybrid'] as InterviewMode[]).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => handleModeChange(mode)}
              style={[styles.modeChip, settings.mode === mode && styles.modeChipActive]}
            >
              <Text
                style={[
                  styles.modeText,
                  settings.mode === mode && styles.modeTextActive,
                ]}
              >
                {t(
                  mode === 'text' ? 'modeText' : mode === 'voice' ? 'modeVoice' : 'modeHybrid',
                  lang,
                )}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title={t('voiceSettings', lang)} />
        <Card variant="glass">
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{t('autoReadQuestions', lang)}</Text>
            <Switch
              value={settings.autoReadQuestions}
              onValueChange={(val) => updateSettings({ autoReadQuestions: val })}
              trackColor={{ false: colors.surfaceLight, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>
        </Card>

        <SectionHeader title={t('apiKey', lang)} subtitle={t('apiKeyHint', lang)} />
        <TextInput
          style={styles.apiInput}
          placeholder="sk-..."
          placeholderTextColor={colors.textMuted}
          value={apiKey}
          onChangeText={setApiKey}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button
          title={saved ? t('saved', lang) : t('save', lang)}
          onPress={handleSave}
          size="lg"
          style={styles.saveButton}
          icon={
            <MaterialCommunityIcons
              name={saved ? 'check' : 'content-save'}
              size={20}
              color={colors.text}
            />
          }
        />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingTop: 0,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  langChip: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  langChipActive: {
    borderColor: colors.borderActive,
    backgroundColor: `${colors.primary}18`,
  },
  langText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  langTextActive: {
    color: colors.primaryLight,
  },
  countChip: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countChipActive: {
    borderColor: colors.borderActive,
    backgroundColor: `${colors.primary}18`,
  },
  countText: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  countTextActive: {
    color: colors.primaryLight,
  },
  modeChip: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  modeChipActive: {
    borderColor: colors.borderActive,
    backgroundColor: `${colors.primary}18`,
  },
  modeText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modeTextActive: {
    color: colors.primaryLight,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  apiInput: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    color: colors.text,
    ...typography.body,
    marginBottom: spacing.md,
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});
