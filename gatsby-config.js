module.exports = {
  siteMetadata: {
    title: "Francisco Sousa | Developer",
    author: "Francisco Sousa",
    description: "Francisco Sousa, full-stack web developer.",
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
    { resolve: "gatsby-transformer-sharp", options: { useMozJpeg: true } },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /src\/assets\/images/,
        },
      },
    },
  ],
};
