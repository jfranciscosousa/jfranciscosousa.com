import * as prismic from "@prismicio/client";
import type { RequestHandler } from "@sveltejs/kit";

const repoName = process.env["PRISMIC_REPO_NAME"] as string;
const accessToken = process.env["PRISMIC_ACCESS_TOKEN"] as string;

const routes = [
	{
		type: "homepage",
		path: "/"
	},
	{
		type: "about",
		path: "/about"
	},
	{
		type: "projects",
		path: "/projects"
	}
];

const createPrismicClient = (fetch) => {
	const clientOptions = {
		fetch,
		accessToken,
		routes
	};
	const client = prismic.createClient(repoName, clientOptions);

	return client;
};

export const get: RequestHandler = async ({ request }) => {
	const client = createPrismicClient(fetch);
	const searchParams = new URL(request.url).searchParams;
	const uid = searchParams.get("uid") as string;
	const documentName = searchParams.get("documentName") as string;

	const document = uid
		? await client.getByUID(documentName, uid)
		: await client.getSingle(documentName);

	return {
		body: JSON.stringify(document)
	};
};
