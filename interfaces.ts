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
  scores: {
    [id: string]: AnswerCorrectness;
  }
}

export interface ServerFinishEvent {
  scores: {
    [id: string]: Record<AnswerCorrectness, number>;
  }
}

export interface Lobby {
  players: Player[];
}

export interface Player {
  username: string;
  ready: boolean;
}

export interface Question {
  language: string;
  value: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  value: string;
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
  correct, wrong, unanswered
}
