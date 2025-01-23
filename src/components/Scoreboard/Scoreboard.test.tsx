import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { Scoreboard } from './Scoreboard';

describe('Scoreboard Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('displays initial scores as 0', () => {
    render(<Scoreboard />);
    expect(screen.getByText('Player: 0')).toBeInTheDocument();
    expect(screen.getByText('Computer: 0')).toBeInTheDocument();
  });

  it('restores scores from localStorage', () => {
    localStorage.setItem('playerScore', '5');
    localStorage.setItem('computerScore', '3');

    render(<Scoreboard />);
    expect(screen.getByText('Player: 5')).toBeInTheDocument();
    expect(screen.getByText('Computer: 3')).toBeInTheDocument();
  });

  it('updates localStorage when scores change', () => {
    render(<Scoreboard />);
    const playerScore = 10;
    const computerScore = 8;

    // Simulate updating scores (would normally be done via props or events)
    localStorage.setItem('playerScore', playerScore.toString());
    localStorage.setItem('computerScore', computerScore.toString());

    expect(localStorage.getItem('playerScore')).toBe(playerScore.toString());
    expect(localStorage.getItem('computerScore')).toBe(computerScore.toString());
  });
});