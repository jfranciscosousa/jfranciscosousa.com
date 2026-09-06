const data = {
  siteUrl: "https://jfranciscosousa.com",
  socials: {
    x: {
      name: "X",
      rel: "noopener external",
      href: "https://x.com/goodxicosousa",
      value: "@goodxicosousa",
      icon: `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      class="icon-x"
      ><path d="M18.901 1.153h3.68l-8.039 9.187L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.49h2.039L6.486 3.24H4.298L17.61 20.644Z" /></svg
    >
    `,
    },
    linkedin: {
      name: "LinkedIn",
      rel: "noopener external",
      href: "https://www.linkedin.com/in/jfranciscosousa/",
      icon: `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-linkedin"
      ><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect
        x="2"
        y="9"
        width="4"
        height="12"
      /><circle cx="4" cy="4" r="2" /></svg
    >
    `,
    },
    github: {
      name: "Github",
      rel: "noopener external",
      href: "https://github.com/jfranciscosousa",
      icon: `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-github"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    </svg>
    `,
    },
    email: {
      name: "Mail",
      rel: "noopener external",
      href: "mailto:francisco.sousa@hey.com",
      value: "francisco.sousa@hey.com",
      icon: `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-mail"
      ><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline
        points="22,6 12,13 2,6"
      /></svg
    >
    `,
    },
    rss: {
      name: "RSS feed",
      rel: "noopener",
      href: "/api/posts/rss.xml",
      icon: `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-rss"
      ><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle
        cx="5"
        cy="19"
        r="1"
      /></svg
    >
    `,
    },
  },
  projects: [
    {
      name: "PDF Optimizer",
      href: "https://pdf.jfranciscosousa.com",
      github: "https://github.com/jfranciscosousa/pdf-optimizer",
      description:
        "A fully client-side pdf optimizer that uses Ghostscript compiled to WebAssembly",
      tags: "serverless, webassembly, react, tanstack-router",
    },
    {
      name: "urls.wtf",
      href: "https://urls.wtf",
      github: "https://github.com/jfranciscosousa/urls.wtf",
      description: "Serverless url shortener. ",
      tags: "serverless, javascript, typescript, svelte, prisma",
    },
    {
      name: "Dicer",
      href: "https://dicer.jfranciscosousa.deno.net/",
      github: "https://github.com/jfranciscosousa/dicer",
      description: "Discord bot to roll tabletop gaming dice.",
      tags: "serverless, javascript, typescript, deno, discord",
    },
  ],
};

export default data;
