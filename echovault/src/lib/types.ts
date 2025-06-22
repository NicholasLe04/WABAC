export interface Memory {
  id: string;
  userId: string;
  date: string;
  summary: string;
  tags?: string[];
}

export interface Insight {
  id: string;
  userId: string;
  date: string;
  insight: string;
}

export interface Reminder {
  id: string;
  userId: string;
  date: string;
  title: string;
  notes?: string;
}

export interface PerformanceMetrics {
  id: string;
  userId: string;
  date: string;
  accuracyPercentage: number;
  vocabularyComplexity: number;
  forgottenMemoriesCount: number;
  totalMemoriesReviewed: number;
}

export interface VocabularyScore {
  word: string;
  complexity: number;
  frequency: number;
} 