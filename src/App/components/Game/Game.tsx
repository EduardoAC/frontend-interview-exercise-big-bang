import { useState } from 'react';
import { Choice, getRandomChoice, determineWinner } from '../../utils/gamelogic';
import { useScores } from '../../context/ScoreContext';

export function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const { playerScore, computerScore, setPlayerScore, setComputerScore } = useScores();

  const handleChoice = (choice: Choice) => {
    const computer = getRandomChoice();
    setPlayerChoice(choice);
    setComputerChoice(computer);
    const ganeOutcome = determineWinner(choice, computer);
    setResult(ganeOutcome);
    if(ganeOutcome === 'Computer') {
      setComputerScore(computerScore + 1);
    } else if (ganeOutcome === "Player") {
      setPlayerScore(playerScore + 1);
    }
  };

  return (
    <div className="Game">
      <h2>Choose your weapon:</h2>
      {['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'].map((choice) => (
        <button key={choice} onClick={() => handleChoice(choice as Choice)}>
          {choice}
        </button>
      ))}
      {result && (
        <div>
          <p>You chose: {playerChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <h3>{result === 'Tie' ? 'It\'s a tie!' : `${result} wins!`}</h3>
        </div>
      )}
    </div>
  );
};