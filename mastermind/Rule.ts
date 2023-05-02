import chalk from "chalk";
import { Color, Feedback } from "./types";

export default class Rule {
  public static MAX_PEGS = 4;
  public static colors = [Color.r, Color.g, Color.b, Color.c, Color.y, Color.m];
  public static MAX_TURNS = 12;

  public static validateAnswer(answer: string) {
    if (!Rule.isFourColor(answer)) {
      console.log(chalk.red.bold("Please only enter 4 colors"));
      return true;
    }

    if (!Rule.isSetOfCodesValid(answer)) {
      console.log(
        chalk.red.bold(
          "Please only enter one the following colors: (r,g,b,c,y,m)"
        )
      );
      return true;
    }

    return false;
  }

  public static evaluate(setOfCodes: Color[], guess: Color[]) {
    return guess
      .map((color, i) => {
        const isInCode = setOfCodes.includes(color);
        if (!isInCode) return 0;

        return setOfCodes[i] === color ? 1 : 2;
      })
      .filter(Boolean) as Feedback;
  }

  public static isMaxTurn(guesserTurns: number) {
    return guesserTurns === Rule.MAX_TURNS;
  }

  public static isWin(feedback: Feedback) {
    return (
      feedback.length === Rule.MAX_PEGS &&
      feedback.every((state) => state === 1)
    );
  }

  public static getPossibleCodes(
    pegIndex = 0,
    currentCombination: Color[] = [],
    combinations: Color[][] = []
  ) {
    if (pegIndex === 4) {
      combinations.push(currentCombination);
      return combinations;
    }

    for (const color of Rule.colors) {
      const newCombination = [...currentCombination];
      newCombination.push(color);
      this.getPossibleCodes(pegIndex + 1, newCombination, combinations);
    }

    return combinations;
  }

  public static getFilteredCodes(
    guess: Color[],
    totalCodes: Color[][],
    feedback: Feedback
  ) {
    return totalCodes.filter(
      (code) => Rule.evaluate(code, guess).join("") === feedback.join("")
    );
  }

  public static generateRandomCodes(): Color[] {
    return Array.from(
      { length: Rule.MAX_PEGS },
      () => Rule.colors[Math.floor(Math.random() * Rule.colors.length)]
    ) as Color[];
  }

  public static getRandomCode(totalCodes: Color[][]) {
    const randomIndex = Math.floor(Math.random() * totalCodes.length);
    return totalCodes[randomIndex] ?? [];
  }

  private static isFourColor(answer: string) {
    return answer.length === Rule.MAX_PEGS;
  }

  private static isSetOfCodesValid(answer: string) {
    return answer
      .split("")
      .every((letter) => Rule.colors.includes(letter as Color));
  }
}
