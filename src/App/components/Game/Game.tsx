import { useEffect, useState } from 'react';
import { determineWinner } from '../../utils/gamelogic';
import { useScores } from '../../context/ScoreContext';
import { Choice } from '../../types/game.types';

export function Game() {
  const [playersChoice, setPlayersChoice] = useState<Record<string, Choice>>({});
  const [result, setResult] = useState<string | null>(null);
  const { scoreboard, incrementScore, numberOfPlayers } = useScores();
  const numberOfChoicesDone = Object.keys(playersChoice).length

  const handleChoice = (playerName: string, choice: Choice) => {
    setPlayersChoice({ ...playersChoice, [playerName]: choice });
    setResult(null);
  };
  const handleNewRound = () => {
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
    <div className="Game container mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">Choose your weapon:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(scoreboard).map((name) => (
          <div
            key={`choice-${name}`}
            id={name}
            className="bg-gray-700 shadow-lg rounded-lg p-4 flex flex-col items-center text-gray-200 border border-gray-700 hover:shadow-xl transition-shadow"
          >
            <p className="font-semibold text-lg mb-4">Make your choice, {name}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'].map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleChoice(name, choice as Choice)}
                  disabled={typeof playersChoice[name] !== 'undefined'}
                  className={`px-4 py-2 rounded-lg border transition-all 
                    ${typeof playersChoice[name] === 'undefined' ? 'bg-blue-700 text-gray-200 hover:bg-blue-800' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                >
                  {choice}
                </button>
              ))}
            </div>
            {playersChoice[name] && <p className="text-sm text-gray-400">
              {name} chose: <span className="font-bold text-gray-200">{playersChoice[name]}</span>
            </p>}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleNewRound}
          className={`px-6 py-3 rounded-lg border transition-all 
            ${numberOfPlayers === numberOfChoicesDone ? 'bg-blue-700 text-gray-200 hover:bg-blue-800' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
          disabled={numberOfPlayers !== numberOfChoicesDone}
        >
          Get result
        </button>

        {result &&<h3 className="text-xl font-bold mt-4 text-gray-200">
          {result === "tie" ? "It's a tie!" : `${result} wins!`}
        </h3>}
      </div>
    </div>
  );
};