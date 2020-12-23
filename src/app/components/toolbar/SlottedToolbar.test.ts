import SlottedToolbar from './SlottedToolbar.svelte';
import { render, act } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../../usecases/auth/getAuthState');
const { resolve, reject } = require('../../../usecases/auth/getAuthState');

describe('SlottedToolbar', () => {
  it('should render loader', () => {
    const { container } = render(SlottedToolbar);

    expect(container).toHaveTextContent('로딩');
  });

  it('should render user when signed in', async () => {
    const displayName = '우섭';
    const { container } = render(SlottedToolbar);

    resolve({ displayName });
    await act();

    console.log(container.innerHTML);
    expect(container).toHaveTextContent(`사용자: ${displayName}`);
  });

  it('should render button when not signed in', async () => {
    const { container } = render(SlottedToolbar);

    reject();
    await act();

    expect(container).toHaveTextContent('로그인하기');
  });
});
