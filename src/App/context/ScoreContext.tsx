import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a type for the score context
interface ScoreContextType {
  playerScore: number;
  computerScore: number;
  setPlayerScore: (score: number) => void;
  setComputerScore: (score: number) => void;
}

// Create the context with default values
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Provider component to wrap around the app
export const ScoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerScore, setPlayerScore] = useState<number>(parseInt(sessionStorage.getItem('playerScore') || '0', 10));
  const [computerScore, setComputerScore] = useState<number>(parseInt(sessionStorage.getItem('computerScore') || '0', 10));

  // Save the scores in sessionStorage
  const saveScoresToSessionStorage = () => {
    sessionStorage.setItem('playerScore', playerScore.toString());
    sessionStorage.setItem('computerScore', computerScore.toString());
  };

  // Sync the state to sessionStorage whenever scores change
  React.useEffect(() => {
    saveScoresToSessionStorage();
  }, [playerScore, computerScore]);

  return (
    <ScoreContext.Provider value={{ playerScore, computerScore, setPlayerScore, setComputerScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

// Custom hook to use the ScoreContext
export const useScores = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScores must be used within a ScoreProvider');
  }
  return context;
};
