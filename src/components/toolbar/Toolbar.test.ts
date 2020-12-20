import Toolbar from './Toolbar.svelte';
import { render, act } from '@testing-library/svelte';

jest.mock('../../firebase-shortcut');
const { __setAuthState } = require('../../firebase-shortcut');

describe('Toolbar', () => {
  it('should render loader', () => {
    const { queryByText } = render(Toolbar);

    const result = queryByText('로딩...');
    expect(result).toBeTruthy();
  });

  it('should render user when signed in', async () => {
    const displayName = '우섭';
    const { queryByText } = render(Toolbar);

    __setAuthState({ displayName });
    await act();

    const result = queryByText(displayName);
    expect(result).toBeTruthy();
  });

  it('should render button when not signed in', async () => {
    const { queryByRole } = render(Toolbar);

    __setAuthState(null);
    await act();

    const result = queryByRole('button');
    expect(result).toBeTruthy();
  });
});
