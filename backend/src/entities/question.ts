export interface Question {
  id: string;

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
    return [
      {
        id: 'awd',
        language: 'javascript',
        snippet: `console.log('Hello, World!')`,
        options: [
          { id: 'awd', value: 'Hello, World!' },
        ],
        correct: { id: 'awd', value: 'Hello, World!' },
      }
    ];
  }
}