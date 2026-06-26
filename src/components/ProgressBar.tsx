import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius } from '../constants/theme';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={styles.track}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fill, { width: `${progress}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 5,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
