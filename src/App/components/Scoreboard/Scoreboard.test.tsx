import { screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { Scoreboard } from './Scoreboard';
import { renderWithScore } from '../../utils/renderWithScore';

describe('Scoreboard Component', () => {
  beforeEach(() => {
    sessionStorage.clear(); // Clear sessionStorage before each test
  });

  it('displays initial scores as 0', () => {
    renderWithScore(<Scoreboard />);
    expect(screen.getByText('Player: 0')).toBeInTheDocument();
    expect(screen.getByText('Computer: 0')).toBeInTheDocument();
  });

  it('displays scores from sessionStorage', () => {
    sessionStorage.setItem('playerScore', '5');
    sessionStorage.setItem('computerScore', '3');

    renderWithScore(<Scoreboard />);
    expect(screen.getByText('Player: 5')).toBeInTheDocument();
    expect(screen.getByText('Computer: 3')).toBeInTheDocument();
  });
});