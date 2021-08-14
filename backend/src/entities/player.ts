export interface Player {
  id: string;
  username: string;

  ready: boolean;

  correct: number;
  wrong: number;
  unanswered: number;
}