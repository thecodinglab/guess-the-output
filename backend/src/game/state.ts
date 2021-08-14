import { AnswerCorrectness, RoundScores } from "../interfaces";
import { Player } from "../entities/player";
import { Answer, Question } from "../entities/question";
import * as moment from "moment";

export class StateMachine {

  public players: Player[] = new Array();

  public current: Question = null;
  public answers: Record<string, Answer> = {};
  public expiry: moment.Moment = null;

  public questionCount: number;

  constructor(
    private questions: Question[]
  ) {
    this.questionCount = this.questions.length;
  }

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
    this.expiry = moment().add(10, 'seconds');

    return true;
  }

  public reset(): void {
    this.current = null;
    this.answers = {};

    this.markAllNotReady();
  }

  public isExpired(): boolean {
    return this.current && !this.allAnswered() && moment().isAfter(this.expiry);
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