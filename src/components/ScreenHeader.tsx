import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({ title, onBack, rightAction }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.iconButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightAction ?? <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 44,
    height: 44,
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
});
