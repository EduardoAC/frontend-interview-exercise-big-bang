export type Choice = 'Rock' | 'Paper' | 'Scissors' | 'Lizard' | 'Spock';

export const outcomes = {
  Rock: { winsAgainst: ['Scissors', 'Lizard'], reason: 'Crushes Scissors, Crushes Lizard' },
  Paper: { winsAgainst: ['Rock', 'Spock'], reason: 'Covers Rock, Disproves Spock' },
  Scissors: { winsAgainst: ['Paper', 'Lizard'], reason: 'Cuts Paper, Decapitates Lizard' },
  Lizard: { winsAgainst: ['Paper', 'Spock'], reason: 'Eats Paper, Poisons Spock' },
  Spock: { winsAgainst: ['Scissors', 'Rock'], reason: 'Smashes Scissors, Vaporizes Rock' },
};

export function determineWinner(playerChoice: Choice, computerChoice: Choice): string {
  if (playerChoice === computerChoice) return 'Tie';
  if (outcomes[playerChoice].winsAgainst.includes(computerChoice)) return 'Player';
  return 'Computer';
}

export function getRandomChoice(): Choice {
  const choices: Choice[] = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
  return choices[Math.floor(Math.random() * choices.length)];
}