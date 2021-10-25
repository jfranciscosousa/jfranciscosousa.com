import Github from '$lib/components/icons/Github.svelte';
import Linkedin from '$lib/components/icons/Linkedin.svelte';
import Mail from '$lib/components/icons/Mail.svelte';
import Rss from '$lib/components/icons/Rss.svelte';
import Twitter from '$lib/components/icons/Twitter.svelte';

const data = {
	siteUrl: 'https://jfranciscosousa.com',
	socials: {
		twitter: {
			name: 'Twitter',
			href: 'https://twitter.com/goodxicosousa',
			value: '@goodxicosousa',
			icon: Twitter
		},
		linkedin: {
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/jfranciscosousa/',
			icon: Linkedin
		},
		github: {
			name: 'Github',
			href: 'https://github.com/jfranciscosousa',
			icon: Github
		},
		email: {
			name: 'Mail',
			href: 'mailto:francisco.sousa@hey.com',
			value: 'francisco.sousa@hey.com',
			icon: Mail
		},
		rss: {
			name: 'RSS feed',
			href: '/blog/feed.xml',
			icon: Rss
		}
	},
	projects: [
		{
			name: 'urls.wtf',
			href: 'https://urls.wtf',
			github: 'https://github.com/jfranciscosousa/urls.wtf',
			description: 'Serverless url shortener. Designed and developed by me.',
			tags: 'serverless, javascript, eleventy, netlify'
		},
		{
			name: 'MinhoCovid19',
			href: 'https://minhocovid19.com',
			github: 'https://github.com/cooperativa-tech/minhocovid19',
			description:
				'Static website. Designed by <a href="https://twitter.com/jferreiradzn">João Ferreira</a> and developed by me and some friends.',
			tags: 'serverless, javascript, nextjs, netlify, airtable'
		},
		{
			name: 'Sketic',
			href: 'https://sketic.com',
			description: 'Static website. Designed by Sketic. Developed by me.',
			tags: 'gatsby, react, css-modules, i18n, netlify'
		},
		{
			name: 'Dr. Carlos Ribeiro',
			href: 'https://drcarlosribeiromedicinasintegradas.com',
			description: 'Static website. Designed by Sketic. Developed by me.',
			tags: 'gatsby, react, css-in-js, netlify'
		},
		{
			name: 'Osteovida',
			href: 'https://osteovida.pt',
			description: 'Static website. Designed by Sketic. Developed by me.',
			tags: 'gatsby, react, css-modules, netlify'
		},
		{
			name: 'Murocrossfit',
			href: 'https://murocrossfit.com',
			description: 'Static website. Designed by Sketic. Developed by me.',
			tags: 'gatsby, react, css-modules, netlify'
		}
	]
};

export default data;
