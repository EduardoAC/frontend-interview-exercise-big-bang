import { useScores } from '../../context/ScoreContext';

export function Scoreboard() {
  const { scoreboard, resetScore} = useScores();

  return (
    <div className="Scoreboard container mx-auto mt-6 p-6 bg-gray-700 rounded-lg shadow-lg text-gray-800">
      <h3 className="text-2xl font-bold text-center mb-6 tracking-wider">
        SCOREBOARD
      </h3>
      <div className="flex flex-col items-center space-y-3">
        {Object.entries(scoreboard).map(([name, score]) => (
          <div
            key={name}
            className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-500 text-gray-200 flex justify-between items-center"
          >
            <span className="text-lg font-medium">{name}</span>
            <span className="text-lg font-semibold text-gray-100">{score}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={resetScore}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 transition-all"
        >
          Reset Scoreboard
        </button>
      </div>
    </div>
  );
};
