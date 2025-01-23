import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UsernameForm } from './UsernameForm';

describe('UsernameForm Component', () => {
  it('renders input and submit button', () => {
    render(<UsernameForm setUsername={vi.fn()} />);
    expect(screen.getByLabelText('Enter your name:')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('can type a username into the input field', () => {
    render(<UsernameForm setUsername={vi.fn()} />);
    const input = screen.getByLabelText('Enter your name:');
    fireEvent.change(input, { target: { value: 'JohnDoe' } });
    expect(input).toHaveValue('JohnDoe');
  });

  it('calls setUsername with valid input when form is submitted', () => {
    const setUsername = vi.fn();
    render(<UsernameForm setUsername={setUsername} />);
    
    const input = screen.getByLabelText('Enter your name:');
    fireEvent.change(input, { target: { value: 'JohnDoe' } });

    const button = screen.getByText('Start');
    fireEvent.click(button);

    expect(setUsername).toHaveBeenCalledWith('JohnDoe');
  });

  it('does not call setUsername with empty input when form is submitted', () => {
    const setUsername = vi.fn();
    render(<UsernameForm setUsername={setUsername} />);

    const input = screen.getByLabelText('Enter your name:');
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByText('Start');
    fireEvent.click(button);

    expect(setUsername).not.toHaveBeenCalled();
  });
});
