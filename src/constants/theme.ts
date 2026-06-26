export const colors = {
  background: '#070B14',
  backgroundElevated: '#0D1321',
  surface: 'rgba(255, 255, 255, 0.06)',
  surfaceHover: 'rgba(255, 255, 255, 0.09)',
  surfaceSolid: '#141B2D',
  surfaceLight: '#1E293B',
  primary: '#6366F1',
  primaryLight: '#A5B4FC',
  primaryDark: '#4F46E5',
  primaryGlow: 'rgba(99, 102, 241, 0.35)',
  accent: '#38BDF8',
  accentGlow: 'rgba(56, 189, 248, 0.25)',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#64748B',
  border: 'rgba(255, 255, 255, 0.08)',
  borderActive: 'rgba(99, 102, 241, 0.5)',
  overlay: 'rgba(7, 11, 20, 0.92)',
  gradientStart: '#6366F1',
  gradientEnd: '#8B5CF6',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export const typography = {
  h1: { fontSize: 32, fontWeight: '800' as const, lineHeight: 40, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '700' as const, lineHeight: 26, letterSpacing: -0.2 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16, letterSpacing: 0.3 },
  label: { fontSize: 11, fontWeight: '700' as const, lineHeight: 14, letterSpacing: 1.2 },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;
