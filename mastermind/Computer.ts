import chalk from "chalk";
import E from "./EventManager";
import Player from "./Player";
import Rule from "./Rule";
import { Color } from "./types";

export default class Computer extends Player {
  private totalCodes = Rule.getPossibleCodes();

  public override async guess() {
    if (this.isCreator()) return [];

    const DELAY = 2000;
    console.log(chalk.blue(`${this.name} is thinking...`));

    return new Promise((res) => {
      setTimeout(() => {
        const randomGuess = Rule.getRandomCode(this.totalCodes);

        this.totalCodes = Rule.getFilteredCodes(
          this.guesses.at(-1) ?? [],
          this.totalCodes,
          this.feedback
        );
        this.guesses.push(randomGuess);
        E.emit("computerGuess", {
          randomGuess,
          name: this.name,
        });

        res(randomGuess);
      }, DELAY);
    }) as Promise<Color[]>;
  }

  public override async chooseCodes() {
    this.codes = Rule.generateRandomCodes();
  }
}
