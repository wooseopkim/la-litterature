import SlottedPostList from './SlottedPostList.svelte';
import { render, act } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../../usecases/posts/readPosts');
const { resolve } = require('../../../usecases/posts/readPosts');

describe('PostList', () => {
  it('should render loader', () => {
    const { container } = render(SlottedPostList);

    expect(container).toHaveTextContent('로딩');
  });

  it('should render posts', async () => {
    const data = [{ title: '제목0' }, { title: '제목1' }, { title: '제목2' }];
    const { container } = render(SlottedPostList);

    resolve(data);
    await act();

    for (const item of data) {
      expect(container).toHaveTextContent(item.title);
    }
  });
});
