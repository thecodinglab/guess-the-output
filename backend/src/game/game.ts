import { BroadcastOperator } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { StateMachine } from "./state";
import { Player } from "../entities/player";
import { Answer } from "../entities/question";

import { ServerFinishEvent, ServerQuestionEvent, ServerRoomEvent, SocketEvent, FinalScores, AnswerCorrectness, ServerScoreEvent } from "../../../interfaces";

export class Game {

  private stateMachine: StateMachine = new StateMachine([
    {
      id: 'awd',
      question: '',
      language: 'javascript',
      snippet: `console.log('Hello, World!')`,
      options: [
        { id: 'awd', value: 'Hello, World!' },
      ],
      correct: { id: 'awd', value: 'Hello, World!' },
    }
  ]);

  constructor(
    public id: string,
    private server: BroadcastOperator<DefaultEventsMap>
  ) {}

  public join(player: Player): void {
    this.stateMachine.join(player);
    this.emitRoom();
  }

  public ready(id: string): void {
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
    }
  }

  private emitRoom(): void {
    const players = this.stateMachine.players.map((player: Player) => ({
      username: player.username,
      ready: player.ready,
    }));

    const event: ServerRoomEvent = {
      room: this.id,
      players: players,
    }

    this.server.emit(SocketEvent.serverRoom, event);
  }

  private emitQuestion(): void {
    const event: ServerQuestionEvent = {
      question: {
        language: this.stateMachine.current.language,
        value: this.stateMachine.current.snippet,
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
