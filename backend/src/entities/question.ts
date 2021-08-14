export interface Question {
  id: string;
  question: string;

  language: string;
  snippet: string;

  options: Answer[];
  correct: Answer;
}

export interface Answer {
  id: string;
  value: string;
}

export class QuestionRepository {
  list(): Question[] {
    return [];
  }
}