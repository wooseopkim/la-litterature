import AuthPanel from './AuthPanel.svelte';
import { render, act } from '@testing-library/svelte';

jest.mock('../../firebase-shortcut');
const { __setAuthState } = require('../../firebase-shortcut');

describe('AuthPanel', () => {
  it('should render loader', () => {
    const { queryByText } = render(AuthPanel);

    const result = queryByText('로딩...');
    expect(result).toBeTruthy();
  });

  it('should render user when signed in', async () => {
    const displayName = '우섭';
    const { queryByText } = render(AuthPanel);

    __setAuthState({ displayName });
    await act();

    const result = queryByText(displayName);
    expect(result).toBeTruthy();
  });

  it('should render button when not signed in', async () => {
    const { queryByRole } = render(AuthPanel);

    __setAuthState(null);
    await act();

    const result = queryByRole('button');
    expect(result).toBeTruthy();
  });
});
