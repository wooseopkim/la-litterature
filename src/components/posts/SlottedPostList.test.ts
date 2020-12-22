import SlottedPostList from './SlottedPostList.svelte';
import { render, act } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../firebase-shortcut');
const { __loadData } = require('../../firebase-shortcut');

describe('PostList', () => {
  it('should render loader', () => {
    const { container } = render(SlottedPostList);

    expect(container).toHaveTextContent('로딩');
  });

  it('should render posts', async () => {
    const data = [{ title: '제목0' }, { title: '제목1' }, { title: '제목2' }];
    const { container } = render(SlottedPostList);

    __loadData(data);
    for (const _ of data) {
      await act();
    }

    for (const item of data) {
      expect(container).toHaveTextContent(item.title);
    }
  });
});
