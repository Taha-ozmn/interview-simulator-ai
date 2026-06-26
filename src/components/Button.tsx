import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, typography, shadows } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[isDisabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={
            isDisabled
              ? [colors.surfaceLight, colors.surfaceLight]
              : [colors.gradientStart, colors.gradientEnd]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, styles[`size_${size}`], shadows.md]}
        >
          {loading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <View style={styles.content}>
              {icon}
              {title ? (
                <Text style={[styles.text, styles.text_primary, styles[`textSize_${size}`], textStyle]}>
                  {title}
                </Text>
              ) : null}
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.text} />
      ) : (
        <View style={styles.content}>
          {icon}
          {title ? (
            <Text
              style={[
                styles.text,
                styles[`text_${variant}`],
                styles[`textSize_${size}`],
                textStyle,
              ]}
            >
              {title}
            </Text>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.borderActive,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  size_sm: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  size_md: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  size_lg: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: borderRadius.lg,
  },
  disabled: {
    opacity: 0.45,
  },
  text: {
    fontWeight: '700',
  },
  text_primary: {
    color: colors.text,
  },
  text_secondary: {
    color: colors.text,
  },
  text_outline: {
    color: colors.primaryLight,
  },
  text_ghost: {
    color: colors.textSecondary,
  },
  textSize_sm: {
    fontSize: 14,
  },
  textSize_md: {
    fontSize: 16,
  },
  textSize_lg: {
    fontSize: 17,
    letterSpacing: 0.2,
  },
});
