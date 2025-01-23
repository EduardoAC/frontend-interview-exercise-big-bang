import { useState } from 'react';
import automataLogo from '../assets/automata.png'
import './App.css'
import UsernameForm from '../components/UsernameForm';
import Scoreboard from '../components/Scoreboard';
import Game from '../components/Game';

function App() {
  const [username, setUsername] = useState<string | null>(null);
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
        {!username ? (
          <UsernameForm setUsername={setUsername} />
        ) : (
          <>
            <h1>Welcome, {username}!</h1>
            <Scoreboard />
            <Game />
          </>
        )}
      </div>
    </>
  )
}

export default App
