/**
 * @jest-environment node
 */

import * as firebase from '@firebase/rules-unit-testing';
import * as fs from 'fs';
import * as path from 'path';

const projectId = 'la-litterature';

beforeAll(async () => {
  const rules = fs.readFileSync(path.join(__dirname, 'firestore.rules'), 'utf-8');
  await firebase.loadFirestoreRules({ projectId, rules });
});

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId });
});

afterEach(async () => {
  await Promise.all(firebase.apps().map((x) => x.delete()));
});

describe('firestore rules', () => {
  describe('posts', () => {
    it('should reject post creation if not authenticated', async () => {
      const app = firebase.initializeTestApp({ projectId });
  
      const db = app.firestore().collection('posts');
  
      await firebase.assertFails(db.add({ title: '_' }));
    });
  
    it('should reject post creation if authenticated but not as the author', async () => {
      const app = firebase.initializeTestApp({ projectId, auth: { uid: '1' } });
  
      const db = app.firestore().collection('posts');
  
      await firebase.assertFails(db.add({ authorUid: '2', title: '_' }));
    });
  
    it('should pass post creation if authenticated as the author', async () => {
      const app = firebase.initializeTestApp({ projectId, auth: { uid: '3' } });
  
      const db = app.firestore().collection('posts');
  
      await firebase.assertSucceeds(db.add({ authorUid: '3', title: '_' }));
    });

    it('should pass post creation if title is not too long', async () => {
      const app = firebase.initializeTestApp({ projectId, auth: { uid: '1' } });

      const db = app.firestore().collection('posts');

      await firebase.assertSucceeds(db.add({ authorUid: '1', title: '_'.repeat(32) }));
    });

    it('should reject post creation if title is too long', async () => {
      const app = firebase.initializeTestApp({ projectId, auth: { uid: '1' } });

      const db = app.firestore().collection('posts');

      await firebase.assertFails(db.add({ authorUid: '1', title: '_'.repeat(32 + 1) }));
    });
  });

  describe('users', () => {
    it('should let anyone to create', async () => {
      const app = firebase.initializeTestApp({ projectId });
  
      const db = app.firestore().collection('users');
  
      await firebase.assertSucceeds(db.add({}));
    });

    it('should let anyone to read', async () => {
      const app = firebase.initializeTestApp({ projectId });
  
      const db = app.firestore().collection('users');
  
      await firebase.assertSucceeds(db.doc('_').get());
    });
  });
});
