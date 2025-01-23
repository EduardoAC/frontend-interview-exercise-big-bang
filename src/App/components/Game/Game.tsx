import { useEffect, useState } from 'react';
import { determineWinner } from '../../utils/gamelogic';
import { useScores } from '../../context/ScoreContext';
import { Choice } from '../../types/game.types';

export function Game() {
  const [playersChoice, setPlayersChoice] = useState<Record<string, Choice>>({});
  const [result, setResult] = useState<string | null>(null);
  const { scoreboard, incrementScore } = useScores();

  const handleChoice = (playerName: string, choice: Choice) => {
    setPlayersChoice({ ...playersChoice, [playerName]: choice });
  };
  const handleNewRound = () => {
    const numberOfPlayers = Object.keys(scoreboard).length;
    const numberOfChoicesDone = Object.keys(playersChoice).length
    if (numberOfPlayers === numberOfChoicesDone) {
      const winnerName = determineWinner(playersChoice);
      setResult(winnerName);
      if (winnerName) {
        incrementScore(winnerName);
      }
    }
    setPlayersChoice({})
  }

  useEffect(() => {

  }, [scoreboard, playersChoice])

  return (
    <div className="Game">
      <h2>Choose your weapon:</h2>
      <div>
        {Object.keys(scoreboard).map((name) => (
          <div key={`choice-${name}`} id={name}>
            <p>Make your choice {name}</p>
            {['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'].map((choice) => (
              <button key={choice} onClick={() => handleChoice(name, choice as Choice)} disabled={typeof playersChoice[name] !== "undefined"}>
                {choice}
              </button>
            ))}
            <p>{name} chose: {playersChoice[name]}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleNewRound}>Get result</button>
        <h3>{result === null ? 'It\'s a tie!' : `${result} wins!`}</h3>
      </div>
    </div>
  );
};