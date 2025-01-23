import { useScores } from '../../context/ScoreContext';

export function Scoreboard() {
  const { playerScore, computerScore, setComputerScore, setPlayerScore} = useScores();

  const onResetScoreboard = () => {
    setPlayerScore(0);
    setComputerScore(0);
  }
  return (
    <div className="Scoreboard">
      <h3>Scoreboard</h3>
      <p>Player: {playerScore}</p>
      <p>Computer: {computerScore}</p>
      <button onClick={onResetScoreboard}>Reset scoreboard</button>
    </div>
  );
};
