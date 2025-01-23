import automataLogo from '../assets/automata.png'
import './App.css'
import { UsernameForm } from './components/UsernameForm';
import { Scoreboard } from './components/Scoreboard';
import { Game } from './components/Game';
import { useScores } from './context/ScoreContext';

function App() {
  const { scoreboard, addPlayer, isNewGame, createNewGame, numberOfPlayers } = useScores();

  return (
    <div className="App container mx-auto p-4">
      <div className="flex justify-center mb-6">
        <a href="https://automata.tech/" target="_blank" rel="noreferrer">
          <img
            src={String(automataLogo)}
            className="logo automata h-16"
            alt="Automata logo"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4 text-gray-200">Frontend Exercise</h1>
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-400">
        Rock, Paper, Scissors, Lizard, Spock
      </h2>

      {isNewGame && numberOfPlayers < 2 && (
        <div className="container mx-auto mt-6 p-4 space-y-4 bg-gray-800 rounded-lg shadow-lg text-white border border-gray-600">
          <h3 className="text-lg text-gray-400">New game, please enter the two players</h3>
          <UsernameForm onSubmit={addPlayer} />
          {numberOfPlayers > 0 && <div>
            <p className="text-lg text-gray-400">Players joined</p>
            {Object.keys(scoreboard).map((name) => (
              <div
                key={name}
                className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-700 text-gray-200 flex justify-between items-center"
              >
                <span className="text-lg font-medium">{name}</span>
              </div>
            ))}
          </div>}
        </div>
      )}
      {!isNewGame && (
        <div className="space-y-6">
          <button
            onClick={createNewGame}
            className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-all"
          >
            New game
          </button>
          <Scoreboard />
          <Game />
        </div>
      )}
    </div>
  );
}

export default App
