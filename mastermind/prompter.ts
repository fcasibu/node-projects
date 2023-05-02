import chalk from "chalk";
import readline from "readline/promises";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function ask(
  prompt: string,
  options: { predicate: (answer: string) => boolean; errorMessage?: string }
) {
  const { predicate, errorMessage } = options;
  let answer = await rl.question(prompt);

  while (predicate(answer)) {
    if (errorMessage) {
      console.log(chalk.red.bold(errorMessage));
    }
    answer = await rl.question(prompt);
  }

  return answer;
}
