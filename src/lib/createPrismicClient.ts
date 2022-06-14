import * as prismic from "@prismicio/client";

const repoName = process.env["PRISMIC_REPO_NAME"] as string;
const accessToken = process.env["PRISMIC_ACCESS_TOKEN"] as string;

const routes = [
	{
		type: "home",
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

export default createPrismicClient;
