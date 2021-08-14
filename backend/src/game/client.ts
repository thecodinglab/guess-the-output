import { Socket } from "socket.io";
import { Game } from "./game";
import { GameManager } from "./manager";
import { Player } from "../entities/player";

import { ClientAnswerEvent, ClientCreateEvent, ClientJoinEvent, ClientReadyEvent, SocketEvent } from "../../../interfaces";

export class Client {
  private game: Game | null = null;

  constructor(
    private socket: Socket,
    private gameManager: GameManager
  ) {
    this.socket.on(SocketEvent.clientCreate, this.onCreate.bind(this));
    this.socket.on(SocketEvent.clientJoin, this.onJoin.bind(this));
    this.socket.on(SocketEvent.clientReady, this.onReady.bind(this));
    this.socket.on(SocketEvent.clientAnswer, this.onAnswer.bind(this));
  }

  public onCreate(event: ClientCreateEvent): void {
    const game = this.gameManager.create();
    this.join(game, event);
  }

  public onJoin(event: ClientJoinEvent): void {
    if (this.game) {
      return;
    }

    const game = this.gameManager.select(event.room);
    if (!game) {
      return;
    }

    this.join(game, event);
  }
  
  public onReady(event: ClientReadyEvent): void {
    this.game.ready(this.socket.id);
  }

  public onAnswer(event: ClientAnswerEvent): void {
    this.game.answer(this.socket.id, event.answer);
  }

  private join(game: Game, event: {username: string}) {
    this.socket.join(game.id);

    const player: Player = {
      id: this.socket.id,
      username: event.username,
      ready: false,

      correct: 0,
      wrong: 0,
      unanswered: 0,
    };

    game.join(player);
    this.game = game;
  }
}