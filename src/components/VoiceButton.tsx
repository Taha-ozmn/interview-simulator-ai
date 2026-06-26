import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, shadows } from '../constants/theme';

interface VoiceButtonProps {
  isListening: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export function VoiceButton({ isListening, onPress, disabled }: VoiceButtonProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isListening) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.4, duration: 900, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        ]),
      );
      animation.start();
      return () => animation.stop();
    }
    pulseAnim.setValue(1);
  }, [isListening, pulseAnim]);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.85}>
      <View style={styles.wrapper}>
        {isListening && (
          <Animated.View
            style={[
              styles.pulse,
              {
                transform: [{ scale: pulseAnim }],
                opacity: pulseAnim.interpolate({ inputRange: [1, 1.4], outputRange: [0.5, 0] }),
              },
            ]}
          />
        )}
        <LinearGradient
          colors={isListening ? ['#EF4444', '#F87171'] : [colors.gradientStart, colors.gradientEnd]}
          style={[styles.button, shadows.md]}
        >
          <MaterialCommunityIcons
            name={isListening ? 'microphone' : 'microphone-outline'}
            size={30}
            color={colors.text}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
  },
  pulse: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.error,
  },
  button: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
