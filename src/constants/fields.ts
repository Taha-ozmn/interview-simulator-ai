import { FieldInfo } from '../types';

export const FIELDS: FieldInfo[] = [
  {
    id: 'software',
    icon: 'code-braces',
    color: '#6366F1',
    name: { tr: 'Yazılım', en: 'Software' },
    description: { tr: 'Genel yazılım mühendisliği', en: 'General software engineering' },
  },
  {
    id: 'frontend',
    icon: 'web',
    color: '#22D3EE',
    name: { tr: 'Frontend', en: 'Frontend' },
    description: { tr: 'React, UI/UX, web teknolojileri', en: 'React, UI/UX, web technologies' },
  },
  {
    id: 'backend',
    icon: 'server',
    color: '#10B981',
    name: { tr: 'Backend', en: 'Backend' },
    description: { tr: 'API, veritabanı, sistem tasarımı', en: 'API, database, system design' },
  },
  {
    id: 'data-science',
    icon: 'chart-line',
    color: '#F59E0B',
    name: { tr: 'Veri Bilimi', en: 'Data Science' },
    description: { tr: 'ML, istatistik, veri analizi', en: 'ML, statistics, data analysis' },
  },
  {
    id: 'devops',
    icon: 'cloud',
    color: '#8B5CF6',
    name: { tr: 'DevOps', en: 'DevOps' },
    description: { tr: 'CI/CD, bulut, altyapı', en: 'CI/CD, cloud, infrastructure' },
  },
  {
    id: 'product',
    icon: 'lightbulb',
    color: '#EC4899',
    name: { tr: 'Ürün Yönetimi', en: 'Product Management' },
    description: { tr: 'Ürün stratejisi, roadmap', en: 'Product strategy, roadmap' },
  },
  {
    id: 'design',
    icon: 'palette',
    color: '#F97316',
    name: { tr: 'Tasarım', en: 'Design' },
    description: { tr: 'UI/UX, görsel tasarım', en: 'UI/UX, visual design' },
  },
  {
    id: 'marketing',
    icon: 'bullhorn',
    color: '#14B8A6',
    name: { tr: 'Pazarlama', en: 'Marketing' },
    description: { tr: 'Dijital pazarlama, marka', en: 'Digital marketing, branding' },
  },
  {
    id: 'finance',
    icon: 'chart-pie',
    color: '#0EA5E9',
    name: { tr: 'Finans', en: 'Finance' },
    description: { tr: 'Finansal analiz, muhasebe', en: 'Financial analysis, accounting' },
  },
  {
    id: 'hr',
    icon: 'account-group',
    color: '#A855F7',
    name: { tr: 'İnsan Kaynakları', en: 'Human Resources' },
    description: { tr: 'İK süreçleri, işe alım', en: 'HR processes, recruitment' },
  },
  {
    id: 'general',
    icon: 'briefcase',
    color: '#64748B',
    name: { tr: 'Genel', en: 'General' },
    description: { tr: 'Tüm sektörler için genel mülakat', en: 'General interview for all industries' },
  },
];

export const DIFFICULTY_LABELS = {
  junior: { tr: 'Junior', en: 'Junior' },
  mid: { tr: 'Mid-Level', en: 'Mid-Level' },
  senior: { tr: 'Senior', en: 'Senior' },
} as const;
