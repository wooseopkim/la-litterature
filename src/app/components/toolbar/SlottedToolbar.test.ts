import SlottedToolbar from './SlottedToolbar.test.svelte';
import { render, act, waitFor } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../../usecases/auth/getAuthState');
const { resolve, reject } = require('../../../usecases/auth/getAuthState');

describe('SlottedToolbar', () => {
  it('should render loader', () => {
    const { getByText } = render(SlottedToolbar);

    expect(getByText('로딩')).toBeInTheDocument();
  });

  it('should render user when signed in', async () => {
    const name = '우섭';
    const { getByText } = render(SlottedToolbar);

    resolve({ name });
    await act();

    await waitFor(() => expect(getByText(name)).toBeInTheDocument());
  });

  it('should render button when not signed in', async () => {
    const { getByText } = render(SlottedToolbar);

    reject();
    await act();

    await waitFor(() => expect(getByText('로그인')).toBeInTheDocument());
  });
});
