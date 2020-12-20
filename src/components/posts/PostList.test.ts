import PostList from './PostList.svelte';
import { render, act } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../firebase-shortcut');
const { __loadData } = require('../../firebase-shortcut');

describe('PostList', () => {
  it('should render loader', () => {
    const { queryByText } = render(PostList);

    const result = queryByText('로딩...');
    expect(result).toBeTruthy();
  });

  it('should render posts', async () => {
    const data = [{ title: '제목0' }, { title: '제목1' }, { title: '제목2' }];
    const { container } = render(PostList);

    __loadData(data);
    for (const _ of data) {
      await act();
    }

    for (const item of data) {
      expect(container).toHaveTextContent(item.title);
    }
  });
});
