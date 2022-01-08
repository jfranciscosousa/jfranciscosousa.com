import RSS from 'rss';
import { convert } from 'rel-to-abs';
import { getPostsWithData } from '$lib/backend/posts';
import type { RequestHandler } from '@sveltejs/kit';
import data from '$lib/data';

const feed = new RSS({
	title: "Francisco Sousa's blog",
	description: 'My thoughts on making computers do stuff.',
	site_url: data.siteUrl,
	feed_url: data.siteUrl + '/api/posts/rss.xml'
});

export const get: RequestHandler = async () => {
	const posts = await getPostsWithData();

	posts.forEach((post) => {
		feed.item({
			date: post.data.date,
			description: convert(post.content, data.siteUrl),
			title: post.data.title,
			url: data.siteUrl + '/blog/' + post.data.slug,
			author: 'Francisco Sousa'
		});
	});

	return {
		body: feed.xml(),
		status: 200,
		headers: {
			'cache-control': 'public, s-maxage=604800'
		}
	};
};