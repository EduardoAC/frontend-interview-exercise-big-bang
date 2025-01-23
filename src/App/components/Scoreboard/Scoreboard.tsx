import { useScores } from '../../context/ScoreContext';

export function Scoreboard() {
  const { scoreboard, resetScore} = useScores();

  return (
    <div className="Scoreboard">
      <h3>Scoreboard</h3>
      {Object.entries(scoreboard).map(([ name, score ]) => (
        <p key={name}>{name}: {score}</p>
      ))}
      <button onClick={resetScore}>Reset scoreboard</button>
    </div>
  );
};
