# Contributing to Interview Simulator AI

Thank you for your interest in contributing! This project is open source and welcomes improvements from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/interview-simulator-ai.git`
3. Install dependencies: `npm install`
4. Start the dev server: `npm start`
5. Create a branch: `git checkout -b feature/your-feature`

## Development Guidelines

- Use **TypeScript** with strict mode
- Run `npm run lint` before submitting a PR
- Match existing code style and naming conventions
- Keep changes focused — one feature or fix per PR
- Add bilingual (`tr` / `en`) text for any user-facing strings

## What to Contribute

- **New interview questions** in `src/data/questions.ts`
- **New domains/fields** in `src/constants/fields.ts` and `src/types/index.ts`
- **UI improvements** — follow the design system in `src/constants/theme.ts`
- **Bug fixes** with a clear description of the issue
- **Documentation** improvements

## Question Guidelines

When adding questions:

- Provide both Turkish and English text
- Include relevant keywords for scoring
- Add a helpful tip for the candidate
- Use appropriate `difficulty` and `type` values
- Use unique `id` values (e.g. `sw-m2`, `ds-j3`)

## Pull Request Process

1. Update README if you add major features
2. Ensure `npm run lint` passes
3. Describe your changes clearly in the PR
4. Link any related issues

## Code of Conduct

Be respectful and constructive. We're all here to help people prepare for interviews.

## Questions?

Open an [issue](https://github.com/YOUR_USERNAME/interview-simulator-ai/issues) for bugs, feature requests, or questions.
