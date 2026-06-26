import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // Software - Junior
  {
    id: 'sw-j1',
    field: 'software',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'Değişken (variable) ve sabit (constant) arasındaki fark nedir?',
      en: 'What is the difference between a variable and a constant?',
    },
    keywords: {
      tr: ['değişken', 'sabit', 'değer', 'değiştirilebilir', 'immutable', 'const'],
      en: ['variable', 'constant', 'value', 'mutable', 'immutable', 'const', 'change'],
    },
    tips: {
      tr: 'Değişkenlerin yeniden atanabilirliğini ve sabitlerin neden kullanıldığını açıklayın.',
      en: 'Explain reassignability of variables and why constants are used.',
    },
  },
  {
    id: 'sw-j2',
    field: 'software',
    difficulty: 'junior',
    type: 'behavioral',
    text: {
      tr: 'Bir projede deadline\'a yetişemediğiniz bir durumu anlatın.',
      en: 'Tell me about a time you missed a project deadline.',
    },
    keywords: {
      tr: ['sorumluluk', 'iletişim', 'önceliklendirme', 'öğrenme', 'çözüm'],
      en: ['responsibility', 'communication', 'prioritization', 'learning', 'solution'],
    },
    tips: {
      tr: 'STAR yöntemini kullanın: Durum, Görev, Aksiyon, Sonuç.',
      en: 'Use the STAR method: Situation, Task, Action, Result.',
    },
  },
  {
    id: 'sw-m1',
    field: 'software',
    difficulty: 'mid',
    type: 'technical',
    text: {
      tr: 'SOLID prensiplerini açıklayın ve bir örnek verin.',
      en: 'Explain SOLID principles and give an example.',
    },
    keywords: {
      tr: ['single responsibility', 'open closed', 'liskov', 'interface segregation', 'dependency inversion', 'solid'],
      en: ['single responsibility', 'open closed', 'liskov', 'interface segregation', 'dependency inversion', 'solid'],
    },
    tips: {
      tr: 'Her prensibi kısaca tanımlayıp gerçek bir kod örneğiyle ilişkilendirin.',
      en: 'Briefly define each principle and relate it to a real code example.',
    },
  },
  {
    id: 'sw-s1',
    field: 'software',
    difficulty: 'senior',
    type: 'technical',
    text: {
      tr: 'Büyük ölçekli bir sistemi nasıl tasarlar ve ölçeklendirirsiniz?',
      en: 'How would you design and scale a large-scale system?',
    },
    keywords: {
      tr: ['mikroservis', 'load balancing', 'cache', 'sharding', 'ölçeklenebilirlik', 'yüksek erişilebilirlik'],
      en: ['microservices', 'load balancing', 'cache', 'sharding', 'scalability', 'high availability'],
    },
    tips: {
      tr: 'CAP teoremi, veritabanı seçimi ve caching stratejilerinden bahsedin.',
      en: 'Discuss CAP theorem, database selection, and caching strategies.',
    },
  },

  // Frontend
  {
    id: 'fe-j1',
    field: 'frontend',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'HTML, CSS ve JavaScript\'in rollerini açıklayın.',
      en: 'Explain the roles of HTML, CSS, and JavaScript.',
    },
    keywords: {
      tr: ['yapı', 'stil', 'davranış', 'dom', 'semantik', 'etkileşim'],
      en: ['structure', 'style', 'behavior', 'dom', 'semantic', 'interaction'],
    },
    tips: {
      tr: 'Her teknolojinin web sayfasındaki sorumluluğunu net ayırın.',
      en: 'Clearly separate each technology\'s responsibility on a web page.',
    },
  },
  {
    id: 'fe-m1',
    field: 'frontend',
    difficulty: 'mid',
    type: 'technical',
    text: {
      tr: 'React\'te state ve props arasındaki fark nedir?',
      en: 'What is the difference between state and props in React?',
    },
    keywords: {
      tr: ['state', 'props', 'component', 're-render', 'immutable', 'parent', 'child'],
      en: ['state', 'props', 'component', 're-render', 'immutable', 'parent', 'child'],
    },
    tips: {
      tr: 'Veri akışı yönünü ve hangi durumda hangisinin kullanılacağını belirtin.',
      en: 'Mention data flow direction and when to use each.',
    },
  },
  {
    id: 'fe-s1',
    field: 'frontend',
    difficulty: 'senior',
    type: 'technical',
    text: {
      tr: 'Web uygulaması performansını nasıl optimize edersiniz?',
      en: 'How do you optimize web application performance?',
    },
    keywords: {
      tr: ['lazy loading', 'code splitting', 'bundle', 'lighthouse', 'memoization', 'virtualization'],
      en: ['lazy loading', 'code splitting', 'bundle', 'lighthouse', 'memoization', 'virtualization'],
    },
    tips: {
      tr: 'Core Web Vitals metriklerinden ve ölçüm araçlarından bahsedin.',
      en: 'Mention Core Web Vitals metrics and measurement tools.',
    },
  },

  // Backend
  {
    id: 'be-j1',
    field: 'backend',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'REST API nedir ve temel HTTP metodları nelerdir?',
      en: 'What is a REST API and what are the basic HTTP methods?',
    },
    keywords: {
      tr: ['get', 'post', 'put', 'delete', 'rest', 'endpoint', 'stateless', 'resource'],
      en: ['get', 'post', 'put', 'delete', 'rest', 'endpoint', 'stateless', 'resource'],
    },
    tips: {
      tr: 'Her HTTP metodunun kullanım amacını örneklerle açıklayın.',
      en: 'Explain the purpose of each HTTP method with examples.',
    },
  },
  {
    id: 'be-m1',
    field: 'backend',
    difficulty: 'mid',
    type: 'technical',
    text: {
      tr: 'Veritabanı indeksleme nasıl çalışır ve ne zaman kullanılır?',
      en: 'How does database indexing work and when should you use it?',
    },
    keywords: {
      tr: ['index', 'b-tree', 'query', 'performans', 'trade-off', 'write', 'read'],
      en: ['index', 'b-tree', 'query', 'performance', 'trade-off', 'write', 'read'],
    },
    tips: {
      tr: 'İndekslemenin okuma/yazma performansı trade-off\'unu vurgulayın.',
      en: 'Highlight the read/write performance trade-off of indexing.',
    },
  },
  {
    id: 'be-s1',
    field: 'backend',
    difficulty: 'senior',
    type: 'technical',
    text: {
      tr: 'Dağıtık sistemlerde tutarlılık (consistency) nasıl sağlanır?',
      en: 'How do you ensure consistency in distributed systems?',
    },
    keywords: {
      tr: ['acid', 'eventual consistency', 'transaction', 'saga', 'two-phase commit', 'cap'],
      en: ['acid', 'eventual consistency', 'transaction', 'saga', 'two-phase commit', 'cap'],
    },
    tips: {
      tr: 'Farklı tutarlılık modellerini ve kullanım senaryolarını karşılaştırın.',
      en: 'Compare different consistency models and their use cases.',
    },
  },

  // Data Science
  {
    id: 'ds-j1',
    field: 'data-science',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'Denetimli (supervised) ve denetimsiz (unsupervised) öğrenme arasındaki fark nedir?',
      en: 'What is the difference between supervised and unsupervised learning?',
    },
    keywords: {
      tr: ['etiket', 'label', 'clustering', 'classification', 'regression', 'supervised', 'unsupervised'],
      en: ['label', 'clustering', 'classification', 'regression', 'supervised', 'unsupervised'],
    },
    tips: {
      tr: 'Her tür için somut algoritma örnekleri verin.',
      en: 'Give concrete algorithm examples for each type.',
    },
  },
  {
    id: 'ds-m1',
    field: 'data-science',
    difficulty: 'mid',
    type: 'technical',
    text: {
      tr: 'Overfitting nedir ve nasıl önlenir?',
      en: 'What is overfitting and how do you prevent it?',
    },
    keywords: {
      tr: ['overfitting', 'regularization', 'cross-validation', 'dropout', 'validation', 'generalization'],
      en: ['overfitting', 'regularization', 'cross-validation', 'dropout', 'validation', 'generalization'],
    },
    tips: {
      tr: 'Bias-variance tradeoff kavramından bahsedin.',
      en: 'Mention the bias-variance tradeoff concept.',
    },
  },
  {
    id: 'ds-s1',
    field: 'data-science',
    difficulty: 'senior',
    type: 'technical',
    text: {
      tr: 'Bir ML modelini production ortamına nasıl deploy edersiniz?',
      en: 'How do you deploy an ML model to production?',
    },
    keywords: {
      tr: ['mlops', 'monitoring', 'drift', 'pipeline', 'a/b test', 'serving', 'versioning'],
      en: ['mlops', 'monitoring', 'drift', 'pipeline', 'a/b test', 'serving', 'versioning'],
    },
    tips: {
      tr: 'Model monitoring ve data drift tespitinden bahsedin.',
      en: 'Discuss model monitoring and data drift detection.',
    },
  },

  // DevOps
  {
    id: 'do-m1',
    field: 'devops',
    difficulty: 'mid',
    type: 'technical',
    text: {
      tr: 'CI/CD pipeline nedir ve nasıl kurulur?',
      en: 'What is a CI/CD pipeline and how do you set one up?',
    },
    keywords: {
      tr: ['continuous integration', 'continuous deployment', 'pipeline', 'jenkins', 'github actions', 'automated test'],
      en: ['continuous integration', 'continuous deployment', 'pipeline', 'jenkins', 'github actions', 'automated test'],
    },
    tips: {
      tr: 'Pipeline aşamalarını (build, test, deploy) sıralayın.',
      en: 'List pipeline stages: build, test, deploy.',
    },
  },

  // Product
  {
    id: 'pm-m1',
    field: 'product',
    difficulty: 'mid',
    type: 'situational',
    text: {
      tr: 'Mühendislik ekibi ile ürün öncelikleri konusunda anlaşmazlık yaşadığınızda ne yaparsınız?',
      en: 'What do you do when you disagree with engineering on product priorities?',
    },
    keywords: {
      tr: ['veri', 'kullanıcı', 'öncelik', 'iletişim', 'uzlaşma', 'impact', 'roadmap'],
      en: ['data', 'user', 'priority', 'communication', 'compromise', 'impact', 'roadmap'],
    },
    tips: {
      tr: 'Veri odaklı karar verme ve paydaş yönetiminden bahsedin.',
      en: 'Discuss data-driven decision making and stakeholder management.',
    },
  },

  // Design
  {
    id: 'de-j1',
    field: 'design',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'UI ve UX arasındaki fark nedir?',
      en: 'What is the difference between UI and UX?',
    },
    keywords: {
      tr: ['kullanıcı deneyimi', 'arayüz', 'görsel', 'kullanılabilirlik', 'wireframe', 'prototype'],
      en: ['user experience', 'interface', 'visual', 'usability', 'wireframe', 'prototype'],
    },
    tips: {
      tr: 'UI\'ın görsel, UX\'in deneyim odaklı olduğunu vurgulayın.',
      en: 'Emphasize UI is visual, UX is experience-focused.',
    },
  },

  // Marketing
  {
    id: 'mk-m1',
    field: 'marketing',
    difficulty: 'mid',
    type: 'situational',
    text: {
      tr: 'Düşük bütçeyle bir ürün lansmanı nasıl planlarsınız?',
      en: 'How would you plan a product launch with a low budget?',
    },
    keywords: {
      tr: ['organik', 'sosyal medya', 'influencer', 'content marketing', 'seo', 'viral'],
      en: ['organic', 'social media', 'influencer', 'content marketing', 'seo', 'viral'],
    },
    tips: {
      tr: 'Hedef kitle analizi ve kanal seçiminden bahsedin.',
      en: 'Discuss target audience analysis and channel selection.',
    },
  },

  // Finance
  {
    id: 'fi-m1',
    field: 'finance',
    difficulty: 'mid',
    type: 'technical',
    text: {
      tr: 'DCF (Discounted Cash Flow) analizi nedir?',
      en: 'What is DCF (Discounted Cash Flow) analysis?',
    },
    keywords: {
      tr: ['nakit akışı', 'iskonto', 'değerleme', 'npv', 'wacc', 'terminal value'],
      en: ['cash flow', 'discount', 'valuation', 'npv', 'wacc', 'terminal value'],
    },
    tips: {
      tr: 'Formülün mantığını ve kullanım senaryolarını açıklayın.',
      en: 'Explain the logic of the formula and use cases.',
    },
  },

  // HR
  {
    id: 'hr-j1',
    field: 'hr',
    difficulty: 'junior',
    type: 'behavioral',
    text: {
      tr: 'İşe alım sürecinde aday deneyimini nasıl iyileştirirsiniz?',
      en: 'How do you improve candidate experience in the hiring process?',
    },
    keywords: {
      tr: ['iletişim', 'geri bildirim', 'şeffaflık', 'süreç', 'aday', 'onboarding'],
      en: ['communication', 'feedback', 'transparency', 'process', 'candidate', 'onboarding'],
    },
    tips: {
      tr: 'Aday perspektifinden somut iyileştirmeler önerin.',
      en: 'Suggest concrete improvements from the candidate perspective.',
    },
  },

  // General
  {
    id: 'gn-j1',
    field: 'general',
    difficulty: 'junior',
    type: 'behavioral',
    text: {
      tr: 'Kendinizi kısaca tanıtır mısınız?',
      en: 'Can you briefly introduce yourself?',
    },
    keywords: {
      tr: ['deneyim', 'beceri', 'hedef', 'motivasyon', 'başarı', 'kariyer'],
      en: ['experience', 'skill', 'goal', 'motivation', 'achievement', 'career'],
    },
    tips: {
      tr: '2-3 dakikalık özlü bir tanıtım hazırlayın. İşe uygunluğunuzu vurgulayın.',
      en: 'Prepare a concise 2-3 minute introduction. Highlight job relevance.',
    },
  },
  {
    id: 'gn-m1',
    field: 'general',
    difficulty: 'mid',
    type: 'behavioral',
    text: {
      tr: 'Zorlu bir takım çalışması deneyiminizi anlatın.',
      en: 'Tell me about a challenging teamwork experience.',
    },
    keywords: {
      tr: ['işbirliği', 'çatışma', 'çözüm', 'iletişim', 'liderlik', 'takım'],
      en: ['collaboration', 'conflict', 'solution', 'communication', 'leadership', 'team'],
    },
    tips: {
      tr: 'STAR formatını kullanın ve rolünüzü net belirtin.',
      en: 'Use STAR format and clearly state your role.',
    },
  },
  {
    id: 'gn-s1',
    field: 'general',
    difficulty: 'senior',
    type: 'situational',
    text: {
      tr: '5 yıl sonra kendinizi nerede görüyorsunuz?',
      en: 'Where do you see yourself in 5 years?',
    },
    keywords: {
      tr: ['kariyer', 'büyüme', 'hedef', 'liderlik', 'uzmanlık', 'gelişim'],
      en: ['career', 'growth', 'goal', 'leadership', 'expertise', 'development'],
    },
    tips: {
      tr: 'Gerçekçi ve şirketle uyumlu hedefler belirleyin.',
      en: 'Set realistic goals aligned with the company.',
    },
  },

  // Additional questions for broader coverage
  {
    id: 'fe-j2',
    field: 'frontend',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'Responsive tasarım nedir ve nasıl uygulanır?',
      en: 'What is responsive design and how do you implement it?',
    },
    keywords: {
      tr: ['media query', 'flexbox', 'grid', 'mobile first', 'viewport', 'breakpoint'],
      en: ['media query', 'flexbox', 'grid', 'mobile first', 'viewport', 'breakpoint'],
    },
    tips: { tr: 'Mobile-first yaklaşımından bahsedin.', en: 'Mention mobile-first approach.' },
  },
  {
    id: 'be-j2',
    field: 'backend',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'SQL ve NoSQL veritabanları arasındaki farklar nelerdir?',
      en: 'What are the differences between SQL and NoSQL databases?',
    },
    keywords: {
      tr: ['relational', 'schema', 'acid', 'document', 'scalability', 'join'],
      en: ['relational', 'schema', 'acid', 'document', 'scalability', 'join'],
    },
    tips: { tr: 'Kullanım senaryolarına göre karşılaştırın.', en: 'Compare based on use cases.' },
  },
  {
    id: 'ds-j2',
    field: 'data-science',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'Eksik veri (missing data) ile nasıl başa çıkarsınız?',
      en: 'How do you handle missing data?',
    },
    keywords: {
      tr: ['imputation', 'drop', 'mean', 'median', 'missing', 'null'],
      en: ['imputation', 'drop', 'mean', 'median', 'missing', 'null'],
    },
    tips: { tr: 'Farklı stratejileri ve trade-off\'ları açıklayın.', en: 'Explain different strategies and trade-offs.' },
  },
  {
    id: 'do-j1',
    field: 'devops',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'Docker nedir ve neden kullanılır?',
      en: 'What is Docker and why is it used?',
    },
    keywords: {
      tr: ['container', 'image', 'isolation', 'portability', 'dockerfile', 'deployment'],
      en: ['container', 'image', 'isolation', 'portability', 'dockerfile', 'deployment'],
    },
    tips: { tr: 'VM ile container farkını belirtin.', en: 'Mention the difference from VMs.' },
  },
  {
    id: 'pm-j1',
    field: 'product',
    difficulty: 'junior',
    type: 'behavioral',
    text: {
      tr: 'Bir ürün kararı verirken hangi faktörleri değerlendirirsiniz?',
      en: 'What factors do you consider when making a product decision?',
    },
    keywords: {
      tr: ['kullanıcı', 'veri', 'pazar', 'öncelik', 'impact', 'roi'],
      en: ['user', 'data', 'market', 'priority', 'impact', 'roi'],
    },
    tips: { tr: 'Veri odaklı ve kullanıcı odaklı karar vermeyi vurgulayın.', en: 'Emphasize data-driven and user-centric decisions.' },
  },
  {
    id: 'de-m1',
    field: 'design',
    difficulty: 'mid',
    type: 'technical',
    text: {
      tr: 'Kullanıcı araştırması (user research) sürecinizi anlatın.',
      en: 'Describe your user research process.',
    },
    keywords: {
      tr: ['persona', 'interview', 'survey', 'usability test', 'insight', 'empathy'],
      en: ['persona', 'interview', 'survey', 'usability test', 'insight', 'empathy'],
    },
    tips: { tr: 'Araştırma yöntemlerini ve çıktılarını açıklayın.', en: 'Explain research methods and deliverables.' },
  },
  {
    id: 'mk-j1',
    field: 'marketing',
    difficulty: 'junior',
    type: 'general',
    text: {
      tr: 'SEO nedir ve temel prensipleri nelerdir?',
      en: 'What is SEO and what are its basic principles?',
    },
    keywords: {
      tr: ['keyword', 'backlink', 'content', 'meta', 'ranking', 'organic'],
      en: ['keyword', 'backlink', 'content', 'meta', 'ranking', 'organic'],
    },
    tips: { tr: 'On-page ve off-page SEO\'dan bahsedin.', en: 'Mention on-page and off-page SEO.' },
  },
  {
    id: 'fi-j1',
    field: 'finance',
    difficulty: 'junior',
    type: 'technical',
    text: {
      tr: 'Bilanço (balance sheet) nedir?',
      en: 'What is a balance sheet?',
    },
    keywords: {
      tr: ['aktif', 'pasif', 'varlık', 'borç', 'özkaynak', 'finansal durum'],
      en: ['assets', 'liabilities', 'equity', 'financial position', 'balance'],
    },
    tips: { tr: 'Aktif = Pasif + Özkaynak denklemini açıklayın.', en: 'Explain Assets = Liabilities + Equity.' },
  },
  {
    id: 'hr-m1',
    field: 'hr',
    difficulty: 'mid',
    type: 'situational',
    text: {
      tr: 'İki çalışan arasındaki çatışmayı nasıl yönetirsiniz?',
      en: 'How do you manage conflict between two employees?',
    },
    keywords: {
      tr: ['dinleme', 'arabuluculuk', 'çözüm', 'empati', 'politika', 'iletişim'],
      en: ['listening', 'mediation', 'resolution', 'empathy', 'policy', 'communication'],
    },
    tips: { tr: 'Tarafsızlık ve gizlilik ilkelerinden bahsedin.', en: 'Mention neutrality and confidentiality.' },
  },
  {
    id: 'sw-j3',
    field: 'software',
    difficulty: 'mid',
    type: 'behavioral',
    text: {
      tr: 'Bir kod review sürecinde zorlu geri bildirim aldığınız bir durumu anlatın.',
      en: 'Tell me about a time you received tough feedback during a code review.',
    },
    keywords: {
      tr: ['geri bildirim', 'öğrenme', 'gelişim', 'takım', 'kalite', 'açık fikir'],
      en: ['feedback', 'learning', 'growth', 'team', 'quality', 'open-minded'],
    },
    tips: { tr: 'Olumsuz geri bildirimi nasıl olumlu kullandığınızı gösterin.', en: 'Show how you turned negative feedback into improvement.' },
  },
];

export function getQuestionsForInterview(
  field: string,
  difficulty: string,
  count: number,
): Question[] {
  const fieldQuestions = QUESTIONS.filter(
    (q) => q.field === field || q.field === 'general',
  );
  const difficultyQuestions = fieldQuestions.filter(
    (q) => q.difficulty === difficulty,
  );
  const pool = difficultyQuestions.length >= count ? difficultyQuestions : fieldQuestions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
