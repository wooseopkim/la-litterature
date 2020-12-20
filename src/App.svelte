<script lang="ts">
	import AuthPanel from './components/auth/AuthPanel.svelte';
	import { db } from './firebase';

	let posts = [];

	const query = db.collection('posts').get();
	(async () => {
		(await query).forEach((x) => {
			posts = [...posts, x.data()];
		});
	})();
</script>

<main>
	<AuthPanel />

	{#each posts as post}
		<pre>{JSON.stringify(post)}</pre>
	{/each}
</main>
