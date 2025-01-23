import automataLogo from '../assets/automata.png'
import './App.css'
import { UsernameForm } from './components/UsernameForm';
import { Scoreboard } from './components/Scoreboard';
import { Game } from './components/Game';
import { useScores } from './context/ScoreContext';

function App() {
  const { scoreboard, addPlayer } = useScores();
  return (
    <>
      <div>
        <a href="https://automata.tech/" target="_blank" rel="noreferrer">
          <img src={String(automataLogo)} className="logo automata" alt="Automata logo" />
        </a>
      </div>
      <h1>Frontend Exercise</h1>
      <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
      <div className="Game">
        {Object.keys(scoreboard).length < 2 && <UsernameForm onSubmit={addPlayer} />}
        <Scoreboard />
        <Game />
      </div>
    </>
  )
}

export default App
