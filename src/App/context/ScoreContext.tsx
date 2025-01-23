import React, { createContext, useContext, useState, ReactNode } from "react";

type Scoreboard = Record<string, number>;

// Define a type for the score context
interface ScoreContextType {
  scoreboard: Scoreboard;
  isNewGame: boolean;
  numberOfPlayers: number;
  addPlayer: (name: string) => void;
  incrementScore: (player: string) => void;
  resetScore: () => void;
  createNewGame: () => void;
}

// Create the context with default values
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Provider component to wrap around the app
export const ScoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const scoreboardSession = JSON.parse(
    sessionStorage.getItem("scoreboard") || "{}",
  ) as Scoreboard;
  const [isNewGame, setNewGame] = useState(
    Object.keys(scoreboardSession).length < 2,
  );
  const [numberOfPlayers, updateNumberOfPlayers] = useState(
    Object.keys(scoreboardSession).length,
  );
  const [scoreboard, updateScoreboard] =
    useState<Scoreboard>(scoreboardSession);

  // Save the scores in sessionStorage
  const saveScoresToSessionStorage = () => {
    sessionStorage.setItem("scoreboard", JSON.stringify(scoreboard));
  };

  const addPlayer = (name: string) => {
    updateScoreboard({ ...scoreboard, [name]: 0 });
    updateNumberOfPlayers(numberOfPlayers + 1);
    if (numberOfPlayers === 1) {
      setNewGame(false);
    }
  };

  const incrementScore = (playerName: string) => {
    const currentScore = scoreboard[playerName];
    if (typeof currentScore === "number") {
      const newScoreboard = { ...scoreboard, [playerName]: currentScore + 1 };
      updateScoreboard(newScoreboard);
    }
  };

  const resetScore = () => {
    const resetedScore = Object.keys(scoreboard).reduce(
      (acc: Scoreboard, name) => {
        acc[name] = 0;
        return acc;
      },
      {},
    );
    updateScoreboard(resetedScore);
  };

  const createNewGame = () => {
    sessionStorage.removeItem("scoreboard");
    updateScoreboard({});
    updateNumberOfPlayers(0);
    setNewGame(true);
  };
  // Sync the state to sessionStorage whenever scores change
  React.useEffect(() => {
    saveScoresToSessionStorage();
  }, [scoreboard]);

  return (
    <ScoreContext.Provider
      value={{
        scoreboard,
        addPlayer,
        incrementScore,
        resetScore,
        createNewGame,
        numberOfPlayers,
        isNewGame,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

// Custom hook to use the ScoreContext
export const useScores = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScores must be used within a ScoreProvider");
  }
  return context;
};
