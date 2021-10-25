import glob from 'glob';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { format } from 'date-fns';
import markdownToHtml from './markdown';

export type PostData = Record<string, any>;

export type Post = {
	content: string;
	data: PostData;
};

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 240;
	const words = content.split(' ').length;

	if (words <= 0) return 0;

	return Math.ceil(words / wordsPerMinute);
}

async function parsePostFile(file: string): Promise<Post> {
	const fileContent = await fs.readFile(file);
	const parsedPost = matter(fileContent);

	return {
		...parsedPost,
		data: {
			...parsedPost.data,
			slug: path.parse(file).name,
			formattedDate: format(new Date(parsedPost.data.date), 'MMMM d, yyyy'),
			readingTime: calculateReadingTime(parsedPost.content)
		}
	};
}

export async function getPosts(): Promise<PostData[]> {
	const files = glob.sync(process.cwd() + '/blog/**/*.md');
	const posts = await Promise.all(files.map(async (file) => (await parsePostFile(file)).data));

	return posts.sort(
		(postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getTime()
	);
}

export async function getPostsWithData(): Promise<Post[]> {
	const files = glob.sync(process.cwd() + '/blog/**/*.md');
	const posts = await Promise.all(
		files.map(async (file) => {
			const parsedPost = await parsePostFile(file);

			return { ...parsedPost, content: markdownToHtml(parsedPost.content) };
		})
	);

	return posts.sort(
		(postA, postB) => new Date(postB.data.date).getTime() - new Date(postA.data.date).getTime()
	);
}

export async function getPost(slug: string): Promise<Post> {
	// prevent directory transversals by matching against a regex
	// only letters and dashes allowed
	if (!/^[A-Za-z\\-]+$/.test(slug)) return undefined;

	try {
		const parsedPost = await parsePostFile(process.cwd() + '/blog/' + slug + '.md');

		return { ...parsedPost, content: markdownToHtml(parsedPost.content) };
	} catch (error) {
		console.error(error);

		throw error;
	}
}
