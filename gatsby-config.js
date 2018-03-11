module.exports = {
  siteMetadata: {
    title: "José Francisco",
    author: "José Francisco",
    description: "José Francisco personal webpage, full-stack web developer.",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-114235862-1",
        head: true,
        anonymize: true,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets/`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
  ],
};
