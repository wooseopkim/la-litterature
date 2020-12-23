import router from 'page';
import Feed from './pages/Feed.svelte';
import NotFound from './pages/NotFound.svelte';

let page;
router('/', '/feed');
router('/feed', () => page = Feed);
router(() => page = NotFound);
router.start();

export default page;
