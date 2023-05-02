import chalk from "chalk";
import E from "./EventManager";
import Player from "./Player";
import Rule from "./Rule";
import { ask, rl } from "./prompter";
import { Feedback } from "./types";

export default class Game {
  private guesser: Player = this.player;
  private creator: Player = this.computer;

  constructor(private player: Player, private computer: Player) {}

  async init() {
    await this.initializePlayerTypes();
    await this.creator.chooseCodes();

    E.emit("gameStart", null);

    while (true) {
      const feedback = Rule.evaluate(
        this.creator.setOfCodes,
        await this.guesser.guess()
      );

      this.guesser.setFeedback(feedback);

      if (this.isGameOver(feedback)) {
        console.log(chalk.bold.green("Game has ended"));
        rl.close();
        break;
      }
    }
  }

  private async initializePlayerTypes() {
    const isGuesser =
      (await ask("Do you want to be the guesser or the creator? (g/c) ", {
        predicate: (answer) => answer !== "g" && answer !== "c",
        errorMessage: "You can only choose between guesser(g) and creator(c)",
      })) === "g";

    const player = this.player.setType(isGuesser ? "guesser" : "creator");
    const computer = this.computer.setType(!isGuesser ? "guesser" : "creator");

    this.guesser = isGuesser ? player : computer;
    this.creator = !isGuesser ? player : computer;
  }

  private isGameOver(feedback: Feedback) {
    return (
      Rule.isMaxTurn(this.guesser.setOfGuesses.length) || Rule.isWin(feedback)
    );
  }
}
