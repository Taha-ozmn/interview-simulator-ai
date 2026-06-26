import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, shadows } from '../constants/theme';
import { getScoreColor } from '../store/interviewStore';

interface ScoreRingProps {
  score: number;
  size?: number;
  label?: string;
}

export function ScoreRing({ score, size = 120, label }: ScoreRingProps) {
  const color = getScoreColor(score);
  const ringSize = size;
  const innerSize = ringSize - 20;

  return (
    <View style={styles.container}>
      <View style={[styles.outerGlow, { width: ringSize + 16, height: ringSize + 16, borderRadius: (ringSize + 16) / 2, backgroundColor: `${color}15` }]}>
        <LinearGradient
          colors={[color, `${color}88`]}
          style={[styles.ring, { width: ringSize, height: ringSize, borderRadius: ringSize / 2 }]}
        >
          <View
            style={[
              styles.inner,
              {
                width: innerSize,
                height: innerSize,
                borderRadius: innerSize / 2,
              },
            ]}
          >
            <Text style={[styles.score, { fontSize: size * 0.28, color }]}>{score}</Text>
            <Text style={styles.percent}>%</Text>
          </View>
        </LinearGradient>
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  outerGlow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  inner: {
    backgroundColor: colors.backgroundElevated,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  score: {
    fontWeight: '800',
    letterSpacing: -1,
  },
  percent: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 6,
    fontWeight: '600',
    letterSpacing: 0,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
