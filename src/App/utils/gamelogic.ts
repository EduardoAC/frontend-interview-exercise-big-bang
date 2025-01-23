import { Choice, PlayerChoices } from "../types/game.types";

export const outcomes = {
  Rock: { winsAgainst: ['Scissors', 'Lizard'], reason: 'Crushes Scissors, Crushes Lizard' },
  Paper: { winsAgainst: ['Rock', 'Spock'], reason: 'Covers Rock, Disproves Spock' },
  Scissors: { winsAgainst: ['Paper', 'Lizard'], reason: 'Cuts Paper, Decapitates Lizard' },
  Lizard: { winsAgainst: ['Paper', 'Spock'], reason: 'Eats Paper, Poisons Spock' },
  Spock: { winsAgainst: ['Scissors', 'Rock'], reason: 'Smashes Scissors, Vaporizes Rock' },
};

export function getRandomChoice(): Choice {
  const choices: Choice[] = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
  return choices[Math.floor(Math.random() * choices.length)];
}

export function determineWinner(choices: PlayerChoices): string | null {
  const players = Object.keys(choices);
  if (players.length !== 2) {
    // We kept it for only two players for now
    throw new Error("The game requires exactly two players.");
  }

  const [player1, player2] = players;
  const choice1 = choices[player1];
  const choice2 = choices[player2];

  if (choice1 === choice2) {
    return null; // It's a tie
  }

  if (outcomes[choice1].winsAgainst.includes(choice2)) {
    return player1; // Player 1 wins
  }

  return player2; // Player 2 wins
}