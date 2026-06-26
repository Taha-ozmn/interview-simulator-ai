import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'glass';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        variant === 'glass' && styles.glass,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceSolid,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    ...shadows.md,
  },
  glass: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
});
