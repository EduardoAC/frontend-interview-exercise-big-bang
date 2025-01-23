import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, MockInstance, beforeEach } from 'vitest';
import { Game } from './Game';

describe('Game Component', () => {
    beforeEach(() => {})
    it('renders all choice buttons', () => {
        render(<Game />);
        const choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
        choices.forEach((choice) => {
            expect(screen.getByText(choice)).toBeInTheDocument();
        });
    });

    it('displays the result after player and computer make choices', () => {
        const rockMock = vi.spyOn(Math, 'random').mockReturnValue(0.1); // Mock computer choice to always be 'Rock'

        render(<Game />); // We want to mock before we trigger the game so we need to render here.
        const scissorsButton = screen.getByText('Scissors');
        fireEvent.click(scissorsButton);

        expect(screen.getByText('You chose: Scissors')).toBeInTheDocument();
        expect(screen.getByText('Computer chose: Rock')).toBeInTheDocument();
        expect(screen.getByText('Computer wins!')).toBeInTheDocument();

        (rockMock as MockInstance).mockRestore();
    });

    it('displays a tie if both player and computer choose the same', () => {
        const rockMock = vi.spyOn(Math, 'random').mockReturnValue(0); // Mock computer choice to always be 'Rock'

        render(<Game />);
        const rockButton = screen.getByText('Rock');
        fireEvent.click(rockButton);

        expect(screen.getByText('You chose: Rock')).toBeInTheDocument();
        expect(screen.getByText('Computer chose: Rock')).toBeInTheDocument();
        expect(screen.getByText("It's a tie!")).toBeInTheDocument();

        (rockMock as MockInstance).mockRestore();
    });
});