# Interview Simulator AI

<p align="center">
  <img src="assets/icon.png" alt="Interview Simulator AI" width="120" />
</p>

<p align="center">
  <strong>🎯 Yapay zeka destekli mülakat pratiği · AI-powered interview practice</strong>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo" alt="Expo SDK 54" /></a>
  <a href="#"><img src="https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react" alt="React Native" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?style=flat-square" alt="Platform" /></a>
</p>

<p align="center">
  <a href="#türkçe">Türkçe</a> ·
  <a href="#english">English</a> ·
  <a href="#kurulum--setup">Kurulum</a> ·
  <a href="#katkıda-bulunma--contributing">Katkı</a>
</p>

---

## Türkçe

Interview Simulator AI, iş görüşmelerine hazırlanmanız için tasarlanmış **açık kaynak** bir mobil uygulamadır. Yazılım, veri bilimi, frontend, backend ve daha birçok alanda gerçekçi mülakat soruları sorar, cevaplarınızı puanlar ve gelişim önerileri sunar.

### ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🗂️ **11 Alan** | Yazılım, Frontend, Backend, Veri Bilimi, DevOps, Ürün, Tasarım, Pazarlama, Finans, İK, Genel |
| 📊 **3 Seviye** | Junior · Mid-Level · Senior |
| 💬 **3 Mod** | Yazılı · Sesli · Hibrit |
| 🤖 **AI Puanlama** | Yerleşik akıllı değerlendirme + opsiyonel OpenAI API |
| 🔊 **Ses Desteği** | Soru okuma (TTS) · Sesli cevap (development build) |
| 🌍 **Çift Dil** | Türkçe & English |
| 📈 **Geçmiş** | Tamamlanan mülakatları takip edin |
| ⚡ **Performans** | Zustand · yerel değerlendirme · hafif mimari |

### 📱 Expo Go Uyumluluğu

| Özellik | Expo Go | Development Build |
|---------|:-------:|:-----------------:|
| Yazılı mülakat | ✅ | ✅ |
| Soru okuma (TTS) | ✅ | ✅ |
| Sesli cevap (STT) | ❌ | ✅ |
| AI değerlendirme | ✅ | ✅ |

> Sesli cevap için `eas build` ile özel build gerekir. Expo Go ile yazılı mod tam çalışır.

---

## English

Interview Simulator AI is an **open-source** mobile app that helps you practice job interviews. It asks realistic questions across software, data science, product, design, and more — then scores your answers with actionable feedback.

### ✨ Features

- **11 interview domains** with 30+ curated questions
- **3 difficulty levels** — Junior, Mid, Senior
- **Smart scoring** with optional OpenAI integration
- **Bilingual** — Turkish & English UI
- **Cross-platform** — iOS & Android via Expo

---

## Kurulum / Setup

### Gereksinimler / Requirements

- Node.js 18+
- npm or yarn
- [Expo Go](https://expo.dev/go) (iOS / Android)

### Hızlı Başlangıç / Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/interview-simulator-ai.git
cd interview-simulator-ai
npm install
npm start
```

**iPhone (Expo Go):**
```bash
npx expo start --tunnel
```
Expo Go'da QR kodu tarayın veya URL'yi girin.

**Android:**
```bash
npm run android
```

### Production Build

```bash
npm install -g eas-cli
eas build --platform all
```

---

## OpenAI API (Opsiyonel)

Varsayılan olarak yerleşik değerlendirme motoru kullanılır. Daha detaylı AI geri bildirimi için:

1. [OpenAI](https://platform.openai.com/) API anahtarı alın
2. Uygulama → **Ayarlar** → API anahtarını girin
3. Anahtar cihazda güvenli saklanır (`expo-secure-store`)

---

## Proje Yapısı

```
interview-simulator-ai/
├── app/                 # Expo Router screens
│   ├── index.tsx        # Home — field & level selection
│   ├── interview.tsx    # Interview session
│   ├── results.tsx      # Score & feedback
│   ├── history.tsx      # Past sessions
│   └── settings.tsx     # Preferences & API key
├── src/
│   ├── components/      # UI components
│   ├── constants/       # Theme, i18n, fields
│   ├── data/            # Question bank
│   ├── hooks/           # Voice input hook
│   ├── services/        # Evaluation, speech, storage
│   ├── store/           # Zustand state
│   └── types/           # TypeScript types
├── assets/              # Icons & images
└── .github/workflows/   # CI pipeline
```

## Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | React Native + Expo SDK 54 |
| Navigation | Expo Router 6 |
| State | Zustand |
| Speech | expo-speech · expo-speech-recognition |
| Storage | AsyncStorage · SecureStore |
| Language | TypeScript (strict) |

---

## Katkıda Bulunma / Contributing

Katkılarınızı bekliyoruz! Detaylar için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.

### Soru Eklemek

`src/data/questions.ts` dosyasına yeni soru ekleyin:

```typescript
{
  id: 'unique-id',
  field: 'software',
  difficulty: 'mid',
  type: 'technical',
  text: { tr: 'Soru metni', en: 'Question text' },
  keywords: { tr: ['anahtar', 'kelime'], en: ['keyword'] },
  tips: { tr: 'İpucu', en: 'Tip' },
}
```

---

## Lisans

[MIT License](LICENSE) — özgürce kullanın, fork edin, geliştirin.

---

<p align="center">
  ⭐ Beğendiyseniz yıldız vermeyi unutmayın!<br>
  <sub>Made with care for interview preparation</sub>
</p>
