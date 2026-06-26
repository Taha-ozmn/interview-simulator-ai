import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FieldInfo, Language } from '../types';
import { colors, borderRadius, spacing, typography, shadows } from '../constants/theme';

interface FieldCardProps {
  field: FieldInfo;
  selected: boolean;
  language: Language;
  onPress: () => void;
  compact?: boolean;
}

export function FieldCard({ field, selected, language, onPress, compact }: FieldCardProps) {
  if (compact) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75}
        style={[
          styles.compactCard,
          selected && {
            borderColor: field.color,
            backgroundColor: `${field.color}18`,
            ...shadows.sm,
          },
        ]}
      >
        <View style={[styles.compactIcon, { backgroundColor: `${field.color}22` }]}>
          <MaterialCommunityIcons
            name={field.icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={22}
            color={field.color}
          />
        </View>
        <Text style={styles.compactName} numberOfLines={1}>
          {field.name[language]}
        </Text>
        {selected && (
          <View style={[styles.selectedDot, { backgroundColor: field.color }]} />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.container,
        selected && {
          borderColor: field.color,
          backgroundColor: `${field.color}12`,
          ...shadows.sm,
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${field.color}20` }]}>
        <MaterialCommunityIcons
          name={field.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={24}
          color={field.color}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{field.name[language]}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {field.description[language]}
        </Text>
      </View>
      {selected && (
        <View style={[styles.checkBadge, { backgroundColor: field.color }]}>
          <MaterialCommunityIcons name="check" size={14} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 3,
    fontWeight: '500',
    letterSpacing: 0,
  },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactCard: {
    flex: 1,
    minWidth: '46%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'flex-start',
    gap: spacing.sm,
    position: 'relative',
  },
  compactIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactName: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '700',
  },
  selectedDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
