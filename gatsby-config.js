module.exports = {
  siteMetadata: {
    title: "José Francisco",
    author: "José Francisco",
    description: "José Francisco personal webpage, full-stack web developer.",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
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
