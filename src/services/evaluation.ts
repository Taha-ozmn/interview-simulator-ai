import { AnswerEvaluation, Language, Question } from '../types';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, ' ');
}

function countKeywordMatches(answer: string, keywords: string[]): number {
  const normalized = normalizeText(answer);
  return keywords.filter((kw) => normalized.includes(normalizeText(kw))).length;
}

function analyzeStructure(answer: string, lang: Language): { bonus: number; notes: string[] } {
  const notes: string[] = [];
  let bonus = 0;
  const wordCount = answer.trim().split(/\s+/).length;

  if (wordCount < 20) {
    notes.push(lang === 'tr' ? 'Cevap çok kısa, daha detaylı olun.' : 'Answer is too short, be more detailed.');
  } else if (wordCount >= 50) {
    bonus += 5;
    notes.push(lang === 'tr' ? 'Yeterli detay seviyesi.' : 'Good level of detail.');
  }

  if (wordCount >= 100) {
    bonus += 5;
  }

  const starKeywords =
    lang === 'tr'
      ? ['durum', 'görev', 'aksiyon', 'sonuç', 'çünkü', 'sonuç olarak']
      : ['situation', 'task', 'action', 'result', 'because', 'as a result'];

  const starMatches = starKeywords.filter((kw) =>
    normalizeText(answer).includes(normalizeText(kw)),
  ).length;

  if (starMatches >= 2) {
    bonus += 10;
    notes.push(
      lang === 'tr' ? 'STAR yapısı kullanılmış.' : 'STAR structure detected.',
    );
  }

  return { bonus, notes };
}

function generateStrengths(
  coverage: number,
  totalKeywords: number,
  lang: Language,
): string[] {
  const strengths: string[] = [];
  const ratio = totalKeywords > 0 ? coverage / totalKeywords : 0;

  if (ratio >= 0.7) {
    strengths.push(
      lang === 'tr'
        ? 'Konuya hakimiyet gösterilmiş'
        : 'Demonstrates strong subject knowledge',
    );
  }
  if (ratio >= 0.4 && ratio < 0.7) {
    strengths.push(
      lang === 'tr'
        ? 'Temel kavramlar anlaşılmış'
        : 'Basic concepts are understood',
    );
  }
  if (coverage >= 3) {
    strengths.push(
      lang === 'tr'
        ? 'Birden fazla anahtar nokta ele alınmış'
        : 'Multiple key points addressed',
    );
  }

  if (strengths.length === 0) {
    strengths.push(
      lang === 'tr' ? 'Cevap verme girişimi yapılmış' : 'Attempt to answer was made',
    );
  }

  return strengths;
}

function generateImprovements(
  coverage: number,
  totalKeywords: number,
  missingKeywords: string[],
  lang: Language,
): string[] {
  const improvements: string[] = [];
  const ratio = totalKeywords > 0 ? coverage / totalKeywords : 0;

  if (ratio < 0.5) {
    improvements.push(
      lang === 'tr'
        ? 'Daha fazla teknik detay ekleyin'
        : 'Add more technical details',
    );
  }

  if (missingKeywords.length > 0) {
    const top = missingKeywords.slice(0, 3).join(', ');
    improvements.push(
      lang === 'tr'
        ? `Şu konulara değinin: ${top}`
        : `Cover these topics: ${top}`,
    );
  }

  improvements.push(
    lang === 'tr'
      ? 'Somut örnekler ve deneyimler paylaşın'
      : 'Share concrete examples and experiences',
  );

  return improvements;
}

export async function evaluateAnswerLocal(
  question: Question,
  answer: string,
  lang: Language,
): Promise<AnswerEvaluation> {
  const keywords = question.keywords[lang];
  const coverage = countKeywordMatches(answer, keywords);
  const totalKeywords = keywords.length;
  const keywordCoverage = totalKeywords > 0 ? Math.round((coverage / totalKeywords) * 100) : 0;

  const structure = analyzeStructure(answer, lang);
  const baseScore = Math.min(100, Math.round((coverage / Math.max(totalKeywords, 1)) * 70 + structure.bonus + 15));
  const score = Math.max(10, Math.min(100, baseScore));

  const matchedKeywords = keywords.filter((kw) =>
    normalizeText(answer).includes(normalizeText(kw)),
  );
  const missingKeywords = keywords.filter((kw) => !matchedKeywords.includes(kw));

  const strengths = generateStrengths(coverage, totalKeywords, lang);
  const improvements = generateImprovements(coverage, totalKeywords, missingKeywords, lang);

  let feedback: string;
  if (score >= 80) {
    feedback =
      lang === 'tr'
        ? 'Mükemmel bir cevap! Konuya derinlemesine hakimsiniz.'
        : 'Excellent answer! You demonstrate deep subject knowledge.';
  } else if (score >= 60) {
    feedback =
      lang === 'tr'
        ? 'İyi bir cevap. Birkaç noktayı daha detaylandırabilirsiniz.'
        : 'Good answer. You could elaborate on a few more points.';
  } else if (score >= 40) {
    feedback =
      lang === 'tr'
        ? 'Orta seviye bir cevap. Daha fazla pratik yapmanızı öneririz.'
        : 'Average answer. We recommend more practice.';
  } else {
    feedback =
      lang === 'tr'
        ? 'Cevabınızı geliştirmeniz gerekiyor. İpucu: ' + question.tips[lang]
        : 'Your answer needs improvement. Tip: ' + question.tips[lang];
  }

  return {
    score,
    strengths,
    improvements,
    feedback,
    keywordCoverage,
  };
}

export async function evaluateAnswerWithAI(
  question: Question,
  answer: string,
  lang: Language,
  apiKey: string,
): Promise<AnswerEvaluation> {
  const prompt = `You are a professional interview evaluator. Evaluate this interview answer.

Question (${lang}): ${question.text[lang]}
Expected keywords: ${question.keywords[lang].join(', ')}
Candidate answer: ${answer}

Respond in JSON only with this structure:
{
  "score": <number 0-100>,
  "strengths": [<string array in ${lang === 'tr' ? 'Turkish' : 'English'}>],
  "improvements": [<string array in ${lang === 'tr' ? 'Turkish' : 'English'}>],
  "feedback": "<string in ${lang === 'tr' ? 'Turkish' : 'English'}>",
  "keywordCoverage": <number 0-100>
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    return evaluateAnswerLocal(question, answer, lang);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    return evaluateAnswerLocal(question, answer, lang);
  }

  const parsed = JSON.parse(content);
  return {
    score: Math.max(0, Math.min(100, parsed.score ?? 50)),
    strengths: parsed.strengths ?? [],
    improvements: parsed.improvements ?? [],
    feedback: parsed.feedback ?? '',
    keywordCoverage: parsed.keywordCoverage ?? 0,
  };
}

export async function evaluateAnswer(
  question: Question,
  answer: string,
  lang: Language,
  apiKey?: string,
): Promise<AnswerEvaluation> {
  if (apiKey && apiKey.length > 10) {
    try {
      return await evaluateAnswerWithAI(question, answer, lang, apiKey);
    } catch {
      return evaluateAnswerLocal(question, answer, lang);
    }
  }
  return evaluateAnswerLocal(question, answer, lang);
}
