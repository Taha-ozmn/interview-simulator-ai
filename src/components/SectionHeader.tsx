import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.accent} />
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  accent: {
    width: 3,
    height: 28,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
    letterSpacing: 0,
  },
});
