import chalk from "chalk";
import E from "./EventManager";
import Rule from "./Rule";
import { ask } from "./prompter";
import { Color, PlayerType, Feedback } from "./types";

export default class Player {
  protected codes: Color[] = [];
  protected guesses: Color[][] = [];
  protected type: PlayerType = "guesser";
  protected feedback: Feedback = [];

  constructor(public name: string) {}

  get setOfCodes() {
    return this.codes;
  }

  get setOfGuesses() {
    return this.guesses;
  }

  public setType(type: PlayerType) {
    this.type = type;
    return this;
  }

  public setFeedback(feedback: Feedback) {
    E.emit("feedback", feedback);
    this.feedback = feedback;
  }

  public async guess() {
    if (this.isCreator()) return [];

    const answer = await ask("What is your guess? (e.g. rgby) ", {
      predicate: Rule.validateAnswer,
    });

    console.log(chalk.blue(`You guessed: ${answer}`));

    const guess = answer.split("") as Color[];
    this.guesses.push(guess);

    return guess;
  }

  protected isCreator() {
    if (this.type === "creator") {
      console.log(
        chalk.red.bold("As a creator, you are not allowed to guess the codes")
      );
      return true;
    }

    return false;
  }

  public async chooseCodes() {
    if (this.type === "guesser") {
      console.log(
        chalk.red.bold("As a guesser, you are not allowed to choose the codes")
      );
      return;
    }

    const shouldRandomlyGenerate =
      (await ask("Do you want to randomly generate the codes? (y/n) ", {
        predicate: (answer) => answer !== "y" && answer !== "n",
        errorMessage: "Please enter only y or n",
      })) === "y";

    if (shouldRandomlyGenerate) {
      this.codes = Rule.generateRandomCodes();
      console.log(chalk.white(`Generated: ${this.codes.join("")}`));
      return;
    }

    const answer = await ask(
      "Choose codes you want the computer to figure out: (e.g. rgby) ",
      { predicate: Rule.validateAnswer }
    );

    this.codes = answer.split("") as Color[];
    console.log(chalk.white(`Your chosen codes: ${this.codes.join("")}`));
  }
}
