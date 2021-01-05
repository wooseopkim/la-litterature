import SlottedPostList from './SlottedPostList.test.svelte';
import { render, act } from '@testing-library/svelte';
import '@testing-library/jest-dom';

jest.mock('../../../usecases/posts/readPosts');
const { resolve } = require('../../../usecases/posts/readPosts');

const defaultProps = {
  editable: false,
};

describe('SlottedPostList', () => {
  it.each([
    [true],
    [false],
  ])('should render editor or not if editable %s', (editable) => {
    const { queryByText } = render(SlottedPostList, { props: { editable } });

    const expectOrNot = (x: Element) => editable ? expect(x) : expect(x).not;
    expectOrNot(queryByText('편집기')).toBeInTheDocument();
  });

  it('should render loader', () => {
    const { getAllByText } = render(SlottedPostList, { props: defaultProps });

    expect(getAllByText(/.../)).not.toEqual([]);
  });

  it('should render posts', async () => {
    const data = [{ title: '제목0' }, { title: '제목1' }, { title: '제목2' }];
    const { getByText } = render(SlottedPostList, { props: defaultProps });

    resolve(data);
    await act();

    for (const item of data) {
      expect(getByText(item.title)).toBeInTheDocument();
    }
  });
});
