import { useState, useEffect } from 'react';

const Scoreboard = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  useEffect(() => {
    const savedPlayerScore = localStorage.getItem('playerScore');
    const savedComputerScore = localStorage.getItem('computerScore');

    if (savedPlayerScore && savedComputerScore) {
      setPlayerScore(parseInt(savedPlayerScore, 10));
      setComputerScore(parseInt(savedComputerScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playerScore', playerScore.toString());
    localStorage.setItem('computerScore', computerScore.toString());
  }, [playerScore, computerScore]);

  return (
    <div className="Scoreboard">
      <h3>Scoreboard</h3>
      <p>Player: {playerScore}</p>
      <p>Computer: {computerScore}</p>
    </div>
  );
};

export default Scoreboard;