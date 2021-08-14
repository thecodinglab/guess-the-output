export interface ClientCreateEvent {
  username: string;
}

export interface ClientJoinEvent {
  room: string;
  username: string;
}

export interface ServerRoomEvent {
  room: string;
  players: Player[];

  total: number;
}

export interface ClientReadyEvent {

}

export interface ServerQuestionEvent {
  question: Question;
}

export interface ClientAnswerEvent {
  answer: Answer;
}

export interface ServerScoreEvent {
  scores: RoundScores;
}

export interface ServerFinishEvent {
  scores: FinalScores;
}

export interface Lobby {
  players: Player[];
}

export interface Player {
  id: string;
  username: string;
  ready: boolean;
}

export interface Question {
  language: string;
  value: string;
  timeout: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  value: string;
}

export interface RoundScores {
  [id: string]: AnswerCorrectness;
}

export interface FinalScores {
  [id: string]: Record<AnswerCorrectness, number>;
}

export enum SocketEvent {
  serverRoom = 'room',
  serverQuestion = 'question',
  serverScore = 'score',
  serverFinish = 'finish',

  clientCreate = 'create',
  clientJoin = 'join',
  clientReady = 'ready',
  clientAnswer = 'answer',
}

export enum AnswerCorrectness {
  correct = 'correct',
  wrong = 'wrong',
  unanswered = 'unanswered',
}
