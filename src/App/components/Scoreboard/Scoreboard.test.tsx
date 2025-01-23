import { screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { Scoreboard } from './Scoreboard';
import { renderWithScore } from '../../utils/renderWithScore';

describe('Scoreboard Component', () => {
  beforeEach(() => {
    sessionStorage.clear(); // Clear sessionStorage before each test
  });

  it('displays initial scores as 0', () => {
    const scoreboard = {'teo': 0, 'juan': 0}
    sessionStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    renderWithScore(<Scoreboard />);
    expect(screen.getByText('teo: 0')).toBeInTheDocument();
    expect(screen.getByText('juan: 0')).toBeInTheDocument();
  });

  it('displays scores from sessionStorage', () => {
    const scoreboard = {'teo': 5, 'juan': 3}
    sessionStorage.setItem('scoreboard', JSON.stringify(scoreboard));

    renderWithScore(<Scoreboard />);
    expect(screen.getByText('teo: 5')).toBeInTheDocument();
    expect(screen.getByText('juan: 3')).toBeInTheDocument();
  });
});