import { render, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';
import { ScoreProvider } from '../context/ScoreContext';

// We need to inclyde the Score Context as it's required by Scoreboard component
export function renderWithScore(children: ReactNode, renderOptions?: RenderOptions,) {
  return render(
    <ScoreProvider>{children}</ScoreProvider>,
    renderOptions,
  )
}