import { Color } from "./types";
import Computer from "./Computer";
import { colors } from "./colors";
import Player from "./Player";
import Rule from "./Rule";
import Game from "./Game";
import E from "./EventManager";
import chalk from "chalk";

const game = new Game(new Player("You"), new Computer("Bob"));
game.init();

E.on("computerGuess", (arg) => {
  const coloredText = arg?.randomGuess
    .map((color: Color) => {
      switch (color) {
        case Color.r:
          return `${colors.fg.red}■ `;
        case Color.g:
          return `${colors.fg.green}■ `;
        case Color.b:
          return `${colors.fg.blue}■ `;
        case Color.m:
          return `${colors.fg.magenta}■ `;
        case Color.c:
          return `${colors.fg.cyan}■ `;
        case Color.y:
          return `${colors.fg.yellow}■ `;
        default:
          console.log(chalk.red.white(`Unexpected color: ${color}`));
          return null;
      }
    })
    .join("");

  console.log(chalk.blue(`${arg?.name} guessed: ${coloredText}`));
});

E.on("gameStart", () => {
  console.log(chalk.bold.blueBright("Feedback colors:"));
  console.log(chalk.red("■ correct color in correct position"));
  console.log(chalk.white("■ correct color in wrong position\n"));

  console.log(chalk.green("Here are the list of colors you can choose from:"));
  for (const color of Rule.colors) {
    switch (color) {
      case Color.r:
        console.log(chalk.red("■ Red = r"));
        break;
      case Color.g:
        console.log(chalk.green("■ Green = g"));
        break;
      case Color.b:
        console.log(chalk.blue("■ Blue = b"));
        break;
      case Color.m:
        console.log(chalk.magenta("■ Magenta = m"));
        break;
      case Color.c:
        console.log(chalk.cyan("■ Cyan = c"));
        break;
      case Color.y:
        console.log(chalk.yellow("■ Yellow = y"));
        break;
      default:
        console.log(chalk.red.bold(`Unexpected color: ${color}`));
    }
  }
});

E.on("feedback", (f) => {
  const feedback = f
    ?.map((el: number) =>
      el === 1 ? `${colors.fg.red}■` : `${colors.fg.white}■`
    )
    .join("");

  console.log(chalk.white(`Feedback: ${feedback}`));
});
