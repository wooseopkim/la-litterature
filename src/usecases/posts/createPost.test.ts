import type firebase from 'firebase/app';
import 'firebase/firestore';
import type Post from '../../adapters/network/posts/Post';
import type User from '../../adapters/network/users/User';
import createPost from './createPost';

const postDb = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(data: Post): Promise<firebase.firestore.DocumentReference<Post>> {
    return Promise.resolve(null);
  },
} as firebase.firestore.CollectionReference<Post>;

describe('createPost', () => {
  it('should reject if not authenticated', async () => {
    const author = null as User;
    const draft = {
      title: 'asdf',
      content: [{ type: 'paragraph', data: { text: 'zxcv' } }],
    };

    const result = createPost(postDb, author, draft);

    return expect(result).rejects.not.toBe([]);
  });

  it('should reject if authenticated but uid is empty', async () => {
    const author = { uid: undefined } as User;
    const draft = {
      title: 'asdf',
      content: [{ type: 'paragraph', data: { text: 'zxcv' } }],
    };

    const result = createPost(postDb, author, draft);

    return expect(result).rejects.not.toBe([]);
  });

  it('should reject empty title', async () => {
    const author = { uid: '1' } as User;
    const draft = {
      title: '',
      content: [{ type: 'paragraph', data: { text: 'zxcv' } }],
    };

    const result = createPost(postDb, author, draft);

    return expect(result).rejects.not.toBe([]);
  });
  
  it('should reject empty content', async () => {
    const author = { uid: '1' } as User;
    const draft = {
      title: 'asdf',
      content: [{ type: 'paragraph', data: { text: '           \t\n &nbsp; ' } }],
    };

    const result = createPost(postDb, author, draft);

    return expect(result).rejects.not.toBe([]);
  });
  
  it('should reject too long title', async () => {
    const author = { uid: '1' } as User;
    const draft = {
      title: 'a'.repeat(33),
      content: [{ type: 'paragraph', data: { text: 'zxcv' } }],
    };

    const result = createPost(postDb, author, draft);

    return expect(result).rejects.not.toBe([]);
  });
  
  it('should resolve if arguments are ok', async () => {
    const author = { uid: '1' } as User;
    const draft = {
      title: 'a'.repeat(32),
      content: [{ type: 'paragraph', data: { text: 'zxcv' } }],
    };

    const result = createPost(postDb, author, draft);

    return expect(result).resolves.not.toBe([]);
  });
});
