import Toolbar from './Toolbar.svelte';
import { render, act } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../firebase-shortcut');
const { __setAuthState } = require('../../firebase-shortcut');

describe('Toolbar', () => {
  it('should render loader', () => {
    const { container } = render(Toolbar);

    expect(container).toHaveTextContent('로딩');
  });

  it('should render user when signed in', async () => {
    const displayName = '우섭';
    const { container } = render(Toolbar);

    __setAuthState({ displayName });
    await act();

    expect(container).toHaveTextContent(`사용자: ${displayName}`);
  });

  it('should render button when not signed in', async () => {
    const { container } = render(Toolbar);

    __setAuthState(null);
    await act();

    expect(container).toHaveTextContent('로그인하기');
  });
});
