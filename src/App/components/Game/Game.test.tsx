import { screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Game } from './Game';
import { renderWithScore } from '../../utils/renderWithScore';

describe('Game Component', () => {
  beforeEach(() => {
    sessionStorage.clear(); // Clear sessionStorage before each test
    const scoreboard = {'teo': 0, 'juan': 0}
    sessionStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    renderWithScore(<Game />);
  });

  it.each(['teo', 'juan'])('renders all choice buttons', (playerUsername) => {
    const choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
    const section = within(screen.getByText(`Make your choice ${playerUsername}`).closest("div")!)
    choices.forEach((choice) => {
      expect(section.getByText(choice)).toBeInTheDocument();
    });
  });

  it('displays the result after player and computer make choices', () => {
    const teoSection = within(screen.getByText(`Make your choice teo`).closest("div")!)
    const teoScissorsButton = teoSection.getByText('Scissors');
    fireEvent.click(teoScissorsButton);
    const juanSection = within(screen.getByText(`Make your choice juan`).closest("div")!)
    const juanRockButton = juanSection.getByText('Rock');
    fireEvent.click(juanRockButton);

    expect(screen.getByText('teo chose: Scissors')).toBeInTheDocument();
    expect(screen.getByText('juan chose: Rock')).toBeInTheDocument();

    const getResultButton = screen.getByText('Get result');
    fireEvent.click(getResultButton);

    expect(screen.getByText('juan wins!')).toBeInTheDocument();

  });

  it('displays a tie if both player and computer choose the same', () => {
    const teoSection = within(screen.getByText(`Make your choice teo`).closest("div")!)
    const teoRockButton = teoSection.getByText('Rock');
    fireEvent.click(teoRockButton);
    const juanSection = within(screen.getByText(`Make your choice juan`).closest("div")!)
    const juanRockButton = juanSection.getByText('Rock');
    fireEvent.click(juanRockButton);

    expect(screen.getByText('teo chose: Rock')).toBeInTheDocument();
    expect(screen.getByText('juan chose: Rock')).toBeInTheDocument();
    const getResultButton = screen.getByText('Get result');
    fireEvent.click(getResultButton);

    expect(screen.getByText("It's a tie!")).toBeInTheDocument();

  });

  it('updates the score after each round', () => {
    const teoSection = within(screen.getByText(`Make your choice teo`).closest("div")!)
    const teoSpockButton = teoSection.getByText('Spock');
    fireEvent.click(teoSpockButton);
    const juanSection = within(screen.getByText(`Make your choice juan`).closest("div")!)
    const juanRockButton = juanSection.getByText('Rock');
    fireEvent.click(juanRockButton);

    expect(screen.getByText('teo chose: Spock')).toBeInTheDocument();
    expect(screen.getByText('juan chose: Rock')).toBeInTheDocument();

    const getResultButton = screen.getByText('Get result');
    fireEvent.click(getResultButton);

    expect(screen.getByText("teo wins!")).toBeInTheDocument();

    const updatedScored = {'teo': 1, 'juan': 0}
    expect(sessionStorage.getItem('scoreboard')).toBe(JSON.stringify(updatedScored));
  })
});