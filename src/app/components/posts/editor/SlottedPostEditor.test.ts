import SlottedPostEditor from './SlottedPostEditor.svelte';
import { act, render, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('../../../../usecases/posts/createPost');
const { resolve, reject } = require('../../../../usecases/posts/createPost');

describe('SlottedPostEditor', () => {
  it('should render button on first render', async () => {
    const { queryByRole } = render(SlottedPostEditor);
    
    await act();

    expect(queryByRole('button')).toHaveTextContent('제출');
  });

  it('should render loader on submit', async () => {
    const { container, queryByRole } = render(SlottedPostEditor);
    await act();

    userEvent.click(queryByRole('button'));

    await waitFor(() => expect(container).toHaveTextContent('로딩'));
  });

  it('should render button on created', async () => {
    const { queryByRole } = render(SlottedPostEditor);
    await act();

    userEvent.click(queryByRole('button'));
    resolve();

    await waitFor(() => expect(queryByRole('button')).toHaveTextContent('제출'));
  });

  it('should render button on error', async () => {
    const { queryByRole } = render(SlottedPostEditor);
    await act();

    userEvent.click(queryByRole('button'));
    reject();

    await waitFor(() => expect(queryByRole('button')).toHaveTextContent('다시'));
  });
});
