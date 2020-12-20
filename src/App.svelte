<script lang="ts">
	import firebase from 'firebase/app';

	let posts = [];

	const query = firebase.firestore().collection('posts').get();
	(async () => {
		(await query).forEach((x) => {
			posts = [...posts, x.data()];
		});
	})();
</script>

<main>
	{#each posts as post}
		<pre>{JSON.stringify(post)}</pre>
	{/each}
</main>
