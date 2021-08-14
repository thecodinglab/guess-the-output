import { BroadcastOperator } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { StateMachine } from "./state";
import { Player } from "../entities/player";
import { Answer, QuestionRepository } from "../entities/question";

import { ServerFinishEvent, ServerQuestionEvent, ServerRoomEvent, SocketEvent, FinalScores, AnswerCorrectness, ServerScoreEvent } from "../interfaces";

export class Game {

  private stateMachine: StateMachine;

  constructor(
    public id: string,
    private server: BroadcastOperator<DefaultEventsMap>,
    questionRepo: QuestionRepository,
  ) {
    const questions = questionRepo.list();
    this.stateMachine = new StateMachine(questions);
  }

  public join(player: Player): void {
    this.stateMachine.join(player);
    this.emitRoom();
  }

  public ready(id: string): void {
    if (this.stateMachine.current) {
      // current question is still in progress
      return;
    }

    this.stateMachine.markReady(id);
    this.emitRoom();

    if (this.stateMachine.areReady()) {
      if (this.stateMachine.next()) {
        this.emitQuestion();
      } else {
        this.emitEnding();
      }
    }
  }

  public answer(id: string, answer: Answer) {
    this.stateMachine.answer(id, answer);

    if (this.stateMachine.allAnswered()) {
      this.emitScore();

      this.stateMachine.reset();
      this.emitRoom();
    }
  }

  public tick(): void {
    if (this.stateMachine.isExpired()) {
      this.emitScore();

      this.stateMachine.reset();
      this.emitRoom();
    }
  }

  private emitRoom(): void {
    const players = this.stateMachine.players.map((player: Player) => ({
      id: player.id,
      username: player.username,
      ready: player.ready,
    }));

    const event: ServerRoomEvent = {
      room: this.id,
      players: players,
      total: this.stateMachine.questionCount,
    }

    this.server.emit(SocketEvent.serverRoom, event);
  }

  private emitQuestion(): void {
    const event: ServerQuestionEvent = {
      question: {
        language: this.stateMachine.current.language,
        value: this.stateMachine.current.snippet,
        timeout: this.stateMachine.current.timeout,
        answers: this.stateMachine.current.options,
      },
    };

    this.server.emit(SocketEvent.serverQuestion, event);
  }

  private emitScore(): void {
    const scores = this.stateMachine.score();

    const event: ServerScoreEvent = {
      scores
    };

    this.server.emit(SocketEvent.serverScore, event);
  }

  private emitEnding(): void {
    const scores = this.stateMachine.players.reduce((acc: FinalScores, player: Player) => {
      acc[player.id] = {
        [AnswerCorrectness.correct]: player.correct,
        [AnswerCorrectness.wrong]: player.wrong,
        [AnswerCorrectness.unanswered]: player.unanswered,
      };

      return acc;
  }, {});

    const event: ServerFinishEvent = {
      scores,
    };

    this.server.emit(SocketEvent.serverFinish, event);
  }
}
