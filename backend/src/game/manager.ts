import { BroadcastOperator, Namespace, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { QuestionRepository } from "../entities/question";
import { Game } from "./game";

export class GameManager {
  private games: Record<string, Game> = {};

  constructor(
    private server: Server
  ) {
    setInterval(this.tick.bind(this), 500);
  }

  public create(): Game {
    let id = this.generateID();
    while (this.games[id]) {
      id = this.generateID();
    }

    const namespace: BroadcastOperator<DefaultEventsMap> = this.server.in(id);
    const questionRepo = new QuestionRepository();

    const game = new Game(id, namespace, questionRepo);
    this.games[id] = game;
    return game;
  }

  public select(id: string): Game | null {
    return this.games[id];
  }

  private tick(): void {
    for (const id in this.games) {
      const game = this.games[id];
      game.tick();
    }
  }

  private generateID(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';

    let str = '';
    for (let i = 0; i < 8; i++) {
      str += characters[Math.floor(Math.random() * characters.length)];
    }

    return str;
  }
}