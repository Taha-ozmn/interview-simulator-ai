import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/theme';

interface ScreenBackgroundProps {
  children: React.ReactNode;
}

export function ScreenBackground({ children }: ScreenBackgroundProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, '#0F172A', '#111827', colors.background]}
        locations={[0, 0.35, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.orb, styles.orbPrimary]} />
      <View style={[styles.orb, styles.orbAccent]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orbPrimary: {
    width: 280,
    height: 280,
    top: -80,
    right: -60,
    backgroundColor: colors.primaryGlow,
    opacity: 0.6,
  },
  orbAccent: {
    width: 200,
    height: 200,
    bottom: 120,
    left: -80,
    backgroundColor: colors.accentGlow,
    opacity: 0.5,
  },
});
