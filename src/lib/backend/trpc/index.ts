import { getReadBooks } from '$lib/backend/books';
import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import * as yup from 'yup';
import { getPost, getPosts, getPostsWithData } from '../posts';

export async function createContext() {
	return {};
}

export function responseMeta() {
	return {};
}

export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	.query('getReadBooks', {
		resolve: () => getReadBooks()
	})
	.query('getPosts', {
		resolve: () => getPosts()
	})
	.query('getPostsWithData', {
		resolve: () => getPostsWithData()
	})
	.query('getPost', {
		input: yup.object({
			slug: yup.string().required()
		}),
		resolve: ({ input }) => getPost(input.slug)
	});

export type Router = typeof router;
