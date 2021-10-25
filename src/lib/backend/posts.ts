import glob from 'glob';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { format } from 'date-fns';
import markdownToHtml from './markdown';

export type PostData = Record<string, string | number>;

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

function parsePostFile(file: string): Post {
	const fileContent = fs.readFileSync(file);
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

export function getPosts(): PostData[] {
	const files = glob.sync(process.cwd() + '/blog/**/*.md');
	const posts = files.map((file) => parsePostFile(file).data);

	return posts.sort(
		(postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getTime()
	);
}

export function getPost(slug: string): Post {
	// prevent directory transversals by matching against a regex
	// only letters and dashes allowed
	if (!/^[A-Za-z\\-]+$/.test(slug)) return undefined;

	try {
		const parsedPost = parsePostFile(process.cwd() + '/blog/' + slug + '.md');

		return { ...parsedPost, content: markdownToHtml(parsedPost.content) };
	} catch (error) {
		console.error(error);

		throw error;
	}
}
