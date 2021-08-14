export interface Question {
  id: string;

  language: string;
  snippet: string;
  timeout: number;

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
        id: 'js',
        language: 'javascript',
        snippet: `console.log('Hello, World!')`,
        timeout: 10,
        options: [
          { id: 'a', value: 'Hello, World!' },
          { id: 'b', value: 'Ananas' },
          { id: 'c', value: 'Banane' },
          { id: 'd', value: 'Something' },
        ],
        correct: { id: 'a', value: 'Hello, World!' },
      },
      {
        id: 'go',
        language: 'golang',
        snippet: `fmt.Println("Hello, World!")`,
        timeout: 10,
        options: [
          { id: 'a', value: 'Hello, World!' },
          { id: 'b', value: 'Ananas' },
          { id: 'c', value: 'Banane' },
          { id: 'd', value: 'Something' },
        ],
        correct: { id: 'a', value: 'Hello, World!' },
      }
    ];
  }
}