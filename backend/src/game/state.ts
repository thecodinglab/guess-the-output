import { AnswerCorrectness, RoundScores } from "../../../interfaces";
import { Player } from "../entities/player";
import { Answer, Question } from "../entities/question";

export enum State {
  lobby,
  active,
  finished
}

export class StateMachine {

  // public state: State = State.lobby;
  public players: Player[] = new Array();

  public current: Question = null;
  public answers: Record<string, Answer> = {};

  constructor(
    private questions: Question[]
  ) {}

  public find(id: string): Player|null {
    return this.players.find((player: Player) => player.id === id);
  }

  public join(player: Player) {
    this.players.push(player);
  }

  public areReady(): boolean {
    for (const player of this.players) {
      if (!player.ready) {
        return false;
      }
    }
    return true;
  }

  public markReady(id: string) {
    for (const player of this.players) {
      if (player.id === id) {
        player.ready = true;
      }
    }
  }

  public markAllNotReady(): void {
    for (const player of this.players) {
      player.ready = false;
    }
  }

  public next(): boolean {
    if (this.questions.length === 0) {
      return false;
    }

    const idx = Math.floor(Math.random() * this.questions.length);
    const question = this.questions.splice(idx, 1);

    this.current = question[0];
    this.answers = {};

    return true;
  }

  public allAnswered(): boolean {
    return Object.keys(this.answers).length === this.players.length;
  }

  public answer(id: string, answer: Answer): void {
    if (this.answers[id]) {
      return;
    }

    this.answers[id] = answer;
  }

  public score(): RoundScores {
    const score: RoundScores = {};

    for (const player of this.players) {
      const answer = this.answers[player.id];

      if (!answer) {
        player.unanswered++;
        score[player.id] = AnswerCorrectness.unanswered;
      } else if (answer.id === this.current.correct.id) {
        player.correct++;
        score[player.id] = AnswerCorrectness.correct;
      } else {
        player.wrong++;
        score[player.id] = AnswerCorrectness.wrong;
      }
    }

    return score;
  }
}